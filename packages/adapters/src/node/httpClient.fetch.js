// @ts-check

/**
 * Creates an HTTP client adapter using Node.js native fetch.
 * 
 * Node.js 18+ has built-in fetch support.
 * This adapter implements the HttpClient port from @workshop/core.
 * 
 * @returns {import('@workshop/core/ports').HttpClient}
 */
export function makeFetchHttpClient() {
  return {
    /**
     * Fetch data from a URL.
     * 
     * @param {string} url - The URL to fetch
     * @param {RequestInit} [options] - Fetch options
     * @returns {Promise<Response>}
     */
    fetch: async (url, options) => {
      return fetch(url, options);
    }
  };
}
