import multer from "multer";           // ✅ ES module import, not require()
import path from "path";
import fs from "fs";

// ✅ Dynamic destination — decided per route via req.uploadPath
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Routes set req.uploadPath, fallback to general uploads/
    const dir = req.uploadPath || "uploads/general";
    // Create folder if it doesn't exist
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    // ✅ Sanitize original name + unique timestamp
    const ext = path.extname(file.originalname).toLowerCase();
    const base = path.basename(file.originalname, ext).replace(/\s+/g, "-");
    cb(null, `${base}-${Date.now()}${ext}`);
  },
});

// ✅ Allow documents and images
const fileFilter = (req, file, cb) => {
  const allowed = /pdf|doc|docx|jpg|jpeg|png|avif|webp/;
  const ext = path.extname(file.originalname).toLowerCase().replace(".", "");
  if (allowed.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error(`File type not allowed: ${ext}`), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // ✅ 5MB max
});

export default upload;