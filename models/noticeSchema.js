const { Schema, model } = require('mongoose');

const noticeSchema = new Schema(
  {
    noticeTitle: {
      type: String,
    },
    noticeDescription: {
      type: String,
    },
  },
  { timestamps: true }
);

const NoticeData = model('notice', noticeSchema);

module.exports = { NoticeData };
