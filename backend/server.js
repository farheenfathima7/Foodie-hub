const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = 'mongodb+srv://feehafathima05_db_user:juhdTJbT4eDFLeEQ@foodiehub.05hajqk.mongodb.net/?retryWrites=true&w=majority&appName=foodiehub'; // Use correct password directly
console.log('🔍 Using hardcoded correct MongoDB URI for testing');
console.log('Using URI:', MONGODB_URI.replace(/:([^:@]{4})[^:@]*@/, ':$1****@')); // Hide password

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Define schemas and models
const foodItemSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    category: String,
    image: String
});

const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    createdAt: { type: Date, default: Date.now }
});

const FoodItem = mongoose.model('FoodItem', foodItemSchema);
const Blog = mongoose.model('Blog', blogSchema);

app.get('/api/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/blogs', async (req, res) => {
    try {
        const blog = new Blog(req.body);
        const savedBlog = await blog.save();
        res.status(201).json(savedBlog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// API Routes
// Get all food items
app.get('/api/food-items', async (req, res) => {
    try {
        const foodItems = await FoodItem.find();
        res.json(foodItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get food item by ID
app.get('/api/food-items/:id', async (req, res) => {
    try {
        const foodItem = await FoodItem.findById(req.params.id);
        if (!foodItem) {
            return res.status(404).json({ error: 'Food item not found' });
        }
        res.json(foodItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new food item
app.post('/api/food-items', async (req, res) => {
    try {
        const foodItem = new FoodItem(req.body);
        const savedItem = await foodItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update food item
app.put('/api/food-items/:id', async (req, res) => {
    try {
        const foodItem = await FoodItem.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!foodItem) {
            return res.status(404).json({ error: 'Food item not found' });
        }
        res.json(foodItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete food item
app.delete('/api/food-items/:id', async (req, res) => {
    try {
        const foodItem = await FoodItem.findByIdAndDelete(req.params.id);
        if (!foodItem) {
            return res.status(404).json({ error: 'Food item not found' });
        }
        res.json({ message: 'Food item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Serve static files from frontend (if needed)
app.use(express.static(path.join(__dirname, 'frontend')));

// Root endpoint
// Root endpoint for Render deployment check
app.get('/', (req, res) => {
    res.send('Backend is running on Render');
});

// API info endpoint
app.get('/api', (req, res) => {
    res.json({ 
        message: 'FoodieHub API Endpoints',
        availableEndpoints: {
            health: '/api/health',
            getAllBlogs: '/api/blogs',
            createBlog: '/api/blogs (POST)',
            getAllFoodItems: '/api/food-items',
            getFoodItemById: '/api/food-items/:id',
            createFoodItem: '/api/food-items (POST)',
            updateFoodItem: '/api/food-items/:id (PUT)',
            deleteFoodItem: '/api/food-items/:id (DELETE)'
        }
    });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`API endpoints available at http://localhost:${PORT}/api`);
});
