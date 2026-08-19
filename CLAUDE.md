# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A minimal Node.js/Express demo app ("Haikus for Codespaces") based on the Azure `nodejs-docs-hello-world` sample. It renders a single page of dog haikus (`haikus.json`) behind a simple session-based login. Its purpose is to demo GitHub Codespaces, not to be a real product — keep changes small and in keeping with that "quick demo template" spirit.

## Commands

- `npm install` — install dependencies
- `npm start` — run the server (`node index.js`), listens on `PORT` env var or `3000`
- `npm run dev` — run with `nodemon` for auto-restart on file changes

There is no test suite, linter, or build step configured in this repo.

## Architecture

- `index.js` — the entire application: Express app setup, session middleware, auth routes (`GET/POST /login`, `POST /logout`), and the single protected route `GET /` that renders `views/index.ejs` with haiku data.
- `haikus.json` — array of `{ text, image }` objects; `image` is a filename resolved against `public/images/`.
- `views/*.ejs` — EJS templates (`index.ejs` for the haiku list, `login.ejs` for the login form).
- `public/` — static assets (CSS, images) served directly by `express.static`.
- `web.config` / `process.json` — deployment configs for IIS/iisnode (Azure App Service) and PM2, respectively; not used in local dev.

### Auth model

Login is a simple username/password check against env vars, backed by `express-session`:
- `AUTH_USERNAME` / `AUTH_PASSWORD` — credentials; default to `admin`/`admin` with a console warning if unset. Never rely on the default outside local demos.
- `SESSION_SECRET` — session cookie signing secret; defaults to a hardcoded dev value if unset.
- Credential comparison uses `crypto.timingSafeEqual` (via a local `timingSafeEqual` helper) to avoid timing attacks, and the session ID is regenerated on successful login (`req.session.regenerate`) to prevent session fixation.
- All routes other than `/login` and static assets are gated by the `requireAuth` middleware, which redirects unauthenticated requests to `/login`.
