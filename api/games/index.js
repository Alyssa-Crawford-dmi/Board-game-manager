module.exports = async function(context, req) {
  const foundUser = context.bindings.userEntity;
  if (foundUser) {
    context.res = { body: { gamesList: foundUser.ownedIds } };
    context.done();
  }
  context.done();
};
