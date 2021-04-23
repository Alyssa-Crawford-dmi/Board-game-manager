import axios from "axios";
import { ref } from "vue";
import { activeUserState } from "./activeUser";

const bcrypt = require("bcryptjs");

const API = "/api";
const HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
const options = { headers: HEADERS };
const duplicateUsername = "Username already exists";
const noSuchUser = "There is no user with that username. Please try again";
const badLogin = "Invalid username or password. Please try again";
const genericError = "Something went wrong. Please try again later";

export const loginState = {
  loggedInUser: ref(""),
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
        console.error(e);
        throw new Error(genericError);
      });
    this.loggedInUser.value = username;
    activeUserState.setActiveUserAndListMode(username);
  },
  async register(email, username, password) {
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
    this.loggedInUser.value = username;
    activeUserState.setActiveUserAndListMode(username);
  },
  async resetPasswordSendEmail(username) {
    await axios
      .get(`${API}/signup/${username}`)
      .then(async (res) => {
        if (res.data.email) {
          await axios.get(`${API}/reset/${res.data.email}`);
        } else {
          throw new Error(noSuchUser);
        }
      })
      .catch((e) => {
        if (e.message === noSuchUser) {
          throw new Error(noSuchUser);
        }
        throw new Error(genericError);
      });
  },
  async updatePassword(username, newPassword) {
    var hashedPassword = bcrypt.hashSync(newPassword, 8);
    await axios
      .put(
        `${API}/signup/${username}`,
        JSON.stringify({ password: hashedPassword }, options)
      )
      .catch(() => {
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
    this.loggedInUser.value = "";
    delete localStorage.username;
    delete sessionStorage.username;
  },
  saveLocalUser(username, staySignedIn) {
    if (staySignedIn) {
      localStorage.username = username;
    } else {
      sessionStorage.username = username;
    }
  },
  signInLocalUser() {
    if (sessionStorage.username) {
      this.loggedInUser.value = sessionStorage.username;
    } else if (localStorage.username) {
      this.loggedInUser.value = localStorage.username;
    }
  },
};
