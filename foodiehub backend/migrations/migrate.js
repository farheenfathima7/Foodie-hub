const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/foodiehub';

async function runMigrations() {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB for migrations');

        // Get all migration files
        const migrationsDir = path.join(__dirname);
        const migrationFiles = fs.readdirSync(migrationsDir)
            .filter(file => file.endsWith('.js') && file !== 'migrate.js')
            .sort();

        console.log('Found migration files:', migrationFiles);

        // Run each migration
        for (const file of migrationFiles) {
            console.log(`Running migration: ${file}`);
            const migration = require(path.join(migrationsDir, file));

            if (typeof migration.up === 'function') {
                await migration.up();
                console.log(`✅ Migration ${file} completed successfully`);
            }
        }

        console.log('All migrations completed successfully');
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
        console.log('Database connection closed');
    }
}

// Run migrations if this file is executed directly
if (require.main === module) {
    runMigrations();
}

module.exports = { runMigrations };
