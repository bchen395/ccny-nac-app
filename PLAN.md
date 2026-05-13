# CCNY NAC App — Implementation Plan

## Overview

A **tablet UI mockup** (landscape orientation) for navigating the NAC building at CCNY. Users can browse floors, view a placeholder floor map, tap a room from the right-side panel to "navigate" to it (static route overlay), and view building alerts. No real navigation logic — UI only.

---

## Tech Stack

- **React** (Vite + JSX)
- **CSS Modules** or plain CSS (no heavy UI lib needed)
- **No router** — single-page, all state managed in one App component

---

## Folder Structure

```
ccny-nac-app/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── components/
│   │   ├── Header.jsx            # Search bar, gear icon, hamburger icon
│   │   ├── MapView.jsx           # Placeholder SVG floor map
│   │   ├── RoomPanel.jsx         # Right-side room list
│   │   ├── FloorSelector.jsx     # Bottom-left "Floor X" button + dropdown
│   │   ├── AlertsPanel.jsx       # Sliding alerts overlay
│   │   ├── NavArrows.jsx         # Left/right map navigation arrows
│   │   └── RouteOverlay.jsx      # Static route lines drawn on map when room selected
│   ├── data/
│   │   └── floors.js             # Floor definitions: rooms per floor, alert list
│   └── assets/
│       └── icons/                # SVG icons (map pin, gear, hamburger, alert, etc.)
├── package.json
└── vite.config.js
```

---

## Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-bg` | `#F3EDF7` | App background (light lavender) |
| `--color-map-bg` | `#8CA7F4` | Map area fill, room list boxes, overlay panels |
| `--color-map-room` | `#A8BEF7` | Rooms drawn on the map (lighter tint of map bg) |
| `--color-map-route` | `#DBF48C` | Route highlight line |
| `--color-panel-bg` | `#8CA7F4` | Room list boxes, overlay panels |
| `--color-panel-hover` | `#6B8FEF` | Hover/active state on room boxes (darkened map bg) |
| `--color-accent` | `#DBF48C` | Green-yellow nav icon circle, active indicators |
| `--color-text-primary` | `#1D1B20` | Main text (near-black) |
| `--color-text-secondary` | `#49454F` | Secondary text, icons, labels |
| `--color-text-light` | `#FFFFFF` | Text on colored backgrounds |
| `--color-header-bg` | `#F3EDF7` | Search bar / header strip |
| `--color-border` | `#49454F` | Subtle borders, dividers |

---

## Placeholder Floor Data (`src/data/floors.js`)

```js
Floor 1: Lobby, Room 101, Room 102, Room 103, Cafeteria
Floor 2: Room 201, Room 202, Room 203, Ballroom, Room 204
Floor 3: Room 301, Room 302, Room 303, Room 304, Room 305
```

Alerts (shared across floors):
- Escalator maintenance alert
- Room 242 under construction
- West Wing Staircase closed
- One Stop Hours shortened 4/25

---

## Layout (Landscape Tablet — ~1024×768 or 1280×800)

```
┌─────────────────────────────────────────────────────────────────┐
│  [🔍 Search...]                            [⚙] [≡]  [● alert]  │  ← Header
├───────────────────────────────────────────┬─────────────────────┤
│                                           │  Room 101           │
│  [<]       MAP AREA (SVG placeholder)  [>]│  Room 102           │
│            (rooms drawn as rectangles)    │  Cafeteria          │
│            (route drawn as line)          │  Room 103           │
│                                           │  Ballroom           │
├───────────────────────────────────────────┴─────────────────────┤
│  [🗺 Floor 1 ▾]                                    [🖼 map icon] │  ← Footer
└─────────────────────────────────────────────────────────────────┘
```

When **Floor dropdown** is open, a panel appears above the footer selector listing Floor 1 / Floor 2 / Floor 3.

When **Alerts** icon is tapped, a panel slides in from the right listing all alerts with a `>` chevron on each row.

When a **room is tapped**, the room name is shown in the search bar, and a static yellow route line is drawn on the map SVG from a fixed "you are here" marker to that room's rect.

---

## Component Breakdown

### `App.jsx`
State:
- `currentFloor` (1–3)
- `selectedRoom` (null | room object)
- `showFloorDropdown` (bool)
- `showAlerts` (bool)

Renders: `<Header>`, `<MapView>`, `<NavArrows>`, `<RoomPanel>`, `<FloorSelector>`, conditionally `<AlertsPanel>`

---

### `Header.jsx`
- Search input (read-only, shows selected room name or placeholder "Search…")
- Gear icon (⚙) — no-op click for now
- Hamburger icon (≡) — no-op
- Alert bell/dot icon that opens `AlertsPanel`

---

### `MapView.jsx`
Props: `floor`, `selectedRoom`

Renders an inline SVG for the current floor. Each floor has a hardcoded set of labeled rectangles representing rooms (different layout per floor). A "You Are Here" yellow dot is fixed in one spot. When `selectedRoom` is set, a dashed yellow line is drawn from the dot to that room's rect center.

---

### `RoomPanel.jsx`
Props: `floor`, `selectedRoom`, `onSelectRoom`

Vertical scrollable list of room name boxes. Tapping one calls `onSelectRoom`. Active room is highlighted with `--color-panel-hover`.

---

### `FloorSelector.jsx`
Props: `currentFloor`, `showDropdown`, `onToggle`, `onSelect`

Bottom-left button showing "🗺 Floor X ▾". When `showDropdown` is true, a popover list (Floor 1, Floor 2, Floor 3) appears above it.

---

### `AlertsPanel.jsx`
Props: `onClose`

A panel that overlays on top of the map area showing the alerts list. Each row: `⚠ Alert text  >`. Closed by an X button.

---

### `NavArrows.jsx`
Left `<` and right `>` arrows. For now, left arrow decrements floor, right arrow increments floor (wraps). This gives the "swipe between floors" feel.

---

### `RouteOverlay.jsx`
Part of `MapView` — draws SVG `<line>` and `<circle>` elements for the route. Coordinates are defined per room in the floor data.

---

## Placeholder Map Design

Each floor SVG contains:
- A large outer rect (map boundary, `--color-map-bg`)
- Several labeled inner rects (rooms, `--color-map-room` with slightly lighter fill)
- A hallway strip (slightly different blue shade)
- A "YOU ARE HERE" yellow dot (fixed position, bottom-center of hallway)
- Room labels as `<text>` elements

Different layouts per floor (Floor 1 has different room shapes than Floor 2 and 3).

---

## Icons

Use inline SVG or [Heroicons](https://heroicons.com/) (MIT license) for:
- 🔍 Search — `magnifying-glass`
- ⚙ Settings — `cog-6-tooth`
- ≡ Menu — `bars-3`
- 🗺 Map pin — `map-pin`
- ⚠ Alert — `exclamation-circle`
- `>` Chevron — `chevron-right`
- `<`, `>` Nav — `chevron-left`, `chevron-right`

The map/nav icon in the bottom-left is a green-yellow (`--color-accent`) filled circle with a white map-pin SVG inside.

---

## Implementation Steps

1. **Scaffold** — `npm create vite@latest . -- --template react`, install deps
2. **Global styles** — CSS variables, reset, landscape tablet viewport lock
3. **Data file** — `floors.js` with room lists and alert data
4. **MapView SVGs** — draw placeholder SVG maps for floors 1, 2, 3
5. **Layout skeleton** — App.jsx with grid: header / map+panel / footer
6. **Header** — search bar display + icons
7. **RoomPanel** — room list boxes, tap interaction
8. **FloorSelector** — floor dropdown
9. **NavArrows** — left/right floor switching
10. **RouteOverlay** — static route line on room tap
11. **AlertsPanel** — alerts overlay
12. **Polish** — match colors, spacing, border-radius, shadows to Figma
