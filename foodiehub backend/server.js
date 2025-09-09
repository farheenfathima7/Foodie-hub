require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const connectDB = require('./db');
const postsRouter = require('./routes/posts');

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5174",
    "https://foodiehub-backend.onrender.com"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
connectDB();

// Root
const isOnRender = !!process.env.RENDER_EXTERNAL_URL;
app.get("/", (req, res) => res.send(`✅ FoodieHub Backend is live 🚀 ${isOnRender ? 'on Render' : 'locally'}`));

// Health check route
app.get("/healthz", (req, res) => res.send("OK"));

// Mount posts routes under /api/posts
app.use('/api/posts', postsRouter);

// Add /blog routes to redirect to /api/posts for compatibility
app.use('/blog', postsRouter);

// Global error handler to ensure JSON responses for all errors
app.use((err, req, res, next) => {
  console.error('❌ Global error handler:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
