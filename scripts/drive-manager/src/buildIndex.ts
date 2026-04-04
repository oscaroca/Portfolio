import { FilePair } from './scanFolder.js';

export interface GoogleFileIndexEntry {
  id: string;
  mimeType: string;
  title: string;
  description: string;
  previewImage: string;
}

function stripExtension(name: string): string {
  return name.replace(/\.[^.]+$/, '').trim();
}

export function buildIndex(pairs: FilePair[]): GoogleFileIndexEntry[] {
  return pairs.map(({ doc, image }) => ({
    id: doc.id,
    mimeType: doc.mimeType,
    title: stripExtension(doc.name),
    description: doc.description ?? '',
    previewImage: image?.id ?? '',
  }));
}
