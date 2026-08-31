# CleverClimbers v2 — Render Ready

## Local Windows test
1. Install Node.js 18+.
2. Open this folder in VS Code.
3. Open Terminal.
4. Run:
   npm install
   npm start
5. Open http://localhost:10000

## Render Web Service
- Repository: your GitHub CleverClimbers repository
- Runtime: Node
- Build Command: `npm install`
- Start Command: `npm start`
- No Publish Directory is needed.
- Render supplies `PORT`; the server listens on `0.0.0.0`.

## Important
The website is served from `/public` and assets are explicitly served from `/assets`.
This version uses absolute asset URLs such as `/assets/style.css` and `/assets/images/...` to avoid the CSS/image loading problem seen on the previous deployment.

Contact/comments are stored in `data/submissions.json`. Free/ephemeral hosting may reset local files; use a database or persistent disk if permanent submissions are required.


## Flattened live structure
All website files, CSS, JavaScript and images are kept in one root folder for simple GitHub/Render deployment.
