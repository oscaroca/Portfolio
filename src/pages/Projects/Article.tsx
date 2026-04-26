import { selectedFile } from './Projects';
import articleBg from '../../Assets/article-bg.png';
import './Article.css';

/** Split raw HTML into pages by grouping block-level elements up to ~charsPerPage plain-text chars */
function paginateHTML(html: string, charsPerPage = 1800): string[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const blocks = Array.from(doc.body.children);

  if (blocks.length === 0) return [html];

  const pages: string[] = [];
  let currentHtml = '';
  let currentChars = 0;

  for (const block of blocks) {
    const blockText = block.textContent?.length ?? 0;
    const blockHtml = block.outerHTML;

    if (currentChars + blockText > charsPerPage && currentHtml) {
      pages.push(currentHtml);
      currentHtml = blockHtml;
      currentChars = blockText;
    } else {
      currentHtml += blockHtml;
      currentChars += blockText;
    }
  }

  if (currentHtml) pages.push(currentHtml);
  return pages;
}

export function Article({
  document,
  onBack,
}: {
  document: selectedFile;
  onBack: () => void;
}) {
  const pages = paginateHTML(document.content);

  return (
    <div className="article-wrapper">
      <div className="article-header">
        <h3 className="article-heading">{document.entry.title}</h3>
        <button className="article-back-btn" onClick={onBack}>◄ Go Back</button>
      </div>

      <div className="article-pages">
        {pages.map((pageHtml, i) => (
          <div className="article-page" key={i}>
            <img src={articleBg} className="article-page-bg" alt="" aria-hidden="true" />
            <div
              className="article-page-content"
              dangerouslySetInnerHTML={{ __html: pageHtml }}
            />
            {pages.length > 1 && (
              <span className="article-page-number">{i + 1} / {pages.length}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
