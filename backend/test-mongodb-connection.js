const { MongoClient } = require('mongodb');

async function testMongoDBConnection() {
    const uri = 'mongodb+srv://feehafathima05_db_user:juhdTJbT4eDFLeEQ@foodiehub.05hajqk.mongodb.net/?retryWrites=true&w=majority&appName=foodiehub';

    console.log('🔍 Testing MongoDB connection...');
    console.log('URI:', uri.replace(/:([^:@]{4})[^:@]*@/, ':$1****@')); // Hide password in logs

    const client = new MongoClient(uri);

    try {
        console.log('⏳ Attempting to connect...');
        await client.connect();
        console.log('✅ Successfully connected to MongoDB!');

        // Test database access
        const db = client.db('foodiehub');
        const collections = await db.collections();
        console.log('📋 Available collections:', collections.map(c => c.collectionName));

        // Test a simple query
        const foodItems = await db.collection('fooditems').find({}).limit(1).toArray();
        console.log('🍕 Sample food items found:', foodItems.length);

        return true;
    } catch (error) {
        console.error('❌ MongoDB connection failed:');
        console.error('Error code:', error.code);
        console.error('Error name:', error.codeName);
        console.error('Error message:', error.message);

        if (error.code === 8000) {
            console.log('\n💡 This is an authentication error. Possible causes:');
            console.log('1. Incorrect username or password');
            console.log('2. User does not exist in MongoDB Atlas');
            console.log('3. User does not have proper permissions');
            console.log('4. IP address not whitelisted');
        }

        return false;
    } finally {
        await client.close();
        console.log('🔌 Connection closed');
    }
}

testMongoDBConnection();
