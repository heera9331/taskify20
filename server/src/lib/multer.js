import multer from "multer";
import fs from "fs";
import path from "path";

// Define the upload directory root
const UPLOADS_ROOT = path.join(process.cwd(), "uploads");

/**
 * Ensures a directory exists, and creates it if it doesn't.
 * @param dirPath The path of the directory to ensure
 */
const ensureDirectory = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

/**
 * Generates the folder hierarchy (year/month) like WordPress.
 * Ensures the folders exist and returns the path.
 * @returns The generated folder path.
 */
const getUploadFolderPath = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString();
  const month = (currentDate.getMonth() + 1).toString(); // Month starts from 0

  const folderPath = path.join(UPLOADS_ROOT, year, month);
  ensureDirectory(folderPath);

  return folderPath;
};

/**
 * Multer Storage Configuration
 * Dynamically sets the upload destination based on year/month.
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderPath = getUploadFolderPath();
    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext).replace(/\s+/g, "-");
    cb(null, `${baseName}-${timestamp}${ext}`);
  },
});

// Initialize Multer
const upload = multer({ storage }); 

export { upload };