import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); // __filename
const __dirname = path.dirname(__filename); // __dirname

export const uploadFile = (req, res) => {
    console.log('req upload file', req);

  const files = req.files; // Get the uploaded files from the request
  console.log('Uploaded files:', files); // Log the uploaded files for debugging
  console.log('type of', typeof files); // Log the type of files for debugging
  

  if (!files || files.length === 0) {
    return res.status(400).json({ message: "No files uploaded." }); // Send error response if no files are uploaded
  }
  // Move each file to the desired location
  files.file1?.forEach(file => { // Loop through each uploaded file
    const uploadPath = path.join("uploads", file.originalname); // Define the upload path
    
    fs.renameSync(file.path, uploadPath); // Move the file to the upload path
  }); // End of forEach loop
  res.status(200).json({ message: "Files uploaded successfully.", files: files.file1?.map(f => f.originalname) }); // Send success response
};

export const deleteFile = (req, res) => {  // create deleteFile function
  // Delete a file
  const fileName = req.params.fileName; // Get the file name from the request parameters
  const filePath = path.join("uploads", fileName); // Construct the file path
  if (fs.existsSync(filePath)) {
    // Check if the file exists
    fs.unlinkSync(filePath); // Delete the file
    res.status(200).json({ message: "File deleted successfully" }); // Send success response
  } else {
    // If the file does not exist
    res.status(404).json({ message: `File${fileName} not found.` }); // Send error response
  } // End of if-else block
}; // End of deleteFile function

export const viewFile = (req, res) => {
  // View a file
  const uploadDirectory = path.join(__dirname, "../../uploads"); // Define the uploads directory path
  fs.readdir(uploadDirectory, (err, files) => { 
    // Read the uploads directory
    if (err) {
        console.log('errr', err); 
      res.status(500).send("Unable to scan files!"); // Send error response if unable to read directory
    } else { // If directory read is successful
      res.status(200).json({ files: files }); // Send success response with list of files
    }
  });
};
