import express, { Router } from "express";
import upload from "../middleware/upload.middleware.js";
import { deleteFile, uploadFile, viewFile } from "../config/user.controller.js";

const router = express.Router(); // Create a new router instance

router.post('/upload-file', upload.single('file'), uploadFile); // Handle file upload
router.delete('/delete-file/:fileName', deleteFile); // Handle file deletion
router.get('/view-files', viewFile); // Handle viewing files

export default router;
