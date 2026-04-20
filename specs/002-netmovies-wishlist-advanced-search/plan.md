# Plan: NetMovies Wishlist & Advanced Search Upgrade

## Feature
NetMovies Wishlist & Advanced Search Upgrade

## Context
This feature expands the current movie discovery experience to include a centralized wishlist, person-based discovery, and advanced TMDB search for people.

## Objectives
- Build wishlist page and sync it across the app
- Add person detail navigation from cast/crew
- Enhance search with movie and people results
- Improve trailer playback UX using overlay-based players

## Technical Stack
- React 19
- TypeScript 6
- Vite 8
- React Router DOM
- TMDB API

## Architecture
- `src/api/tmdb.ts` for all TMDB calls
- `src/hooks/useWatchlist.ts` to manage wishlist persistence
- `src/hooks/useMovieDetail.ts` extended for trailers and credits
- `src/pages` for Movie Details, Search, Wishlist, Person Details
- `src/components` for reusable UI: `MovieCard`, `Trailer`, `PersonCard`, `WatchlistButton`

## Implementation Notes
- Keep API functions modular and typed
- Use localStorage for wishlist persistence in Phase 1
- Reuse existing card and grid layouts where possible
- Add accessible overlay patterns for trailer playback
- Separate movie and people results in search

## Success Metrics
- Wishlist page renders quickly from persisted data
- Person detail navigation works from movie detail pages
- Search returns movies and people correctly
- Trailer modal is responsive and keyboard-friendly

## Documentation
- Add/update `CHANGELOG.md` and `UPGRADE_NOTES.md`
- Keep `specs/002-netmovies-wishlist-advanced-search` as feature docs
- Update `README.md` if feature list needs expansion
