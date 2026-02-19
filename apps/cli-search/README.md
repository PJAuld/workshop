# @workshop/cli-search

Example CLI application demonstrating layered architecture patterns.

## Purpose

This is a **minimal working example** that shows how to:
- Import use cases from `@workshop/core/usecases`
- Create adapters from `@workshop/adapters/node`
- Wire dependencies in a composition root
- Execute business logic
- Handle errors at the application boundary

## Architecture

```
┌─────────────────────────────────┐
│   main.js (Composition Root)    │  ← You are here
├─────────────────────────────────┤
│   @workshop/adapters/node       │  ← Platform adapters
├─────────────────────────────────┤
│   @workshop/core/usecases       │  ← Business logic
└─────────────────────────────────┘
```

## Usage

### Run directly

```bash
# From workspace root
node apps/cli-search/src/main.js javascript

# With arguments
node apps/cli-search/src/main.js "react hooks"
```

### Run with pnpm scripts

```bash
# From workspace root
pnpm --filter @workshop/cli-search start javascript

# Or from app directory
cd apps/cli-search
pnpm start "search query"
```

### Run in watch mode (dev)

```bash
pnpm --filter @workshop/cli-search dev
```

## Code Walkthrough

### 1. Import Dependencies

```javascript
import { makeRunSearch } from '@workshop/core/usecases';
import { makeFetchHttpClient, makeClock } from '@workshop/adapters/node';
```

We import:
- **Use cases** from core (business logic)
- **Adapters** from the Node.js platform package

### 2. Create Adapters

```javascript
const httpClient = makeFetchHttpClient();
const clock = makeClock();
```

Adapters are the concrete implementations of ports defined in core.

### 3. Wire to Use Cases

```javascript
const runSearch = makeRunSearch({ httpClient });
```

We inject the adapter into the use case factory. This is **dependency injection**.

### 4. Execute

```javascript
const results = await runSearch(query);
```

Call the configured use case with input. All the business logic is in core.

### 5. Present Results

```javascript
console.log(JSON.stringify(results, null, 2));
```

Format and display results. Error handling happens at this boundary.

## Key Patterns

### Composition Root

`main.js` is a composition root where:
- Dependencies are created
- Dependencies are wired together
- Application is executed

**No business logic here** - just wiring and presentation.

### Dependency Injection

Use cases don't create their own dependencies. We inject them:

```javascript
// ❌ Bad: Use case creates its own dependencies
const runSearch = makeRunSearch();

// ✅ Good: We inject dependencies
const httpClient = makeFetchHttpClient();
const runSearch = makeRunSearch({ httpClient });
```

### Error Handling at Boundaries

Apps handle errors and present them to users:

```javascript
try {
  const results = await runSearch(query);
  console.log(results);
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}
```

## Extending This Example

### Add More Adapters

```javascript
import { makeLogger } from '@workshop/adapters/node';

const logger = makeLogger();
const runSearch = makeRunSearch({ httpClient, logger });
```

### Add Configuration

```javascript
const config = {
  apiUrl: process.env.API_URL || 'https://api.example.com',
  timeout: parseInt(process.env.TIMEOUT) || 5000
};

const httpClient = makeFetchHttpClient(config);
```

### Add More Use Cases

```javascript
import { makeRunSearch, makeAnalyzeResults } from '@workshop/core/usecases';

const runSearch = makeRunSearch({ httpClient });
const analyzeResults = makeAnalyzeResults({ logger });

const searchResults = await runSearch(query);
const analysis = await analyzeResults(searchResults);
```

## Testing

This app can be tested by:
1. **Unit testing** use cases with mock adapters
2. **Integration testing** the full app with real adapters
3. **E2E testing** by running the CLI and checking output

Example unit test:

```javascript
// Mock adapter
const mockHttpClient = {
  fetch: async () => ({
    ok: true,
    json: async () => ({ results: ['test'] })
  })
};

// Test use case in isolation
const runSearch = makeRunSearch({ httpClient: mockHttpClient });
const results = await runSearch('test');

assert.deepEqual(results, { results: ['test'] });
```

## License

MIT
