# 🏡 Canice Calendar

A personal Moomin-themed family schedule app for March 2026. Built with React + Vite + Tailwind CSS.

## Features

- Monthly calendar with event dot indicators
- Click a date to filter events for that day
- Add events directly to Google Calendar
- Inline edit: title, time, location, custom remarks
- Trilingual UI: 繁體中文 · English · Bahasa Indonesia
- Moomin Valley themed illustrations

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/<your-username>/canice-calendar.git
cd canice-calendar
npm install
```

### 2. Set up credentials

```bash
cp .env.example .env.local
# Edit .env.local and set your username and password
```

`.env.local` is git-ignored — credentials are never committed to GitHub.

### 3. Run locally

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── svgs/          # Moomin SVG illustration components
│   ├── Calendar.jsx   # Monthly calendar widget
│   ├── EventCard.jsx  # Individual event card with inline editing
│   └── LoginScreen.jsx
├── data/
│   └── events.js      # March 2026 schedule data
├── i18n/
│   └── translations.js
└── App.jsx
```

## Security Note

Login is client-side only — suitable for personal/family use on a private link. Credentials are stored in `.env.local` (not committed). Do not use sensitive passwords for a public-facing deployment.
