# Tasks: NetMovies Wishlist & Advanced Search Upgrade

## Phase 1: Planning & API
- [ ] T001 Define feature spec and acceptance criteria in `spec.md`
- [ ] T002 Update `src/api/tmdb.ts` with trailer, person, and credit endpoints

## Phase 2: Wishlist
- [ ] T003 Add wishlist storage hook in `src/hooks/useWatchlist.ts`
- [ ] T004 Build `/wishlist` page with movie grid and remove controls
- [ ] T005 Sync watchlist button state across movie details and cards

## Phase 3: Trailer UX
- [ ] T006 Implement trailer overlay component in `src/components/Trailer.tsx`
- [ ] T007 Add poster-based play overlay to movie detail and card views
- [ ] T008 Add fullscreen and close control support

## Phase 4: Person Discovery
- [ ] T009 Create `/person/:personId` page and person API hooks
- [ ] T010 Update cast/crew lists to navigate to person details
- [ ] T011 Display known-for movies and biography on person page

## Phase 5: Advanced Search
- [ ] T012 Extend search page to support movies and people tabs
- [ ] T013 Add people search mode for actors, directors, producers, crew
- [ ] T014 Sort results by popularity and support no-results fallback

## Phase 6: Polish & Documentation
- [ ] T015 Add ARIA labels, keyboard navigation, and accessibility checks
- [ ] T016 Update `CHANGELOG.md` and `UPGRADE_NOTES.md`
- [ ] T017 Add or update docs in `specs/002-netmovies-wishlist-advanced-search`
- [ ] T018 Validate mobile responsiveness and performance
