import React, { useState, useEffect } from 'react';
import './BodyEditor.css';
import { BodyType } from '../types';
import KeyValueEditor from './KeyValueEditor';

export const BODY_TYPES = {
  NONE: 'none',
  JSON: 'json',
  TEXT: 'text',
  FORM_DATA: 'form-data',
  X_WWW_FORM_URLENCODED: 'x-www-form-urlencoded',
} as const;

interface BodyEditorProps {
  body: string | Record<string, unknown> | null;
  bodyType: BodyType;
  onChange: (body: string | Record<string, unknown> | null) => void;
  onBodyTypeChange: (bodyType: BodyType) => void;
}

const BodyEditor: React.FC<BodyEditorProps> = ({ body, bodyType, onChange, onBodyTypeChange }) => {
  const [jsonBody, setJsonBody] = useState(() => {
    if (bodyType === BODY_TYPES.JSON && typeof body === 'object' && body !== null) {
      return JSON.stringify(body, null, 2);
    }
    return bodyType === BODY_TYPES.JSON ? '' : (body as string) || '';
  });

  // Convert body to Record<string, string> for KeyValueEditor
  const getFormData = (): Record<string, string> => {
    if (bodyType === BODY_TYPES.FORM_DATA && typeof body === 'object' && body !== null) {
      const result: Record<string, string> = {};
      Object.entries(body).forEach(([key, value]) => {
        result[key] = String(value);
      });
      return result;
    }
    return {};
  };

  const getUrlEncodedData = (): Record<string, string> => {
    if (bodyType === BODY_TYPES.X_WWW_FORM_URLENCODED && typeof body === 'object' && body !== null) {
      const result: Record<string, string> = {};
      Object.entries(body).forEach(([key, value]) => {
        result[key] = String(value);
      });
      return result;
    }
    return {};
  };

  useEffect(() => {
    // Only update jsonBody when bodyType changes, not when body changes (to avoid reformatting while typing)
    if (bodyType === BODY_TYPES.JSON) {
      if (typeof body === 'object' && body !== null) {
        setJsonBody(JSON.stringify(body, null, 2));
      } else if (typeof body === 'string') {
        setJsonBody(body);
      } else {
        setJsonBody('');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bodyType]);

  const handleBodyTypeChange = (newType: BodyType): void => {
    onBodyTypeChange(newType);
    if (newType === BODY_TYPES.NONE) {
      onChange(null);
      setJsonBody('');
    } else if (newType === BODY_TYPES.JSON && bodyType !== BODY_TYPES.JSON) {
      // When switching TO JSON type, initialize jsonBody from body
      if (typeof body === 'object' && body !== null) {
        setJsonBody(JSON.stringify(body, null, 2));
      } else if (typeof body === 'string') {
        setJsonBody(body);
      } else {
        setJsonBody('');
      }
    }
  };

  const handleJsonChange = (value: string): void => {
    setJsonBody(value);
    // Only update parent if JSON is valid, otherwise keep as string for editing
    if (value.trim() === '') {
      onChange(null);
    } else {
      try {
        const parsed = JSON.parse(value);
        onChange(parsed);
      } catch (e) {
        // Invalid JSON - keep as string so user can continue editing
        onChange(value);
      }
    }
  };

  const handleTextChange = (value: string): void => {
    onChange(value);
  };

  const handleFormDataChange = (data: Record<string, string>): void => {
    onChange(Object.keys(data).length > 0 ? data : null);
  };

  const handleUrlEncodedChange = (data: Record<string, string>): void => {
    onChange(Object.keys(data).length > 0 ? data : null);
  };

  return (
    <section className="body-editor-container">
      <label className="body-label">Request Body</label>
      <select
        className="body-type-select"
        value={bodyType}
        onChange={(e) => handleBodyTypeChange(e.target.value as BodyType)}
      >
        <option value={BODY_TYPES.NONE}>None</option>
        <option value={BODY_TYPES.JSON}>JSON</option>
        <option value={BODY_TYPES.TEXT}>Text</option>
        <option value={BODY_TYPES.FORM_DATA}>Form Data</option>
        <option value={BODY_TYPES.X_WWW_FORM_URLENCODED}>x-www-form-urlencoded</option>
      </select>

      {bodyType === BODY_TYPES.JSON && (
        <textarea
          className="body-textarea"
          placeholder='{"key": "value"}'
          value={jsonBody}
          onChange={(e) => handleJsonChange(e.target.value)}
          rows={10}
        />
      )}

      {bodyType === BODY_TYPES.TEXT && (
        <textarea
          className="body-textarea"
          placeholder="Enter text content"
          value={(body as string) || ''}
          onChange={(e) => handleTextChange(e.target.value)}
          rows={10}
        />
      )}

      {bodyType === BODY_TYPES.FORM_DATA && (
        <KeyValueEditor
          title=""
          data={getFormData()}
          onChange={handleFormDataChange}
          keyPlaceholder="Key"
          valuePlaceholder="Value"
          addRowLabel="Field"
          addRowButtonPosition="footer"
        />
      )}

      {bodyType === BODY_TYPES.X_WWW_FORM_URLENCODED && (
        <KeyValueEditor
          title=""
          data={getUrlEncodedData()}
          onChange={handleUrlEncodedChange}
          keyPlaceholder="Key"
          valuePlaceholder="Value"
          addRowLabel="Field"
          addRowButtonPosition="footer"
        />
      )}
    </section>
  );
};

export default BodyEditor;
