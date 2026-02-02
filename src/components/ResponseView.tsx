import React from 'react';
import './ResponseView.css';
import { ApiResponse } from '../types';

interface ResponseViewProps {
  response: ApiResponse | null;
  loading: boolean;
}

const ResponseView: React.FC<ResponseViewProps> = ({ response, loading }) => {
  if (loading) {
    return (
      <div className="response-container">
        <div className="response-loading">Sending request...</div>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="response-container">
        <div className="response-placeholder">Response will appear here</div>
      </div>
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
    <div className="response-container">
      <div className="response-header">
        <div className="response-status">
          <span className={`status-badge ${getStatusClass(response.status)}`}>
            {response.status} {response.statusText || ''}
          </span>
          {response.duration && (
            <span className="response-duration">{response.duration}ms</span>
          )}
        </div>
      </div>

      {response.error ? (
        <div className="response-error">
          <div className="response-error-title">Error</div>
          <div className="response-error-message">{response.message}</div>
        </div>
      ) : (
        <>
          <div className="response-section">
            <div className="response-section-title">Headers</div>
            <pre className="response-content">{formatHeaders(response.headers)}</pre>
          </div>

          <div className="response-section">
            <div className="response-section-title">Body</div>
            <pre className="response-content">{formatResponseData(response.data)}</pre>
          </div>
        </>
      )}
    </div>
  );
};

export default ResponseView;
