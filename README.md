<div align="center">

# BrandKit — Subscription Kit Platform

[![Subscription Platform](https://img.shields.io/badge/Subscription%20Platform-Online-95e1d3?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Reniyas717/brandkit)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20App-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://brandkit-reniyas.vercel.app)
</div>

---

## Technology Stack

<div align="center">

![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.x-646cff?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

</div>

## Overview

BrandKit is a hyper-modern, full-stack subscription kit platform that enables brands to tell their story and customers to curate personalized product subscriptions. Built with a motion-dense UI and comprehensive backend API, the platform supports immersive brand experiences, interactive 3D product exploration, and a drag-and-drop kit builder.

Repository structure (high level):

```
brandkit/
├── backend/        # Node.js + Express API, models, and controllers
├── frontend/       # React + Vite dashboard and public UI
└── README.md       # <-- you are here
```

### Key Features

- **Immersive Brand Storytelling** — Rich narrative experiences for brand discovery with scroll-driven parallax
- **Interactive 3D Product Exploration** — Immersive product visualizations with floating cards and depth effects
- **Drag-and-Drop Kit Builder** — Intuitive, no-code subscription kit customization
- **Complete Data-Driven Architecture** — Brands, products, and kits fully managed via RESTful API
- **Motion-Dense UI** — Advanced animations and transitions using Framer Motion
- **Relational Database Design** — PostgreSQL schema with normalized brand–product–kit relationships
- **Real-time State Management** — Zustand for predictable and efficient state handling
- **Secure & Scalable API** — Express.js with middleware for validation, error handling, and security

## Live Demo

Check out the live application here:
- **Frontend:** [brandkit-reniyas.vercel.app](https://brandkit-reniyas.vercel.app)

## Quick Start

These instructions will get a local copy running for development and testing.

### Prerequisites

- Node.js v18+ and npm
- PostgreSQL (local or cloud-hosted)
- Git

### Backend (API)

1. Open a terminal and install dependencies:

```bash
cd backend
npm install
```

2. Create a `.env` file in `backend/` with the following variables:

```
PORT=5000
DATABASE_URL=postgres://user:password@localhost:5432/brandkit
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=brandkit
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
NODE_ENV=development
```

3. Setup the database:

```bash
# Create the database
psql -U postgres -c "CREATE DATABASE brandkit;"

# Run schema and seed data
npm run db:setup
npm run db:seed
```

4. Start the backend server in development mode:

```bash
npm run dev
```

The server runs on `http://localhost:5000`. Entry point is `backend/server.js`.

### Frontend (Web App)

1. Install dependencies and run the dev server:

```bash
cd frontend
npm install
npm run dev
```

2. The frontend uses Vite and React sources are in `frontend/src/`.

The app runs on `http://localhost:5173`.

## Project Details & Notable Files

**Backend:**
- `backend/server.js` — Express app, middleware setup, and route mounting
- `backend/src/controllers/` — Business logic handlers for brands, products, and subscription kits
- `backend/src/models/` — Data models (Brand, Product, SubscriptionKit, DeliveryFrequency)
- `backend/src/routes/` — Route definitions (brands, products, kits)
- `backend/src/database/schema.sql` — PostgreSQL schema definition
- `backend/src/database/seeds.sql` — Initial data for brands and products
- `backend/src/middleware/` — Auth validation, error handling, and request validation
- `backend/src/utils/responseFormatter.js` — Standardized API response formatting

**Frontend:**
- `frontend/src/pages/` — Main application pages (BrandExperience, ProductExploration, KitBuilder, KitReview)
- `frontend/src/components/` — Reusable UI and animation components
- `frontend/src/services/api.js` — API client layer for backend communication
- `frontend/src/store/kitStore.js` — Zustand state management for kit data
- `frontend/src/hooks/` — Custom React hooks (useBrand, useKit, useProducts)
- `frontend/src/utils/animations.js` — Animation utilities and helpers

**Documentation:**
- `Context.md` — Complete database schema documentation

## API Endpoints (Selected)

Below are common endpoints found in `backend/routes/`. Consult route files for the complete list and exact payloads.

**Brands:**

```
GET  /api/v1/brands                      # List all brands
GET  /api/v1/brands/:id                  # Get brand details
GET  /api/v1/brands/:id/details          # Get brand with products & sustainability
GET  /api/v1/brands/:id/products         # Get brand products
GET  /api/v1/brands/:id/sustainability   # Get sustainability tags
```

**Products:**

```
GET  /api/v1/products                    # List products (with filters)
GET  /api/v1/products/:id                # Get product details
GET  /api/v1/products/:id/details        # Get product with metadata
```

**Subscription Kits:**

```
POST /api/v1/kits/initialize             # Create/get draft kit
GET  /api/v1/kits/frequencies            # Get delivery frequencies
GET  /api/v1/kits/:kitId                 # Get kit summary
POST /api/v1/kits/:kitId/items           # Add product to kit
PATCH /api/v1/kits/:kitId/items/:productId  # Update quantity
DELETE /api/v1/kits/:kitId/items/:productId # Remove item
PATCH /api/v1/kits/:kitId/frequency      # Set delivery frequency
POST /api/v1/kits/:kitId/confirm         # Confirm kit
```

## Database Schema Overview

**Core Tables:**
- `users` — Platform user accounts
- `brands` — Partner brands with storytelling data
- `brand_sustainability_tags` — Sustainability attributes linked to brands
- `products` — Sellable items belonging to brands
- `product_metadata` — Product attributes (size, material, etc.)
- `delivery_frequencies` — Allowed delivery intervals
- `subscription_kits` — User-created kit configurations
- `subscription_kit_items` — Products added to kits with quantities
- `kit_activity_log` — Lifecycle events and activity tracking

**Key Relationships:**
- One brand owns many products
- One user owns many subscription kits
- One subscription kit contains many products via kit items
- Sustainability tags and metadata extend brands and products

See `Context.md` for detailed schema documentation.

## Environment Config & Secrets

We recommend creating a `.env.example` file with all required variables (without secrets) and committing that to the repo. Keep real secrets out of source control and use a secrets manager in production (GitHub Actions secrets, Vercel environment variables, etc.).

**Backend `.env.example`:**

```
PORT=5000
DATABASE_URL=postgres://user:password@localhost:5432/brandkit
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=brandkit
DATABASE_USER=postgres
DATABASE_PASSWORD=
NODE_ENV=development
```

**Frontend `.env.example`:**

```
VITE_API_URL=http://localhost:5000/api/v1
```

## Running Tests

If tests are present, run them with:

```bash
cd backend
npm test

cd ../frontend
npm test
```


## Support

For support or questions, open an issue in this repository.

---

<div align="center">

**Built with ❤️ for modern e-commerce experiences**

[![GitHub Stars](https://img.shields.io/github/stars/Reniyas717/brandkit?style=social)](https://github.com/Reniyas717/brandkit)
[![GitHub Forks](https://img.shields.io/github/forks/Reniyas717/brandkit?style=social)](https://github.com/Reniyas717/brandkit/network/members)

</div>
