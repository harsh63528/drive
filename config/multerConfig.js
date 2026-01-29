import multer from "multer";
import path from "path";
import fs from "fs";

const __dirname = import.meta.dirname;
const uploadDir = path.join(__dirname, "../uploads");

// ensure folder exists (runs once)
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage:Storage });


export default upload
