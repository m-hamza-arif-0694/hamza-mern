const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`🚀 Student Management API Server Running!`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`📚 Endpoints available at: http://localhost:${PORT}/students`);
  console.log(`=================================================`);
});
