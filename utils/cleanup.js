import fsExtra from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UPLOADS_DIR = path.join(__dirname, '../uploads');
const MAX_AGE_MS = 60 * 60 * 1000; // 1 hour

/**
 * Clean up old files and folders in uploads directory
 */
export async function cleanupOldUploads() {
  try {
    const now = Date.now();
    const items = await fsExtra.readdir(UPLOADS_DIR);

    for (const item of items) {
      const itemPath = path.join(UPLOADS_DIR, item);
      const stats = await fsExtra.stat(itemPath);
      const age = now - stats.mtimeMs;

      // Remove files/folders older than MAX_AGE
      if (age > MAX_AGE_MS) {
        console.log(`Removing old upload: ${item}`);
        await fsExtra.remove(itemPath);
      }
    }
  } catch (error) {
    console.error('Error cleaning up old uploads:', error);
  }
}

/**
 * Clean up specific files after processing
 */
export async function cleanupFiles(zipPath, extractPath) {
  try {
    if (zipPath && await fsExtra.pathExists(zipPath)) {
      await fsExtra.remove(zipPath);
      console.log('Removed zip file:', zipPath);
    }
    
    if (extractPath && await fsExtra.pathExists(extractPath)) {
      await fsExtra.remove(extractPath);
      console.log('Removed extracted folder:', extractPath);
    }
  } catch (error) {
    console.error('Error during cleanup:', error);
  }
}
