# FRAME Dashboard

> Operational dashboard for the FRAME platform — live feed, geo-intel, networks, narratives, partners.

**🔗 Live demo:** https://doron-arch.github.io/frame-dashboard/

## Overview

The FRAME Dashboard is the operational surface for FRAME analysts: a React single-page app with tabbed views for live content feed, geospatial intelligence, network analysis, narrative tracking, and partner status. Built on Vite for fast dev and GitHub Pages deployment.

## Screenshots

> _TODO: add screenshots to `docs/screenshots/` and uncomment the lines below._

<!--
![Live feed](docs/screenshots/live-feed.png)
![Geo intel](docs/screenshots/geo-intel.png)
![Deep-linked state](docs/screenshots/deep-link.png)
-->

## Deep-linking

Dashboard state can be shared via URL query parameters:

| Param      | Values                                                              | Example                  |
| ---------- | ------------------------------------------------------------------- | ------------------------ |
| `tab`      | `live-feed`, `geo-intel`, `networks`, `narratives`, `partners`      | `?tab=geo-intel`         |
| `platform` | `Telegram`, `X`, `Facebook`, `TikTok`, `YouTube`, `Instagram`       | `?platform=Telegram`     |

Combine freely: `?tab=live-feed&platform=Telegram`. Invalid or unknown params are stripped from the URL automatically.

## Tech stack

- React 18 + Vite
- JavaScript (ESM)
- GitHub Pages hosting (via GitHub Actions build)
- Design tokens in `src/frame-tokens.js`
- Shared schemas via `src/schemas/frame-schemas.js` (ESM, single source of truth across FRAME repos)

## Local development

    git clone https://github.com/doron-arch/frame-dashboard.git
    cd frame-dashboard
    npm install
    npm run dev
    # open the URL printed by Vite (usually http://localhost:5173)

Build for production:

    npm run build
    npm run preview

## Project structure

    .
    ├── index.html
    ├── vite.config.js
    ├── package.json
    ├── src/
    │   ├── App.jsx                # root component + tab routing + URL deep-linking (Phase 6a)
    │   ├── main.jsx               # entry
    │   ├── frame-tokens.js        # design tokens
    │   ├── schemas/
    │   │   └── frame-schemas.js   # shared enums + typedefs (ESM)
    │   ├── components/            # UI + per-tab view components (Badge, FilterBar, GeoMap, OverviewTab, LiveFeedTab, ...)
    │   └── data/                  # static datasets (alerts, geo, narratives, networks, pool, vpnRoutes)
    └── docs/screenshots/          # (TODO)

## Related FRAME repos

- [dashboard](https://github.com/doron-arch/dashboard) — FRAME Shared Analytics (vanilla JS) · [live](https://doron-arch.github.io/dashboard/)
- [frame-technology-demo](https://github.com/doron-arch/frame-technology-demo) — Technology platform demo (vanilla JS) · [live](https://doron-arch.github.io/frame-technology-demo/)

## License

All rights reserved © FRAME.
