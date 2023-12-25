const Lz77 = require("../models/lz77.model");

const Lz77DataAccess = {
  async create(lz77Model) {
    return await lz77Model.save();
  },
  async findOne(where) {
    return await Lz77.findOne(where);
  },
  async find(where) {
    return await Lz77.find(where);
  },
  async findById(id) {
    return await Lz77.findById({ _id: id });
  },
  async updateById(id, body) {
    return await Lz77.findByIdAndUpdate({ _id: id }, body, { new: true });
  },
};

module.exports = Lz77DataAccess;
