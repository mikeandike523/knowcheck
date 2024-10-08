import fs from 'fs';
import path from 'path';

import initialize from '../../../utils/firebase/initialize.js'

// Determine environment
const NODE_ENV = process.env.NODE_ENV || 'development';

// Determine filename and directory
const __filename = import.meta.url.slice('file://'.length).slice(process.platform === 'win32' ? 1 : 0);
const __dirname = path.dirname(__filename);

// Read service account key
const serviceAccount = JSON.parse(
  fs.readFileSync(path.join(__dirname,"..", '..', 'service-account-key.json'))
);

const db = initialize(NODE_ENV==="production"?serviceAccount:undefined,false,true).db

export default db