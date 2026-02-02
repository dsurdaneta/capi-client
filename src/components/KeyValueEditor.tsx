import React, { useState, useEffect } from 'react';
import './KeyValueEditor.css';
import { KeyValuePair } from '../types';

interface KeyValueEditorProps {
  title: string;
  data: Record<string, string>;
  onChange: (data: Record<string, string>) => void;
  keyPlaceholder?: string;
  valuePlaceholder?: string;
  addRowLabel?: string;
}

const KeyValueEditor: React.FC<KeyValueEditorProps> = ({
  title,
  data,
  onChange,
  keyPlaceholder = 'Key',
  valuePlaceholder = 'Value',
  addRowLabel,
}) => {
  const [items, setItems] = useState<KeyValuePair[]>(() => {
    const entries = Object.entries(data || {});
    return entries.length > 0 ? entries.map(([key, value]) => ({ key, value })) : [{ key: '', value: '' }];
  });

  useEffect(() => {
    const entries = Object.entries(data || {});
    const newItems = entries.length > 0 ? entries.map(([key, value]) => ({ key, value })) : [{ key: '', value: '' }];
    setItems(newItems);
  }, [data]);

  const handleItemChange = (index: number, field: 'key' | 'value', value: string): void => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
    updateParent(newItems);
  };

  const handleAddRow = (): void => {
    const newItems = [...items, { key: '', value: '' }];
    setItems(newItems);
    updateParent(newItems);
  };

  const handleRemoveRow = (index: number): void => {
    if (items.length === 1) {
      const newItems: KeyValuePair[] = [{ key: '', value: '' }];
      setItems(newItems);
      updateParent(newItems);
    } else {
      const newItems = items.filter((_, i) => i !== index);
      setItems(newItems);
      updateParent(newItems);
    }
  };

  const updateParent = (newItems: KeyValuePair[]): void => {
    const obj: Record<string, string> = {};
    newItems.forEach((item) => {
      if (item.key.trim()) {
        obj[item.key] = item.value;
      }
    });
    onChange(obj);
  };

  return (
    <div className="key-value-editor-container">
      <div className="key-value-header">
        <label className="key-value-label">{title}</label>
        <button type="button" className="add-row-btn" onClick={handleAddRow}>
          {addRowLabel ? `+ Add ${addRowLabel} Row` : '+ Add Row'}
        </button>
      </div>
      <div className="key-value-table">
        <div className="key-value-header-row">
          <div className="key-value-cell-header">{keyPlaceholder}</div>
          <div className="key-value-cell-header">{valuePlaceholder}</div>
          <div className="key-value-cell-header-actions"></div>
        </div>
        {items.map((item, index) => (
          <div key={index} className="key-value-row">
            <input
              type="text"
              className="key-value-input"
              placeholder={keyPlaceholder}
              value={item.key}
              onChange={(e) => handleItemChange(index, 'key', e.target.value)}
            />
            <input
              type="text"
              className="key-value-input"
              placeholder={valuePlaceholder}
              value={item.value}
              onChange={(e) => handleItemChange(index, 'value', e.target.value)}
            />
            <button
              type="button"
              className="remove-row-btn"
              onClick={() => handleRemoveRow(index)}
              disabled={items.length === 1}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyValueEditor;
