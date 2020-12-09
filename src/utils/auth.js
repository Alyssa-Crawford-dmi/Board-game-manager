import { ref } from "vue";
import axios from "axios";
const bcrypt = require("bcryptjs");

const API = "/api";
const HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
const options = { headers: HEADERS };
const duplicateUsername = "Username already exists";
const badLogin = "Invalid username or password. Please try again";
const genericError = "Something went wrong. Please try again later";

export const loginState = {
  loggedIn: ref(false),
  async login(username, password) {
    await axios
      .get(API + `/login/${username}`, options)
      .then((res) => {
        if (!bcrypt.compareSync(password, res.data.user.password)) {
          throw new Error(badLogin);
        }
      })
      .catch((e) => {
        if (e.response || e.message === badLogin) {
          throw new Error(badLogin);
        }
        console.log(e);
        throw new Error(genericError);
      });
    this.loggedIn.value = true;
  },
  async register(email, username, password) {
    this.loggedIn.value = true;
    var hashedPassword = bcrypt.hashSync(password, 8);
    await axios
      .post(
        API + `/signup/${username}`,
        JSON.stringify({
          username: username,
          email,
          password: hashedPassword,
        }),
        options
      )
      .then(() => {})
      .catch((e) => {
        if (e.response) {
          throw new Error(duplicateUsername);
        }
        throw new Error(genericError);
      });
  },
  async verifyAvalibleUsername(username) {
    await axios
      .get(API + `/signup/${username}`, options)
      .then((res) => {
        if (!res.data.isUsernameUnique) {
          throw new Error(duplicateUsername);
        }
      })
      .catch((e) => {
        if (e.message === duplicateUsername) {
          throw new Error(duplicateUsername);
        }
        throw new Error(genericError);
      });
  },
  logout() {
    this.loggedIn.value = false;
    delete localStorage.username;
  },
  saveLocalUser(username) {
    localStorage.username = username;
  },
  signInLocalUser() {
    if (localStorage.username) {
      this.loggedIn.value = true;
    }
  },
};
