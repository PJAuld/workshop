// @ts-check

/**
 * Port definition for HTTP client.
 * 
 * An HTTP client is responsible for making HTTP requests.
 * This is a port (interface) that must be implemented by adapters.
 * 
 * @typedef {Object} HttpClient
 * @property {(url: string, options?: RequestInit) => Promise<Response>} fetch - Fetch data from a URL
 */

/**
 * Asserts that an object implements the HttpClient port.
 * 
 * @param {unknown} client - The client to validate
 * @throws {Error} If the client doesn't implement the HttpClient port
 * @returns {asserts client is HttpClient}
 */
export function assertHttpClient(client) {
  if (!client || typeof client !== 'object') {
    throw new Error('HttpClient must be an object');
  }

  if (typeof client.fetch !== 'function') {
    throw new Error('HttpClient must have a fetch method');
  }
}
