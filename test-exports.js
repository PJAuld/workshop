// Test all subpath exports
import * as core from '@workshop/core';
import * as corePorts from '@workshop/core/ports';
import * as coreUsecases from '@workshop/core/usecases';
import * as adaptersNode from '@workshop/adapters/node';
import * as adaptersWeb from '@workshop/adapters/web';
import * as adaptersBun from '@workshop/adapters/bun';

console.log('Testing all package exports...\n');

console.log('✅ @workshop/core exports:', Object.keys(core).join(', '));
console.log('✅ @workshop/core/ports exports:', Object.keys(corePorts).join(', '));
console.log('✅ @workshop/core/usecases exports:', Object.keys(coreUsecases).join(', '));
console.log('✅ @workshop/adapters/node exports:', Object.keys(adaptersNode).join(', '));
console.log('✅ @workshop/adapters/web exports:', Object.keys(adaptersWeb).join(', '));
console.log('✅ @workshop/adapters/bun exports:', Object.keys(adaptersBun).join(', '));

console.log('\n✅ All exports working correctly!');
