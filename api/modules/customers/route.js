const { ControllerFactory } = require("simple-node-framework");
const { route } = require("simple-node-framework").Singleton;
const server = require("../../../index.js");
const Controller = require("./controller");

// retreive route information
// ex: { baseRoute: '/api', module: 'customer', full: '/api/customer' }
const { full } = route.info(__filename);

server.get(`${full}`, ControllerFactory.build(Controller, "list"));
server.get(`${full}/:id`, ControllerFactory.build(Controller, "load"));
server.post(`${full}`, ControllerFactory.build(Controller, "create"));
server.put(`${full}`, ControllerFactory.build(Controller, "update"));
