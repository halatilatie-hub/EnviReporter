# Tshwane Bus Route Finder - Implementation Plan

## Overview
This project will be built as a Nuxt + Vue web application first, so the route-search experience can be validated quickly on mobile and desktop. After the MVP is working, it can be wrapped later with a mobile shell such as Capacitor to prepare for Android and iOS app-store distribution.

The first version focuses on a simple, reliable MVP that demonstrates route matching, map interaction, and bus recommendations without requiring a full live transit backend.

## Objective
Build a usable prototype where a user can:
- load a map in the app
- search for a place or destination
- see nearby bus stops and relevant routes
- get ranked bus suggestions for their trip
- view trip details such as boarding stop, route, and walking distance

## Recommended Tech Stack
- Nuxt 3
- Vue 3
- TypeScript
- Tailwind CSS
- Leaflet for map rendering
- Nominatim or Mapbox for geocoding/search
- Turf.js (optional but useful for distance and route proximity calculations)
- Local JSON or server-side route dataset for MVP data
- Capacitor or equivalent mobile wrapper for later app-store packaging

## Phase 1: Project Setup
### Tasks
1. Initialize a Nuxt 3 app with TypeScript support.
2. Add Tailwind CSS for app styling.
3. Install map dependencies and set up the project structure.
4. Configure environment variables for map and geocoding APIs.
5. Create the base app layout and main page shell.

### Deliverables
- working Nuxt app running locally
- base UI shell
- map container ready for route display

## Phase 2: Data Model and Bus Dataset
### Tasks
1. Define route and stop data structures.
2. Create a local Tshwane bus dataset with sample routes and stops.
3. Include route names, stop coordinates, frequency, and approximate travel times.
4. Validate the dataset structure for use in search and ranking logic.

### Suggested Data Fields
- routeId
- routeName
- stopId
- stopName
- latitude
- longitude
- corridorName
- travelTimeMinutes
- frequencyMinutes
- direction

### Deliverables
- working transit dataset for the prototype
- reusable types/interfaces for routes and stops

## Phase 3: Search and Map Interaction
### Tasks
1. Add a destination search field with text input.
2. Implement geocoding lookup for place search.
3. Place the user origin and destination on the map.
4. Display nearby bus stops and selected bus routes.
5. Add route highlighting and map marker behavior.

### Deliverables
- map loads correctly
- destination search returns a result
- origin and destination are visible on the map

## Phase 4: Route Matching Logic
### Tasks
1. Estimate the nearest relevant bus stops to the user origin and destination.
2. Match a destination area to the most likely bus corridors.
3. Rank routes by relevance using distance, stop proximity, and direction.
4. Calculate walking distance and estimated journey time.
5. Return top suggestions in a stable, explainable order.

### Recommended Ranking Logic
- nearest boarding stop to origin
- minimal walking distance to bus stop
- route alignment with destination area
- fewer transfers when possible
- strongest route coverage for the destination

### Deliverables
- route recommendation logic in a reusable service or composable
- ranked results based on realistic transit heuristics

## Phase 5: Bus Suggestion UI
### Tasks
1. Build a suggestion panel listing top buses.
2. Display route name, boarding stop, destination stop, and travel time.
3. Show walking distance and frequency when available.
4. Add loading, empty, and error states.
5. Make recommendations readable on mobile and desktop screens.

### Deliverables
- route recommendation cards
- clear bus recommendation list
- polished, usable interface

## Phase 6: Integration and Testing
### Tasks
1. Connect the search input to route recommendations.
2. Link map markers to suggestion cards.
3. Test different destination searches across Tshwane areas.
4. Ensure the app handles missing route data gracefully.
5. Fix UI issues and improve overall user flow.

### Validation Checklist
- app starts successfully
- map renders correctly
- search finds valid destinations
- recommendations are relevant
- route cards reflect search results
- app remains usable in mobile layout

## Phase 7: Future Enhancements
### Optional Next Steps
- integrate a real transport API or backend data source
- add live bus schedules and trip time updates
- support saved favorite destinations
- allow route planning with transfers and walking segments
- add a dark mode or improved filtering options

## Recommended MVP Scope
For the first version, keep the product focused on:
- map view
- start and destination search
- nearest bus stop identification
- ranked route suggestions
- simple, understandable route details
- mobile-first commuter usability

This is enough to validate the core use case without overbuilding before the app is tested with real users.

## Delivery Strategy
The app will be built as a Nuxt + Vue product first so the product can be tested quickly and iterated easily. After the web MVP is stable, the same app will be wrapped in a mobile shell for Android and iOS distribution, enabling future app-store release without redesigning the core experience.

## Success Criteria
The MVP is successful when:
1. a user can open the map and search a destination
2. the app shows relevant bus routes in the area
3. the list of suggested buses is ranked sensibly
4. the user can understand which route to take and where to board
