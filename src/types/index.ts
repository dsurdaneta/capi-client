export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

export interface RequestConfig {
  url: string;
  method: HttpMethod;
  headers?: Record<string, string>;
  params?: Record<string, string>;
  body?: string | Record<string, unknown> | null;
}

export interface ApiResponse {
  status: number;
  statusText?: string;
  headers: Record<string, string>;
  data: unknown;
  duration: number;
  ok: boolean;
  error?: boolean;
  message?: string;
}

export interface AuthConfig {
  type: 'none' | 'bearer' | 'basic' | 'api_key' | 'custom';
  token?: string;
  username?: string;
  password?: string;
  apiKey?: string;
  apiKeyValue?: string;
  customHeader?: string;
  customValue?: string;
}

export type BodyType = 'none' | 'json' | 'text' | 'form-data' | 'x-www-form-urlencoded';

export interface KeyValuePair {
  key: string;
  value: string;
}
