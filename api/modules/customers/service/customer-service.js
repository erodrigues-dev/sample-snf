const { BaseService } = require("simple-node-framework").Base;
const CustomerRepository = require("../repository/customer-repository");

// sample service
class CustomerService extends BaseService {
  constructor() {
    super({
      module: "Customer Service", // the module name will prefix all your logs
    });
    this.repository = new CustomerRepository();
  }

  load(id) {
    this.log.debug(`Loading customer [${id}]`);
    return this.repository.load(id);
  }

  create(name) {
    return this.repository.create(name);
  }

  list() {
    return this.repository.list();
  }

  update(data) {
    return this.repository.update(data);
  }
}

module.exports = CustomerService;
