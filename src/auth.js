export default {
  loggedIn() {
    return !!localStorage.username;
  },
  login(email, password, cb) {
    localStorage.username = email;
    cb(true);
    this.onChange(true);
  },
  logout(cb) {
    delete localStorage.username;
    if (cb) {
      cb();
    }
    this.onChange(false);
  },
  onChange() {},
};
