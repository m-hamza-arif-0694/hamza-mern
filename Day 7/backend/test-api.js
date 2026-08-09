const http = require('http');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('./src/app');
const Student = require('./src/models/Student');

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
  console.log('🧪 Starting Day 7 Full-Stack Backend Integration Tests...\n');
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET = 'hisabdo_day7_jwt_secret_key_fullstack_2026';

  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
  console.log('✅ In-Memory MongoDB Server Started.');

  server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  baseUrl = `http://localhost:${port}`;
  console.log(`✅ Express HTTP Server running on ${baseUrl}\n`);

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

  let token = null;

  try {
    console.log('--- 1. Testing Registration & Token Generation ---');
    let res = await request('POST', '/api/auth/register', {
      name: 'Hamza Arif',
      email: 'hamza@example.com',
      password: 'password123'
    });
    assert(res.status === 201, 'POST /api/auth/register returns 201 Created');
    token = res.body.token;

    console.log('\n--- 2. Testing Protected Student Endpoints Rejection Without Token ---');
    res = await request('GET', '/api/students');
    assert(res.status === 401, 'GET /api/students without token returns 401 Unauthorized');

    console.log('\n--- 3. Testing Protected Student CRUD Operations With Token ---');
    res = await request('POST', '/api/students', {
      name: 'Muhammad Ali',
      email: 'ali@example.com',
      course: 'Computer Science',
      marks: 88
    }, token);
    assert(res.status === 201, 'POST /api/students creates student (201 Created)');
    const studentId = res.body.data.id;

    res = await request('GET', '/api/students', null, token);
    assert(res.status === 200, 'GET /api/students returns 200 OK');
    assert(res.body.count === 1, 'Returns 1 student record');

    res = await request('GET', `/api/students/${studentId}`, null, token);
    assert(res.status === 200, 'GET /api/students/:id returns single student');

    res = await request('PUT', `/api/students/${studentId}`, { marks: 95 }, token);
    assert(res.status === 200, 'PUT /api/students/:id updates student marks');

    res = await request('GET', '/api/students?search=Computer', null, token);
    assert(res.status === 200, 'GET /api/students?search=... performs query filtering');

    res = await request('DELETE', `/api/students/${studentId}`, null, token);
    assert(res.status === 200, 'DELETE /api/students/:id deletes student');

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
