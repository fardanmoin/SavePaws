# SavePaws

Animal welfare campaign site. React with Vite, plain CSS, no UI library.

Three pages, routed by hash so the site works on any static host with zero rewrite rules.

1. Home at `#/home`
2. Animals and campaigns at `#/animals`
3. Volunteer and donate at `#/involved`

## File map

```
savepaws/
├── index.html
├── package.json
├── vite.config.js
├── render.yaml
├── .gitignore
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── data.js
    ├── hooks/
    │   ├── useHashRoute.js
    │   └── useInView.js
    ├── components/
    │   ├── Bits.jsx
    │   ├── Nav.jsx
    │   ├── Footer.jsx
    │   ├── AnimalCard.jsx
    │   ├── DonationPanel.jsx
    │   └── DonateModal.jsx
    └── pages/
        ├── Home.jsx
        ├── Animals.jsx
        └── Involved.jsx
```

## Run it locally

```bash
npm install
npm run dev
```

Opens on http://localhost:5173

## Push to GitHub

```bash
git init
git add .
git commit -m "SavePaws campaign site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/savepaws.git
git push -u origin main
```

## Deploy on Render

Render reads `render.yaml` automatically if you use Blueprints. Otherwise create it by hand:

1. Render dashboard, New, Static Site.
2. Connect the GitHub repo.
3. Build command: `npm install && npm run build`
4. Publish directory: `dist`
5. Create Static Site.

No environment variables are needed. No rewrite rule is needed either, because routing lives in the URL hash.

## Notes on the content

Every animal, campaign, role and statistic in `src/data.js` is sample content written for this build. Photos load
live from loremflickr, so each visit shows different real photos, and a failed image falls back to a tinted block
instead of a broken icon.

The donation flow is a sample checkout. It validates input, shows a processing state and prints a receipt
reference, but no request is sent anywhere and no card data leaves the page.

## Editing the data

Open `src/data.js`. Everything on the site reads from that one file: animals, campaigns, impact numbers, research
lines, volunteer roles, stories, donation tiers. Change a value there and it updates across all three pages.
