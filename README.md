# Brand Kit - Full Stack Project

A hyper-modern subscription kit platform with motion-dense UI and comprehensive backend API.

## Project Overview

This project implements a complete branding and subscription system with:
- Immersive brand storytelling experiences
- Interactive 3D product exploration
- Drag-and-drop subscription kit builder
- PostgreSQL database with complete relational schema
- RESTful API with Express.js
- React frontend with advanced animations

## Project Structure

```
brand-kit/
├── backend/                 # Node.js + Express API
│   ├── src/
│   │   ├── config/         # Database & environment config
│   │   ├── database/       # Schema & seed files
│   │   ├── models/         # Data models
│   │   ├── controllers/    # Business logic
│   │   ├── routes/         # API endpoints
│   │   ├── middleware/     # Error handling & validation
│   │   ├── utils/          # Helper functions
│   │   ├── app.js          # Express app
│   │   └── server.js       # Entry point
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
├── frontend/               # React + Vite application
│   ├── src/
│   │   ├── pages/         # Main application pages
│   │   ├── components/    # Reusable UI components (to be created)
│   │   ├── services/      # API client layer
│   │   ├── store/         # Zustand state management
│   │   ├── hooks/         # Custom React hooks
│   │   ├── utils/         # Utilities & animations
│   │   ├── styles/        # Global styles
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
└── Context.md             # Database schema documentation
```

## Quick Start

### Backend Setup

1. **Install dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

3. **Setup database**:
   ```bash
   # Create database
   psql -U postgres -c "CREATE DATABASE brandkit;"
   
   # Run schema
   npm run db:setup
   
   # Seed data
   npm run db:seed
   ```

4. **Start server**:
   ```bash
   npm run dev
   ```
   Server runs on http://localhost:5000

### Frontend Setup

1. **Install dependencies**:
   ```bash
   cd frontend
   npm install
   ```

2. **Install additional packages**:
   ```bash
   npm install framer-motion zustand react-router-dom
   ```

3. **Configure environment**:
   ```bash
   cp .env.example .env
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```
   App runs on http://localhost:5173

## API Endpoints

### Brands
- `GET /api/v1/brands` - List all brands
- `GET /api/v1/brands/:id` - Get brand details
- `GET /api/v1/brands/:id/details` - Get brand with products & sustainability
- `GET /api/v1/brands/:id/products` - Get brand products
- `GET /api/v1/brands/:id/sustainability` - Get sustainability tags

### Products
- `GET /api/v1/products` - List products (with filters)
- `GET /api/v1/products/:id` - Get product details
- `GET /api/v1/products/:id/details` - Get product with metadata

### Subscription Kits
- `POST /api/v1/kits/initialize` - Create/get draft kit
- `GET /api/v1/kits/frequencies` - Get delivery frequencies
- `GET /api/v1/kits/:kitId` - Get kit summary
- `POST /api/v1/kits/:kitId/items` - Add product to kit
- `PATCH /api/v1/kits/:kitId/items/:productId` - Update quantity
- `DELETE /api/v1/kits/:kitId/items/:productId` - Remove item
- `PATCH /api/v1/kits/:kitId/frequency` - Set delivery frequency
- `POST /api/v1/kits/:kitId/confirm` - Confirm kit

## Database Schema

### Core Tables
- **users** - User accounts
- **brands** - Partner brands
- **brand_sustainability_tags** - Sustainability attributes
- **products** - Sellable items
- **product_metadata** - Product attributes
- **delivery_frequencies** - Delivery intervals
- **subscription_kits** - User-created kits
- **subscription_kit_items** - Kit products
- **kit_activity_log** - Kit lifecycle events

See `Context.md` for detailed schema documentation.

## Frontend Pages

### 1. Brand Experience (`/brand/:slug`)
Immersive storytelling with:
- Scroll-driven 3D camera movement
- Parallax narrative layers
- Floating brand identity
- Contextual product showcase

### 2. Product Exploration (`/products`)
Interactive product browsing with:
- 3D floating product cards
- Depth-based carousel
- Cursor proximity effects
- Shared-layout animations

### 3. Kit Builder (`/kit/build`)
Subscription kit creation with:
- Glassmorphic floating panel
- Drag-and-drop interactions
- Magnetic snapping
- Animated controls

### 4. Kit Review (`/kit/review`)
Confirmation flow with:
- Staggered animations
- Rolling price counters
- State morphing
- Success transformation

## Design Principles

### Motion & Interaction
- Scroll-linked, physics-based, or state-driven animations
- Cursor influences UI elements
- Staggered motion for clarity
- No fade-only animations

### 3D & Spatial Design
- Perspective and Z-axis layering
- Depth shadows and scaling
- Camera-like transitions
- Active elements move forward

### Visual Density
- Always subtle motion present
- Ambient idle animations
- No static visual zones
- Premium, state-of-the-art feel

## Tech Stack

### Backend
- Node.js + Express.js
- PostgreSQL
- Joi validation
- Helmet security
- Morgan logging

### Frontend
- React 18
- Vite
- Framer Motion
- Zustand
- React Router DOM
- shadcn/ui (to be integrated)
- Three.js / React Three Fiber (to be integrated)

## Development Workflow

1. **Backend Development**
   - Define models in `src/models/`
   - Implement controllers in `src/controllers/`
   - Create routes in `src/routes/`
   - Test with Postman or similar

2. **Frontend Development**
   - Create components in `src/components/`
   - Implement pages in `src/pages/`
   - Add services in `src/services/`
   - Style with CSS and Framer Motion

3. **Database Changes**
   - Update `src/database/schema.sql`
   - Run `npm run db:reset` in backend
   - Update models as needed

## Next Steps

### Backend
- [ ] Implement user authentication (JWT)
- [ ] Add payment processing
- [ ] Create order management
- [ ] Add analytics endpoints
- [ ] Implement email notifications

### Frontend
- [ ] Implement 3D product visualization
- [ ] Create interactive kit builder UI
- [ ] Add scroll-driven animations
- [ ] Integrate shadcn/ui components
- [ ] Implement drag-and-drop
- [ ] Add WebGL effects
- [ ] Create responsive layouts

### Testing
- [ ] Backend API tests
- [ ] Frontend component tests
- [ ] E2E testing
- [ ] Performance optimization

## License

ISC
