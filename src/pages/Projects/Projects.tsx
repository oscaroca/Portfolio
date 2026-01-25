import React, { useEffect, useState } from 'react';
import { googleDriveService } from '../../services/googleDrive';
import { GoogleFileIndexEntry } from '../../services/googleDrive/domain/GoogleFileIndexEntry';
import { Container } from 'react-bootstrap';
import { Article } from './Article';
import { ArticlePreview } from './ArticlePreview';
import { render } from '@react-pdf/renderer';

export interface selectedFile {
  id: string;
  content: string;
  entry: GoogleFileIndexEntry;
}

export default function Projects() {
  const [files, setFiles] = useState<GoogleFileIndexEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [selectedFile, setSelectedFile] = useState<selectedFile | null>(null);
  useEffect(() => {
    async function fetchFiles() {
      const fetchedFiles = await googleDriveService.fetchIndex();
      setFiles(fetchedFiles);
      setLoading(false);
    }
    fetchFiles();
  }, []);

  const fetchFileContent = async (fileId: string) => {
    const html = await googleDriveService.fetchGoogleDoc(fileId);
    setSelectedFile({
      id: fileId,
      content: html || '',
      entry: files.find((f) => f.id === fileId)!,
    });
  };

  console.log('Files:', files);

  const renderContentList = () => {
    return (
      <div>
        {loading ? (
          <p>Loading projects...</p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '1rem',
            }}
          >
            {files.map((file) => (
              <ArticlePreview
                file={file}
                onClick={() => fetchFileContent(file.id)}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderContentFile = () => {
    if (!selectedFile) {
      return <p>Loading file content...</p>;
    }
    return (
      <Article
        document={selectedFile}
        onBack={() => {
          setSelectedFile(null);
        }}
      />
    );
  };

  return (
    <section>
      <Container
        fluid
        style={{
          marginTop: '130px',
          position: 'relative',
          padding: '30px 40px',
        }}
        id="home"
      >
        {selectedFile ? renderContentFile() : renderContentList()}
      </Container>
    </section>
  );
}
