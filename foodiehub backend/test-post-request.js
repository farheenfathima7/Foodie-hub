const http = require('http');

const postData = JSON.stringify({
  title: "Test Blog",
  content: "Test content",
  author: "Test Author"
});

const options = {
  hostname: 'localhost',
  port: 10000,
  path: '/api/posts',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('Response:', res.statusCode, data);
  });
});

req.on('error', (e) => {
  console.error('Request error:', e.message);
});

req.write(postData);
req.end();
