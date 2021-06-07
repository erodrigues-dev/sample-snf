const { BaseRepository } = require("simple-node-framework").Base;

const User = require("../model/user");

class UserRepository extends BaseRepository {
  constructor() {
    super({
      module: "UserRepository",
    });

    this.model = User;
  }

  create(userData) {
    return this.model.create(userData);
  }

  findByUsername(username) {
    return this.model.findOne({ username });
  }
}

module.exports = UserRepository;
