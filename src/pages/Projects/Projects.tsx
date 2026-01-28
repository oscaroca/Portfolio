import React, { useState } from 'react';
import { googleDriveRepository } from '../../services/googleDrive';
import { GoogleFileIndexEntry } from '../../services/googleDrive/domain/GoogleFileIndexEntry';
import { Container } from 'react-bootstrap';
import { Article } from './Article';
import { ArticlePreview } from './ArticlePreview';
import { render } from '@react-pdf/renderer';
import { useTranslation } from '../../hooks/useTranslation';
import {
  useGoogleDriveIndex,
  useFetchGoogleDoc,
} from '../../hooks/useGoogleDrive';

export interface selectedFile {
  id: string;
  content: string;
  entry: GoogleFileIndexEntry;
}

export default function Projects() {
  const { language } = useTranslation();
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<selectedFile | null>(null);

  // Fetch file index with automatic caching
  const { data: files = [], isLoading } = useGoogleDriveIndex(
    googleDriveRepository,
    language,
  );

  // Fetch document content with automatic caching
  const { data: documentContent } = useFetchGoogleDoc(
    googleDriveRepository,
    selectedFileId,
    !!selectedFileId,
  );

  // Update selectedFile when document content is loaded
  React.useEffect(() => {
    if (selectedFileId && documentContent !== undefined) {
      const entry = files.find((f) => f.id === selectedFileId);
      if (entry) {
        setSelectedFile({
          id: selectedFileId,
          content: documentContent || '',
          entry,
        });
      }
    }
  }, [selectedFileId, documentContent, files]);

  const handleFileSelect = (fileId: string) => {
    setSelectedFileId(fileId);
  };

  const handleBack = () => {
    setSelectedFileId(null);
    setSelectedFile(null);
  };

  console.log('Files:', files);

  const renderContentList = () => {
    return (
      <div>
        {isLoading ? (
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
                key={file.id}
                file={file}
                onClick={() => handleFileSelect(file.id)}
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
    return <Article document={selectedFile} onBack={handleBack} />;
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
