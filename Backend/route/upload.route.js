import { Router } from 'express';
import capturedUpload from '../middleware/capturedUpload.js';

const uploadRouter = Router();

uploadRouter.post('/captured', capturedUpload.single('image'), (req, res) => {
    console.log('Image stored at:', req.file?.path);
    res.status(200).json({ message: 'Image uploaded successfully', file: req.file });
});

export default uploadRouter;
