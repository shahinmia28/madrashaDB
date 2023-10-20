const jwt = require('jsonwebtoken');
require("dotenv").config({ path: "./config.env" });

const secretKey = process.env.SECRET_KEY;

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      throw Error('access token not found');
    }
    const decoded = jwt.verify(token, secretKey);
    if (!decoded) {
      throw Error('Invalid access token. please login again');
    }
    // req.body.userId = decoded._id;
    req.user = decoded.user;
    next();
  } catch (error) {
    return next(error);
  }
};

const isLoggedOut = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (token) {
      throw Error('User is already logged in');
    }
    next();
  } catch (error) {
    return next(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.isAdmin === false) {
      throw Error('You are not Admin. Only Admin can Access this Route');
    }
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = { isLoggedIn, isLoggedOut, isAdmin };
