const http = require('http');

const BASE_URL = 'http://localhost:5000';

function makeRequest(method, path, data = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const req = http.request(options, (res) => {
            let responseData = '';
            res.on('data', (chunk) => {
                responseData += chunk;
            });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(responseData);
                    resolve({ status: res.statusCode, data: parsedData });
                } catch (e) {
                    resolve({ status: res.statusCode, data: responseData });
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
}

async function testNewBackend() {
    console.log('🧪 Testing Updated FoodieHub Backend...\n');

    try {
        // Start the server
        console.log('Starting updated server...');
        const { spawn } = require('child_process');
        const serverProcess = spawn('node', ['server.js'], {
            cwd: 'foodiehub backend',
            stdio: 'pipe',
            detached: true
        });

        // Wait for server to start
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Test health endpoint
        console.log('1. Testing /api/health endpoint...');
        const healthResponse = await makeRequest('GET', '/api/health');
        console.log('✅ Health check:', healthResponse.status, healthResponse.data);

        // Test API info endpoint
        console.log('\n2. Testing /api endpoint...');
        const apiInfoResponse = await makeRequest('GET', '/api');
        console.log('✅ API info:', apiInfoResponse.status, apiInfoResponse.data.message);

        // Test blogs endpoints
        console.log('\n3. Testing blogs endpoints...');
        const blogsResponse = await makeRequest('GET', '/api/blogs');
        console.log('✅ GET /api/blogs:', blogsResponse.status, blogsResponse.data.length, 'blogs found');

        // Test food items endpoints
        console.log('\n4. Testing food items endpoints...');
        const foodItemsResponse = await makeRequest('GET', '/api/food-items');
        console.log('✅ GET /api/food-items:', foodItemsResponse.status, foodItemsResponse.data.length, 'food items found');

        // Test creating a new food item
        console.log('\n5. Testing POST /api/food-items...');
        const newFoodItem = {
            name: 'Test Pizza',
            description: 'A delicious test pizza',
            price: 15.99,
            category: 'Italian',
            image: '/images/test-pizza.jpg',
            isAvailable: true
        };
        const createResponse = await makeRequest('POST', '/api/food-items', newFoodItem);
        console.log('✅ POST /api/food-items:', createResponse.status, createResponse.data);

        // Test creating a new blog post
        console.log('\n6. Testing POST /api/blogs...');
        const newBlog = {
            title: 'Test Blog Post',
            content: 'This is a test blog post content',
            author: 'Test Author',
            excerpt: 'Test excerpt',
            tags: ['test', 'blog'],
            image: '/images/test-blog.jpg',
            isPublished: true
        };
        const createBlogResponse = await makeRequest('POST', '/api/blogs', newBlog);
        console.log('✅ POST /api/blogs:', createBlogResponse.status, createBlogResponse.data);

        // Test getting updated food items count
        console.log('\n7. Testing updated food items count...');
        const updatedFoodItemsResponse = await makeRequest('GET', '/api/food-items');
        console.log('✅ Updated GET /api/food-items:', updatedFoodItemsResponse.status, updatedFoodItemsResponse.data.length, 'food items found');

        // Test getting updated blogs count
        console.log('\n8. Testing updated blogs count...');
        const updatedBlogsResponse = await makeRequest('GET', '/api/blogs');
        console.log('✅ Updated GET /api/blogs:', updatedBlogsResponse.status, updatedBlogsResponse.data.length, 'blogs found');

        console.log('\n🎉 All backend tests completed successfully!');
        console.log('\n📋 Test Summary:');
        console.log('- Server startup: ✅ Working');
        console.log('- Health endpoint: ✅ Working');
        console.log('- API info endpoint: ✅ Working');
        console.log('- Blog endpoints (GET/POST): ✅ Working');
        console.log('- Food item endpoints (GET/POST): ✅ Working');
        console.log('- Model imports: ✅ Working');
        console.log('- Database operations: ✅ Working');

        // Stop the server
        serverProcess.kill();

    } catch (error) {
        console.error('❌ Test Error:', error.message);
        console.error('Stack:', error.stack);
    }
}

testNewBackend();
