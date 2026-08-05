const app = require("./src/app");
const http = require("http");

const PORT = 5001; // Separate port for testing
let server;

// Helper to make HTTP request to test server
const request = (method, path, body = null) => {
  return new Promise((resolve, reject) => {
    const dataString = body ? JSON.stringify(body) : null;
    const options = {
      hostname: "localhost",
      port: PORT,
      path: path,
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...(dataString && { "Content-Length": Buffer.byteLength(dataString) })
      }
    };

    const req = http.request(options, (res) => {
      let responseBody = "";
      res.on("data", (chunk) => (responseBody += chunk));
      res.on("end", () => {
        let parsed = null;
        try {
          parsed = JSON.parse(responseBody);
        } catch (e) {
          parsed = responseBody;
        }
        resolve({ status: res.statusCode, body: parsed });
      });
    });

    req.on("error", (err) => reject(err));
    if (dataString) req.write(dataString);
    req.end();
  });
};

async function runTests() {
  console.log("🧪 Starting Automated API Tests for Student Management System...\n");
  let passed = 0;
  let failed = 0;

  const assert = (testName, condition, details = "") => {
    if (condition) {
      console.log(` ✅ PASS: ${testName}`);
      passed++;
    } else {
      console.log(` ❌ FAIL: ${testName} - ${details}`);
      failed++;
    }
  };

  server = app.listen(PORT, async () => {
    try {
      // Test 1: Root route
      const rootRes = await request("GET", "/");
      assert("GET / returns 200 OK welcome message", rootRes.status === 200 && rootRes.body.success === true);

      // Test 2: GET all students
      const getAllRes = await request("GET", "/students");
      assert(
        "GET /students returns 200 OK and student list",
        getAllRes.status === 200 && Array.isArray(getAllRes.body.data) && getAllRes.body.count >= 5
      );

      // Test 3: GET student by valid ID
      const getSingleRes = await request("GET", "/students/1");
      assert(
        "GET /students/1 returns 200 OK and correct student",
        getSingleRes.status === 200 && getSingleRes.body.data.id === 1 && getSingleRes.body.data.name === "Muhammad Ali"
      );

      // Test 4: GET student by non-existent ID (404)
      const getNotFoundRes = await request("GET", "/students/999");
      assert(
        "GET /students/999 returns 404 Not Found",
        getNotFoundRes.status === 404 && getNotFoundRes.body.success === false
      );

      // Test 5: GET student by invalid string ID (400)
      const getInvalidIdRes = await request("GET", "/students/abc");
      assert(
        "GET /students/abc returns 400 Bad Request",
        getInvalidIdRes.status === 400 && getInvalidIdRes.body.error === "Invalid Student ID"
      );

      // Test 6: POST create student with missing fields (400)
      const postMissingRes = await request("POST", "/students", { name: "Test User" });
      assert(
        "POST /students with missing fields returns 400 Bad Request",
        postMissingRes.status === 400 && postMissingRes.body.success === false
      );

      // Test 7: POST create student with invalid email format (400)
      const postBadEmailRes = await request("POST", "/students", {
        name: "Test User",
        email: "not-an-email",
        course: "Math",
        marks: 85
      });
      assert(
        "POST /students with invalid email returns 400 Bad Request",
        postBadEmailRes.status === 400 && postBadEmailRes.body.details.some(d => d.includes("email"))
      );

      // Test 8: POST create student with out-of-range marks (400)
      const postBadMarksRes = await request("POST", "/students", {
        name: "Test User",
        email: "test@example.com",
        course: "Math",
        marks: 150
      });
      assert(
        "POST /students with marks > 100 returns 400 Bad Request",
        postBadMarksRes.status === 400 && postBadMarksRes.body.details.some(d => d.includes("0 and 100"))
      );

      // Test 9: POST create student with valid data (201)
      const newStudentData = {
        name: "Zainab Fatima",
        email: "zainab@example.com",
        course: "Artificial Intelligence",
        marks: 95
      };
      const postSuccessRes = await request("POST", "/students", newStudentData);
      const createdId = postSuccessRes.body.data ? postSuccessRes.body.data.id : null;
      assert(
        "POST /students with valid data returns 201 Created",
        postSuccessRes.status === 201 && createdId !== null && postSuccessRes.body.data.name === "Zainab Fatima"
      );

      // Test 10: PUT update student with valid data (200)
      const updateData = { marks: 98, course: "Data Engineering" };
      const putSuccessRes = await request("PUT", `/students/${createdId}`, updateData);
      assert(
        `PUT /students/${createdId} returns 200 OK and updated data`,
        putSuccessRes.status === 200 && putSuccessRes.body.data.marks === 98 && putSuccessRes.body.data.course === "Data Engineering"
      );

      // Test 11: PUT update non-existent student (404)
      const putNotFoundRes = await request("PUT", "/students/9999", { marks: 80 });
      assert(
        "PUT /students/9999 returns 404 Not Found",
        putNotFoundRes.status === 404 && putNotFoundRes.body.success === false
      );

      // Test 12: DELETE student by ID (200)
      const deleteSuccessRes = await request("DELETE", `/students/${createdId}`);
      assert(
        `DELETE /students/${createdId} returns 200 OK`,
        deleteSuccessRes.status === 200 && deleteSuccessRes.body.data.id === createdId
      );

      // Test 13: GET deleted student (404)
      const getDeletedRes = await request("GET", `/students/${createdId}`);
      assert(
        `GET /students/${createdId} after deletion returns 404 Not Found`,
        getDeletedRes.status === 404
      );

      console.log(`\n📊 API Test Results Summary:`);
      console.log(`Total: ${passed + failed} | Passed: ${passed} | Failed: ${failed}`);
      
      server.close();
      if (failed > 0) process.exit(1);
    } catch (err) {
      console.error("Test execution failed:", err);
      if (server) server.close();
      process.exit(1);
    }
  });
}

runTests();
