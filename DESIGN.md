# Design System: ASC Advogados

## 1. Visual Theme & Atmosphere
A warm, editorial-style interface with a light "Warm Alabaster & Espresso" aesthetic. The atmosphere is inspired by high-end boutique legal branding — representing tradition, elite intellectual work, and strategic clarity. The layout relies on generous whitespace, clean asymmetric splits, and fine sandy dividers.

## 2. Color Palette & Roles
- **Warm Light Canvas** (`#FAF6F0`) — Primary background surface.
- **Espresso Dark Ink** (`#2D221C`) — Headings, titles, and body copy text.
- **Muted Warm Taupe** (`#7A685D`) — Subheadings, secondary descriptions, and metadata.
- **Accent Deep Teal** (`#0A6A7A`) — Primary color for interactive buttons, progress bars, active icons, and focus rings.
- **Accent Darker Teal** (`#065462`) — Secondary accent for highlights, hover backgrounds, and badges.
- **Pure Alabaster Surface** (`#FFFDFB`) — Background fill for cards, quiz panels, and dropdown containers.
- **Delicate Sandy Border** (`rgba(10, 106, 122, 0.16)`) — Fine, 1px structural borders separating containers and cards.

## 3. Typography Rules
- **Display / Headers:** `Cinzel` (Google Fonts) — Serif font representing prestige, history, and solid judicial foundation. Used for primary page titles, section titles, and logos.
- **Body / Interface:** `Poppins` (Google Fonts) — Modern, warm sans-serif for clear legibility across long text, cards, and quiz options.
- **Max-width constraint:** Body copy must have a maximum width of `65ch` per line.
- **Anti-pattern:** Pure black (`#000000`) is strictly banned. Text must use the warm, deep Espresso Dark Ink (`#2D221C`).

## 4. Component Stylings
* **Logo:** Pure HTML/CSS text logo styling utilizing `Cinzel` for "ASC" (large serif) and "Andrade, Sá & Cavalcante" (letter-spaced subtext), matching the reference image.
* **Buttons:** Flat panels with a deep teal background (`#0A6A7A`), contrast text (`#FAF6F0`). Hover elevates the button (`translateY(-4px)`) and active state depresses it (`-1px`).
* **Cards / Containers:** Semi-transparent warm alabaster fill (`#FFFDFB`), subtle backdrop blur, 1px border (`#0A6A7A` opacity 16%), and a soft espresso-tinted drop shadow (`rgba(45, 34, 28, 0.04)`).
* **Quiz Widget:** Framed in a pure alabaster panel with a progress bar transitioning in deep teal. Medidor radial gauge using `#0A6A7A` (teal) for medium risks and `#588053` (soft green) for low risk.
* **Monogram Seals:** Circular frames for partners displaying initials (A, S, C) in serif typography, styled like a clean metallic seal.

## 5. Layout Principles
- **Asymmetric Grid Splits:** Split layout for hero and trajectories (60/40 alignment) to break standard grid templates.
- **Mobile responsiveness:** Clear mobile-first vertical stack below 768px.
- **Warm Image Filters:** Media/photography elements utilize a subtle filter overlay (`sepia(0.15) contrast(1.02)`) to coordinate with the cream environment.

## 6. Motion & Interaction
- **Intersection counters:** Numeric rollups for statistics.
- **3D Card tilt:** Mouse movement tilt on the Hero visual container.
- **Standard transition:** `300ms ease-out` on all interactive states.

## 7. Anti-Patterns (Banned)
- No dark mode styles or dark backgrounds.
- No pure black (`#000000`) or pure white (`#ffffff`).
- No emojis.
- No Inter or standard system sans-serif fonts.
- No purple or neon glow borders.
