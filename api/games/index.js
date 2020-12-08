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

    case "post":
      context.done();
  }
};
