# Feature Specification: Responsive Enhancement for Movie Database Website

**Feature Branch**: `003-responsive-enhancement`  
**Created**: April 24, 2026  
**Status**: Draft  
**Input**: User description: "Correct below specs according to existing website and rewrite at new 003 specs - Mobile phone responsiveness, Responsive trailer placement, Layout consistency across devices"

## 1. Purpose of This SpecKit

This SpecKit defines mandatory rules, layout principles, CSS behaviors, and acceptance criteria to ensure the existing Movie List Database website:

- Works perfectly on mobile phones
- Displays trailers responsively
- Avoids layout breakage on small screens
- Follows mobile-first design logic
- Remains scalable for future content

This document does NOT redesign the site, it standardizes and fixes responsiveness.

## 2. Responsive Design Philosophy

### Core Principles

- Mobile-first overrides
- No fixed widths for content containers
- Media must scale fluidly
- UI must be touch-friendly
- Content must stack gracefully

### Required Techniques

- ✅ CSS Flexbox
- ✅ CSS Grid
- ✅ Relative units (%, vw, vh, rem)
- ✅ Aspect-ratio based embeds
- ✅ Media queries for enhancement only

## 3. Supported Devices (Mandatory)

| Device Type | Min Width |
|-------------|-----------|
| Small Mobile | 320px |
| Standard Mobile | 360–430px |
| Tablet | 768px |
| Desktop | 1024px+ |

✅ Mobile phones are the PRIMARY target

## 4. Global Responsive Rules (Site-Wide)

### 4.1 Layout Container Rules

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  max-width: 100vw;
  overflow-x: hidden;
}
```

❌ No horizontal scrolling allowed  
❌ No fixed pixel page widths

### 4.2 Typography Responsiveness

```css
html {
  font-size: clamp(14px, 2.5vw, 16px);
}

h1 { font-size: clamp(1.4rem, 4vw, 2.2rem); }
h2 { font-size: clamp(1.2rem, 3.5vw, 1.8rem); }
p  { font-size: clamp(0.95rem, 2.5vw, 1.1rem); }
```

✅ Text must remain readable without zooming  
✅ No text overflow or clipping

## 5. Page-by-Page Responsive Requirements

### 5.1 Home Page

**Mobile Layout Rules**

- All sections stacked vertically
- Featured movies shown as horizontal scroll OR single column
- Search bar always visible

**Featured Movie Cards**

- Minimum touch size: 44px
- Poster images scale proportionally

```css
.featured-section {
  display: flex;
  overflow-x: auto;
  gap: 1rem;
}
```

✅ No grid overflow on mobile  
✅ No multi-column squeezing

### 5.2 Movie List Page

**Grid Behavior**

| Screen | Columns |
|--------|---------|
| Mobile | 1 |
| Tablet | 2–3 |
| Desktop | 4–6 |

```css
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
}
```

✅ Cards must not shrink below content  
✅ Titles must wrap, not overflow

### 5.3 Movie Detail Page (Critical)

**Content Order on Mobile (MANDATORY)**

1. Trailer
2. Movie Title
3. Rating / Year / Runtime
4. Description
5. Cast
6. Similar Movies

✅ Trailer always comes FIRST on mobile

## 6. Responsive Trailer Placement (Mandatory Standard)

This is the single official way trailers may be embedded.

### 6.1 Trailer Container (HTML)

```html
<div class="trailer-wrapper">
  <iframe
    src="https://www.youtube.com/embed/TRAILER_ID"
    title="Movie Trailer"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
</div>
```

❌ Never embed iframe directly without wrapper  
❌ Never use fixed width/height on iframe

### 6.2 Trailer CSS (Required)

```css
.trailer-wrapper {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 aspect ratio */
  margin-bottom: 1rem;
  background: #000;
}

.trailer-wrapper iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 12px;
}
```

### 6.3 Trailer Acceptance Criteria ✅

- ✅ Always fits screen width
- ✅ No cropping on orientation change
- ✅ No horizontal scrolling
- ✅ Works on 320px width screens
- ✅ Maintains 16:9 ratio
- ✅ Touch controls accessible

## 7. Images & Posters Responsiveness

### Poster Rules

```css
.movie-card img {
  width: 100%;
  height: auto;
  aspect-ratio: 2 / 3;
  object-fit: cover;
}
```

✅ Images never stretch  
✅ Layout does not shift during load

### Lazy Loading

```html
<img src="poster.webp" loading="lazy" alt="Movie Title" />
```

## 8. Navigation (Mobile Priority)

**Mandatory Behavior**

- Navigation must be reachable with one hand
- No tiny links
- Sticky or hamburger allowed

```css
nav a {
  padding: 0.75rem 1rem;
  min-height: 44px;
}
```

✅ WCAG touch compliance

## 9. Search & Filters (Responsive)

**Mobile Behavior**

- Filters hidden by default
- Slide-up or modal drawer
- Full-width inputs

```css
@media (max-width: 768px) {
  .filters {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}
```

## 10. Performance Rules

- ✅ Trailers loaded lazily when page visible
- ✅ Images optimized (WebP preferred)
- ✅ No blocking JS on first load

## 11. Accessibility Requirements

- Proper heading hierarchy
- Descriptive alt text
- Contrast ≥ 4.5:1
- Trailer playable via keyboard

## 12. Responsive Testing Checklist ✅

Must pass on:

- ✅ Android Chrome
- ✅ iPhone Safari
- ✅ Portrait & landscape
- ✅ 320px screen width
- ✅ Slow network simulation

## 13. Non-Negotiable Fail Conditions ❌

Site FAILS spec if:

- Trailer overflows screen
- Horizontal scroll appears
- Text becomes unreadable
- Touch targets are too small
- Cards overlap

## 14. Maintenance Rule

Any new page, component, or embed:

MUST follow this SpecKit before release

## 15. Final Statement

This SpecKit acts as the single source of truth for:

- Mobile responsiveness
- Trailer embedding
- Layout consistency
- Future scalability

---

## User Scenarios & Testing (mandatory)

### User Story 1 - Mobile Viewport Compatibility (Priority: P1)

As a mobile user, I want the movie website to display properly on my phone so that I can browse movies without horizontal scrolling or layout breakage.

**Why this priority**: Mobile traffic is primary target; broken mobile experience loses most users.

**Independent Test**: Can be tested by opening the website on a 320px width mobile viewport and verifying no horizontal scroll, all content readable.

**Acceptance Scenarios**:

1. **Given** the website is opened on a 320px mobile screen, **When** the page loads, **Then** no horizontal scrollbar appears.
2. **Given** the website is opened on a mobile device, **When** I rotate to landscape mode, **Then** the layout adapts without breaking.
3. **Given** I am viewing the movie grid on mobile, **When** the screen is narrow, **Then** movies display in a single column.

### User Story 2 - Responsive Trailer Playback (Priority: P1)

As a mobile user, I want to watch movie trailers without them being cut off or requiring horizontal scrolling.

**Why this priority**: Trailers are key engagement feature; must work on all screen sizes.

**Independent Test**: Can be tested by opening a movie detail page on mobile and verifying trailer fits within viewport.

**Acceptance Scenarios**:

1. **Given** I am on a movie detail page with a trailer, **When** the page loads on a 320px screen, **Then** the trailer is fully visible without horizontal scroll.
2. **Given** I am watching a trailer on mobile, **When** I rotate the device to landscape, **Then** the trailer maintains 16:9 aspect ratio.
3. **Given** I tap the trailer play button, **When** the trailer starts playing, **Then** the iframe fills the container properly.

### User Story 3 - Touch-Friendly Navigation (Priority: P2)

As a mobile user, I want to be able to tap navigation links easily without accidentally tapping the wrong item.

**Why this priority**: Poor touch targets lead to user frustration and abandoned sessions.

**Independent Test**: Can be tested by using the navigation on a touch device and verifying all links are easily tappable.

**Acceptance Scenarios**:

1. **Given** I am on mobile, **When** I tap a navigation link, **Then** the touch target is at least 44px tall.
2. **Given** I am on mobile, **When** I scroll down the page, **Then** the navigation remains accessible (sticky header).

### User Story 4 - Readable Text on All Devices (Priority: P2)

As a mobile user, I want to read movie titles and descriptions without zooming in.

**Why this priority**: Users should not need to pinch-zoom to read content; poor readability = high bounce rate.

**Independent Test**: Can be tested by viewing content on smallest supported screen (320px) without zooming.

**Acceptance Scenarios**:

1. **Given** I am on a 320px screen, **When** I view a movie title, **Then** the text is at least 14px and readable.
2. **Given** I am on a 320px screen, **When** I view a movie description, **Then** the text wraps properly without being cut off.

### User Story 5 - Consistent Layout Across Devices (Priority: P3)

As a user, I want the website to look consistent whether I'm on phone, tablet, or desktop.

**Why this priority**: Inconsistent layouts create confusion and reduce brand trust.

**Independent Test**: Can be tested by viewing the same page on mobile, tablet, and desktop.

**Acceptance Scenarios**:

1. **Given** I view the home page on mobile and desktop, **When** I compare the layouts, **Then** the visual hierarchy is consistent (header → content → footer).
2. **Given** I view the movie detail page on mobile and desktop, **When** I compare the content order, **Then** trailer appears first on both.

---

## Requirements (mandatory)

### Functional Requirements

1. **FR-001**: Website must render correctly on screens from 320px to 1920px width
2. **FR-002**: All touch targets must be minimum 44px in both dimensions
3. **FR-003**: Trailer embeds must use responsive wrapper with 16:9 aspect ratio
4. **FR-004**: Movie grid must collapse to single column below 768px
5. **FR-005**: Navigation must remain accessible on mobile (sticky or hamburger)
6. **FR-006**: Text must use relative units (rem, em, vw) for scalability
7. **FR-007**: Images must use lazy loading to improve performance
8. **FR-008**: No horizontal scrolling allowed at any viewport width

### Non-Functional Requirements

1. **NFR-001**: Page must pass Lighthouse mobile accessibility check ≥ 90
2. **NFR-002**: First Contentful Paint (FCP) must be under 1.5s on 3G
3. **NFR-003**: All interactive elements must be keyboard accessible
4. **NFR-004**: Color contrast must meet WCAG 2.1 AA standard (4.5:1)

---

## Implementation Notes (for tasks.md)

### Current Codebase Analysis

The existing codebase at `src/styles/main.css` already implements:

- ✅ Box-sizing: border-box (line 1-3)
- ✅ CSS Grid for movie-grid (line 103-106)
- ✅ Relative gap units (1.5rem)
- ✅ Aspect-ratio on movie-card (line 117)
- ✅ Object-fit: cover on posters (line 136)

The existing codebase needs fixes for:

- ❌ Header uses fixed padding (3rem) - needs mobile adjustment
- ❌ Main-content uses fixed padding (3rem) - needs mobile adjustment
- ❌ Movie grid minmax(220px) - too large for mobile
- ❌ Trailer component uses direct iframe without responsive wrapper
- ❌ No media queries for mobile breakpoints

### Key Files to Modify

1. `src/styles/main.css` - Add mobile media queries
2. `src/components/Trailer.tsx` - Update to use responsive wrapper
3. `src/components/MovieCard.tsx` - Ensure lazy loading
4. `src/App.tsx` - Header may need hamburger for mobile

---

## Acceptance Criteria Summary

| ID | Criterion | Test Method |
|----|-----------|-------------|
| AC-001 | No horizontal scroll on 320px viewport | Manual: open dev tools, set to 320px, check scrollbar |
| AC-002 | Trailer fits within viewport | Manual: open movie detail, verify trailer width = 100% |
| AC-003 | Touch targets ≥ 44px | Manual: inspect nav links in dev tools |
| AC-004 | Text readable without zoom | Manual: view on 320px device, verify readability |
| AC-005 | Movie grid single column on mobile | Manual: resize viewport below 768px |
| AC-006 | Navigation accessible on mobile | Manual: test sticky header or hamburger menu |
| AC-007 | Images lazy load | Manual: check network tab for lazy loading |
| AC-008 | Keyboard accessible | Manual: tab through interactive elements |