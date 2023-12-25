const Lz78 = require("../models/lz78.model");

const Lz78DataAccess = {
  async create(lz78Model) {
    return await lz78Model.save();
  },
  async findOne(where) {
    return await Lz78.findOne(where);
  },
  async find(where) {
    return await Lz78.find(where);
  },
  async findById(id) {
    return await Lz78.findById({ _id: id });
  },
  async updateById(id, body) {
    return await Lz78.findByIdAndUpdate({ _id: id }, body, { new: true });
  },
};

module.exports = Lz78DataAccess;
