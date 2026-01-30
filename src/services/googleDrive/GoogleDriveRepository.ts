import { GoogleDriveService } from './GoogleDriveService';
import { GoogleFileIndexEntry } from './domain/GoogleFileIndexEntry';

/**
 * Repository pattern for Google Drive operations
 * Provides a clean abstraction layer over the GoogleDriveService
 * with business logic and data transformation
 */
export class GoogleDriveRepository {
  constructor(private service: GoogleDriveService) {}

  /**
   * Fetch the index of available files for a specific language
   * @param language - Language code ('es' or 'en')
   * @returns Promise<GoogleFileIndexEntry[]> - Array of file index entries
   */
  async getFileIndex(language: 'es' | 'en'): Promise<GoogleFileIndexEntry[]> {
    try {
      const files = await this.service.fetchIndex(language);

      // Data transformation/enrichment can be added here
      // For now, we just return the files as-is
      return files || [];
    } catch (error) {
      console.error(
        `Failed to fetch file index for language ${language}:`,
        error,
      );
      throw error;
    }
  }

  /**
   * Fetch the HTML content of a Google Doc
   * @param fileId - The ID of the Google Drive file
   * @returns Promise<string | null> - HTML content or null if failed
   */
  async getDocumentContent(fileId: string): Promise<string | null> {
    try {
      const html = await this.service.fetchGoogleDoc(fileId);

      // Data transformation/cleaning can be added here
      return html || null;
    } catch (error) {
      console.error(
        `Failed to fetch document content for file ${fileId}:`,
        error,
      );
      throw error;
    }
  }

  /**
   * Fetch raw file blob (e.g., PDF) from Google Drive
   */
  async getFileBlob(fileId: string): Promise<Blob | null> {
    try {
      const blob = await this.service.fetchFile(fileId);
      return blob;
    } catch (error) {
      console.error(`Failed to fetch file blob for file ${fileId}:`, error);
      throw error;
    }
  }

  /**
   * Get the preview URL for a file
   * @param fileId - The ID of the Google Drive file
   * @returns string - The preview URL
   */
  getFilePreviewUrl(fileId: string): string {
    return this.service.getPreviewUrl(fileId);
  }
}
