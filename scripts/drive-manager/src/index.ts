import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { listFiles } from './driveClient.js';
import { scanFolder } from './scanFolder.js';
import { buildIndex } from './buildIndex.js';
import { writeIndex } from './writeIndex.js';

// Load .env from the drive-manager directory
const __dirname = dirname(fileURLToPath(import.meta.url));
try {
  const envContent = readFileSync(resolve(__dirname, '../.env'), 'utf-8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const raw = trimmed.slice(eqIdx + 1).trim();
    const val = raw.replace(/^(['"])(.*)\1$/, '$2');
    if (key && !(key in process.env)) process.env[key] = val;
  }
} catch {
  // no .env file — rely on existing environment variables
}

const API_KEY = process.env.DRIVE_API_KEY ?? '';
const FOLDER_EN = process.env.DRIVE_FOLDER_ID_EN ?? '';
const FOLDER_ES = process.env.DRIVE_FOLDER_ID_ES ?? '';

console.log('Starting Drive sync with config:');
console.log(`  API_KEY: ${API_KEY ? '***' : '(missing)'}`);
console.log(`  FOLDER_EN: ${FOLDER_EN ? FOLDER_EN : '(missing)'}`);
console.log(`  FOLDER_ES: ${FOLDER_ES ? FOLDER_ES : '(missing)'}`);
if (!API_KEY) {
  console.error('Missing DRIVE_API_KEY environment variable');
  process.exit(1);
}

const args = process.argv.slice(2);
const langArg =
  args.find((a) => a.startsWith('--lang='))?.split('=')[1] ??
  args[args.indexOf('--lang') + 1];

type Lang = 'en' | 'es';
const LANGS: Lang[] = ['en', 'es'];
const langsToSync: Lang[] =
  langArg === 'en' || langArg === 'es' ? [langArg] : LANGS;

async function syncLanguage(lang: Lang): Promise<number> {
  const folderId = lang === 'en' ? FOLDER_EN : FOLDER_ES;

  if (!folderId) {
    console.warn(
      `DRIVE_FOLDER_ID_${lang.toUpperCase()} not set — skipping ${lang}`,
    );
    return 0;
  }

  console.log(`Scanning Drive folder for [${lang}]...`);
  const files = await listFiles(folderId, API_KEY);
  const pairs = scanFolder(files);
  const entries = buildIndex(pairs);
  const outputPath = writeIndex(entries, lang);

  console.log(`  Written ${entries.length} entries to ${outputPath}`);
  return entries.length;
}

(async () => {
  for (const lang of langsToSync) {
    await syncLanguage(lang);
  }
  console.log('Done.');
})().catch((err) => {
  console.error('Sync failed:', err);
  process.exit(1);
});
