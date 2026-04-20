# Specification: NetMovies Wishlist & Advanced Search Upgrade

## Version
v1.1 – Feature Expansion & UX Enhancements

## Overview
This upgrade merges wishlist centralization, person-based discovery, advanced people search, and improved trailer playback into a single feature change.
Users will be able to save movies in one place, explore filmographies by actor and crew, and find content through unified movie and people search.

## Goals
- Improve content discoverability
- Increase user engagement and session duration
- Enable actor and crew-focused exploration
- Enhance trailer playback experience
- Make Wishlist a first-class feature

## Summary of Changes

### ✅ Added
- Wishlist Page (`/wishlist`)
- Person Details Page (`/person/:personId`)
- Advanced people-based search support
- Trailer overlay playback on movie posters

### 🔁 Enhanced
- Trailer UX and playback handling
- Search experience and result handling
- Movie Details cast/crew navigation
- Watchlist persistence and visibility

### ♻️ Existing (Unchanged)
- Trending movies (Home)
- Top Movies
- Movie Details page structure
- Core movie card layout

## Routes
- `/` — Home / Trending movies
- `/top-rated` — Top rated movies
- `/search` — Advanced search page
- `/movie/:movieId` — Movie Details page
- `/wishlist` — Wishlist page
- `/person/:personId` — Person Details page

## Feature Details

### Wishlist Page
- Displays all saved movies in a grid
- Reuses existing movie card UI
- Supports remove from wishlist and navigation to movie details
- Empty state: “Your wishlist is empty. Start discovering movies!”
- Local persistence via `localStorage` key `netmovies_wishlist[]`

### Trailer Playback UX
- Movie poster shows a play overlay when trailer exists
- Clicking play opens an inline overlay with embedded video
- Fullscreen toggle available in the overlay
- ESC or close button exits playback
- If no trailer exists, hide play affordance and show a message

### Person Details & Filmography
- Cast and crew names/images on movie details are clickable
- Person page includes profile image, department, biography, and top movie credits
- Movie cards are reused for credits
- Clicking a credit navigates to movie details
- Placeholder image used if profile photo is missing

### Advanced Search
- Search supports movies, actors/actresses, directors, producers, and crew
- Single unified search input
- Results are separated into Movies and People tabs
- Sorting by popularity for both result types
- Movie result → Movie Details page
- Person result → Person Details page

## API Integration
- `/movie/{movie_id}` — Movie details
- `/movie/{movie_id}/videos` — Trailer videos
- `/movie/{movie_id}/credits` — Cast and crew
- `/movie/{movie_id}/similar` — Recommendations
- `/search/person` — People search
- `/person/{person_id}` — Person details
- `/person/{person_id}/movie_credits` — Person filmography

## UX Requirements
- Keyboard navigable controls and overlays
- Proper ARIA labels for buttons and interactive elements
- Alt text for all images
- Mobile-first responsive layout
- Lazy-load trailers and large images
- Friendly empty states and retry UI for failures

## Acceptance Criteria
- ✅ Wishlist page is visible and functional
- ✅ Trailer overlay works with fullscreen playback
- ✅ Person navigation is active and clickable
- ✅ Search supports movie and people discovery
- ✅ Mobile UX is intact
