const express = require("express");
const controller = require("../controllers/index");
const router = express.Router();

router.post("/encode", controller.lz78Controller.encode);
router.post("/decode", controller.lz78Controller.decode);
module.exports = {
  lz78: router,
};
