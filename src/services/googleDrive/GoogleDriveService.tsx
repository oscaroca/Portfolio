import { GoogleFileIndexEntry } from './domain/GoogleFileIndexEntry';

// GoogleDriveService.ts
export class GoogleDriveService {
  private apiKey: string;
  private indexFileId: string;

  constructor(apiKey: string, indexFileId: string) {
    this.apiKey = apiKey;
    this.indexFileId = indexFileId;
  }

  async fetchIndex(): Promise<GoogleFileIndexEntry[]> {
    const res = await fetch(
      `https://www.googleapis.com/drive/v3/files/${this.indexFileId}?alt=media&key=${this.apiKey}`,
    );

    console.log('Google Drive fetchIndex response:', res);

    if (!res.ok) {
      return [];
    }
    console.log(
      'Google Drive fetchIndex response JSON:',
      await res.clone().json(),
    );
    return res.json() as unknown as GoogleFileIndexEntry[];
  }

  getPreviewUrl(fileId: string) {
    return `https://lh3.googleusercontent.com/d/${fileId}=w600`;
  }

  async fetchGoogleDoc(fileId: string) {
    const url = `https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=text/html&key=${this.apiKey}`;

    const res = await fetch(url);

    if (!res.ok) {
      console.error('Failed to fetch Google Doc', res.status);
      return null;
    }

    const html = await res.text();
    return html;
  }
}
