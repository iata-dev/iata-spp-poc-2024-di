import path from 'path';
import { fileURLToPath } from 'url';
import { startServer } from './src/server.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

startServer(__dirname);
