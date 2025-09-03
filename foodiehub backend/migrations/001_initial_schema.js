const mongoose = require('mongoose');

// Migration: Initial schema setup
async function up() {
    try {
        // Create collections if they don't exist
        const db = mongoose.connection.db;

        // Ensure FoodItem collection exists
        const foodItemsCollection = db.collection('fooditems');
        await foodItemsCollection.createIndex({ category: 1, isAvailable: 1 });
        await foodItemsCollection.createIndex({ name: 'text', description: 'text' });

        // Ensure Blog collection exists
        const blogsCollection = db.collection('blogs');
        await blogsCollection.createIndex({ isPublished: 1, createdAt: -1 });
        await blogsCollection.createIndex({ author: 1 });
        await blogsCollection.createIndex({ tags: 1 });
        await blogsCollection.createIndex({ title: 'text', content: 'text' });

        console.log('Initial schema migration completed');
    } catch (error) {
        console.error('Error in initial schema migration:', error);
        throw error;
    }
}

async function down() {
    try {
        const db = mongoose.connection.db;

        // Drop collections
        await db.collection('fooditems').drop();
        await db.collection('blogs').drop();

        console.log('Initial schema migration rolled back');
    } catch (error) {
        console.error('Error rolling back initial schema migration:', error);
        throw error;
    }
}

module.exports = { up, down };
