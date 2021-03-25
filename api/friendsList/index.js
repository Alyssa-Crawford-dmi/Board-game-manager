const { TableQuery } = require("azure-storage");
var azure = require("azure-storage");

module.exports = async function(context, req) {
  const allResults = context.bindings.allResults;
  const curUser = context.bindings.req.params.currentUser;
  const filtered = allResults.filter((entry) => {
    return entry.PartitionKey === curUser || entry.RowKey === curUser;
  });
  context.res = { body: filtered };
  context.done();
};
