const FoodItem = require('../models/FoodItem');
const Blog = require('../models/Blog');

// Migration: Seed initial data
async function up() {
    try {
        // Seed food items
        const sampleFoodItems = [
            {
                name: 'Margherita Pizza',
                description: 'Classic pizza with tomato sauce, mozzarella cheese, and fresh basil',
                price: 12.99,
                category: 'Italian',
                image: '/images/pizza.jpg',
                isAvailable: true
            },
            {
                name: 'Classic Burger',
                description: 'Juicy beef patty with lettuce, tomato, onion, and our special sauce',
                price: 8.99,
                category: 'American',
                image: '/images/burger.jpg',
                isAvailable: true
            },
            {
                name: 'California Roll',
                description: 'Fresh salmon, avocado, and cucumber wrapped in seaweed and rice',
                price: 15.99,
                category: 'Japanese',
                image: '/images/sushi.jpg',
                isAvailable: true
            },
            {
                name: 'Chicken Tacos',
                description: 'Three soft corn tortillas filled with seasoned chicken, lettuce, cheese, and salsa',
                price: 9.99,
                category: 'Mexican',
                image: '/images/tacos.jpg',
                isAvailable: true
            },
            {
                name: 'Fettuccine Alfredo',
                description: 'Creamy fettuccine pasta with parmesan cheese and garlic butter sauce',
                price: 11.99,
                category: 'Italian',
                image: '/images/pasta.jpg',
                isAvailable: true
            }
        ];

        // Clear existing data and insert new data
        await FoodItem.deleteMany({});
        await FoodItem.insertMany(sampleFoodItems);

        // Seed blog posts
        const sampleBlogs = [
            {
                title: 'Welcome to FoodieHub',
                content: 'Discover amazing food from around the world. Our platform connects food lovers with the best restaurants and recipes.',
                author: 'FoodieHub Team',
                excerpt: 'Your journey to culinary excellence starts here',
                tags: ['welcome', 'food', 'community'],
                image: '/images/welcome.jpg',
                isPublished: true
            },
            {
                title: 'The Art of Italian Cooking',
                content: 'Italian cuisine is renowned worldwide for its simplicity and use of fresh, high-quality ingredients. From pasta to pizza, each dish tells a story of tradition and passion.',
                author: 'Chef Mario',
                excerpt: 'Exploring the rich traditions of Italian culinary arts',
                tags: ['italian', 'cooking', 'tradition'],
                image: '/images/italian-cooking.jpg',
                isPublished: true
            },
            {
                title: 'Healthy Eating Made Easy',
                content: 'Maintaining a healthy diet doesn\'t have to be complicated. Learn how to make nutritious meals that are both delicious and easy to prepare.',
                author: 'Nutrition Expert',
                excerpt: 'Simple tips for incorporating healthy eating into your lifestyle',
                tags: ['healthy', 'nutrition', 'lifestyle'],
                image: '/images/healthy-eating.jpg',
                isPublished: true
            }
        ];

        await Blog.deleteMany({});
        await Blog.insertMany(sampleBlogs);

        console.log('Initial data seeding completed');
        console.log(`Added ${sampleFoodItems.length} food items and ${sampleBlogs.length} blog posts`);
    } catch (error) {
        console.error('Error in seed data migration:', error);
        throw error;
    }
}

async function down() {
    try {
        // Clear all data
        await FoodItem.deleteMany({});
        await Blog.deleteMany({});

        console.log('Seed data migration rolled back');
    } catch (error) {
        console.error('Error rolling back seed data migration:', error);
        throw error;
    }
}

module.exports = { up, down };
