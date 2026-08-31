# CleverClimbers

A complete responsive corporate website with:
- Modern desktop/tablet/mobile layout
- Sticky responsive navigation with mobile 3-line menu
- 3-image hero slider with dots
- About + "The Way We Work"
- 4 service cards
- 4-image service gallery + View All
- Testimonials
- Complete Projects / Ongoing Projects / Experience statistics
- 4 detailed article sections
- Comment forms for articles
- Contact form
- Node.js + Express backend
- JSON storage for contact enquiries and comments

## Run on Windows

1. Install Node.js LTS.
2. Open this folder in VS Code.
3. Open Terminal in VS Code: **Terminal → New Terminal**.
4. Run:
   ```
   npm install
   ```
5. Then:
   ```
   npm start
   ```
6. Open:
   `http://localhost:5000`

Submitted contacts/comments are stored in `data/submissions.json`.

## Live hosting

This package needs a Node.js/Express host for the backend. For production, use a hosting provider that supports Node.js and persistent storage. Set `PORT` if your host supplies one.

## Important

The demo uses remote Unsplash images. Replace the image URLs in `public/index.html` with your own licensed project images before commercial launch.

Replace the placeholder email/phone in `public/index.html` with your real business contact details.


## Flattened live structure
All website files, CSS, JavaScript and images are kept in one root folder for simple GitHub/Render deployment.
