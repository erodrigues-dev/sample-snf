const { database } = require("simple-node-framework").Singleton;
const mongoose = require("mongoose");

const connection = database.connections.mongodb?.application || mongoose;

const schema = mongoose.Schema(
  {
    name: String,
    username: String,
    password: String,
  },
  {
    collection: "users",
  }
);

module.exports = connection.model("User", schema);
