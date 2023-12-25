const express = require("express");
const cors = require("cors");
const { default: helmet } = require("helmet");
const configs = require("./configs/index");
const db = require("./db/index");
const consts = require("./consts/index");
const app = express();
// const middlewares = require("./middlewares/index");
const router = require("./router/index");

configs.serverConfig.initialServerConfig();

const PORT = process.env.PORT || 6000;

//app.use('/uploads', express.static('uploads'))

app.use(express.json());
app.use(helmet());
app.use(cors());

// app.use(middlewares.loggerMiddleware);

app.use(`${process.env.APP_PREFIX}${consts.router.LZ78}`, router.lz78Router);
app.use(`${process.env.APP_PREFIX}${consts.router.LZ77}`, router.lz77Router);

db.mongooseConnection.connectMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Uygulama ${PORT} portunda çalışıyor.`);
  });
});
