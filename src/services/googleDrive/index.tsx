import { config } from '../configuration';
import { GoogleDriveService } from './GoogleDriveService';
import { GoogleDriveRepository } from './GoogleDriveRepository';

export const googleDriveService = new GoogleDriveService(
  config.GOOGLE_DRIVE_API_KEY,
  config.GOOGLE_DRIVE_INDEX_FILE_ID_ES,
  config.GOOGLE_DRIVE_INDEX_FILE_ID_EN,
);

export const googleDriveRepository = new GoogleDriveRepository(
  googleDriveService,
);
