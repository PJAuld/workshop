// @ts-check

/**
 * Creates a clock adapter using Node.js Date API.
 * 
 * Provides time-related functionality.
 * 
 * @returns {Object} Clock adapter
 */
export function makeClock() {
  return {
    /**
     * Get the current timestamp in milliseconds.
     * 
     * @returns {number}
     */
    now: () => Date.now(),

    /**
     * Get the current ISO timestamp.
     * 
     * @returns {string}
     */
    nowIso: () => new Date().toISOString(),

    /**
     * Create a Date object.
     * 
     * @param {string | number | Date} [value] - Optional value to create Date from
     * @returns {Date}
     */
    makeDate: (value) => value === undefined ? new Date() : new Date(value)
  };
}
