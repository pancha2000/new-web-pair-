// .env is optional (Replit Secrets / VPS env vars work without it).
// If the 'dotenv' package is missing the server still starts instead of crashing.
try { await import('dotenv/config'); } catch { console.log('ℹ️ dotenv not loaded - using environment variables only'); }

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import qrRouter from './qr.js';
import pairRouter from './pair.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8000;

import('events').then(events => {
    events.EventEmitter.defaultMaxListeners = 500;
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.use('/qr', qrRouter);
app.use('/code', pairRouter);

app.use('/pair', async (req, res) => {
    res.sendFile(path.join(__dirname, 'pair.html'));
});
app.use('/qrpage', (req, res) => {
    res.sendFile(path.join(__dirname, 'qr.html'));
});
app.use('/', async (req, res) => {
    res.sendFile(path.join(__dirname, 'main.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`APEX-MD Web Pair running on port ${PORT}`);
    if (!process.env.MEGA_EMAIL || !process.env.MEGA_PASSWORD) console.warn('⚠️ MEGA_EMAIL / MEGA_PASSWORD not set - session upload will fail. Add them in Replit Secrets.');
});

export default app;
