import { GoogleFileIndexEntry } from './domain/GoogleFileIndexEntry';

// GoogleDriveService.ts
export class GoogleDriveService {
  private apiKey: string;
  private indexFileIdES: string;
  private indexFileIdEN: string;

  constructor(apiKey: string, indexFileIdES: string, indexFileIdEN: string) {
    this.apiKey = apiKey;
    this.indexFileIdES = indexFileIdES;
    this.indexFileIdEN = indexFileIdEN;
  }

  async fetchIndex(language: 'es' | 'en'): Promise<GoogleFileIndexEntry[]> {
    const res = await fetch(
      `https://www.googleapis.com/drive/v3/files/${language === 'es' ? this.indexFileIdES : this.indexFileIdEN}?alt=media&key=${this.apiKey}`,
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

  async fetchFile(fileId: string): Promise<Blob | null> {
    const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${this.apiKey}`;

    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.error('Failed to fetch file from Google Drive', res.status);
        return null;
      }
      const blob = await res.blob();
      return blob;
    } catch (error) {
      console.error('Error fetching file from Google Drive', error);
      return null;
    }
  }
}
