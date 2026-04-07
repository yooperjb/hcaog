# HCAOG Workspace Guidelines

## Project Overview

**HCAOG** (Humboldt County Association of Governments) is a geospatial bikeway visualization tool built with React and Mapbox GL. It displays bicycle infrastructure (routes, connectors, points of interest) across Humboldt County with interactive layer toggling, feature details, and responsive sidebar controls.

**Key Stack:**
- React 18.3.1 (Create React App) with react-map-gl v7
- Mapbox GL 2.15 with custom vector tilesets
- Three-tier context state management
- CSS Modules for scoped styling

## Build and Test

```bash
# Start development server (port 3000)
npm start

# Run tests in watch mode
npm test

# Production build
npm run build

# Deploy to GitHub Pages
npm run deploy
```

**Environment Requirements:**
- **Node.js 24.14.0** (locked via .nvmrc)
- `REACT_APP_MAPBOX_TOKEN` — Required in `.env` or environment to render the map. Get token from Mapbox account.
- Optional: adjust `MAP_DEFAULTS.viewport` in [src/config/map.js](src/config/map.js) for different geographic focus

## Recent Modernization (2026)

This project was recently modernized from its 2021 origins:

- ✅ **React 17 → 18.3.1** with createRoot API
- ✅ **react-scripts 4 → 5** (Webpack 5, Node 24 compatible)
- ✅ **@urbica/react-map-gl → react-map-gl v7** (official, maintained library)
- ✅ **Fixed React 18 Strict Mode** compatibility issues
- ✅ **Updated testing libraries** to latest versions
- ✅ **Code quality improvements** (anti-patterns, PropTypes, equality checks)
- ✅ **Modern event handling** for map interactions

## Code Style and Patterns

### React & Hooks
- Functional components throughout; consume contexts via hooks (`useGlobals()`, `useLayerVisibility()`, `useViewPort()`)
- Props destructured: `({prop1, prop2}) => (...)`
- CSS Modules for scoped styles (e.g., `style.module.css`); import as `import styles from './style.module.css'`

### Component Architecture
- **Presentational components** in `src/components/` with specific responsibilities:
  - [Sidebar](src/components/Sidebar/index.js) — renders layer toggle groups
  - [LayerToggle](src/components/LayerToggle/index.js) — **dual dispatch**: toggles visibility AND focuses layer on click
  - [FeatureInfo](src/components/FeatureInfo/index.js) — type-based rendering of route/icon properties
  - [ToolTip](src/components/ToolTip/index.js) — portal-based feature popups with overflow detection
  - [SidebarControl](src/components/SidebarControl/index.js) — responsive hamburger; hides on viewport > 992px
- See [util/layers.js](src/util/layers.js) for focus/filter logic exemplifying memoization patterns

### Context State Management

Three contexts (three-level composition in [src/index.js](src/index.js)):

| Context | State Shape | Usage Pattern |
|---------|-------------|---------------|
| **GlobalContext** | `{ showSidebar, focusedLayer }` | UI chrome state; dispatch via `useGlobals()` |
| **LayerVisibilityContext** | `{ ClassI: bool, ClassII: bool, ..., toolStations: bool }` | 9 layer toggles; dispatch via `useLayerVisibility()` |
| **ViewPortContext** | `{ width, height }` | Window size listener; access via `useViewPort()` |

**Key Convention:** Actions imported from `contexts/{ContextName}/actions.js` and dispatched to reducer. See [GlobalContext/actions.js](src/contexts/GlobalContext/actions.js) usage pattern.

⚠️ **Known Issue:** Action types use function names as strings; refactor to string constants (`'SET_FOCUSED_LAYER'`) if renaming occurs.

### Configuration & Layer Definitions

[src/config/layers.js](src/config/layers.js) uses a **factory generator pattern** for DRY layer specs:

```javascript
export const ROUTES = {
  source: SOURCES.get('bike-routes'),
  layers: [
    { id: 'ClassI', paint: { 'line-color': '#2fa021' }, layerName: 'Existing Class I' },
    { id: 'ClassII', paint: { 'line-color': '#0066ff' }, layerName: 'Existing Class II' },
    // ... mapped through buildRouteLayer factory
  ].map(buildRouteLayer),
  details: { 'ClassI': { name: 'Multi-use Path', description: '...' } }
}
```

**Sources** are defined in [src/config/sources.js](src/config/sources.js) (Mapbox tilesets + layer mappings) and **default viewport** in [src/config/map.js](src/config/map.js).

## Architecture Dependencies

### Map Orchestration ([App.js](src/App.js))
- Consumes `layerVisibility` and `focusedLayer` contexts
- Builds `mapLayerSources` by filtering visible layers and reordering focused layer to top (via [util/layers.js](src/util/layers.js))
- Renders Mapbox `<Source>` + conditional `<Layer>` components
- Applies focus styling (1.5x icon size, 2x line width) via `applyFocusStyleToLayer()`
- Click → `<Popup>` with FeatureInfo via `selectedFeature` state

### Data Flow Example: Toggling a Layer
```
User clicks LayerToggle(ClassI) 
  → dispatch(toggleVisibility('ClassI'))
  → LayerVisibilityContext reducer flips ClassI: true/false
  → App.js re-renders → filterVisibleLayers() updates
  → MapGL updates rendering
```

## Conventions That Differ from Common Practices

1. **Dual dispatch on toggle**: Click a LayerToggle to both toggle visibility *and* focus that layer
2. **Responsive sidebar**: Sidebar hides on desktop (> 992px); SidebarControl triggers map resize on toggle
3. **Layer factory pattern**: Use `makeLineLayerGenerator()` or `makeSymbolLayerGenerator()` from [src/config/layers.js](src/config/layers.js) to generate layer specs instead of hardcoding
4. **String action types**: When dispatching to context reducers, export action creator functions from `actions.js` and use as type (e.g., `setFocusedLayer(layer)`); prefer string constants for refactor safety

## Getting Started

1. **Install dependencies**: `npm install`
2. **Set Mapbox token**: Create `.env` file with `REACT_APP_MAPBOX_TOKEN=<your_token>`
3. **Start dev server**: `npm start` → opens http://localhost:3000
4. **Explore map**: Toggle layers in sidebar, click features for details

## Known Issues & Pitfalls

| Issue | Location | Fix / Workaround |
|-------|----------|-----------------|
| **Action type antipattern** | [GlobalContext/actions.js](src/contexts/GlobalContext/actions.js) | Refactor to string constants; document for safety |
| **Missing Mapbox token** | [App.js](src/App.js#L41) | Always set `REACT_APP_MAPBOX_TOKEN` env var |
| **PropTypes.element → .node** | [GlobalContext/index.js](src/contexts/GlobalContext/index.js#L18) | Use `PropTypes.node` to accept fragments |
| **Loose equality** | [util/layers.js](src/util/layers.js#L48) | Use `===` instead of `==` for comparison |
| **Template test outdated** | [App.test.js](src/App.test.js) | Remove or update test for actual features |
| **Expensive array recalculation** | [App.js](src/App.js#L38-L65) | Consider useMemo for full `mapLayerSources` array |
| **Tooltip overflow (X-axis only)** | [ToolTip/index.js](src/components/ToolTip/index.js) | Edge detection prevents horizontal overflow only; add vertical logic if needed |

## Typical Changes

### Adding a New Layer
1. Define layer spec in [src/config/layers.js](src/config/layers.js) with paint/layout properties
2. Add to `ROUTES`, `CONNECTORS`, or `ICONS` export + factory mapping
3. Add `details` entry for sidebar legend
4. Add new boolean to [LayerVisibilityContext reducer initial state](src/contexts/LayerVisibilityContext/reducer.js)
5. Add LayerToggle child in [Sidebar](src/components/Sidebar/index.js)

### Modifying Map Behavior
- View source config: [src/config/sources.js](src/config/sources.js)
- Layer focus/filter logic: [src/util/layers.js](src/util/layers.js)
- Map settings: [src/config/map.js](src/config/map.js)

### Styling
- Component styles: CSS Module in component folder (e.g., `Sidebar/style.module.css`)
- Global styles: [src/App.css](src/App.css) or [src/index.css](src/index.css)
- Responsive breakpoints: [src/config/breakpoints.js](src/config/breakpoints.js)

## Testing

- Test runner: `npm test` (Jest via Create React App)
- Test libraries: `@testing-library/react`, `@testing-library/user-event`
- Template test in [App.test.js](src/App.test.js) is outdated; update for feature-driven tests
