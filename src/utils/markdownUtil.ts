// Simple Markdown parser
const codeBlockRegex = /```(.*?)\n([\s\S]*?)```/g;
const headingRegex = /^(#{1,6})\s+(.+)$/gm;
const boldRegex = /\*\*(.+?)\*\*/g;
const italicRegex = /\*(.+?)\*/g;
const linkRegex = /\[(.+?)\]\((.+?)\)/g;
const codeRegex = /`(.+?)`/g;
const bulletListRegex = /^\s*[-*+]\s+(.+)$/gm;
const orderedListRegex = /^\s*\d+\.\s+(.+)$/gm;
const blockquoteRegex = /^>\s+(.+)$/gm;
const horizontalRuleRegex = /^\s*(---|\*\*\*|___)\s*$/gm;

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

export function parseMarkdown(markdown: string): string {
  let html = escapeHtml(markdown);

  // Code blocks
  html = html.replace(codeBlockRegex, (match, lang, code) => {
    const language = lang.trim() || 'javascript';
    return `<pre><code class="language-${language}">${code}</code></pre>`;
  });

  // Headings
  html = html.replace(headingRegex, (match, hashes, content) => {
    const level = hashes.length;
    return `<h${level}>${content}</h${level}>`;
  });

  // Block quotes
  html = html.replace(blockquoteRegex, '<blockquote>$1</blockquote>');

  // Horizontal rules
  html = html.replace(horizontalRuleRegex, '<hr />');

  // Bold
  html = html.replace(boldRegex, '<strong>$1</strong>');

  // Italic (after bold to avoid conflicts)
  html = html.replace(italicRegex, '<em>$1</em>');

  // Links
  html = html.replace(linkRegex, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Inline code
  html = html.replace(codeRegex, '<code>$1</code>');

  // Bullet lists
  let inBulletList = false;
  html = html.split('\n').map((line) => {
    const bulletMatch = line.match(/^(  )*[-*+]\s+(.+)$/);
    if (bulletMatch) {
      const level = (bulletMatch[1] || '').length / 2;
      const content = bulletMatch[2];
      if (!inBulletList) {
        inBulletList = true;
        return `<ul><li>${content}</li>`;
      }
      return `<li>${content}</li>`;
    }
    if (inBulletList && line.trim() !== '') {
      inBulletList = false;
      return `</ul>${line}`;
    }
    if (inBulletList && line.trim() === '') {
      return '';
    }
    return line;
  }).join('\n');

  if (inBulletList) {
    html += '</ul>';
  }

  // Ordered lists
  let inOrderedList = false;
  html = html.split('\n').map((line) => {
    const orderedMatch = line.match(/^\s*(\d+)\.\s+(.+)$/);
    if (orderedMatch) {
      const content = orderedMatch[2];
      if (!inOrderedList) {
        inOrderedList = true;
        return `<ol><li>${content}</li>`;
      }
      return `<li>${content}</li>`;
    }
    if (inOrderedList && line.trim() !== '') {
      inOrderedList = false;
      return `</ol>${line}`;
    }
    if (inOrderedList && line.trim() === '') {
      return '';
    }
    return line;
  }).join('\n');

  if (inOrderedList) {
    html += '</ol>';
  }

  // Paragraphs
  html = html.split('\n\n').map((para) => {
    if (
      para.startsWith('<h') ||
      para.startsWith('<blockquote>') ||
      para.startsWith('<pre>') ||
      para.startsWith('<ul>') ||
      para.startsWith('<ol>') ||
      para.startsWith('<hr')
    ) {
      return para;
    }
    return `<p>${para}</p>`;
  }).join('\n');

  return html;
}

export { escapeHtml };
