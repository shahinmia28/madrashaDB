const express = require('express');
const {
  createResult,
  getResult,
  updateResult,
  deleteResult,
  deleteAllResult,
} = require('../controllers/resultController');
const upload = require('../middleware/uploadFile');
const resultRouter = express.Router();

resultRouter.post('/create_result', upload.single('image'), createResult);
resultRouter.get('/get_result', getResult);
resultRouter.put('/update_result/:id', upload.single('image'), updateResult);
resultRouter.delete('/delete_result/:id', deleteResult);
resultRouter.delete('/delete_all_result', deleteAllResult);

module.exports = resultRouter;
