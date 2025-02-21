import { readdir } from 'fs/promises';
import { join } from 'path';
import authMiddleware from '~/server/routes/middleware/auth.js';

export default defineEventHandler(async (event) => {
  await authMiddleware(event);

  const folderPath = join(process.cwd(), 'data/');

  try {
    // Read the files in the folder
    const files = await readdir(folderPath);

    // Return file nam
    const imageNames = files.map((file) => `${file}`);

    return { imageNames: imageNames };
  } catch (error) {
    console.error('Error reading the folder:', error);
    return { error: 'Failed to read the folder' };
  }
});
