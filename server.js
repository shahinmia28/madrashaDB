const app = require("./src/app");
const connectDB = require("./src/config/db");
require("dotenv").config({ path: "./config.env" });

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  console.log(`server is running`);
  await connectDB();
});
