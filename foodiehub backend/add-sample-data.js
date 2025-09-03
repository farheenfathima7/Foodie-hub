const mongoose = require('mongoose');

// MongoDB connection
const MONGODB_URI = 'mongodb://localhost:27017/foodiehub';
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define the schema and model
const foodItemSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    category: String,
    image: String
});

const FoodItem = mongoose.model('FoodItem', foodItemSchema);

// Sample food items
const sampleFoodItems = [
    {
        name: 'Pizza',
        description: 'Delicious cheese pizza with fresh ingredients',
        price: 12.99,
        category: 'Italian',
        image: ''
    },
    {
        name: 'Burger',
        description: 'Juicy beef burger with lettuce and tomato',
        price: 8.99,
        category: 'American',
        image: ''
    },
    {
        name: 'Sushi',
        description: 'Fresh salmon and avocado rolls',
        price: 15.99,
        category: 'Japanese',
        image: ''
    },
    {
        name: 'Tacos',
        description: 'Authentic Mexican tacos with seasoned meat',
        price: 9.99,
        category: 'Mexican',
        image: ''
    },
    {
        name: 'Pasta',
        description: 'Creamy fettuccine alfredo',
        price: 11.99,
        category: 'Italian',
        image: ''
    }
];

// Insert sample data
async function addSampleData() {
    try {
        // Clear existing data
        await FoodItem.deleteMany({});
        
        // Insert new sample data
        const result = await FoodItem.insertMany(sampleFoodItems);
        console.log('Sample data added successfully:', result.length, 'items inserted');
        
        // Close connection
        mongoose.connection.close();
    } catch (error) {
        console.error('Error adding sample data:', error);
        mongoose.connection.close();
    }
}

// Run the function
addSampleData();
