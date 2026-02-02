import React from 'react';
import './MethodSelector.css';
import { HttpMethod } from '../types';

const HTTP_METHODS: HttpMethod[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'];

interface MethodSelectorProps {
  method: HttpMethod;
  onChange: (method: HttpMethod) => void;
}

const MethodSelector: React.FC<MethodSelectorProps> = ({ method, onChange }) => {
  return (
    <div className="method-selector-container">
      <label htmlFor="method-select" className="method-label">
        HTTP Method
      </label>
      <select
        id="method-select"
        className="method-select"
        value={method}
        onChange={(e) => onChange(e.target.value as HttpMethod)}
      >
        {HTTP_METHODS.map((httpMethod) => (
          <option key={httpMethod} value={httpMethod}>
            {httpMethod}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MethodSelector;
