# Apps

This directory contains **runnable applications** that compose core services with adapters.

## Purpose

Apps are **composition roots** where:
- Adapters are instantiated
- Dependencies are wired together
- Services are configured
- The application is executed

## Structure

Each app is a self-contained folder with its own `package.json`:

```
apps/
├── cli-search/          # Example CLI app
│   ├── package.json     # App dependencies
│   ├── src/
│   │   └── main.js      # Entry point (composition root)
│   └── README.md        # App-specific docs
└── my-new-app/          # Your app here
    ├── package.json
    └── src/
        └── main.js
```

## Conventions

### Package Naming

Use the `@workshop/` scope for consistency:

```json
{
  "name": "@workshop/my-app",
  "version": "0.0.0",
  "private": true
}
```

### Dependencies

Reference workspace packages using `workspace:*`:

```json
{
  "dependencies": {
    "@workshop/core": "workspace:*",
    "@workshop/adapters": "workspace:*"
  }
}
```

### Entry Point Pattern

Apps should have a clear composition root:

```javascript
// src/main.js
import { makeRunSearch } from '@workshop/core/services';
import { makeFetchHttpClient } from '@workshop/adapters/node';

async function main() {
  // 1. Create adapters
  const httpClient = makeFetchHttpClient();

  // 2. Wire adapters to services
  const runSearch = makeRunSearch({ httpClient });

  // 3. Execute
  const results = await runSearch(process.argv[2] || 'javascript');
  
  // 4. Present results
  console.log(JSON.stringify(results, null, 2));
}

main().catch(console.error);
```

## Creating a New App

### 1. Create the folder

```bash
mkdir -p apps/my-app/src
```

### 2. Add package.json

```bash
cd apps/my-app
cat > package.json << 'EOF'
{
  "name": "@workshop/my-app",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "main": "src/main.js",
  "scripts": {
    "start": "node src/main.js"
  },
  "dependencies": {
    "@workshop/core": "workspace:*",
    "@workshop/adapters": "workspace:*"
  }
}
EOF
```

### 3. Create entry point

```bash
cat > src/main.js << 'EOF'
// @ts-check

console.log('Hello from my app!');
EOF
```

### 4. Install and run

```bash
# From workspace root
pnpm install

# Run your app
node apps/my-app/src/main.js

# Or with scripts
pnpm --filter @workshop/my-app start
```

## App Categories

### CLI Apps

Command-line tools and scripts. Use Node.js adapters.

**Example**: `apps/cli-search/`

### Web Apps

Browser-based applications. Use web adapters.

**Example**: `apps/web-dashboard/` (coming soon)

### API Servers

HTTP APIs and services. Use Node.js or Bun adapters.

**Example**: `apps/api-server/` (coming soon)

## Best Practices

1. **Keep composition root small**: Wire dependencies and delegate to services
2. **No business logic in apps**: All logic should be in `@workshop/core`
3. **Choose the right adapters**: Node for CLI/servers, web for browsers
4. **Handle errors at the boundary**: Apps are responsible for error presentation
5. **Configuration via environment**: Use env vars or config files, not hardcoded values

## Running Apps

```bash
# Direct execution
node apps/cli-search/src/main.js

# With pnpm scripts (from workspace root)
pnpm --filter @workshop/cli-search start

# With arguments
node apps/cli-search/src/main.js "search query"
```

## Example: CLI Search App

See `apps/cli-search/` for a minimal working example that demonstrates:
- Importing services from `@workshop/core/services`
- Creating adapters from `@workshop/adapters/node`
- Wiring dependencies
- Running the application

## License

MIT
