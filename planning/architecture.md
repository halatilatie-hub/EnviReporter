# EnviReporter Architecture Notes

## Coding standards

- Keep separation of concerns in the Vue app structure.
- Components should contain markup and logic only; avoid inline CSS within component files.
- Place styling in dedicated stylesheet files, preferably under a dedicated styles folder or shared design layer.
- Maintain the current MVC-style organization: components, composables, controllers, models, services, views, stores, utils.
- Keep domain logic separate from presentation logic.
- Do not start implementation until the project structure and styling approach are approved.
- Prefer external CSS or SCSS files, or a global design system, rather than component-scoped CSS in the same file.

## Styling rule

The project will not mix CSS directly into Vue component files during implementation. Styling will be kept in a separate design layer to preserve readability and maintainability.

## API boundary rule

- All sensitive API integrations and protected backend logic must live on the server side.
- Client-side code must not expose API keys, credentials, service secrets, or direct backend integration logic.
- External data access such as geocoding, route matching, and transit lookup will be handled via server-side endpoints or server utilities.
- The browser should only consume safe, minimal data responses and never learn the internal backend implementation details.
