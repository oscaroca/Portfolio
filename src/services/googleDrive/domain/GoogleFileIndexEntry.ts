export interface GoogleFileIndexEntry {
  id: string;
  mimeType: string;
  title: string;
  description: string;
  previewImage: string;
  tags?: string[];
  githubUrl?: string;
  demoUrl?: string;
  priority?: number;
}
