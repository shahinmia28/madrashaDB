const { Schema, model } = require('mongoose');

const studentSchema = new Schema(
  {
    studentName: {
      type: String,
    },
    fatherName: {
      type: String,
    },
    motherName: {
      type: String,
    },
    className: {
      type: String,
    },
    rollNumber: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    gender: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const StudentData = model('student', studentSchema);

module.exports = { StudentData };
