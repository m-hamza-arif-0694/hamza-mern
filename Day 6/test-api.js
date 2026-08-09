const http = require('http');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('./src/app');

let mongoServer;
let server;
let baseUrl;

// HTTP Request Helper
const request = (method, path, body = null, token = null) => {
  return new Promise((resolve, reject) => {
    const url = new URL(path, baseUrl);
    const options = {
      method: method,
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      headers: {}
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    let bodyData = null;
    if (body) {
      bodyData = JSON.stringify(body);
      options.headers['Content-Type'] = 'application/json';
      options.headers['Content-Length'] = Buffer.byteLength(bodyData);
    }

    const req = http.request(options, (res) => {
      let responseText = '';
      res.on('data', (chunk) => {
        responseText += chunk;
      });
      res.on('end', () => {
        let json = null;
        try {
          json = JSON.parse(responseText);
        } catch (e) {
          json = responseText;
        }
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: json
        });
      });
    });

    req.on('error', (err) => reject(err));

    if (bodyData) {
      req.write(bodyData);
    }
    req.end();
  });
};

const runTests = async () => {
  console.log('🧪 Starting Day 6 JWT Authentication API Integration Tests...\n');
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET = 'hisabdo_jwt_secret_key_day6_2026_secure';

  // 1. Start MongoMemoryServer
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
  console.log('✅ In-Memory MongoDB Server Started Successfully.');

  // 2. Start HTTP Express Server
  server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  baseUrl = `http://localhost:${port}`;
  console.log(`✅ Test Express HTTP Server running on ${baseUrl}\n`);

  let passed = 0;
  let failed = 0;

  const assert = (condition, testName, details = '') => {
    if (condition) {
      console.log(`  ✅ PASSED: ${testName}`);
      passed++;
    } else {
      console.log(`  ❌ FAILED: ${testName}`);
      if (details) console.log(`     Details: ${JSON.stringify(details)}`);
      failed++;
    }
  };

  let userToken = null;

  try {
    console.log('--- 1. Testing User Registration (POST /api/auth/register) ---');
    let res = await request('POST', '/api/auth/register', {
      name: 'Hamza Arif',
      email: 'hamza@example.com',
      password: 'password123'
    });
    assert(res.status === 201, 'POST /api/auth/register returns 201 Created');
    assert(res.body.success === true, 'Returns success: true');
    assert(typeof res.body.token === 'string', 'Returns generated JWT token');
    assert(res.body.user.email === 'hamza@example.com', 'Returns correct user email');
    assert(res.body.user.password === undefined, 'Password is not exposed in registration response');
    userToken = res.body.token;

    console.log('\n--- 2. Testing Registration Errors & Input Validation ---');
    res = await request('POST', '/api/auth/register', {
      name: 'Hamza Arif',
      email: 'hamza@example.com',
      password: 'password123'
    });
    assert(res.status === 400, 'POST duplicate email returns 400 Bad Request');
    assert(res.body.error === 'Duplicate Error', 'Returns Duplicate Error message');

    res = await request('POST', '/api/auth/register', {
      name: 'H',
      email: 'invalid-email',
      password: '123'
    });
    assert(res.status === 400, 'POST invalid name, email & short password returns 400 Bad Request');
    assert(Array.isArray(res.body.details), 'Returns validation error details array');

    console.log('\n--- 3. Testing User Login (POST /api/auth/login) ---');
    res = await request('POST', '/api/auth/login', {
      email: 'hamza@example.com',
      password: 'password123'
    });
    assert(res.status === 200, 'POST /api/auth/login returns 200 OK');
    assert(res.body.success === true, 'Returns success: true');
    assert(typeof res.body.token === 'string', 'Returns fresh JWT token');
    assert(res.body.user.name === 'Hamza Arif', 'Returns logged-in user profile');

    console.log('\n--- 4. Testing Login Error Edge Cases ---');
    res = await request('POST', '/api/auth/login', {
      email: 'hamza@example.com',
      password: 'wrongpassword'
    });
    assert(res.status === 401, 'POST /login (wrong password) returns 401 Unauthorized');

    res = await request('POST', '/api/auth/login', {
      email: 'nonexistent@example.com',
      password: 'password123'
    });
    assert(res.status === 401, 'POST /login (non-existent email) returns 401 Unauthorized');

    console.log('\n--- 5. Testing Protected Route (GET /api/auth/me) ---');
    res = await request('GET', '/api/auth/me', null, userToken);
    assert(res.status === 200, 'GET /api/auth/me with valid Bearer token returns 200 OK');
    assert(res.body.data.email === 'hamza@example.com', 'Returns authenticated user profile');

    console.log('\n--- 6. Testing Protected Route Authentication Errors ---');
    res = await request('GET', '/api/auth/me');
    assert(res.status === 401, 'GET /api/auth/me (missing token) returns 401 Unauthorized');
    assert(res.body.error === 'Unauthorized', 'Returns Unauthorized error');

    res = await request('GET', '/api/auth/me', null, 'invalid.jwt.token');
    assert(res.status === 401, 'GET /api/auth/me (invalid token) returns 401 Unauthorized');

    console.log('\n--- 7. Testing 404 Route Not Found ---');
    res = await request('GET', '/api/auth/unknown');
    assert(res.status === 404, 'GET unknown route returns 404 Route Not Found');

  } catch (err) {
    console.error('💥 Test execution error:', err);
    failed++;
  } finally {
    await mongoose.disconnect();
    await mongoServer.stop();
    await new Promise((resolve) => server.close(resolve));

    console.log('\n==================================================');
    console.log(`📊 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
    console.log('==================================================');

    if (failed > 0) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  }
};

runTests();
