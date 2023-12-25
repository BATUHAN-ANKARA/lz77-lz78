const User = require("../models/user.model");
const userDal = require("../dal/index");
const utils = require("../utils/index");
const fileService = require("./file.service");

exports.createUser = async (req) => {
  try {
    let { name, surname, email, password, birthDate } = req.body;
    birthDate = new Date(birthDate);
    let today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    const _password = utils.helper.hashToPassword(password);
    const user = new User({
      password: _password,
      email,
      name,
      surname,
      birthDate,
      age,
    });
    const json = await userDal.user.create(user);
    const token = utils.helper.createToken(
      json._id,
      json.name + "" + json.surname,
      json.email
    );
    return {
      token: token,
      email: json.email,
      name:json.name,
      surname: json.surname,
      birthDate: json.birthDate,
      age: json.age,
      zodiacSign: json.zodiacSign,
      password: json.password,
      id: json._id
    };
  } catch (error) {
    throw new Error(error);
  }
};

exports.login = async (req) => {
  const { email, password } = req.body;
  try {
    const _password = utils.helper.hashToPassword(password);
    const json = await userDal.user.findOne({
      email: email,
      password: _password,
    });
    if (!json) {
      throw new Error("Şifre veya mail adresi yanlış");
    } else {
      const token = utils.helper.createToken(
        json._id,
        json.name + "" + json.surname,
        json.email
      );
      return { json, token };
    }
  } catch (error) {
    throw new Error(error);
  }
};

exports.getUserById = async (req) => {
  const id = req.params.id;
  try {
    const json = await userDal.user.findById(id);
    if (!json) {
      throw new Error("Kullanıcı bulunamadı!");
    } else {
      return json;
    }
  } catch (error) {
    throw new Error(error);
  }
};

exports.getUserByName = async (req) => {
  const name = req.params.name;
  try {
    const json = await userDal.user.find({ name: name });
    if (json.length === 0) {
      throw new Error("kullanıcı bulunmadı");
    } else {
      return json;
    }
  } catch (error) {
    throw new Error(error);
  }
};

exports.updateUser = async (req) => {
  const id = req.params.id;
  const { name, surname, email } = req.body;
  try {
    const json = await userDal.user.updateById(id, { name, surname, email });
    return json;
  } catch (error) {
    throw new Error(error);
  }
};

exports.updatePassword = async (req) => {
  const { id } = req.params;
  const { password } = req.body;
  try {
    const _password = utils.helper.hashToPassword(password);
    const json = await userDal.user.updateById(id, { password: _password });
    if (!json) {
      throw new Error("Kullanıcı bulunamadı!");
    } else {
      return json;
    }
  } catch (error) {
    throw new Error(error);
  }
};

exports.updateProfilePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const str = await fileService.uploadImage(req, res);
    const json = await userDal.user.updateById(id, { profilePhoto: str });
    return json;
  } catch (error) {
    throw new Error(error);
  }
};

exports.getAllUsers = async (req) => {
  try {
    const json = await userDal.user.find();
    return json;
  } catch (error) {
    throw new Error(error);
  }
};