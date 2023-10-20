const app = require('./app');
const connectDB = require('./config/db');
require('dotenv').config();
const port = process.env.PORT;

app.listen(port, async () => {
  console.log(`server is running at http://localhost:${port}`);
  await connectDB();
});
