# Brand Kit Frontend

Hyper-modern, motion-dense product experience for subscription kit building.

## Features

- **Brand Experience Page**: Immersive 3D storytelling with scroll-driven animations
- **Product Exploration**: Non-linear 3D product browsing with cursor interactions
- **Kit Builder**: Interactive drag-and-drop subscription kit creation
- **Kit Review**: Animated confirmation flow with state transformations

## Tech Stack

- **Framework**: React 18 + Vite
- **Routing**: React Router DOM
- **State Management**: Zustand with persistence
- **Animations**: Framer Motion
- **Styling**: CSS with design tokens
- **3D**: Three.js / React Three Fiber (to be added)
- **UI Components**: shadcn/ui (to be added)

## Project Structure

```
frontend/
├── src/
│   ├── pages/              # Main application pages
│   │   ├── BrandExperience.jsx
│   │   ├── ProductExploration.jsx
│   │   ├── KitBuilder.jsx
│   │   └── KitReview.jsx
│   ├── components/         # Reusable UI components (to be created)
│   ├── services/           # API client layer
│   │   ├── api.js
│   │   └── index.js
│   ├── store/              # Zustand stores
│   │   └── kitStore.js
│   ├── hooks/              # Custom React hooks
│   │   ├── useBrand.js
│   │   ├── useProducts.js
│   │   └── useKit.js
│   ├── utils/              # Utility functions
│   │   ├── helpers.js
│   │   └── animations.js
│   ├── styles/             # Global styles
│   │   └── globals.css
│   ├── App.jsx             # Main app component
│   └── main.jsx            # Entry point
├── .env.example
└── package.json
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment**:
   ```bash
   cp .env.example .env
   ```
   Update `VITE_API_BASE_URL` if backend is not on localhost:5000

3. **Run development server**:
   ```bash
   npm run dev
   ```

Application will run on `http://localhost:5173`

## Design Principles

### Motion & Interaction
- All animations are scroll-linked, physics-based, or state-driven
- No fade-only or time-based entrance animations
- Cursor movement influences UI elements
- Stagger motion to avoid overwhelming users

### 3D & Spatial Design
- Use perspective, Z-axis layering, and depth shadows
- Active elements move toward the user
- Inactive elements recede with scale and blur
- Camera-like transitions between content areas

### Visual Density
- Always subtle motion on screen
- Idle states include ambient animations
- No dead, static visual zones

## Pages

### 1. Brand Experience
- Scroll-driven camera movement
- Parallax storytelling layers
- 3D floating brand identity
- Contextual product showcase

### 2. Product Exploration
- 3D floating product cards
- Depth-based carousel
- Cursor proximity interactions
- Shared-layout detail views

### 3. Kit Builder
- Floating glassmorphic panel
- Drag-and-drop with magnetic snapping
- Absorption animations
- Animated quantity controls
- Rotating delivery frequency dial

### 4. Kit Review
- Staggered depth animations
- Rolling price counters
- Morphing state transitions
- Success transformation

## Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Dependencies to Add

```bash
npm install framer-motion zustand react-router-dom
npm install @react-three/fiber @react-three/drei three
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu
npm install clsx tailwind-merge
```

## Future Enhancements

- Advanced 3D product visualization
- WebGL shaders for premium effects
- Sound design integration
- Haptic feedback (mobile)
- AR product preview
- Social sharing features

## License

ISC
