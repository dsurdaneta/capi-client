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
  addRowButtonPosition?: 'header' | 'footer';
}

const KeyValueEditor: React.FC<KeyValueEditorProps> = ({
  title,
  data,
  onChange,
  keyPlaceholder = 'Key',
  valuePlaceholder = 'Value',
  addRowLabel,
  addRowButtonPosition = 'header',
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

  const addRowButton = (
    <button type="button" className="add-row-btn" onClick={handleAddRow}>
      {addRowLabel ? `+ Add ${addRowLabel} Row` : '+ Add Row'}
    </button>
  );

  return (
    <section className="key-value-editor-container">
      <header className="key-value-header">
        <label className="key-value-label">{title}</label>
        {addRowButtonPosition === 'header' && addRowButton}
      </header>
      <table className="key-value-table">
        <thead>
          <tr className="key-value-header-row">
            <th className="key-value-cell-header">{keyPlaceholder}</th>
            <th className="key-value-cell-header">{valuePlaceholder}</th>
            <th className="key-value-cell-header-actions"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="key-value-row">
              <td>
                <input
                  type="text"
                  className="key-value-input"
                  placeholder={keyPlaceholder}
                  value={item.key}
                  onChange={(e) => handleItemChange(index, 'key', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="key-value-input"
                  placeholder={valuePlaceholder}
                  value={item.value}
                  onChange={(e) => handleItemChange(index, 'value', e.target.value)}
                />
              </td>
              <td>
                <button
                  type="button"
                  className="remove-row-btn"
                  onClick={() => handleRemoveRow(index)}
                  disabled={items.length === 1}
                >
                  ×
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        {addRowButtonPosition === 'footer' && (
          <tfoot>
            <tr>
              <td colSpan={3} className="key-value-footer">
                {addRowButton}
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </section>
  );
};

export default KeyValueEditor;
