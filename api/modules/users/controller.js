const { BaseController } = require("simple-node-framework").Base;
const Yup = require("yup");

const UserService = require("./service/user-service");

const createSchema = Yup.object({
  name: Yup.string().required(),
  username: Yup.string().required(),
  password: Yup.string().required(),
});

class UserController extends BaseController {
  constructor() {
    super({
      module: "UserController",
    });

    this.service = new UserService();
  }

  async create(req, res, next) {
    try {
      super.activateRequestLog(req);
      // const data = await createSchema.validate(req.body, { abortEarly: false });
      // const user = await this.service.create(data);
      // return res.send(user);
      res.send(200);
      next();
    } catch (error) {
      if (error.name === "ValidationError") return res.send(400, error.errors);
      next(error);
    }
  }
}

module.exports = UserController;
