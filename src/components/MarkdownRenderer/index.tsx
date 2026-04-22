import React from 'react';
import { escapeHtml, parseMarkdown } from '@/utils/markdownUtil';
import styles from './markdown.less';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const html = parseMarkdown(content);

  return (
    <div
      className={styles.markdownContent}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default MarkdownRenderer;
