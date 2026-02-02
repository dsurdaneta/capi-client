import React from 'react';
import './UrlInput.css';

interface UrlInputProps {
  url: string;
  onChange: (url: string) => void;
}

const UrlInput: React.FC<UrlInputProps> = ({ url, onChange }) => {
  return (
    <div className="url-input-container">
      <label htmlFor="url-input" className="url-label">
        Request URL
      </label>
      <div className="url-input-wrapper">
        <input
          id="url-input"
          type="text"
          className="url-input"
          placeholder="https://api.example.com/endpoint"
          value={url}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default UrlInput;
