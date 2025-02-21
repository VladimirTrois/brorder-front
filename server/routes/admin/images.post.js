import multer from 'multer';
import { join } from 'path';
import path from 'path';
import authMiddleware from '~/server/routes/middleware/auth.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve('data')); // Save in public/img/products
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`); // Use the desired name with the correct extension
  },
});

const upload = multer({ storage });

export default defineEventHandler((event) => {
  authMiddleware(event);

  return new Promise((resolve, reject) => {
    upload.single('image')(event.node.req, event.node.res, (err) => {
      if (err) {
        reject(err);
      } else {
        const uploadedFileName = `${event.node.req.file.filename}`;
        resolve({ uploadedFileName });
      }
    });
  });
});
