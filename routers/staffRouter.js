const express = require('express');
const {
  createStaff,
  getStaff,
  deleteStaff,
  updateStaff,
} = require('../controllers/staffController');
const upload = require('../middleware/uploadFile');
const { isLoggedIn } = require('../middleware/auth');
const staffRouter = express.Router();

staffRouter.post('/create_staff', upload.single('image'), createStaff);
staffRouter.get('/get_staff', getStaff);
staffRouter.put('/update_staff/:id', upload.single('image'), updateStaff);
staffRouter.delete('/delete_staff/:id', deleteStaff);
// staffRouter.post('/login', login);
module.exports = staffRouter;
