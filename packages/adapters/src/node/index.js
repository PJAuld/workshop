// @ts-check

/**
 * Node.js adapters - Platform-specific implementations for Node.js runtime.
 * 
 * These adapters implement the ports defined in @workshop/core using Node.js APIs.
 */

export { makeFetchHttpClient } from './httpClient.fetch.js';
export { makeClock } from './clock.js';
