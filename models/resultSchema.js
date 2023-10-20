const { Schema, model } = require('mongoose');

const resultSchema = new Schema(
  {
    studentName: {
      type: String,
    },
    className: {
      type: String,
    },
    rollNumber: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const ResultData = model('result', resultSchema);

module.exports = { ResultData };
