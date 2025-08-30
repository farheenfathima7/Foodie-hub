const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testAPIEndpoints() {
    console.log('🧪 Testing FoodieHub API Endpoints...\n');

    try {
        // Test health endpoint
        console.log('1. Testing /api/health endpoint...');
        const healthResponse = await axios.get(`${BASE_URL}/health`);
        console.log('✅ Health check:', healthResponse.data);
        
        // Test API info endpoint
        console.log('\n2. Testing /api endpoint...');
        const apiInfoResponse = await axios.get(`${BASE_URL}`);
        console.log('✅ API info:', apiInfoResponse.data.message);

        // Test blogs endpoints
        console.log('\n3. Testing blogs endpoints...');
        
        // Get all blogs
        const blogsResponse = await axios.get(`${BASE_URL}/blogs`);
        console.log('✅ GET /api/blogs:', blogsResponse.data.length, 'blogs found');
        
        // Create a new blog
        const newBlog = {
            title: 'Test Blog Post',
            content: 'This is a test blog post content for API testing',
            author: 'Test Author'
        };
        const createBlogResponse = await axios.post(`${BASE_URL}/blogs`, newBlog);
        console.log('✅ POST /api/blogs: Blog created with ID:', createBlogResponse.data._id);

        // Test food items endpoints
        console.log('\n4. Testing food items endpoints...');
        
        // Get all food items
        const foodItemsResponse = await axios.get(`${BASE_URL}/food-items`);
        console.log('✅ GET /api/food-items:', foodItemsResponse.data.length, 'food items found');
        
        // Create a new food item
        const newFoodItem = {
            name: 'Test Pizza',
            description: 'Delicious test pizza',
            price: 12.99,
            category: 'Italian',
            image: 'pizza.jpg'
        };
        const createFoodResponse = await axios.post(`${BASE_URL}/food-items`, newFoodItem);
        const createdFoodId = createFoodResponse.data._id;
        console.log('✅ POST /api/food-items: Food item created with ID:', createdFoodId);
        
        // Get food item by ID
        const foodItemResponse = await axios.get(`${BASE_URL}/food-items/${createdFoodId}`);
        console.log('✅ GET /api/food-items/:id: Food item retrieved:', foodItemResponse.data.name);
        
        // Update food item
        const updatedFoodItem = {
            name: 'Updated Test Pizza',
            price: 14.99
        };
        const updateResponse = await axios.put(`${BASE_URL}/food-items/${createdFoodId}`, updatedFoodItem);
        console.log('✅ PUT /api/food-items/:id: Food item updated:', updateResponse.data.name);
        
        // Delete food item
        const deleteResponse = await axios.delete(`${BASE_URL}/food-items/${createdFoodId}`);
        console.log('✅ DELETE /api/food-items/:id:', deleteResponse.data.message);

        console.log('\n🎉 All API endpoints tested successfully!');
        console.log('\n📋 Summary:');
        console.log('- MongoDB connection: ✅ Working');
        console.log('- Health endpoint: ✅ Working');
        console.log('- Blog endpoints: ✅ Working');
        console.log('- Food item endpoints: ✅ Working');
        console.log('- CRUD operations: ✅ Working');

    } catch (error) {
        console.error('❌ API Test Error:', error.response?.data || error.message);
        console.log('Make sure the server is running on http://localhost:5000');
    }
}

testAPIEndpoints();
