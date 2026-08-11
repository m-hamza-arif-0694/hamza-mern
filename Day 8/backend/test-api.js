const http = require('http');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('./src/app');

let mongoServer;
let server;
let baseUrl;

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
      res.on('data', (chunk) => { responseText += chunk; });
      res.on('end', () => {
        let json = null;
        try { json = JSON.parse(responseText); } catch (e) { json = responseText; }
        resolve({ status: res.statusCode, headers: res.headers, body: json });
      });
    });

    req.on('error', (err) => reject(err));
    if (bodyData) req.write(bodyData);
    req.end();
  });
};

const runTests = async () => {
  console.log('🧪 Starting Day 8 Capstone Backend Integration Tests...\n');
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET = 'hisabdo_day8_capstone_jwt_secret_2026';

  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
  console.log('✅ In-Memory MongoDB Server Active.');

  server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  baseUrl = `http://localhost:${port}`;
  console.log(`✅ Express Server running on ${baseUrl}\n`);

  let passed = 0;
  let failed = 0;

  const assert = (condition, testName) => {
    if (condition) {
      console.log(`  ✅ PASSED: ${testName}`);
      passed++;
    } else {
      console.log(`  ❌ FAILED: ${testName}`);
      failed++;
    }
  };

  try {
    console.log('--- 1. Testing User Registration ---');
    let res = await request('POST', '/api/auth/register', {
      name: 'Hamza Arif',
      email: 'hamza.capstone@example.com',
      password: 'password123',
      role: 'merchant'
    });
    assert(res.status === 201, 'POST /api/auth/register returns 201 Created');
    const token = res.body.token;

    console.log('\n--- 2. Testing User Login ---');
    res = await request('POST', '/api/auth/login', {
      email: 'hamza.capstone@example.com',
      password: 'password123'
    });
    assert(res.status === 200, 'POST /api/auth/login returns 200 OK');

    console.log('\n--- 3. Testing Protected /me Profile ---');
    res = await request('GET', '/api/auth/me', null, token);
    assert(res.status === 200, 'GET /api/auth/me returns 200 OK');
    assert(res.body.data.role === 'merchant', 'Returns correct user role');

  } catch (err) {
    console.error('💥 Test error:', err);
    failed++;
  } finally {
    await mongoose.disconnect();
    await mongoServer.stop();
    await new Promise((resolve) => server.close(resolve));

    console.log('\n==================================================');
    console.log(`📊 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
    console.log('==================================================');

    if (failed > 0) process.exit(1);
    else process.exit(0);
  }
};

runTests();
