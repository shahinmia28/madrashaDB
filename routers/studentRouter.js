const express = require('express');
const {
  createStudent,
  getStudent,
  deleteStudent,
  updateStudent,
} = require('../controllers/studentController');
const upload = require('../middleware/uploadFile');
const studentRouter = express.Router();

studentRouter.post('/create_student', upload.single('image'), createStudent);
studentRouter.get('/get_student', getStudent);
studentRouter.put('/update_student/:id', upload.single('image'), updateStudent);
studentRouter.delete('/delete_student/:id', deleteStudent);

module.exports = studentRouter;
