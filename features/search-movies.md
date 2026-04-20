# Feature: Search Movies

## Overview
Allows users to search for movies by title.

## User Flow
1. User enters text in search input
2. User submits search query
3. Matching movies are displayed
4. User selects a movie to view details

## Functional Requirements
- Provide search input field
- Fetch search results from API
- Display matching movies in a list or grid

## API Usage
- Endpoint: Search movies API
- Query parameter: movie title

## UI Behavior
- Display loading indicator during search
- Show message if no results are found

## Error Handling
- Handle empty queries
- Handle API failures

## Acceptance Criteria
- Search returns relevant movies
- Empty state is handled
- User can navigate to movie details
