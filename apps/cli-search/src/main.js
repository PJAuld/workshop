#!/usr/bin/env node
// @ts-check
/**
 * CLI Search - Example application demonstrating layered architecture
 * This is a composition root where:
 * 1. Adapters are created (from @workshop/adapters/node)
 * 2. Services are wired with adapters (from @workshop/core/services)
 * 3. The application logic is executed
 * 4. Results are presented to the user
 */
import { makeRunSearch } from '@workshop/core/services';
import { makeFetchHttpClient, makeClock } from '@workshop/adapters/node';

/**
 * Main application entry point.
 */
async function main() {
  // Get search query from command line arguments
  const query = process.argv[2];

  if (!query) {
    console.error('Usage: node src/main.js <search-query>');
    console.error('Example: node src/main.js javascript');
    process.exit(1);
  }

  console.log('🔍 CLI Search Application');
  console.log('========================\n');

  // 1. Create adapters (platform-specific implementations)
  const httpClient = makeFetchHttpClient();
  const clock = makeClock();

  // 2. Wire adapters to services (dependency injection)
  const runSearch = makeRunSearch({ httpClient });

  // 3. Execute the service
  console.log(`Searching for: "${query}"`);
  console.log(`Started at: ${clock.nowIso()}\n`);

  try {
    const results = await runSearch(query);
    
    // 4. Present results
    console.log('✅ Search completed successfully!');
    console.log('\nResults:');
    console.log(JSON.stringify(results, null, 2));
    
  } catch (error) {
    // Handle errors at the application boundary
    console.error('❌ Search failed!');
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }

  console.log(`\nCompleted at: ${clock.nowIso()}`);
}

// Run the application
main().catch((error) => {
  console.error('💥 Unexpected error:', error);
  process.exit(1);
});
