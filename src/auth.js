import { ref } from "vue";
export const loginState = {
  loggedIn: ref(false),
  login(username, password) {
    console.log("Login ", username, " ", password);
    this.loggedIn.value = true;
  },
  register(email, username, password) {
    this.loggedIn.value = true;
    console.log("Signup ", email, " ", username, " ", password);
  },
  logout() {
    this.loggedIn.value = false;
  },
};
