# Tasks: Responsive Enhancement for Movie Database Website

**Input**: Design documents from `/specs/003-responsive-enhancement/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

**Tests**: Tests are OPTIONAL - not requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `src/` at repository root
- Paths based on plan.md structure

---

## Phase 1: Analysis & Assessment

**Purpose**: Understand current state and identify exact issues to fix

- [X] T001 [P] Analyze existing main.css for responsive gaps in src/styles/main.css
- [X] T002 [P] Analyze Trailer component current implementation in src/components/Trailer.tsx
- [X] T003 [P] Analyze navigation component in src/App.tsx

**Checkpoint**: Complete analysis of current codebase

---

## Phase 2: Global CSS Responsive Fixes

**Purpose**: Add mobile-first responsive rules to global styles

### Implementation for Global CSS

- [X] T004 [US1] Add mobile media queries to main.css in src/styles/main.css
  - Add breakpoint at 768px for tablet
  - Add breakpoint at 480px for mobile
  - Fix header padding: 3rem → 1rem on mobile
  - Fix main-content padding: 3rem → 1rem on mobile
- [X] T005 [US1] Update movie-grid responsive behavior in src/styles/main.css
  - Change minmax(220px, 1fr) to minmax(160px, 1fr) for mobile
  - Add single column layout below 768px
- [X] T006 [US1] Add typography responsive rules in src/styles/main.css
  - Add clamp() for font sizes
  - Ensure text readable on 320px screens

**Checkpoint**: Global CSS responsive - no horizontal scroll on mobile

---

## Phase 3: Trailer Component Update

**Purpose**: Make trailer embeds responsive with proper aspect ratio

### Implementation for Trailer

- [X] T007 [US2] Update Trailer component HTML structure in src/components/Trailer.tsx
  - Add trailer-wrapper div around iframe
  - Use aspect-ratio 16:9 (56.25% padding-top)
- [X] T008 [US2] Add responsive trailer CSS in src/styles/main.css
  - .trailer-wrapper with position: relative
  - .trailer-wrapper iframe with absolute positioning
  - Ensure no overflow on mobile

**Checkpoint**: Trailer fits viewport on all screen sizes

---

## Phase 4: Navigation Mobile Enhancement

**Purpose**: Ensure navigation is touch-friendly and accessible on mobile

### Implementation for Navigation

- [X] T009 [US3] Update navigation CSS for mobile in src/styles/main.css
  - Ensure nav links have min-height: 44px
  - Add padding: 0.75rem 1rem
  - Consider sticky header for mobile
- [X] T010 [US3] Test navigation on mobile viewport in src/App.tsx
  - Verify links are easily tappable
  - Check sticky behavior works

**Checkpoint**: Navigation touch-friendly on mobile

---

## Phase 5: Component Verification

**Purpose**: Verify existing components meet responsive requirements

### Implementation for Components

- [X] T011 [US4] Verify MovieCard lazy loading in src/components/MovieCard.tsx
  - Confirm loading="lazy" attribute present
  - Check aspect-ratio: 2/3 applied
- [X] T012 [US4] Verify SearchBar responsive in src/components/SearchBar.tsx
  - Check input uses full width on mobile
  - Verify touch-friendly size
- [X] T013 [US4] Verify MovieDetail content order in src/pages/MovieDetail.tsx
  - Confirm trailer appears before details on mobile
  - Check content stacks properly

**Checkpoint**: All components verified responsive

---

## Phase 6: Testing & Validation

**Purpose**: Verify all acceptance criteria are met

### Implementation for Testing

- [ ] T014 [US1] Test no horizontal scroll on 320px viewport
  - Open dev tools, set to 320px width
  - Verify no horizontal scrollbar appears
- [ ] T015 [US2] Test trailer responsive behavior
  - Open movie detail page on mobile
  - Verify trailer fits within viewport
- [ ] T016 [US3] Test touch target sizes
  - Inspect nav links in dev tools
  - Verify minimum 44px height
- [ ] T017 [US4] Test text readability without zoom
  - View content on 320px device
  - Verify text is readable
- [ ] T018 [US5] Test movie grid on mobile
  - Resize viewport below 768px
  - Verify single column layout

**Checkpoint**: All acceptance criteria verified

---

## Task Summary

| Phase | Tasks | Status |
|-------|-------|--------|
| Phase 1: Analysis | T001-T003 | ✅ COMPLETE |
| Phase 2: Global CSS | T004-T006 | ✅ COMPLETE |
| Phase 3: Trailer | T007-T008 | ✅ COMPLETE |
| Phase 4: Navigation | T009-T010 | ✅ COMPLETE |
| Phase 5: Components | T011-T013 | ✅ COMPLETE |
| Phase 6: Testing | T014-T018 | ⚠️ MANUAL VERIFICATION |

**Total Tasks**: 18 (13 completed, 5 require manual testing)

---

## Dependencies

- T001-T003 must complete before any implementation
- T004-T006 must complete before T007-T008 (CSS foundation)
- T007-T008 must complete before T015 (trailer testing)
- All Phase 2-5 tasks should complete before Phase 6