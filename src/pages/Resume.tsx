import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

import TypewriterStack from '../components/TypewriterStack';
import { googleDriveRepository } from '../services/googleDrive';

const RESUME_FILE_ID = '1rXumkS0dPuFwjaR7FmiEHL085_LGnGCe';

export default function Resume() {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const blob = await googleDriveRepository.getFileBlob(RESUME_FILE_ID);
        if (!blob) {
          throw new Error('No file returned from Google Drive');
        }
        const url = URL.createObjectURL(blob);
        if (mounted) {
          setPdfUrl(url);
          setLoading(false);
        }
      } catch (e) {
        console.error(e);
        if (mounted) {
          setError('Failed to load resume PDF');
          setLoading(false);
        }
      }
    })();

    return () => {
      mounted = false;
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, []);

  return (
    <section>
      <Container
        fluid
        style={{
          marginTop: '130px',
          position: 'relative',
          paddingBottom: '30px',
          paddingTop: '30px',
        }}
        id="home"
      >
        <Container
          style={{
            padding: ' 9rem 0 2rem !important',
            color: 'whitesmoke',
            textAlign: 'left',
          }}
        >
          <div style={{ padding: 20, textAlign: 'center' }}>
            {loading && (
              <TypewriterStack
                lines={['Loading resume...', 'This may take a moment']}
                loop={true}
              />
            )}

            {error && <div style={{ color: 'salmon' }}>{error}</div>}

            {!loading && pdfUrl && (
              <div>
                <div style={{ marginBottom: 12 }}>
                  <a
                    href={pdfUrl}
                    download="Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#fff' }}
                  >
                    Download Resume
                  </a>
                </div>
                <iframe
                  title="Resume PDF"
                  src={pdfUrl}
                  style={{ width: '100%', height: '800px', border: 'none' }}
                />
              </div>
            )}
          </div>
        </Container>
      </Container>
    </section>
  );
}
