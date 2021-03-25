const { TableQuery } = require("azure-storage");
var azure = require("azure-storage");

module.exports = async function(context, req) {
  console.log(context.bindings.req.params.currentUser);
  const tableService = azure.createTableService(process.env.TableConnection);
  const currentUser = context.bindings.req.params.currentUser;
  const filter1 = TableQuery.stringFilter("invitee", "eq", currentUser);
  const filter2 = TableQuery.stringFilter("inviter", "eq", currentUser);
  var combinedFilter = TableQuery.combineFilters(filter1, "or", filter2);
  tableService.queryEntities("friends", combinedFilter, null, function(
    error,
    result
  ) {
    context.res = { body: result };
    context.done();
  });
};
