# APEX-MD Web Pair / QR

Generates a WhatsApp session (pair code or QR), uploads `creds.json` to MEGA and sends the
session ID to your WhatsApp. Paste that ID into `SESSION_ID` of APEX-MD.

## Replit
1. Upload this folder (or import the zip).
2. Tools -> Secrets: add `MEGA_EMAIL` and `MEGA_PASSWORD` (a MEGA account made only for this).
3. Press Run (the `.replit` file runs `npm install` first, which fixes `Cannot find package 'dotenv'`).
   If it still complains, open Shell and run `npm install` once, then Run again.

## VPS
```
npm install
MEGA_EMAIL=... MEGA_PASSWORD=... PORT=8000 pm2 start index.js --name web-pair
```
Pages: `/` home, `/pair` pair code, `/qrpage` QR.
