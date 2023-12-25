const express = require("express");
const controller = require("../controllers/index");
const router = express.Router();

router.post("/encode", controller.lz77Controller.encode);
router.post("/decode", controller.lz77Controller.decode);
router.post("/readableDecode", controller.lz77Controller.readableDecode);

module.exports = {
  lz77: router,
};
