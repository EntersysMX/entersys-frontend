import { generateSecurityHeadersFile } from '../vite-plugins/security-headers-plugin.js';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicDir = join(__dirname, '..', 'public');
const headersContent = generateSecurityHeadersFile();

// Generar archivo _headers para Netlify/Vercel
writeFileSync(join(publicDir, '_headers'), headersContent);

console.log('✅ Security headers file generated at public/_headers');
console.log('\n📄 Content:');
console.log(headersContent);
console.log('\n💡 Note: This file is used by hosting platforms like Netlify and Vercel.');
console.log('   For other servers (nginx, apache), configure headers in server config.');
