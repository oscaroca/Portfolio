export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  description?: string;
  thumbnailLink?: string;
}

export async function listFiles(folderId: string, apiKey: string): Promise<DriveFile[]> {
  const params = new URLSearchParams({
    q: `"${folderId}" in parents and trashed = false`,
    fields: 'files(id,name,mimeType,description,thumbnailLink)',
    key: apiKey,
    pageSize: '100',
  });

  const res = await fetch(`https://www.googleapis.com/drive/v3/files?${params}`);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Drive API error ${res.status}: ${text}`);
  }

  const data = (await res.json()) as { files: DriveFile[] };
  return data.files ?? [];
}
