# Feature: Top Rated Movies

## Overview
This feature displays movies with the highest ratings.

## User Flow
1. User navigates to Top Rated section
2. Top rated movies are displayed
3. User selects a movie to view details

## Functional Requirements
- Fetch top rated movies from API
- Display movie poster, title, and rating
- Support pagination or scrolling if applicable

## API Usage
- Endpoint: Top rated movies API
- Data includes: id, title, poster, rating

## UI Behavior
- Consistent layout with other movie lists
- Loading indicator during data fetch

## Error Handling
- Handle API errors gracefully
- Display fallback message when no data is available

## Acceptance Criteria
- Top rated movies are displayed correctly
- Ratings are visible
- Navigation to movie detail page works