const { ControllerFactory } = require("simple-node-framework");
const { route } = require("simple-node-framework").Singleton;

const server = require("../../../index");
const Controller = require("./controller");

const { full } = route.info(__filename);

server.post(full, ControllerFactory.build(Controller, "create"));
