const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ===== Author image =====
const storageAuthor = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = "./uploads/images/author-img";
    if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const uniqueName = file.fieldname + "_" + Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});
const uploadAuthor = multer({ storage: storageAuthor }).single("file");

const uploadAuthorImage = async (req, res) => {
  try {
    uploadAuthor(req, res, (err) => {
      if (err) return res.status(400).json({ message: err.message });
      if (!req.file) return res.status(400).json({ message: "Rasm topilmadi!" });

      const filePath = `http://localhost:4001/images/author-img/${req.file.filename}`;
      return res.status(201).json({ filePath });
    });
  } catch (error) {
    res.status(500).json({ message: "Server xatosi" });
  }
};

// ===== Books image =====
const storageBooks = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = "./uploads/images/books-img";
    if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const uniqueName = file.fieldname + "_" + Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});
const uploadBooks = multer({ storage: storageBooks }).single("file");

const uploadBookImage = async (req, res) => {
  try {
    uploadBooks(req, res, (err) => {
      if (err) return res.status(400).json({ message: err.message });
      if (!req.file) return res.status(400).json({ message: "Rasm topilmadi!" });

      const filePath = `http://localhost:4001/images/books-img/${req.file.filename}`;
      return res.status(201).json({ filePath });
    });
  } catch (error) {
    res.status(500).json({ message: "Server xatosi" });
  }
};

module.exports = { uploadAuthorImage, uploadBookImage };
