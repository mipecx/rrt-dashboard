# RRT System — Dispatcher Panel

Real-time dispatcher console for the RRT emergency response system: live map of tourists and rescue crews, SOS incident handling and crew assignment.

Vue 3 · Vite · Tailwind CSS · Leaflet

## Features

- Live interactive map (Leaflet, dark theme) with incident and RRT crew markers
- Real-time updates over WebSocket (`RRT_UPDATE`, `INCIDENT_UPDATE`)
- SOS incident cards: status, tourist info, battery, coordinates
- Assign crews to incidents, mark arrived / resolve
- RRT unit management: add squad, track status and location
- JWT auth (access + refresh tokens in localStorage)

## Quick Start

```bash
npm install
npm run dev
```

The panel expects the backend API on `http://localhost:8080/api/v1` (dev defaults). Production builds are served behind a reverse proxy that routes `/api/*` and `/api/v1/ws` to the backend.

### Production build

```bash
npm run build   # outputs to dist/
npm run preview
```

### Lint / format

```bash
npm run lint
npm run format
```

## Project structure

```
src/
├── views/
│   ├── LoginView.vue        # Phone + password login
│   └── DashboardView.vue    # Dispatcher console (map, incidents, units)
├── components/
│   └── AppMap.vue           # Leaflet map with live markers
├── services/
│   ├── api.js               # API base URL helper
│   └── websocket.js         # WebSocket base URL helper
└── router/index.js
```

## Related

- [rrt-backend](https://github.com/mipecx/rrt-backend) — API + WebSocket server
- [rrt-mobile](https://github.com/mipecx/rrt-mobile) — tourist & rescuer mobile client
