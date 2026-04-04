import { DriveFile } from './driveClient.js';

const DOC_MIME_TYPES = new Set([
  'application/vnd.google-apps.document',
  'text/html',
  'application/pdf',
]);

export interface FilePair {
  doc: DriveFile;
  image: DriveFile | null;
}

function baseName(name: string): string {
  return name.replace(/\.[^.]+$/, '').trim();
}

function isDoc(file: DriveFile): boolean {
  return DOC_MIME_TYPES.has(file.mimeType);
}

function isImage(file: DriveFile): boolean {
  return file.mimeType.startsWith('image/');
}

export function scanFolder(files: DriveFile[]): FilePair[] {
  const docs = files.filter(isDoc);
  const images = files.filter(isImage);

  return docs.map((doc) => {
    const base = baseName(doc.name);
    const image = images.find((img) => baseName(img.name) === base) ?? null;
    return { doc, image };
  });
}
