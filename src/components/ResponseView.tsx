import React from 'react';
import './ResponseView.css';
import { ApiResponse } from '../types';
import { highlightJson } from '../helpers/jsonHighlight';

interface ResponseViewProps {
  response: ApiResponse | null;
  loading: boolean;
  onClear: () => void;
}

const ResponseView: React.FC<ResponseViewProps> = ({ response, loading, onClear }) => {
  if (loading) {
    return (
      <article className="response-container">
        <header className="response-header">
          <h2 className="response-title">Response</h2>
          <button className="clear-button" onClick={onClear} disabled>
            🧹 Clear
          </button>
        </header>
        <p className="response-loading">Sending request...</p>
      </article>
    );
  }

  if (!response) {
    return (
      <article className="response-container">
        <header className="response-header">
          <h2 className="response-title">Response</h2>
          <button className="clear-button" onClick={onClear} disabled>
            🧹 Clear
          </button>
        </header>
        <p className="response-placeholder">Response will appear here</p>
      </article>
    );
  }

  const formatHeaders = (headers: Record<string, string>): string => {
    return Object.entries(headers || {})
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
  };

  const formatResponseData = (data: unknown): string => {
    if (typeof data === 'object' && data !== null) {
      return JSON.stringify(data, null, 2);
    }
    return String(data);
  };


  const getStatusClass = (status: number): string => {
    if (status >= 200 && status < 300) return 'status-success';
    if (status >= 300 && status < 400) return 'status-redirect';
    if (status >= 400 && status < 500) return 'status-client-error';
    if (status >= 500) return 'status-server-error';
    return 'status-error';
  };

  return (
    <article className="response-container">
      <header className="response-header">
        <div className="response-header-left">
          <h2 className="response-title">Response</h2>
          <div className="response-status">
            <span className={`status-badge ${getStatusClass(response.status)}`}>
              {response.status} {response.statusText || ''}
            </span>
            {response.duration && (
              <span className="response-duration">{response.duration}ms</span>
            )}
          </div>
        </div>
        <button className="clear-button" onClick={onClear}>
          🧹 Clear
        </button>
      </header>

      {response.error ? (
        <section className="response-error">
          <h3 className="response-error-title">Error</h3>
          <p className="response-error-message">{response.message}</p>
        </section>
      ) : (
        <>
          <section className="response-section">
            <h3 className="response-section-title">Headers</h3>
            <pre className="response-content">{formatHeaders(response.headers)}</pre>
          </section>

          <section className="response-section">
            <h3 className="response-section-title">Body</h3>
            {(() => {
              const formatted = formatResponseData(response.data);
              // Check if it looks like JSON
              if (typeof response.data === 'object' && response.data !== null) {
                return highlightJson(formatted);
              }
              return <pre className="response-content">{formatted}</pre>;
            })()}
          </section>
        </>
      )}
    </article>
  );
};

export default ResponseView;
