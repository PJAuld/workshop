// @ts-check
/**
 * Bun adapters - Platform-specific implementations for Bun runtime.
 * 
 * These adapters implement the ports defined in @workshop/core using Bun APIs.
 * 
 * TODO: Add Bun-specific adapter implementations.
 * Example: Bun.file, Bun.write, Bun.serve, etc.
 */

/**
 * Creates an HTTP client adapter using Bun's fetch.
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

// TODO: Add more Bun-specific adapters
// - makeBunFileAdapter (using Bun.file)
// - makeBunServerAdapter (using Bun.serve)
// - makeBunSQLiteAdapter (using Bun's built-in SQLite)
// - etc.
