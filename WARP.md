# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Commands

- Install dependencies (Node/Express app):
  - `npm install`
- Start the server (serves both the API and the static frontend on the same port):
  - `npm start` (runs `node server.js`)
  - Or directly: `node server.js`
- Change the port (default is 3000):
  - PowerShell example: `$env:PORT = 4000; npm start`

As of January 6, 2026 there are no `test` or `lint` scripts defined in `package.json`. If a test runner (e.g. Jest) or linter (e.g. ESLint) is added, update this file with the exact commands for running the full suite and a single test file.

Manual testing workflow:

1. Start the server with one of the commands above.
2. Open `http://localhost:<PORT>` in a browser (default `http://localhost:3000`).
3. Use the UI buttons to verify number/alphabet behavior.

## Architecture Overview

### High-level structure

- **Backend**: Minimal Node/Express server in `server.js`.
- **Frontend**: Static assets in `public/` (plain HTML/CSS/JavaScript, no build step).
- **State**: In-memory counters on the server for numbers and letters; simple UI state in the browser for the current mode.

### Backend (Express server)

- Entry point: `server.js`.
- Uses `express.static` to serve everything under `public/` from the root URL (`/`).
- Maintains module-level state:
  - `currentNumber` (0–9, loops modulo 10).
  - `currentLetterIndex` (index into `letters`, an array of `A`–`Z`, loops modulo 26).
- Exposes two JSON endpoints:
  - `GET /api/next-number`
    - Increments `currentNumber` and responds with `{ value: <number>, mode: 'number' }`.
  - `GET /api/next-letter`
    - Increments `currentLetterIndex` and responds with `{ value: <letter>, mode: 'alphabet' }`.
- The same in-memory counters are shared across all clients and reset when the process restarts.

### Frontend (public/)

- `public/index.html`
  - Simple single-page UI: title, current display value, current mode label, and two buttons: **Switch mode** and **Next**.
  - Includes `styles.css` for basic layout/theming and `script.js` for behavior.
- `public/script.js`
  - Tracks a single piece of client-side state: `currentMode` (`'number'` or `'alphabet'`).
  - `updateModeLabel()` updates the on-page mode label and the toggle button text based on `currentMode`.
  - `fetchNextValue()` chooses the backend endpoint based on `currentMode`:
    - `'number'` → `/api/next-number`
    - `'alphabet'` → `/api/next-letter`
    - Uses `fetch`, parses JSON, and writes `data.value` into the main display.
  - Event listeners:
    - Mode toggle button: flips `currentMode` and calls `updateModeLabel()`.
    - Next button: calls `fetchNextValue()` to retrieve and display the next value.
  - On load, initializes the UI by calling `updateModeLabel()`.
- `public/styles.css`
  - Basic centering and card-style layout for the app container.
  - Styling for the display, mode text, and primary/secondary buttons.

### Where to modify behavior

- **Change API logic or value sequences**: edit the handlers and state variables in `server.js`.
- **Adjust routing or static file behavior**: modify the Express configuration in `server.js` (e.g., `express.static` or additional routes).
- **Change UI layout or text**: edit `public/index.html` and/or `public/styles.css`.
- **Change how the client interacts with the server** (e.g., new modes, different endpoints, error handling): edit `public/script.js`.
