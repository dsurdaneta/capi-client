import React from 'react';

export const highlightJson = (jsonString: string): JSX.Element => {
  // Check if it's valid JSON
  try {
    JSON.parse(jsonString);
  } catch {
    // If not valid JSON, return as plain text
    return <pre className="response-content">{jsonString}</pre>;
  }

  // Tokenize and highlight JSON
  const parts: JSX.Element[] = [];
  let i = 0;
  let key = 0;

  while (i < jsonString.length) {
    const char = jsonString[i];

    // String (keys or values)
    if (char === '"') {
      const start = i;
      i++;
      while (i < jsonString.length && (jsonString[i] !== '"' || jsonString[i - 1] === '\\')) {
        i++;
      }
      i++;
      const str = jsonString.substring(start, i);
      // Check if it's a key (followed by whitespace and colon)
      const nextNonWhitespace = jsonString.substring(i).match(/^\s*:/);
      if (nextNonWhitespace) {
        parts.push(<span key={`key-${key++}`} className="json-key">{str}</span>);
      } else {
        parts.push(<span key={`str-${key++}`} className="json-string">{str}</span>);
      }
      continue;
    }

    // Numbers
    if (/[\d-]/.test(char)) {
      const start = i;
      while (i < jsonString.length && /[\d.eE+-]/.test(jsonString[i])) {
        i++;
      }
      const num = jsonString.substring(start, i);
      parts.push(<span key={`num-${key++}`} className="json-number">{num}</span>);
      continue;
    }

    // Booleans and null
    if (jsonString.substring(i).startsWith('true')) {
      parts.push(<span key={`bool-${key++}`} className="json-boolean">true</span>);
      i += 4;
      continue;
    }
    if (jsonString.substring(i).startsWith('false')) {
      parts.push(<span key={`bool-${key++}`} className="json-boolean">false</span>);
      i += 5;
      continue;
    }
    if (jsonString.substring(i).startsWith('null')) {
      parts.push(<span key={`bool-${key++}`} className="json-boolean">null</span>);
      i += 4;
      continue;
    }

    // Brackets and braces
    if (/[{}[\]]/.test(char)) {
      parts.push(<span key={`bracket-${key++}`} className="json-bracket">{char}</span>);
      i++;
      continue;
    }

    // Punctuation
    if (/[,:]/.test(char)) {
      parts.push(<span key={`punct-${key++}`} className="json-punctuation">{char}</span>);
      i++;
      continue;
    }

    // Whitespace and other characters
    parts.push(<span key={`text-${key++}`}>{char}</span>);
    i++;
  }

  return <pre className="response-content json-highlighted">{parts}</pre>;
};
