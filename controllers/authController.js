const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { StaffData } = require('../models/staffSchema');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

const handleLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await StaffData.findOne({ email });

    if (!user) {
      throw Error('User dose not exist with this Email');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw Error('Invalid credential');
    }

    const accessToken = jwt.sign({ user }, secretKey);

    res.cookie('accessToken', accessToken, {
      // httpOnly: true,
      // secure: true,
      sameSite: 'none',
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      // payload: accessToken,
      accessToken: accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false });
  }
};
const handleLogout = async (req, res, next) => {
  try {
    res.clearCookie('accessToken');

    res.status(200).json({
      success: true,
      message: 'Logout successful',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false });
  }
};
module.exports = {
  handleLogin,
  handleLogout,
};
