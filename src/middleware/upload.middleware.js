import multer from "multer";

const storage = multer.diskStorage({ // Set up storage engine
    destination: (req, file, cb) => { // Set destination for uploaded files
        cb(null, 'uploads/') // Specify the uploads directory
    }, // End of destination
    filename: (req, file, cb) => { // Set the filename for uploaded files
        console.log(file);
        const fileName = `${Date.now()}-${file.originalname}`; // Create a unique filename
        cb(null, fileName); // Return the unique filename
    } // End of filename
}); // End of storage

const upload = multer({storage}); // Initialize multer with the defined storage engine

export default upload; // Export the upload middleware