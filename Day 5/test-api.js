const http = require('http');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('./src/app');
const Student = require('./src/models/Student');

let mongoServer;
let server;
let baseUrl;

// Helper to make HTTP request using Node's built-in http module
const request = (method, path, body = null) => {
  return new Promise((resolve, reject) => {
    const url = new URL(path, baseUrl);
    const options = {
      method: method,
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      headers: {}
    };

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
  console.log('🧪 Starting Day 5 Student Management API Integration Tests (MongoDB + Mongoose)...\n');
  process.env.NODE_ENV = 'test';

  // 1. Start MongoDB In-Memory Server
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
  console.log('✅ In-Memory MongoDB Server Started Successfully.');

  // 2. Start HTTP Server
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

  try {
    // Seed initial data
    const seedStudents = await Student.create([
      {
        name: 'Muhammad Ali',
        email: 'ali@example.com',
        course: 'Computer Science',
        marks: 88
      },
      {
        name: 'Ayesha Khan',
        email: 'ayesha@example.com',
        course: 'Software Engineering',
        marks: 94
      }
    ]);

    const createdStudentId = seedStudents[0]._id.toString();

    console.log('--- 1. Testing GET /students ---');
    let res = await request('GET', '/students');
    assert(res.status === 200, 'GET /students returns 200 OK');
    assert(res.body.success === true && res.body.count === 2, 'GET /students returns 2 seeded records');

    console.log('\n--- 2. Testing GET /students/:id ---');
    res = await request('GET', `/students/${createdStudentId}`);
    assert(res.status === 200, 'GET /students/:id (valid ID) returns 200 OK');
    assert(res.body.data.name === 'Muhammad Ali', 'GET /students/:id returns correct student data');

    console.log('\n--- 3. Testing GET /students/:id Edge Cases ---');
    res = await request('GET', '/students/invalid-objectid');
    assert(res.status === 400, 'GET /students/invalid-objectid returns 400 Bad Request');
    assert(res.body.error === 'Invalid ID', 'Returns Invalid ID error message');

    const fakeId = new mongoose.Types.ObjectId().toString();
    res = await request('GET', `/students/${fakeId}`);
    assert(res.status === 404, 'GET /students/:id (non-existent ID) returns 404 Not Found');

    console.log('\n--- 4. Testing POST /students (Create Student) ---');
    const newStudent = {
      name: 'Usman Raza',
      email: 'usman@example.com',
      course: 'Cyber Security',
      marks: 92
    };
    res = await request('POST', '/students', newStudent);
    assert(res.status === 201, 'POST /students (valid data) returns 201 Created');
    assert(res.body.data.name === 'Usman Raza', 'POST returns created student object with generated MongoDB ID');
    const newStudentId = res.body.data.id;

    console.log('\n--- 5. Testing POST /students Validation Errors ---');
    res = await request('POST', '/students', { name: 'Incomplete Student' });
    assert(res.status === 400, 'POST /students (missing fields) returns 400 Bad Request');
    assert(Array.isArray(res.body.details), 'POST validation error returns array of errors');

    res = await request('POST', '/students', {
      name: 'Test',
      email: 'invalid-email-format',
      course: 'AI',
      marks: 150
    });
    assert(res.status === 400, 'POST /students (invalid email & marks > 100) returns 400 Bad Request');

    console.log('\n--- 6. Testing PUT /students/:id (Update Student) ---');
    res = await request('PUT', `/students/${newStudentId}`, {
      course: 'Advanced Cyber Security',
      marks: 98
    });
    assert(res.status === 200, 'PUT /students/:id (valid update) returns 200 OK');
    assert(res.body.data.course === 'Advanced Cyber Security' && res.body.data.marks === 98, 'PUT updates course and marks in MongoDB');

    res = await request('PUT', `/students/${fakeId}`, { marks: 80 });
    assert(res.status === 404, 'PUT /students/:id (non-existent ID) returns 404 Not Found');

    console.log('\n--- 7. Testing DELETE /students/:id ---');
    res = await request('DELETE', `/students/${newStudentId}`);
    assert(res.status === 200, 'DELETE /students/:id returns 200 OK');
    assert(res.body.data.id === newStudentId, 'DELETE returns deleted student record');

    res = await request('GET', `/students/${newStudentId}`);
    assert(res.status === 404, 'GET deleted student returns 404 Not Found');

    res = await request('DELETE', `/students/${fakeId}`);
    assert(res.status === 404, 'DELETE /students/:id (non-existent ID) returns 404 Not Found');

    console.log('\n--- 8. Testing 404 Unknown Route ---');
    res = await request('GET', '/unknown-endpoint');
    assert(res.status === 404, 'GET /unknown-endpoint returns 404 Route Not Found');

  } catch (err) {
    console.error('💥 Test suite execution error:', err);
    failed++;
  } finally {
    // Teardown
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
