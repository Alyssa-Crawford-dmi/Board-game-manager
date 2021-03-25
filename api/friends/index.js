var azure = require("azure-storage");

module.exports = async function(context, req) {
  const method = req.method.toLowerCase();
  const inviter = context.bindings.req.params.inviter;
  const invitee = context.bindings.req.params.invitee;
  const RowKey =
    invitee < inviter ? `${invitee}*${inviter}` : `${inviter}*${invitee}`;
  const tableService = azure.createTableService(process.env.TableConnection);
  let isNew;

  switch (method) {
    case "post":
      isNew = true;
      break;
    case "put":
      isNew = false;
  }

  const friendRelationShip = {
    PartitionKey: "friends",
    RowKey,
    inviter,
    invitee,
    pending: isNew,
  };

  tableService.retrieveEntity("friends", "friends", RowKey, function(
    error,
    entity
  ) {
    if ((isNew && !entity) || (!isNew && !!entity)) {
      insertEntity(tableService, friendRelationShip, context);
      return;
    } else {
      context.res = { body: { error: "error" } };
      context.done();
      return;
    }
  });
};

function insertEntity(tableService, friendRelationShip, context) {
  tableService.insertOrReplaceEntity("friends", friendRelationShip, (err) => {
    if (err) {
      context.res = { status: 400 };
    }
    context.done();
  });
}
