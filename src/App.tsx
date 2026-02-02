import React, { useState } from 'react';
import './App.css';
import UrlInput from './components/UrlInput';
import MethodSelector from './components/MethodSelector';
import KeyValueEditor from './components/KeyValueEditor';
import AuthConfig from './components/AuthConfig';
import BodyEditor, { BODY_TYPES } from './components/BodyEditor';
import ResponseView from './components/ResponseView';
import ExampleRequests, { ExampleRequest } from './components/ExampleRequests';
import apiService from './services/apiService';
import { HttpMethod, AuthConfig as AuthConfigType, BodyType, ApiResponse } from './types';

const App: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [method, setMethod] = useState<HttpMethod>('GET');
  const [params, setParams] = useState<Record<string, string>>({});
  const [headers, setHeaders] = useState<Record<string, string>>({});
  const [auth, setAuth] = useState<AuthConfigType | null>(null);
  const [body, setBody] = useState<string | Record<string, unknown> | null>(null);
  const [bodyType, setBodyType] = useState<BodyType>(BODY_TYPES.NONE);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const buildHeaders = (): Record<string, string> => {
    const requestHeaders = { ...headers };

    // Add authentication headers
    if (auth) {
      switch (auth.type) {
        case 'bearer':
          if (auth.token) {
            requestHeaders['Authorization'] = `Bearer ${auth.token}`;
          }
          break;
        case 'basic':
          if (auth.username && auth.password) {
            const credentials = btoa(`${auth.username}:${auth.password}`);
            requestHeaders['Authorization'] = `Basic ${credentials}`;
          }
          break;
        case 'api_key':
          if (auth.apiKey && auth.apiKeyValue) {
            requestHeaders[auth.apiKey] = auth.apiKeyValue;
          }
          break;
        case 'custom':
          if (auth.customHeader && auth.customValue) {
            requestHeaders[auth.customHeader] = auth.customValue;
          }
          break;
        default:
          break;
      }
    }

    // Handle body content type
    if (body && bodyType !== BODY_TYPES.NONE) {
      if (bodyType === BODY_TYPES.JSON) {
        requestHeaders['Content-Type'] = 'application/json';
      } else if (bodyType === BODY_TYPES.TEXT) {
        requestHeaders['Content-Type'] = 'text/plain';
      } else if (bodyType === BODY_TYPES.X_WWW_FORM_URLENCODED) {
        requestHeaders['Content-Type'] = 'application/x-www-form-urlencoded';
      }
    }

    return requestHeaders;
  };

  const handleExampleSelect = (example: ExampleRequest): void => {
    try {
      const urlObj = new URL(example.url);
      // Extract base URL without query parameters
      const baseUrl = `${urlObj.protocol}//${urlObj.host}${urlObj.pathname}`;
      setUrl(baseUrl);

      // Extract query parameters
      const extractedParams: Record<string, string> = {};
      urlObj.searchParams.forEach((value, key) => {
        extractedParams[key] = value;
      });
      setParams(extractedParams);

      // Set method if provided
      if (example.method) {
        setMethod(example.method);
      }

      // Clear other fields for a fresh start
      setHeaders({});
      setAuth(null);
      setBody(null);
      setBodyType(BODY_TYPES.NONE);
      setResponse(null);
    } catch (error) {
      // If URL parsing fails, just set the URL as-is
      setUrl(example.url);
      if (example.method) {
        setMethod(example.method);
      }
      setParams({});
      setHeaders({});
      setAuth(null);
      setBody(null);
      setBodyType(BODY_TYPES.NONE);
      setResponse(null);
    }
  };

  const handleClearRequest = (): void => {
    setUrl('');
    setMethod('GET');
    setParams({});
    setHeaders({});
    setAuth(null);
    setBody(null);
    setBodyType(BODY_TYPES.NONE);
  };

  const handleClearResponse = (): void => {
    setResponse(null);
  };

  const handleSendRequest = async (): Promise<void> => {
    if (!url.trim()) {
      alert('Please enter a URL');
      return;
    }

    setLoading(true);
    setResponse(null);

    try {
      const requestHeaders = buildHeaders();
      let requestBody: string | Record<string, unknown> | null = body;

      // Handle form-urlencoded body
      if (bodyType === BODY_TYPES.X_WWW_FORM_URLENCODED && typeof body === 'object' && body !== null) {
        requestBody = new URLSearchParams(body as Record<string, string>).toString();
      }

      const result = await apiService.makeRequest({
        url,
        method,
        headers: requestHeaders,
        params,
        body: requestBody,
      });

      setResponse(result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setResponse({
        status: 0,
        statusText: '',
        headers: {},
        data: null,
        duration: 0,
        ok: false,
        error: true,
        message: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-content">
          <img 
            src="/capi-header-logo.png" 
            alt="cAPI Logo" 
            className="app-header-logo"
          />
          <div className="app-header-text">
            <h1>cAPI Client</h1>
            <p>Test and interact with REST APIs</p>
          </div>
        </div>
      </header>

      <div className="app-examples-container">
        <ExampleRequests onSelect={handleExampleSelect} />
      </div>

      <div className="app-container">
        <div className="app-left-panel">
          <div className="request-panel">
            <div className="request-header">
              <h2 className="request-title">Request</h2>
              <button className="clear-button" onClick={handleClearRequest} disabled={loading}>
                Clear
              </button>
            </div>
            <div className="method-url-container">
              <MethodSelector method={method} onChange={setMethod} />
              <UrlInput url={url} onChange={setUrl} />
            </div>
            <KeyValueEditor
              title="Query Parameters"
              data={params}
              onChange={setParams}
              keyPlaceholder="Parameter"
              valuePlaceholder="Value"
              addRowLabel="Parameter"
            />
            <KeyValueEditor
              title="Headers"
              data={headers}
              onChange={setHeaders}
              keyPlaceholder="Header"
              valuePlaceholder="Value"
              addRowLabel="Header"
            />
            <AuthConfig auth={auth} onChange={setAuth} />
            <BodyEditor
              body={body}
              bodyType={bodyType}
              onChange={setBody}
              onBodyTypeChange={setBodyType}
            />
            <button className="send-button" onClick={handleSendRequest} disabled={loading}>
              {loading ? 'Sending...' : 'Send Request'}
            </button>
          </div>
        </div>

        <div className="app-right-panel">
          <ResponseView response={response} loading={loading} onClear={handleClearResponse} />
        </div>
      </div>

      <footer className="app-footer">
        <img 
          src="/capi-footer-logo.png" 
          alt="cAPI Footer Logo" 
          className="app-footer-logo"
        />
      </footer>
    </div>
  );
};

export default App;
