const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const staffSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },
    phone: {
      type: String,
      required: [true, 'Phone Number is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
    },
    index: {
      type: String,
    },
    image: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const StaffData = model('staff', staffSchema);

module.exports = { StaffData };
