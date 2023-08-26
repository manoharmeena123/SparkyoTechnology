const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();

const authenticate = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization;

  if (token) {
    jwt.verify(token, "masai", (err, decoded) => {
      if (err) {
        res.status(401).json({ error: "Token invalid or expired" });
      } else {
        req.body.userId = decoded.userId;
        next();
      }
    });
  } else {
    res.status(401).json({ error: "Authorization token missing" });
  }
};


module.exports = {
  authenticate
};


