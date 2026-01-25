# Brand Kit Backend API

Backend API for the Brand Kit subscription platform - a hyper-modern product experience system.

## Features

- RESTful API for brands, products, and subscription kits
- PostgreSQL database with complete schema
- Comprehensive validation and error handling
- Activity logging for subscription kits
- Delivery frequency management

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Validation**: Joi
- **Security**: Helmet, CORS

## Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   │   ├── database.js  # Database connection
│   │   └── env.js       # Environment config
│   ├── database/        # Database files
│   │   ├── schema.sql   # Database schema
│   │   └── seeds.sql    # Seed data
│   ├── models/          # Data models
│   │   ├── Brand.js
│   │   ├── Product.js
│   │   ├── SubscriptionKit.js
│   │   └── DeliveryFrequency.js
│   ├── controllers/     # Business logic
│   │   ├── brandController.js
│   │   ├── productController.js
│   │   └── kitController.js
│   ├── routes/          # API routes
│   │   ├── brandRoutes.js
│   │   ├── productRoutes.js
│   │   ├── kitRoutes.js
│   │   └── index.js
│   ├── middleware/      # Middleware
│   │   ├── errorHandler.js
│   │   └── validator.js
│   ├── utils/           # Utilities
│   │   └── responseFormatter.js
│   ├── app.js           # Express app
│   └── server.js        # Server entry point
├── .env.example         # Environment template
├── .gitignore
└── package.json
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v14 or higher)
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
   Edit `.env` and update database credentials.

3. **Create database**:
   ```bash
   psql -U postgres -c "CREATE DATABASE brandkit;"
   ```

4. **Setup database schema**:
   ```bash
   npm run db:setup
   ```

5. **Seed sample data**:
   ```bash
   npm run db:seed
   ```

### Running the Server

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Brands

- `GET /api/v1/brands` - Get all brands
- `GET /api/v1/brands/:identifier` - Get brand by ID or slug
- `GET /api/v1/brands/:identifier/details` - Get brand with full details
- `GET /api/v1/brands/:identifier/products` - Get brand products
- `GET /api/v1/brands/:identifier/sustainability` - Get sustainability tags

### Products

- `GET /api/v1/products` - Get all products (with filters)
- `GET /api/v1/products/:id` - Get product by ID
- `GET /api/v1/products/:id/details` - Get product with metadata

### Subscription Kits

- `POST /api/v1/kits/initialize` - Initialize or get draft kit
- `GET /api/v1/kits/frequencies` - Get delivery frequencies
- `GET /api/v1/kits/:kitId` - Get kit summary
- `POST /api/v1/kits/:kitId/items` - Add product to kit
- `PATCH /api/v1/kits/:kitId/items/:productId` - Update item quantity
- `DELETE /api/v1/kits/:kitId/items/:productId` - Remove item from kit
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

## Development

### Database Commands

```bash
# Reset database (drop, create, seed)
npm run db:reset

# Setup schema only
npm run db:setup

# Seed data only
npm run db:seed
```

## Error Handling

All errors follow a consistent format:

```json
{
  "status": "error",
  "message": "Error description"
}
```

## Future Enhancements

- User authentication (JWT)
- Payment processing
- Order management
- Analytics and reporting
- Email notifications
- Admin dashboard

## License

ISC
