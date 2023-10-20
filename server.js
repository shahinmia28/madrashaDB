const app = require('./app');
const connectDB = require('./config/db');

app.listen(3001, async () => {
  console.log(`server is running at http://localhost:3001`);
  await connectDB();
});
