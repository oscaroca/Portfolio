import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { GoogleFileIndexEntry } from './buildIndex.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export function writeIndex(entries: GoogleFileIndexEntry[], language: 'en' | 'es'): string {
  const outputPath = resolve(__dirname, `../../../public/data/index-${language}.json`);
  writeFileSync(outputPath, JSON.stringify(entries, null, 2), 'utf-8');
  return outputPath;
}
