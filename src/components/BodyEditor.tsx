import React, { useState, useEffect } from 'react';
import './BodyEditor.css';
import { BodyType, KeyValuePair } from '../types';

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
  const [formData, setFormData] = useState<KeyValuePair[]>(() => {
    if (bodyType === BODY_TYPES.FORM_DATA && typeof body === 'object' && body !== null) {
      return Object.entries(body).map(([key, value]) => ({ key, value: String(value) }));
    }
    return [{ key: '', value: '' }];
  });
  const [urlEncodedData, setUrlEncodedData] = useState<KeyValuePair[]>(() => {
    if (bodyType === BODY_TYPES.X_WWW_FORM_URLENCODED && typeof body === 'object' && body !== null) {
      return Object.entries(body).map(([key, value]) => ({ key, value: String(value) }));
    }
    return [{ key: '', value: '' }];
  });

  useEffect(() => {
    if (bodyType === BODY_TYPES.JSON && typeof body === 'object' && body !== null) {
      setJsonBody(JSON.stringify(body, null, 2));
    } else if (bodyType === BODY_TYPES.JSON) {
      setJsonBody('');
    }
  }, [body, bodyType]);

  const handleBodyTypeChange = (newType: BodyType): void => {
    onBodyTypeChange(newType);
    if (newType === BODY_TYPES.NONE) {
      onChange(null);
    }
  };

  const handleJsonChange = (value: string): void => {
    setJsonBody(value);
    try {
      const parsed = JSON.parse(value);
      onChange(parsed);
    } catch (e) {
      // Invalid JSON, but keep the text for editing
      onChange(value);
    }
  };

  const handleTextChange = (value: string): void => {
    onChange(value);
  };

  const handleFormDataChange = (index: number, field: 'key' | 'value', value: string): void => {
    const newData = [...formData];
    newData[index][field] = value;
    setFormData(newData);
    updateFormDataParent(newData);
  };

  const handleUrlEncodedChange = (index: number, field: 'key' | 'value', value: string): void => {
    const newData = [...urlEncodedData];
    newData[index][field] = value;
    setUrlEncodedData(newData);
    updateUrlEncodedParent(newData);
  };

  const handleAddFormRow = (): void => {
    const newData = [...formData, { key: '', value: '' }];
    setFormData(newData);
    updateFormDataParent(newData);
  };

  const handleAddUrlEncodedRow = (): void => {
    const newData = [...urlEncodedData, { key: '', value: '' }];
    setUrlEncodedData(newData);
    updateUrlEncodedParent(newData);
  };

  const handleRemoveFormRow = (index: number): void => {
    if (formData.length === 1) {
      const newData: KeyValuePair[] = [{ key: '', value: '' }];
      setFormData(newData);
      updateFormDataParent(newData);
    } else {
      const newData = formData.filter((_, i) => i !== index);
      setFormData(newData);
      updateFormDataParent(newData);
    }
  };

  const handleRemoveUrlEncodedRow = (index: number): void => {
    if (urlEncodedData.length === 1) {
      const newData: KeyValuePair[] = [{ key: '', value: '' }];
      setUrlEncodedData(newData);
      updateUrlEncodedParent(newData);
    } else {
      const newData = urlEncodedData.filter((_, i) => i !== index);
      setUrlEncodedData(newData);
      updateUrlEncodedParent(newData);
    }
  };

  const updateFormDataParent = (data: KeyValuePair[]): void => {
    const obj: Record<string, string> = {};
    data.forEach((item) => {
      if (item.key.trim()) {
        obj[item.key] = item.value;
      }
    });
    onChange(Object.keys(obj).length > 0 ? obj : null);
  };

  const updateUrlEncodedParent = (data: KeyValuePair[]): void => {
    const obj: Record<string, string> = {};
    data.forEach((item) => {
      if (item.key.trim()) {
        obj[item.key] = item.value;
      }
    });
    onChange(Object.keys(obj).length > 0 ? obj : null);
  };

  return (
    <div className="body-editor-container">
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
        <div className="body-form-data">
          <div className="body-form-header">
            <div className="body-form-cell-header">Key</div>
            <div className="body-form-cell-header">Value</div>
            <div className="body-form-cell-header-actions"></div>
          </div>
          {formData.map((item, index) => (
            <div key={index} className="body-form-row">
              <input
                type="text"
                className="body-form-input"
                placeholder="Key"
                value={item.key}
                onChange={(e) => handleFormDataChange(index, 'key', e.target.value)}
              />
              <input
                type="text"
                className="body-form-input"
                placeholder="Value"
                value={item.value}
                onChange={(e) => handleFormDataChange(index, 'value', e.target.value)}
              />
              <button
                type="button"
                className="body-form-remove-btn"
                onClick={() => handleRemoveFormRow(index)}
                disabled={formData.length === 1}
              >
                ×
              </button>
            </div>
          ))}
          <button type="button" className="body-form-add-btn" onClick={handleAddFormRow}>
            + Add Field
          </button>
        </div>
      )}

      {bodyType === BODY_TYPES.X_WWW_FORM_URLENCODED && (
        <div className="body-form-data">
          <div className="body-form-header">
            <div className="body-form-cell-header">Key</div>
            <div className="body-form-cell-header">Value</div>
            <div className="body-form-cell-header-actions"></div>
          </div>
          {urlEncodedData.map((item, index) => (
            <div key={index} className="body-form-row">
              <input
                type="text"
                className="body-form-input"
                placeholder="Key"
                value={item.key}
                onChange={(e) => handleUrlEncodedChange(index, 'key', e.target.value)}
              />
              <input
                type="text"
                className="body-form-input"
                placeholder="Value"
                value={item.value}
                onChange={(e) => handleUrlEncodedChange(index, 'value', e.target.value)}
              />
              <button
                type="button"
                className="body-form-remove-btn"
                onClick={() => handleRemoveUrlEncodedRow(index)}
                disabled={urlEncodedData.length === 1}
              >
                ×
              </button>
            </div>
          ))}
          <button type="button" className="body-form-add-btn" onClick={handleAddUrlEncodedRow}>
            + Add Field
          </button>
        </div>
      )}
    </div>
  );
};

export default BodyEditor;
