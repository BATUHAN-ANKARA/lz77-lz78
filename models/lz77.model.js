const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const lz77Schema = new Schema(
  {
    // encodedText: [
    //   {
    //     type: Schema.Types.String,
    //     required: false,
    //   },
    // ],
    decodedText: {
      type: Schema.Types.String,
      required: false,
    },
    encodedText: {
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

const Lz77 = mongoose.model("Lz77", lz77Schema, "lz77");

module.exports = Lz77;
