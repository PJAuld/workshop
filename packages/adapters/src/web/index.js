// @ts-check
/**
 * Web/Browser adapters - Platform-specific implementations for browser runtime.
 * These adapters implement the ports defined in @workshop/core using Web APIs.
 * 
 * TODO: Add browser-specific adapter implementations.
 * Example: LocalStorage adapter, IndexedDB adapter, Web Worker adapter, etc.
 */

/**
 * Creates an HTTP client adapter using browser fetch.
 * 
 * @returns {import('@workshop/core/ports').HttpClient}
 */
export function makeFetchHttpClient() {
  return {
    fetch: async (url, options) => {
      return fetch(url, options);
    }
  };
}

// TODO: Add more web-specific adapters
// - makeLocalStorageAdapter
// - makeIndexedDBAdapter
// - makeWebSocketAdapter
// - etc.
