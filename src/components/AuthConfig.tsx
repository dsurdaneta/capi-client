import React, { useState, useEffect } from 'react';
import './AuthConfig.css';
import { AuthConfig as AuthConfigType } from '../types';

const AUTH_TYPES = {
  NONE: 'none',
  BEARER: 'bearer',
  BASIC: 'basic',
  API_KEY: 'api_key',
  CUSTOM: 'custom',
} as const;

type AuthType = typeof AUTH_TYPES[keyof typeof AUTH_TYPES];

interface AuthConfigProps {
  auth: AuthConfigType | null;
  onChange: (auth: AuthConfigType | null) => void;
}

const AuthConfig: React.FC<AuthConfigProps> = ({ auth, onChange }) => {
  const [authType, setAuthType] = useState<AuthType>(auth?.type || AUTH_TYPES.NONE);
  const [token, setToken] = useState(auth?.token || '');
  const [username, setUsername] = useState(auth?.username || '');
  const [password, setPassword] = useState(auth?.password || '');
  const [apiKey, setApiKey] = useState(auth?.apiKey || '');
  const [apiKeyValue, setApiKeyValue] = useState(auth?.apiKeyValue || '');
  const [customHeader, setCustomHeader] = useState(auth?.customHeader || '');
  const [customValue, setCustomValue] = useState(auth?.customValue || '');
  
  // Visibility toggles for password fields
  const [showToken, setShowToken] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showApiKeyValue, setShowApiKeyValue] = useState(false);
  const [showCustomValue, setShowCustomValue] = useState(false);

  useEffect(() => {
    if (auth) {
      setAuthType(auth.type);
      setToken(auth.token || '');
      setUsername(auth.username || '');
      setPassword(auth.password || '');
      setApiKey(auth.apiKey || '');
      setApiKeyValue(auth.apiKeyValue || '');
      setCustomHeader(auth.customHeader || '');
      setCustomValue(auth.customValue || '');
    }
  }, [auth]);

  const handleAuthTypeChange = (newType: AuthType): void => {
    setAuthType(newType);
    updateAuth(newType, { token, username, password, apiKey, apiKeyValue, customHeader, customValue });
  };

  const updateAuth = (
    type: AuthType,
    values: {
      token: string;
      username: string;
      password: string;
      apiKey: string;
      apiKeyValue: string;
      customHeader: string;
      customValue: string;
    }
  ): void => {
    let authConfig: AuthConfigType = { type };

    switch (type) {
      case AUTH_TYPES.BEARER:
        authConfig.token = values.token;
        onChange(authConfig);
        break;
      case AUTH_TYPES.BASIC:
        authConfig.username = values.username;
        authConfig.password = values.password;
        onChange(authConfig);
        break;
      case AUTH_TYPES.API_KEY:
        authConfig.apiKey = values.apiKey;
        authConfig.apiKeyValue = values.apiKeyValue;
        onChange(authConfig);
        break;
      case AUTH_TYPES.CUSTOM:
        authConfig.customHeader = values.customHeader;
        authConfig.customValue = values.customValue;
        onChange(authConfig);
        break;
      default:
        onChange(null);
        break;
    }
  };

  const handleTokenChange = (value: string): void => {
    setToken(value);
    updateAuth(authType, { token: value, username, password, apiKey, apiKeyValue, customHeader, customValue });
  };

  const handleUsernameChange = (value: string): void => {
    setUsername(value);
    updateAuth(authType, { token, username: value, password, apiKey, apiKeyValue, customHeader, customValue });
  };

  const handlePasswordChange = (value: string): void => {
    setPassword(value);
    updateAuth(authType, { token, username, password: value, apiKey, apiKeyValue, customHeader, customValue });
  };

  const handleApiKeyChange = (value: string): void => {
    setApiKey(value);
    updateAuth(authType, { token, username, password, apiKey: value, apiKeyValue, customHeader, customValue });
  };

  const handleApiKeyValueChange = (value: string): void => {
    setApiKeyValue(value);
    updateAuth(authType, { token, username, password, apiKey, apiKeyValue: value, customHeader, customValue });
  };

  const handleCustomHeaderChange = (value: string): void => {
    setCustomHeader(value);
    updateAuth(authType, { token, username, password, apiKey, apiKeyValue, customHeader: value, customValue });
  };

  const handleCustomValueChange = (value: string): void => {
    setCustomValue(value);
    updateAuth(authType, { token, username, password, apiKey, apiKeyValue, customHeader, customValue: value });
  };

  return (
    <section className="auth-config-container">
      <label className="auth-label">Authentication</label>
      <select
        className="auth-type-select"
        value={authType}
        onChange={(e) => handleAuthTypeChange(e.target.value as AuthType)}
      >
        <option value={AUTH_TYPES.NONE}>None</option>
        <option value={AUTH_TYPES.BEARER}>Bearer Token</option>
        <option value={AUTH_TYPES.BASIC}>Basic Auth</option>
        <option value={AUTH_TYPES.API_KEY}>API Key</option>
        <option value={AUTH_TYPES.CUSTOM}>Custom Header</option>
      </select>

      {authType === AUTH_TYPES.BEARER && (
        <fieldset className="auth-input-group">
          <label className="auth-input-label">Token</label>
          <div className="auth-input-wrapper">
            <input
              type={showToken ? 'text' : 'password'}
              className="auth-input"
              placeholder="Enter bearer token"
              value={token}
              onChange={(e) => handleTokenChange(e.target.value)}
            />
            <button
              type="button"
              className="auth-toggle-btn"
              onClick={() => setShowToken(!showToken)}
              aria-label={showToken ? 'Hide token' : 'Show token'}
            >
              {showToken ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
        </div>
      )}

      {authType === AUTH_TYPES.BASIC && (
        <>
          <div className="auth-input-group">
            <label className="auth-input-label">Username</label>
            <input
              type="text"
              className="auth-input"
              placeholder="Enter username"
              value={username}
              onChange={(e) => handleUsernameChange(e.target.value)}
            />
          </div>
          <div className="auth-input-group">
            <label className="auth-input-label">Password</label>
            <div className="auth-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                className="auth-input"
                placeholder="Enter password"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
              />
              <button
                type="button"
                className="auth-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>
        </fieldset>
      )}

      {authType === AUTH_TYPES.API_KEY && (
        <fieldset>
          <div className="auth-input-group">
            <label className="auth-input-label">Key Name</label>
            <input
              type="text"
              className="auth-input"
              placeholder="e.g., X-API-Key"
              value={apiKey}
              onChange={(e) => handleApiKeyChange(e.target.value)}
            />
          </div>
          <div className="auth-input-group">
            <label className="auth-input-label">Key Value</label>
            <div className="auth-input-wrapper">
              <input
                type={showApiKeyValue ? 'text' : 'password'}
                className="auth-input"
                placeholder="Enter API key value"
                value={apiKeyValue}
                onChange={(e) => handleApiKeyValueChange(e.target.value)}
              />
              <button
                type="button"
                className="auth-toggle-btn"
                onClick={() => setShowApiKeyValue(!showApiKeyValue)}
                aria-label={showApiKeyValue ? 'Hide API key value' : 'Show API key value'}
              >
                {showApiKeyValue ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>
        </>
      )}

      {authType === AUTH_TYPES.CUSTOM && (
        <>
          <div className="auth-input-group">
            <label className="auth-input-label">Header Name</label>
            <input
              type="text"
              className="auth-input"
              placeholder="e.g., Authorization"
              value={customHeader}
              onChange={(e) => handleCustomHeaderChange(e.target.value)}
            />
          </div>
          <div className="auth-input-group">
            <label className="auth-input-label">Header Value</label>
            <div className="auth-input-wrapper">
              <input
                type={showCustomValue ? 'text' : 'password'}
                className="auth-input"
                placeholder="Enter header value"
                value={customValue}
                onChange={(e) => handleCustomValueChange(e.target.value)}
              />
              <button
                type="button"
                className="auth-toggle-btn"
                onClick={() => setShowCustomValue(!showCustomValue)}
                aria-label={showCustomValue ? 'Hide header value' : 'Show header value'}
              >
                {showCustomValue ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>
        </fieldset>
      )}
    </section>
  );
};

export default AuthConfig;
