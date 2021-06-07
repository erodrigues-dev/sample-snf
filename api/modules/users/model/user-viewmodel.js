const parseToViewModel = (model) => ({
  id: model._id,
  name: model.name,
  username: model.username,
});

module.exports = {
  parseToViewModel,
};
