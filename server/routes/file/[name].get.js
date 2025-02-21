// /server/routes/file/[name].get.js
import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  const base = path.resolve('data'); // Resolve the base folder where files are stored
  const filePath = path.join(base, event.context.params.name); // Resolve file path

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    throw createError({
      statusCode: 404,
      statusMessage: 'File not found',
    });
  }

  // Serve the file as a stream
  return sendStream(event, fs.createReadStream(filePath));
});
