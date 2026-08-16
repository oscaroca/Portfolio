import { AiFillGithub } from 'react-icons/ai';
import { FiExternalLink } from 'react-icons/fi';
import { googleDriveService } from '../../services/googleDrive';
import { GoogleFileIndexEntry } from '../../services/googleDrive/domain/GoogleFileIndexEntry';
import './ArticlePreviewCSS.css';

export function ArticlePreview({
  file,
  onClick,
}: {
  file: GoogleFileIndexEntry;
  onClick: () => void;
}) {
  return (
    <div className="sticky-note-card" onClick={onClick}>
      <div className="sticky-note-img">
        <img
          src={googleDriveService.getPreviewUrl(file.previewImage)}
          alt={file.title}
          draggable={false}
        />
      </div>
      <div className="sticky-note-body">
        <h4 className="sticky-note-title">{file.title}</h4>
        <p className="sticky-note-desc">{file.description}</p>
        {file.tags && file.tags.length > 0 && (
          <div className="sticky-note-tags">
            {file.tags.map((tag) => (
              <span key={tag} className="sticky-note-tag">{tag}</span>
            ))}
          </div>
        )}
        {(file.githubUrl || file.demoUrl) && (
          <div className="sticky-note-links">
            {file.githubUrl && (
              <a
                href={file.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="sticky-note-link-btn"
                aria-label="View on GitHub"
                onClick={(e) => e.stopPropagation()}
              >
                <AiFillGithub />
              </a>
            )}
            {file.demoUrl && (
              <a
                href={file.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="sticky-note-link-btn"
                aria-label="Live demo"
                onClick={(e) => e.stopPropagation()}
              >
                <FiExternalLink />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
