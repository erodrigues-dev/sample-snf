const { BaseService } = require("simple-node-framework").Base;
const bcrypt = require("bcrypt");

const UserRepository = require("../repository/user-repository");
const { parseToViewModel } = require("../model/user-viewmodel");

class UserService extends BaseService {
  constructor() {
    super({
      module: "UserService",
    });

    this.repository = new UserRepository();
  }

  async create(userData) {
    const usernameInUse = await this.verifyUsername(userData.username);
    if (usernameInUse) throw new Error("Username is in use");

    const ecryptedPassword = await this.encryptPassword(userData.password);

    const model = await this.repository.create({
      name: userData.name,
      username: userData.username,
      password: ecryptedPassword,
    });

    return parseToViewModel(model);
  }

  async verifyUsername(username) {
    const found = await this.repository.findByUsername(username);
    return Boolean(found);
  }

  encryptPassword(password) {
    return bcrypt.hash(password, 16);
  }
}

module.exports = UserService;
