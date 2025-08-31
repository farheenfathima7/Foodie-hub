const http = require('http');

function makeRequest(method, path) {
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
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(data);
                    resolve({ status: res.statusCode, data: parsedData });
                } catch (e) {
                    resolve({ status: res.statusCode, data: data });
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.end();
    });
}

async function quickTest() {
    console.log('🚀 Quick Backend Test Starting...\n');

    try {
        // Test basic endpoints
        console.log('Testing /api/health...');
        const health = await makeRequest('GET', '/api/health');
        console.log('✅ Health:', health.status, health.data);

        console.log('Testing /api...');
        const api = await makeRequest('GET', '/api');
        console.log('✅ API Info:', api.status, api.data.message);

        console.log('Testing /api/food-items...');
        const food = await makeRequest('GET', '/api/food-items');
        console.log('✅ Food Items:', food.status, Array.isArray(food.data) ? food.data.length + ' items' : 'Response received');

        console.log('Testing /api/blogs...');
        const blogs = await makeRequest('GET', '/api/blogs');
        console.log('✅ Blogs:', blogs.status, Array.isArray(blogs.data) ? blogs.data.length + ' posts' : 'Response received');

        console.log('\n🎉 Quick test completed successfully!');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

// Run test if server is running
setTimeout(quickTest, 1000);
