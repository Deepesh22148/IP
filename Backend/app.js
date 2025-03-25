import express from "express";
import multer from "multer";
import cors from "cors";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { PORT ,IP_ADDRESS} from "./config/env.js";

const app = express();

app.use(cors());

const uploadFolder = "uploads";
const outputFolder = "output";

if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder);
if (!fs.existsSync(outputFolder)) fs.mkdirSync(outputFolder);

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadFolder),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

app.post("/upload", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });

        const inputPath = path.join(uploadFolder, req.file.filename);
        const outputFilename = `bw_${req.file.filename}`;
        const outputPath = path.join(outputFolder, outputFilename);

        const pythonProcess = spawn("python", ["./scripts/process_image.py", inputPath, outputPath]);

        pythonProcess.on("close", (code) => {
            if (code === 0) {
                return res.json({
                    success: true,
                    processed_image_url: `http://${IP_ADDRESS}:${PORT}/output/${outputFilename}`,
                });
            } else {
                return res.status(500).json({ success: false, message: "Image processing failed" });
            }
        });

        pythonProcess.on("error", (err) => {
            console.error("Python Process Error:", err);
            return res.status(500).json({ success: false, message: "Python script execution failed" });
        });

    } catch (error) {
        console.error("Server Error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Serve processed images
app.use("/output", express.static(outputFolder));

// Start the server
app.listen(PORT, "0.0.0.0", () => console.log(`Server running at http://${IP_ADDRESS}:${PORT}`));
