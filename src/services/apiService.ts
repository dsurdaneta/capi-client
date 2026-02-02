import { RequestConfig, ApiResponse } from '../types';

/**
 * API Service for making HTTP requests
 */
class ApiService {
  /**
   * Makes an HTTP request with the provided configuration
   */
  async makeRequest(config: RequestConfig): Promise<ApiResponse> {
    try {
      const { url, method, headers = {}, params = {}, body = null } = config;

      // Build URL with query parameters
      const urlWithParams = this.buildUrlWithParams(url, params);

      // Prepare fetch options
      const fetchOptions: RequestInit = {
        method: method.toUpperCase(),
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      };

      // Add body for methods that support it
      if (body && ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
        fetchOptions.body = typeof body === 'string' ? body : JSON.stringify(body);
      }

      // Make the request
      const startTime = Date.now();
      const response = await fetch(urlWithParams, fetchOptions);
      const endTime = Date.now();
      const duration = endTime - startTime;

      // Get response headers
      const responseHeaders: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      // Parse response body
      let responseData: unknown;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      return {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
        data: responseData,
        duration,
        ok: response.ok,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return {
        status: 0,
        statusText: '',
        headers: {},
        data: null,
        duration: 0,
        ok: false,
        error: true,
        message: errorMessage,
      };
    }
  }

  /**
   * Builds URL with query parameters
   */
  private buildUrlWithParams(url: string, params: Record<string, string>): string {
    if (!params || Object.keys(params).length === 0) {
      return url;
    }

    const urlObj = new URL(url);
    Object.keys(params).forEach((key) => {
      const value = params[key];
      if (value !== null && value !== undefined && value !== '') {
        urlObj.searchParams.append(key, value);
      }
    });

    return urlObj.toString();
  }
}

const apiService = new ApiService();
export default apiService;
