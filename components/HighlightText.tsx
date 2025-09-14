import React from 'react';

interface HighlightTextProps {
  text: string;
  highlight: string;
  as?: 'p' | 'span';
}

/**
 * A component that highlights occurrences of a substring within a text.
 * It's case-insensitive and wraps matches in a styled element.
 * It can render the output as block-level paragraphs or inline spans.
 * @param {HighlightTextProps} props - The component props.
 * @param {string} props.text - The text to display.
 * @param {string} props.highlight - The substring to highlight within the text.
 * @param {'p' | 'span'} [props.as='p'] - The element to use for wrapping. 'p' for paragraphs (handles newlines), 'span' for inline text.
 * @returns {React.ReactElement} The text with highlighted parts.
 */
const HighlightText: React.FC<HighlightTextProps> = ({ text, highlight, as = 'p' }) => {
  if (!highlight.trim()) {
    if (as === 'p') {
      return <>{text.split('\n').map((line, i) => <p key={i}>{line}</p>)}</>;
    }
    return <>{text}</>;
  }

  const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  
  const highlightPart = (part: string, index: number) => 
    regex.test(part) ? (
      <strong key={index} className="bg-yellow-200 font-bold">
        {part}
      </strong>
    ) : (
      <React.Fragment key={index}>{part}</React.Fragment>
    );

  if (as === 'p') {
    return (
      <>
        {text.split('\n').map((line, i) => (
          <p key={i}>
            {line.split(regex).map(highlightPart)}
          </p>
        ))}
      </>
    );
  }

  // as 'span'
  return (
    <>
      {text.split(regex).map(highlightPart)}
    </>
  );
};

export default HighlightText;
