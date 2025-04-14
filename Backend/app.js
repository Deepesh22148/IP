import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import uploadRouter from './route/upload.route.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json());

// Static file serving
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use your router
app.use('/api/upload', uploadRouter);

app.post('/api/animations', (req, res) => {
    const { selectedAnimations } = req.body;
    console.log('User selected animations:', selectedAnimations);
    res.status(200).json({ message: 'Received', animations: selectedAnimations });
});

app.listen(3000, () => {
    console.log(" Server started on http://localhost:3000");
});
