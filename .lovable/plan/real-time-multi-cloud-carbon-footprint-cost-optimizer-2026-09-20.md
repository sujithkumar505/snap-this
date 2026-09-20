# Real-Time Multi-Cloud Carbon Footprint & Cost Optimizer

## Outcome
Build the requested frontend-only SaaS experience with mock data, computed recommendations, responsive screens, and local history.

## Work
- Establish the product design system and responsive application shell with navigation, typography, semantic color tokens, demo-data banner, and shared UI patterns.
- Add strict domain types, pure scoring logic, mock candidate generation, API-ready client interfaces, local history storage, and seeded demo analyses.
- Build the landing page and workload configuration form with validation, linked priority sliders, presets, and loading state.
- Build results with computed recommendation cards, comparison metrics, charts, methodology disclosure, and unknown/loading/error states.
- Build compare with filtering, sorting, selectable rows, side-by-side selection, and CSV export.
- Build history with seeded entries, detail links, and delete/clear confirmations.
- Add route metadata, environment example, and scoring tests.

## Technical details
- TanStack Router route files for `/`, `/configure`, `/results/$id`, `/compare/$id`, and `/history`.
- Mock-only data stays isolated under `src/mock` and `src/api`; components consume the client interface.
- Recommendations always derive from `src/lib/scoring.ts`; no provider winner is hard-coded.
- All metric values carry source metadata and surface a compact transparency popover.
- No backend, auth, cloud APIs, or persistence beyond the local history store.
