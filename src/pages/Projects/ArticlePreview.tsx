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
        />
      </div>
      <div className="sticky-note-body">
        <h4 className="sticky-note-title">{file.title}</h4>
        <p className="sticky-note-desc">{file.description}</p>
      </div>
    </div>
  );
}
