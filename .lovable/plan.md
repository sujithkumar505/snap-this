# Cloudwise interface refinement

## Goal
Polish the existing frontend across 375px and 1280px while preserving scoring, types, mock/API behavior, routes, and data contracts.

## Build
1. **System and shell**
   - Standardize spacing, radii, typography, elevation, focus states, page fades, skeletons, and minimum 44px tap targets.
   - Add a system-aware light/dark toggle, use Lucide icons at 1.5 stroke width, and keep charts, badges, and the compact demo-data popover legible in both themes.
   - Add shared toast feedback without adding dependencies.

2. **Overview**
   - Recompose the first screen around a cost-versus-carbon scatter with Cost-first, Green-first, and Balanced controls that move the highlighted recommendation.
   - Keep the analysis action visible on mobile, vary the benefit layouts, and add a three-step process plus data-transparency note.

3. **Configuration**
   - Split inputs into Workload, Resources, Usage, and Location and performance.
   - Add field units, steppers, helpful ranges, actionable validation, and a desktop sticky live summary with weight bar and submission action.
   - Add a clear disabled reason and four-stage animated analysis progress state.

4. **Results**
   - Enlarge recommendation cards with deltas, score visuals, performance meters, reasons, and combined winner tags.
   - Add a computed two-sided trade-off strip, aligned provider comparison, labeled accessible charts, and desktop section navigation.
   - Preserve the chart/table switch and methodology disclosure.

5. **Comparison**
   - Add desktop sticky headers/first column, zebra rows, active sort indicators, provider filters, and a column visibility menu.
   - Replace the clipped mobile table with readable configuration cards.
   - Upgrade the 2–4 item comparison drawer with aligned metrics and best-value labels.

6. **History**
   - Add search and newest/lowest-cost/lowest-carbon sorting.
   - Improve result chips and mobile alignment, add a simple illustrated empty state, and replace confirmation-only deletion with undo toast feedback.

7. **Verification**
   - Recheck every page at 375px and 1280px, keyboard/focus behavior, dark mode, interactive flows, and browser errors.
   - Run the project typecheck and production build, fixing any regression without changing protected logic or contracts.

## Technical constraints
- Frontend-only; no backend, data changes, route changes, or new packages.
- Do not edit `src/lib/scoring.ts`, `src/types`, `src/api`, or `src/mock`.
- Use the existing React, Tailwind, Lucide, and installed chart tooling only.
