module.exports = async function(context, req) {
  const foundUser = context.bindings.userEntity;
  if (foundUser) {
    context.res = { body: { user: foundUser } };
    context.done();
  }
  context.res = { status: 400 };
  context.done();
};
