# Workshop Monorepo

A pnpm-based ESM JavaScript monorepo for layered architecture experiments and rapid prototyping.

## Purpose

This repository is a **workshop and experimentation space** for exploring:

- **Layered architecture** patterns (hexagonal/clean architecture)
- **Dependency injection** and inversion of control
- **Platform-agnostic core logic** with platform-specific adapters
- **Functional programming** patterns in JavaScript
- **Workspace-based monorepo** organization

## Architecture Concepts

### Layered Architecture

The monorepo follows a **layered architecture** approach with clear separation of concerns:

```
┌─────────────────────────────────────┐
│         Apps & Experiments          │  ← Composition roots, entry points
├─────────────────────────────────────┤
│      Adapters (I/O & Platform)      │  ← Platform-specific implementations
├─────────────────────────────────────┤
│     Core (Business Logic/Ports)     │  ← Pure logic, platform-agnostic
└─────────────────────────────────────┘
```

**Core (`@workshop/core`)**: Contains pure business logic, domain models, and **port definitions**. No dependencies on platform APIs (Node.js, browser, etc.). Exports ports (interfaces) and services (business logic factories).

**Adapters (`@workshop/adapters`)**: Platform-specific implementations of core ports. Exports adapters for different runtimes: `./node`, `./web`, `./bun`. These are the concrete implementations that talk to databases, HTTP, file systems, etc.

**Apps**: Composition roots where adapters are wired to core services. Each app is a complete runnable application.

**Experiments**: Throwaway spikes, proofs-of-concept, and learning exercises. Not meant to be production-ready.

## Repository Structure

```
workshop/
├── packages/
│   ├── core/              # @workshop/core - Business logic & ports
│   └── adapters/          # @workshop/adapters - Platform adapters
├── apps/
│   └── cli-search/        # Example CLI application
├── experiments/           # Throwaway experiments
├── pnpm-workspace.yaml    # Workspace configuration
└── package.json           # Root package configuration
```

## Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
- **pnpm** >= 9.0.0

### Installation

```bash
# Install pnpm if you don't have it
npm install -g pnpm

# Install all workspace dependencies
pnpm install

# List all workspace packages
pnpm list
```

### Workspace Commands

```bash
# Build all packages
pnpm build:packages

# Run dev mode for all packages
pnpm dev:packages

# List all workspace packages
pnpm list
```

## How to Use

### Importing from Core

```javascript
// Import services
import { makeRunSearch } from '@workshop/core/services';

// Import ports (interfaces/assertions)
import { assertHttpClient } from '@workshop/core/ports';
```

### Importing from Adapters

```javascript
// Import Node.js adapters
import { makeFetchHttpClient, makeClock } from '@workshop/adapters/node';

// Import web adapters
import { makeFetchHttpClient } from '@workshop/adapters/web';

// Import Bun adapters
import { makeFetchHttpClient } from '@workshop/adapters/bun';
```

### Adding a New App

1. Create a folder under `apps/your-app-name/`
2. Add a `package.json` with:
   ```json
   {
     "name": "@workshop/your-app-name",
     "version": "0.0.0",
     "private": true,
     "type": "module",
     "dependencies": {
       "@workshop/core": "workspace:*",
       "@workshop/adapters": "workspace:*"
     }
   }
   ```
3. Create `src/main.js` as your entry point
4. Wire adapters to services in your composition root
5. Run with `node src/main.js` or add scripts to package.json

### Adding a New Experiment

1. Create a folder under `experiments/your-experiment/`
2. Add a minimal `package.json` if needed
3. Experiment freely - these are throwaway!
4. Document learnings in a README if valuable

### Adding a New Package

1. Create a folder under `packages/your-package/`
2. Add a `package.json` with:
   - `"type": "module"`
   - Appropriate `exports` field for subpath exports
   - Dependencies on other workspace packages using `workspace:*`
3. Follow ESM conventions (`.js` extensions in imports)

## Conventions

- **ESM First**: All code uses ES modules (`type: "module"`)
- **Functional Style**: Prefer functions over classes
- **Factory Functions**: Use `makeX()` pattern for creating instances
- **Pure Core**: Core package has zero platform dependencies
- **Explicit Imports**: Always use `.js` file extensions in imports
- **Workspace Protocol**: Reference workspace packages with `workspace:*`

## Examples

See `apps/cli-search/` for a minimal example demonstrating:
- Importing services from `@workshop/core`
- Injecting adapters from `@workshop/adapters/node`
- Running as a Node.js application

## License

MIT