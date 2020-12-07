module.exports = async function(context, req) {
  const foundUser = context.bindings.userEntity;
  context.res = { body: { foundUser } };
  context.done();
};
