var azure = require("azure-storage");

module.exports = async function(context, req) {
  const method = req.method.toLowerCase();
  const partitionKey = context.bindings.req.params.person1;
  const rowKey = context.bindings.req.params.person2;
  const tableService = azure.createTableService(process.env.TableConnection);
  const baseFriendRelationShip = {
    PartitionKey: partitionKey,
    RowKey: rowKey,
    invitee: context.bindings.req.params.invitee,
  };
  if (!context.bindings.userEntity) {
    context.res = { status: 400 };
    context.done();
    return;
  }
  switch (method) {
    case "post":
      if (context.bindings.friendEntity) {
        context.res = { body: { error: "Already friends" } };
        context.done();
        return;
      }
      tableService.insertEntity(
        "friends",
        { ...baseFriendRelationShip, pending: true },
        (err) => {
          if (err) {
            context.res = { status: 400 };
          }
          context.done();
        }
      );
      break;
    case "put":
      if (!context.bindings.friendEntity) {
        context.res = {
          body: { error: "No pending friend request" },
          status: 400,
        };
        context.done();
        return;
      }
      tableService.insertOrReplaceEntity(
        "friends",
        { ...baseFriendRelationShip, pending: false },
        (err) => {
          if (err) {
            context.res = { status: 400 };
          }
          context.done();
        }
      );
    case "delete":
      if (!context.bindings.friendEntity) {
        context.res = { body: { error: "No existing friend" }, status: 400 };
        context.done();
        return;
      }
      tableService.deleteEntity("friends", baseFriendRelationShip, (err) => {
        if (err) {
          context.res = { status: 400 };
        }
        context.done();
      });
  }
};
