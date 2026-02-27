# @workshop/core

Core business logic and port definitions for the workshop monorepo.

## Purpose

This package contains **platform-agnostic business logic** that is completely independent of any specific runtime environment (Node.js, browser, Bun, etc.).

## Architecture Rules

### 🚫 What Core CANNOT Do

- **No platform APIs**: No `fs`, `fetch`, `process`, `window`, `document`, etc.
- **No I/O**: No database queries, HTTP requests, file system access
- **No side effects**: Pure functions and deterministic logic
- **No adapter imports**: Cannot import from `@workshop/adapters`

### ✅ What Core CAN Do

- **Business logic**: Algorithms, calculations, validations, workflows
- **Domain models**: Data structures and business rules
- **Port definitions**: Interface contracts (via JSDoc types and assertion functions)
- **Service factories**: Functions that accept dependencies and return configured services

## Structure

```
src/
├── index.js           # Main entry point (re-exports ports and services)
├── ports/             # Port definitions (interfaces for external dependencies)
│   ├── index.js       # Barrel export
│   └── httpClient.js  # HTTP client port with assertion function
├── services/          # Business logic factories
│   ├── index.js       # Barrel export
│   └── runSearch.js   # Example service factory
└── domain/            # Domain models (optional, not yet used)
```

## Exports

The package provides subpath exports for fine-grained imports:

```javascript
// Import everything
import { assertHttpClient, makeRunSearch } from '@workshop/core';

// Import only ports
import { assertHttpClient } from '@workshop/core/ports';

// Import only services
import { makeRunSearch } from '@workshop/core/services';
```

## Patterns

### Port Definition Pattern

Ports are defined using JSDoc types and assertion functions:

```javascript
// @ts-check

/**
 * @typedef {Object} MyPort
 * @property {(arg: string) => Promise<string>} myMethod - Description
 */

/**
 * @param {unknown} obj
 * @throws {Error} If obj doesn't implement MyPort
 * @returns {asserts obj is MyPort}
 */
export function assertMyPort(obj) {
  if (!obj || typeof obj !== 'object') {
    throw new Error('MyPort must be an object');
  }
  if (typeof obj.myMethod !== 'function') {
    throw new Error('MyPort must have a myMethod');
  }
}
```

### Service Factory Pattern

Services are implemented as factory functions:

```javascript
// @ts-check

/**
 * Creates a service function with injected dependencies.
 * 
 * @param {Object} deps - Dependencies
 * @param {MyPort} deps.myPort - Port implementation
 * @returns {(input: string) => Promise<string>} Configured service
 */
export function makeMyService({ myPort }) {
  assertMyPort(myPort);

  return async function myService(input) {
    // Business logic here
    const result = await myPort.myMethod(input);
    return result.toUpperCase();
  };
}
```

### Usage in Apps

Apps (composition roots) wire adapters to services:

```javascript
import { makeRunSearch } from '@workshop/core/services';
import { makeFetchHttpClient } from '@workshop/adapters/node';

// Create adapter instance
const httpClient = makeFetchHttpClient();

// Inject adapter into service factory
const runSearch = makeRunSearch({ httpClient });

// Execute the service
const results = await runSearch('javascript');
```

## Testing

Since this package is pure logic with injected dependencies, it's easy to test:

```javascript
// Create a mock adapter
const mockHttpClient = {
  fetch: async (url) => ({
    ok: true,
    json: async () => ({ results: ['test'] })
  })
};

// Inject mock into service
const runSearch = makeRunSearch({ httpClient: mockHttpClient });

// Test the service
const result = await runSearch('test');
assert.deepEqual(result, { results: ['test'] });
```

## Contributing

When adding new services or ports:

1. **Keep it pure**: No side effects, no platform dependencies
2. **Use factories**: Accept dependencies as parameters
3. **Validate inputs**: Use assertion functions for ports
4. **Document with JSDoc**: Types, parameters, return values
5. **Export from index**: Add to barrel exports for convenience

## License

MIT
