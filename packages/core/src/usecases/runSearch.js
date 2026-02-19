// @ts-check

import { assertHttpClient } from '../ports/httpClient.js';

/**
 * Creates a search use case that fetches data from an API.
 * 
 * This is a factory function that takes dependencies (ports) as parameters
 * and returns a configured use case function.
 * 
 * @param {Object} deps - Dependencies (injected ports)
 * @param {import('../ports/httpClient.js').HttpClient} deps.httpClient - HTTP client implementation
 * @returns {(query: string) => Promise<any>} The configured search function
 */
export function makeRunSearch({ httpClient }) {
  assertHttpClient(httpClient);

  /**
   * Execute a search query.
   * 
   * @param {string} query - The search query
   * @returns {Promise<any>} The search results
   */
  return async function executeSearch(query) {
    if (!query || typeof query !== 'string') {
      throw new Error('Query must be a non-empty string');
    }

    // Example: search via a hypothetical API
    const url = `https://api.example.com/search?q=${encodeURIComponent(query)}`;
    
    try {
      const response = await httpClient.fetch(url);
      
      if (!response.ok) {
        throw new Error(`Search failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Failed to execute search: ${error.message}`);
    }
  };
}
