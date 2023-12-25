const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const lz78Schema = new Schema(
  {
    encodedText: [
      {
        type: Schema.Types.String,
        required: false,
      },
    ],
    decodedText: {
      type: Schema.Types.String,
      required: false,
    },
    user: {
      type: Schema.Types.String,
      required: false,
    },
    encodedByte: {
      type: Schema.Types.String,
      required: false,
    },
    decodedByte: {
      type: Schema.Types.String,
      required: false,
    },
  },
  {
    minimize: true,
    timestamps: true,
    autoIndex: true,
  }
);

const Lz78 = mongoose.model("Lz78", lz78Schema, "lz78");

module.exports = Lz78;
