const express = require('express');
const {
  createNotice,
  getNotice,
  deleteNotice,
  updateNotice,
} = require('../controllers/noticeController');
const upload = require('../middleware/uploadFile');
const noticeRouter = express.Router();

noticeRouter.post('/create_notice', upload.single('image'), createNotice);
noticeRouter.get('/get_notice', getNotice);
noticeRouter.put('/update_notice/:id', updateNotice);
noticeRouter.delete('/delete_notice/:id', deleteNotice);

module.exports = noticeRouter;
