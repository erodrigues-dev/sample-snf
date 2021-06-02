const { BaseRepository } = require("simple-node-framework").Base;
const customerModel = require("../model/customer");

// sample repository
class CustomerRepository extends BaseRepository {
  constructor() {
    super({
      module: "Customer Repository", // the module name will prefix all your logs
    });

    this.model = customerModel;
  }

  async load(id) {
    this.log.debug(`Loading customer [${id}]`);
    return this.model.findOne({ _id: id });
  }

  async create(name) {
    return this.model.create({ name });
  }

  async list() {
    return this.model.find({});
  }

  async update({ _id, name }) {
    const customer = await this.model.findById({ _id });
    customer.name = name;
    return customer.save();
  }
}

module.exports = CustomerRepository;
