const app = require("./src/app");
const connectDB = require("./src/config/db");

app.listen(3001, async () => {
  console.log(`server is running at http://localhost:3001`);
  await connectDB();
});
