import { join } from 'path';
import { unlink } from 'fs/promises';
import authMiddleware from '~/server/routes/middleware/auth.js';

export default defineEventHandler(async (event) => {
  authMiddleware(event);

  try {
    // Read the filename from the query or body
    const { filename } = getQuery(event); // For query parameters
    if (!filename) {
      throw new Error('Filename is required');
    }

    // Resolve the full path to the image
    const imagePath = join(process.cwd(), 'data', filename);

    // Delete the file
    await unlink(imagePath);

    // Return success response
    return { success: true, message: 'Image deleted successfully' };
  } catch (error) {
    console.error('Error deleting image:', error);
    return { success: false, message: error.message };
  }
});
