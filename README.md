# EnviReporter

EnviReporter is a Nuxt + Vue application for exploring route options in Pretoria and surrounding Tshwane areas. The project focuses on a map-first commuter experience with a header, search, route suggestions, and a clear app shell.

## Current project status

The app is currently in an MVP/prototype phase with the following implemented:

- OpenStreetMap-based Leaflet map rendering
- Pretoria default map centre on startup
- Search entry from the map interface
- Route suggestion panel shown only after a search
- Header and footer layout around the main map area
- Component-specific styling kept under the assets folder
- Runtime-configured route API integration so the app is not hard-coded with sample route data
- Nuxt SSR-safe browser-only map loading

## Core features

- Search for a destination or area
- View the selected area on the map
- See relevant route suggestions based on live data available from the configured backend/API
- Display route details such as route number, boarding stop, destination stop, walking distance, and travel time
- Keep the interface responsive and map-focused without cluttered overlays

## Tech stack

- Nuxt 4
- Vue 3
- TypeScript
- Leaflet + OpenStreetMap tiles
- CSS modules/asset-scoped styles in the app assets directory

## Project structure

The source is organized under [src](src):

- [src/assets](src/assets) — global theme styles and component-specific CSS files
- [src/components](src/components) — reusable UI pieces such as header, footer, map, route list, and search controls
- [src/composables](src/composables) — shared search state and route logic
- [src/controllers](src/controllers) — orchestration between UI and service layer
- [src/models](src/models) — domain/data structure definitions
- [src/pages](src/pages) — page-level composition
- [src/services](src/services) — route retrieval and backend integration layer
- [src/utils](src/utils) — helper constants and shared defaults such as Pretoria coordinates
- [src/types](src/types) — shared TypeScript interfaces

## App behaviour

- Default search term and map centre are set to Pretoria
- The user can enter a destination and trigger route lookup
- The map updates markers based on route results returned by the configured API
- The route list is hidden until a search has taken place
- The app is designed to work with a real route provider rather than static sample data

## Configuration

The app exposes a runtime config value for the route API base URL:

```bash
NUXT_PUBLIC_ROUTE_API_BASE_URL=https://your-api.example.com
```

The service layer uses this base URL to call the route search endpoint, which should respond with route search results compatible with the project data model.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Container support

Docker configuration is included for local container-based runs:

- [Dockerfile](Dockerfile)
- [docker-compose.yml](docker-compose.yml)
- [.dockerignore](.dockerignore)

## Planning and architecture notes

Additional planning and architecture guidance live in the [planning](planning) folder, including the app structure, implementation milestones, and integration approach.

## Notes

This project is intentionally structured to separate UI, logic, and data access, and to avoid embedding static route data into the application layer. Live route data should be provided by the backend or external transit service configured in the environment.
