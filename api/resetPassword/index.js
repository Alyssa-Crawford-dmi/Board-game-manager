var util = require("util");
const bcrypt = require("bcryptjs");

module.exports = async function(context, order) {
  link = `http://localhost:8080/reset/${context.bindings.req.params.username}`;
  context.bindings.message = {
    subject: util.format("Password reset for board game manager"),
    content: [
      {
        type: "text/plain",
        value: util.format(
          `Hello, Please use this link to reset your password: ${link}`
        ),
      },
    ],
  };
};
