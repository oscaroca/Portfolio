import { googleDriveService } from '../../services/googleDrive';
import { GoogleFileIndexEntry } from '../../services/googleDrive/domain/GoogleFileIndexEntry';
import { colors } from '../../utils/colors';
import './ArticlePreviewCSS.css';

export function ArticlePreview({
  file,
  onClick,
}: {
  file: GoogleFileIndexEntry;
  onClick: () => void;
}) {
  return (
    <div
      key={file.id}
      onClick={() => {
        onClick();
      }}
      style={{ borderRadius: '10px', backgroundColor: 'white' }}
    >
      <div
        style={{
          overflow: 'hidden',
          borderRadius: '10px',
          height: '150px',
        }}
      >
        <img
          src={googleDriveService.getPreviewUrl(file.previewImage)}
          alt={file.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      <div
        style={{
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <h4 className="line-clamp-2" style={{ fontSize: '18px' }}>
          {file.title}
        </h4>

        <p
          className="line-clamp-3"
          style={{ color: colors.gray, fontSize: '12px', alignSelf: 'stretch' }}
        >
          {file.description}
        </p>
      </div>
    </div>
  );
}
