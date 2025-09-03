import fs from "fs";
import path from "path";

export const uploadFile = (req, res) => {
  const file = req.file; // Get the uploaded file from the request
  if (!file) {
    return res.status(400).json({ message: "No file uploaded." }); // Send error response if no file is uploaded
  }
  // Move the file to the desired location
  const uploadPath = path.join("uploads", file.originalname);
  fs.renameSync(file.path, uploadPath);
  res.status(200).json({ message: "File uploaded successfully." }); // Send success response
};

export const deleteFile = (req, res) => {
  // Delete a file
  const fileName = req.params.fileName; // Get the file name from the request parameters
  const filePath = path.join("uploads", fileName); // Construct the file path
  if (fs.existsSync(filePath)) {
    // Check if the file exists
    fs.unlinkSync(filePath); // Delete the file
    res.status(200).json({ message: "File deleted successfully" }); // Send success response
  } else {
    // If the file does not exist
    res.status(404).json({ message: `File ${fileName} not found.` }); // Send error response
  } // End of if-else block
}; // End of deleteFile function

export const viewFile = (req, res) => {
  // View a file
  const uploadDirectory = path.join(__dirname, "../uploads");
  fs.readdir(uploadDirectory, (err, files) => {
    // Read the uploads directory
    if (err) {
      res.status(500).send("Unable to scan files!"); // Send error response if unable to read directory
    } else { // If directory read is successful
      res.status(200).json({ files: files }); // Send success response with list of files
    }
  });
};
