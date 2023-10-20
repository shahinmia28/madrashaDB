const express = require('express');
const { handleLogin, handleLogout } = require('../controllers/authController');

const authRouter = express.Router();

authRouter.post('/login', handleLogin);
authRouter.post('/logout', handleLogout);

module.exports = authRouter;
