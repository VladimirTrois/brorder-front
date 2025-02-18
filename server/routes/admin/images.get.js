import { readdir } from 'fs/promises';
import { join } from 'path';
import authMiddleware from '~/server/routes/middleware/auth.js';

export default defineEventHandler(async (event) => {
  await authMiddleware(event);

  const folderPath = join(process.cwd(), 'public/img/products');

  try {
    // Read the files in the folder
    const files = await readdir(folderPath);

    // Return file paths relative to the public directory
    const imagePaths = files.map((file) => `/img/products/${file}`);

    return { images: imagePaths };
  } catch (error) {
    console.error('Error reading the folder:', error);
    return { error: 'Failed to read the folder' };
  }
});
