import { selectedFile } from './Projects';

export function Article({
  document,
  onBack,
}: {
  document: selectedFile;
  onBack: () => void;
}) {
  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: 'white',
        padding: '40px 20px',
        borderRadius: '10px',
      }}
    >
      <div
        style={{
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <h3>{document.entry.title}</h3>
        <button onClick={onBack}> Go Back</button>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: document.content }}
        style={{ color: 'inherit', backgroundColor: 'transparent' }}
      />
    </div>
  );
}
