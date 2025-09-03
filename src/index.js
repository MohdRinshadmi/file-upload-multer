import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import router from "./route/route.js";

const __filename = fileURLToPath(import.meta.url); // __filename
const __dirname = path.dirname(__filename); // __dirname

const app = express();
const PORT = 3000; // either we can use process.env.PORT or define our own

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // for serving static files from the uploads directory

app.use(
  cors(
    // for enabling CORS
    {
      origin: "*", // allow all origins
    }
  )
);
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use((req, res) => {
  res.status(200).json("Welcome to the application. No such API");
});
