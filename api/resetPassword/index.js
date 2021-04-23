var util = require("util");
var CryptoJS = require("crypto-js");

module.exports = async function(context, order) {
  encryptedUserName = encodeURIComponent(
    CryptoJS.AES.encrypt(
      context.bindings.req.params.username,
      "resetBoardGamePass"
    )
  );
  link = `http://localhost:8080/reset?user=${encryptedUserName}`;
  context.bindings.message = {
    subject: util.format("Password reset for board game manager"),
    content: [
      {
        type: "text/plain",
        value: `Hello, Please use this link to reset your password: ${link}`,
      },
    ],
  };
};
