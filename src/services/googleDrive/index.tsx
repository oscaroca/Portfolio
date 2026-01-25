import { config } from '../configuration';
import { GoogleDriveService } from './GoogleDriveService';

export const googleDriveService = new GoogleDriveService(
  config.GOOGLE_DRIVE_API_KEY,
  config.GOOGLE_DRIVE_INDEX_FILE_ID,
);
