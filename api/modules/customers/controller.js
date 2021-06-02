const { BaseController } = require("simple-node-framework").Base;
const CustomerService = require("./service/customer-service");

// sample controller
class Controller extends BaseController {
  constructor() {
    super({
      module: "My Sample Controller", // the module name will prefix all your logs
    });
    this.service = new CustomerService();
  }

  async load(req, res, next) {
    super.activateRequestLog(req); // this will automatically put the request-id on all logs

    const { id } = req.params;

    try {
      this.log.debug(`Loading customer [${id}]`);

      const customer = await this.service.load(id);

      if (customer) res.send(200, customer);
      else res.send(404);

      return next();
    } catch (error) {
      this.log.error("Unexpected error on load", error);
      res.send(500, "Unexpected error");
      return next();
    }
  }

  async list(req, res, next) {
    try {
      const list = await this.service.list();
      return res.json(list);
    } catch (error) {
      res.status(500).send("Unexpected error");
      return next();
    }
  }

  async create(req, res, next) {
    try {
      const { name } = req.body;
      const model = await this.service.create(name);
      return res.json(model);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const model = await this.service.update(req.body);
      return res.json(model);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
