const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { User } = require('../db');
require('dotenv').config();


const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};

const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.header('auth-token');
    if (!token) {
      return res.status(403).send({ errorMsg: 'There is no token.' });
    }
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({
      where: {
        id: payload.id,
        tokens: { [Op.contains]: [token] },
      },
    });
    if (!user) {
      return res.status(404).send({ errorMsg: 'User not found.' });
    }
    if (!user.isActive) {
      return res
        .status(401)
        .send({ errorMsg: 'User is not active at the moment.' });
    }
    req.userID = user.id;
    req.token = token;
    next();
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
  
};

const isAdmin = async (req, res, next) => {
  try {
    let user = await User.findOne({ where: { id: req.userID } });
    if (user.role !== 'admin') {
      return res.status(401).send({ errorMsg: 'Unauthorized content.' });
    }
    next();
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

module.exports = {
  isLoggedIn,
  isAdmin,
  generateToken,
  isAuth,
};
