import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { googleDriveRepository } from '../../services/googleDrive';
import { GoogleFileIndexEntry } from '../../services/googleDrive/domain/GoogleFileIndexEntry';
import { Container } from 'react-bootstrap';
import { Article } from './Article';
import { ArticlePreview } from './ArticlePreview';
import { render } from '@react-pdf/renderer';
import { useTranslation } from '../../hooks/useTranslation';
import ContentLoader from '../../components/ContentLoader';
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
  const { projectId } = useParams<{ projectId?: string }>();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = React.useState<selectedFile | null>(
    null,
  );

  // Fetch file index with automatic caching (automatically refetches when language changes)
  const { data: files = [], isLoading } = useGoogleDriveIndex(
    googleDriveRepository,
    language,
  );

  // Fetch document content with automatic caching (language is included in queryKey via projectId + language dependency)
  const { data: documentContent, isLoading: isLoadingContent } =
    useFetchGoogleDoc(
      googleDriveRepository,
      projectId || null,
      language,
      !!projectId,
    );

  // Update selectedFile when document content is loaded or language changes
  useEffect(() => {
    if (projectId && documentContent !== undefined) {
      const entry = files.find((f) => f.id === projectId);
      if (entry) {
        setSelectedFile({
          id: projectId,
          content: documentContent || '',
          entry,
        });
      }
    }
  }, [projectId, documentContent, files, language]);

  // Sync URL params with state
  useEffect(() => {
    if (!projectId && selectedFile) {
      setSelectedFile(null);
    }
  }, [projectId]);

  const handleFileSelect = (fileId: string) => {
    navigate(`/project/${fileId}`);
  };

  const handleBack = () => {
    navigate('/project');
  };

  console.log('Files:', files);

  const renderContentList = () => {
    return (
      <div>
        {isLoading ? (
          <ContentLoader isLoading={isLoading} />
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
  const isLoaderContentNeeded = projectId ? isLoadingContent : false;

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
        <div style={{ position: 'relative', minHeight: '300px' }}>
          {isLoaderContentNeeded ? (
            <ContentLoader isLoading={isLoaderContentNeeded} />
          ) : projectId && selectedFile ? (
            renderContentFile()
          ) : (
            renderContentList()
          )}
        </div>
      </Container>
    </section>
  );
}
