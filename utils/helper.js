const md5 = require("md5");
const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const fs = require("fs");
const dns = require("dns");
const os = require("os");
const jsonwebtoken = require("jsonwebtoken");

const hashToPassword = (password) => {
  return md5(password);
};

const handleValidation = (req) => {
  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty() === false) {
    return {
      message: "Geçersiz Veri!",
      success: false,
      validationErrors: validationErrors.array(),
      error: true,
      timestamp: Date.now(),
      code: StatusCodes.BAD_REQUEST,
    };
  }
  return null;
};

const createUploadDir = (str) => {
  if (!fs.existsSync(str)) {
    fs.mkdirSync(str, { recursive: true });
  }
};

const getHost = () => {
  return new Promise((resolve, reject) => {
    dns.lookup(os.hostname(), (err, ip) => {
      resolve(`http://${ip}:${process.env.PORT}`);
    });
  });
};

const createToken = (userId, fullName, email) => {
  const token = jsonwebtoken.sign(
    {
      userId,
      fullName,
      email,
    },
    process.env.SECRETKEY,
    { issuer: "localhost", expiresIn: process.env.EXPIRESIN }
  );
  return token;
};

const verifyToken = (token) => {
  const isVerify = { decodeToken: null };
  try {
    const decodeToken = jsonwebtoken.verify(token, process.env.SECRETKEY);
    isVerify.decodeToken = decodeToken;
  } catch (error) {
    isVerify.decodeToken = null;
    console.log("token verify hatası:", error.message);
  }
  return isVerify;
};

module.exports = {
  hashToPassword,
  handleValidation,
  createUploadDir,
  getHost,
  createToken,
  verifyToken,
};