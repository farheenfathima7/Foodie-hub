# FoodieHub Backend

Backend API for the FoodieHub application built with Node.js, Express, and MongoDB.

## Features

- RESTful API for food items and blog posts
- MongoDB database with Mongoose ODM
- Database migrations system
- CORS enabled for frontend integration
- Environment-based configuration

## Project Structure

```
foodiehub backend/
├── models/           # Database models
│   ├── FoodItem.js
│   └── Blog.js
├── migrations/       # Database migrations
│   ├── migrate.js
│   ├── 001_initial_schema.js
│   └── 002_seed_initial_data.js
├── server.js         # Main application file
├── package.json      # Dependencies and scripts
└── README.md         # This file
```

## API Endpoints

### Food Items
- `GET /api/food-items` - Get all food items
- `GET /api/food-items/:id` - Get food item by ID
- `POST /api/food-items` - Create new food item
- `PUT /api/food-items/:id` - Update food item
- `DELETE /api/food-items/:id` - Delete food item

### Blog Posts
- `GET /api/blogs` - Get all blog posts
- `POST /api/blogs` - Create new blog post

### System
- `GET /api/health` - Health check
- `GET /` - API information

## Database Models

### FoodItem
- `name` (String, required) - Name of the food item
- `description` (String, required) - Description of the food item
- `price` (Number, required) - Price of the food item
- `category` (String, required) - Category (Italian, American, Japanese, etc.)
- `image` (String) - Image URL
- `isAvailable` (Boolean) - Availability status
- `createdAt` (Date) - Creation timestamp
- `updatedAt` (Date) - Last update timestamp

### Blog
- `title` (String, required) - Blog post title
- `content` (String, required) - Blog post content
- `author` (String, required) - Author name
- `excerpt` (String) - Short excerpt
- `tags` (Array) - Tags for categorization
- `image` (String) - Featured image URL
- `isPublished` (Boolean) - Publication status
- `createdAt` (Date) - Creation timestamp
- `updatedAt` (Date) - Last update timestamp

## Database Migrations

The application includes a migration system to manage database schema changes and seed data.

### Running Migrations

```bash
# Run all pending migrations
npm run migrate

# Or run directly
node migrations/migrate.js
```

### Available Migrations

1. **001_initial_schema.js** - Creates database indexes and collections
2. **002_seed_initial_data.js** - Seeds initial food items and blog posts

## Environment Variables

- `MONGODB_URI` - MongoDB connection string (defaults to `mongodb://localhost:27017/foodiehub`)
- `PORT` - Server port (defaults to 5000)
- `NODE_ENV` - Environment (development/production)

## Installation & Setup

1. Install dependencies:
```bash
npm install
```

2. Run database migrations:
```bash
npm run migrate
```

3. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## Deployment

This application is configured for deployment on Render.com with the following setup:

- **Build Command**: `npm install && npm run migrate`
- **Start Command**: `npm start`
- **Source Directory**: `foodiehub backend`

Make sure to set the `MONGODB_URI` environment variable in your deployment platform.

## Development

### Adding New Migrations

1. Create a new migration file in the `migrations/` directory
2. Follow the naming convention: `XXX_description.js`
3. Implement `up()` and `down()` functions
4. The migration runner will automatically pick up new files

### Adding New Models

1. Create a new model file in the `models/` directory
2. Export the Mongoose model
3. Import and use in `server.js` or other files

## License

This project is part of the FoodieHub application.
