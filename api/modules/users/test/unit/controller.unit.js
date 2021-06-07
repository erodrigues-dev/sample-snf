const { TestHelper } = require("simple-node-framework");
const sinon = require("sinon");
const { expect } = require("chai");

const UserController = require("../../controller");
const userController = new UserController();

describe("User Controller Test", () => {
  const sandbox = sinon.createSandbox();

  before(() => {
    TestHelper.before();
  });

  after(() => {
    TestHelper.after();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("Should return 400 if no name is provided", (done) => {
    sandbox.stub(userController.service, "create").returns(
      Promise.resolve({
        id: "any_id",
        name: "any_name",
        username: "any_username",
      })
    );
    const req = {
      body: {
        name: "",
        username: "any_username",
        password: "any_password",
      },
    };
    const res = {
      send: (code) => {
        expect(code).to.be.equal(400);
        done();
      },
    };

    userController.create(req, res).catch(done);
  });

  it("Should return 400 if no username is provided", (done) => {
    sandbox.stub(userController.service, "create").returns(
      Promise.resolve({
        id: "any_id",
        name: "any_name",
        username: "any_username",
      })
    );
    const req = {
      body: {
        name: "any_name",
        username: "",
        password: "any_password",
      },
    };
    const res = {
      send: (code) => {
        expect(code).to.be.equal(400);
        done();
      },
    };

    userController.create(req, res).catch(done);
  });

  it("Should return 400 if no password is provided", (done) => {
    sandbox.stub(userController.service, "create").returns(
      Promise.resolve({
        id: "any_id",
        name: "any_name",
        username: "any_username",
      })
    );
    const req = {
      body: {
        name: "any_name",
        username: "any_username",
        password: "",
      },
    };
    const res = {
      send: (code) => {
        expect(code).to.be.equal(400);
        done();
      },
    };

    userController.create(req, res).catch(done);
  });

  it("should return a user if all fields is provided", (done) => {
    sandbox.stub(userController.service, "create").returns(
      Promise.resolve({
        id: "any_id",
        name: "any_name",
        username: "any_username",
      })
    );

    const req = {
      body: {
        name: "any_name",
        username: "any_username",
        password: "1234",
      },
    };

    const res = {
      send: (user) => {
        expect(user.id).to.be.equal("any_id");
        done();
      },
    };

    userController.create(req, res).catch(done);
  });
});
