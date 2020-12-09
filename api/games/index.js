var azure = require("azure-storage");

module.exports = async function(context, req) {
  const method = req.method.toLowerCase();
  const foundUser = context.bindings.userEntity;

  switch (method) {
    case "get":
      if (foundUser) {
        context.res = { body: { gamesList: foundUser.ownedIds } };
        context.done();
      }
      context.done();
      return;

    case "put":
      if (!foundUser) {
        context.res = { status: 400 };
        context.done();
      }
      const tableService = azure.createTableService(
        process.env.TableConnection
      );

      const updatedUser = { ...foundUser, ownedIds: req.body.gameIdStr };
      tableService.replaceEntity("users", updatedUser, () => {});
  }
};
