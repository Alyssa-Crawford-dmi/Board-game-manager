module.exports = async function (context, req) {
  const method = req.method.toLowerCase();
  const foundUser = context.bindings.userEntity;

  var isUsernameUnique = true;
  switch (method) {
    case "get":
      if (foundUser) {
        isUsernameUnique = false;
      }
      context.res = { body: { isUsernameUnique } };
      context.done();

    case "post":
      if (foundUser) {
        context.res = { status: 400 };
        context.done();
      }
      context.bindings.tableOut = [];
      context.bindings.tableOut.push({
        PartitionKey: "users",
        RowKey: req.body.username,
        ...req.body,
      });
      addedUser = true;
      context.done();
  }
};
