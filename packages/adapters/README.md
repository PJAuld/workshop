# @workshop/adapters

Platform-specific adapter implementations for core ports.

## Purpose

This package provides **concrete implementations** of the ports (interfaces) defined in `@workshop/core`. Each adapter is specific to a runtime platform (Node.js, browser, Bun, etc.).

## Architecture Role

In the layered architecture:

- **Core** defines ports (interfaces) and business logic
- **Adapters** implement those ports using platform-specific APIs
- **Apps** wire adapters to core services at composition roots

Adapters are the **boundary layer** between pure business logic and the outside world.

## Structure

```
src/
├── node/                    # Node.js-specific adapters
│   ├── index.js             # Barrel export
│   ├── httpClient.fetch.js  # HTTP client using native fetch
│   └── clock.js             # Clock using Date API
├── web/                     # Browser-specific adapters
│   └── index.js             # Placeholder with fetch adapter
└── bun/                     # Bun-specific adapters
    └── index.js             # Placeholder with fetch adapter
```

## Exports

The package provides subpath exports for different platforms:

```javascript
// Node.js adapters
import { makeFetchHttpClient, makeClock } from '@workshop/adapters/node';

// Browser adapters
import { makeFetchHttpClient } from '@workshop/adapters/web';

// Bun adapters
import { makeFetchHttpClient } from '@workshop/adapters/bun';
```

## Patterns

### Adapter Factory Pattern

Adapters are created using factory functions:

```javascript
// @ts-check

/**
 * Creates an HTTP client adapter.
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
```

### Usage in Apps

Apps create adapter instances and inject them into services:

```javascript
import { makeRunSearch } from '@workshop/core/services';
import { makeFetchHttpClient } from '@workshop/adapters/node';

// Create adapter instance
const httpClient = makeFetchHttpClient();

// Inject into service
const runSearch = makeRunSearch({ httpClient });

// Use it
const results = await runSearch('query');
```

## Available Adapters

### Node.js (`@workshop/adapters/node`)

- **`makeFetchHttpClient()`**: HTTP client using Node.js built-in fetch (v18+)
- **`makeClock()`**: Time utilities using Date API

### Web (`@workshop/adapters/web`)

- **`makeFetchHttpClient()`**: HTTP client using browser fetch API
- _More adapters coming (localStorage, IndexedDB, etc.)_

### Bun (`@workshop/adapters/bun`)

- **`makeFetchHttpClient()`**: HTTP client using Bun's fetch
- _More adapters coming (Bun.file, Bun.serve, etc.)_

## Adding New Adapters

### 1. Choose the Right Platform

Determine which platform(s) your adapter targets:
- Node.js-specific? → `src/node/`
- Browser-specific? → `src/web/`
- Bun-specific? → `src/bun/`
- Universal? → Add to all platforms

### 2. Implement the Port

Create a file with a factory function:

```javascript
// src/node/myAdapter.js
// @ts-check

/**
 * Creates my adapter instance.
 * 
 * @param {Object} [config] - Optional configuration
 * @returns {import('@workshop/core/ports').MyPort}
 */
export function makeMyAdapter(config = {}) {
  return {
    myMethod: async (input) => {
      // Implementation using platform APIs
      return result;
    }
  };
}
```

### 3. Export from Platform Index

Add to the appropriate `index.js`:

```javascript
// src/node/index.js
export { makeMyAdapter } from './myAdapter.js';
```

### 4. Test with Core

Verify the adapter works with core services:

```javascript
import { makeMyService } from '@workshop/core/services';
import { makeMyAdapter } from '@workshop/adapters/node';

const myAdapter = makeMyAdapter();
const myService = makeMyService({ myAdapter });

const result = await myService('input');
console.log(result);
```

## Design Principles

1. **Thin Layer**: Adapters should be simple wrappers around platform APIs
2. **No Business Logic**: Keep logic in core, adapters just translate
3. **Factory Functions**: Use `makeX()` pattern for consistency
4. **Stateless When Possible**: Prefer pure functions over stateful objects
5. **Explicit Configuration**: Accept config as parameters, not environment variables

## Testing

Adapters can be tested in isolation or integration-tested with core:

```javascript
// Isolated adapter test
const httpClient = makeFetchHttpClient();
const response = await httpClient.fetch('https://example.com');
assert(response.ok);

// Integration test with core
const runSearch = makeRunSearch({ httpClient });
const results = await runSearch('test');
assert(results);
```

## Platform Notes

### Node.js

- Requires Node.js 18+ for native `fetch` support
- Use `import` syntax (ESM)
- Can use `process`, `fs`, `path`, etc.

### Browser

- Modern browser APIs only (no IE11 support)
- Use `import` syntax (ESM)
- Can use `localStorage`, `IndexedDB`, `fetch`, etc.

### Bun

- Bun-specific APIs like `Bun.file`, `Bun.serve`
- Generally Node.js compatible with extras
- Very fast, great for CLI tools

## License

MIT
