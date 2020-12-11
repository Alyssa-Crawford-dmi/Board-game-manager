var azure = require("azure-storage");

module.exports = async function(context, req) {
  const method = req.method.toLowerCase();
  const foundUser = context.bindings.userEntity;
  const listName = context.bindingData.listName;
  console.log(foundUser);

  switch (method) {
    case "get":
      if (foundUser) {
        context.res = { body: { gamesList: foundUser[listName] } };
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

      const updatedUser = { ...foundUser, [listName]: req.body.gameIdStr };
      tableService.replaceEntity("users", updatedUser, () => {});
  }
};
