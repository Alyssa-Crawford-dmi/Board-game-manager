<template>
  <form>
    <p class="p-invalid centered">{{ error }}</p>
    <div class="space-below" v-if="signupMode">
      <InputText
        id="email"
        type="email"
        v-model="email"
        placeholder="Email"
        :class="['bounded-width', invalidEmail ? 'p-invalid' : '']"
      />
      <small id="email-help" class="p-invalid" v-if="invalidEmail"
        >Invalid email</small
      >
    </div>
    <div class="space-below">
      <InputText
        autofocus
        id="username"
        type="text"
        v-model="username"
        placeholder="Username"
        :class="['bounded-width', invalidUsername ? 'p-invalid' : '']"
        :onBlur="signupMode ? checkUniqueUsername : ''"
      />
      <small id="username-help" class="p-invalid" v-if="invalidUsername"
        >Username can not be empty</small
      >
    </div>
    <div class="space-below">
      <InputText
        id="password"
        type="password"
        v-model="password"
        placeholder="Password"
        :class="['bounded-width', invalidPassword ? 'p-invalid' : '']"
        @keyup.enter="loginUser"
      />
      <small id="password-help" class="p-invalid" v-if="invalidPassword"
        >Password can not be empty</small
      >
    </div>

    <div class="p-field-checkbox">
      <Checkbox id="staySignedIn" v-model="staySignedIn" :binary="true" />
      <label for="staySignedIn">Stay signed in</label>
    </div>
    <div class="action-buttons">
      <Button
        :label="signupMode ? 'Switch to login' : 'Switch to signup'"
        class="p-button-secondary p-button-outlined toggle-action p-button-rounded"
        @click="toggleMode"
      />
      <Button
        :label="signupMode ? 'Signup' : 'Login'"
        class="p-button-rounded"
        @click="loginUser"
      />
    </div>
  </form>
</template>
<script>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { loginState } from "../../utils/auth";
import Checkbox from "primevue/checkbox";

export default {
  name: "LoginModal",
  components: {
    InputText,
    Button,
    Checkbox,
  },
  props: {
    signupMode: { type: Boolean, default: false },
  },
  emits: ["close-login", "toggle-mode"],
  data() {
    return {
      email: "",
      username: "",
      password: "",
      invalidUsername: false,
      invalidPassword: false,
      invalidEmail: false,
      error: "",
      staySignedIn: false,
      toggleBtnPos: screen.width > 768 ? "left" : "center",
    };
  },
  watch: {
    username: function () {
      this.invalidUsername = false;
    },
    password: function () {
      this.invalidPassword = false;
    },
    email: function () {
      this.invalidEmail = false;
    },
  },
  methods: {
    toggleMode() {
      this.resetErrors();
      this.$emit("toggle-mode");
    },
    async loginUser() {
      this.resetErrors();
      try {
        this.validateFeilds();
      } catch (error) {
        return;
      }
      try {
        if (this.signupMode) {
          await loginState.register(this.email, this.username, this.password);
          this.toggleMode();
        } else {
          await loginState.login(this.username, this.password);
        }
        loginState.saveLocalUser(this.username, this.staySignedIn);
        this.$emit("close-login");
      } catch (error) {
        this.error = error.message;
      }
    },
    validateFeilds() {
      if (this.isEmailInvalid()) {
        this.invalidEmail = true;
      }
      if (this.username.trim().length === 0) {
        this.invalidUsername = true;
      }
      if (this.password.trim().length === 0) {
        this.invalidPassword = true;
      }
      if (this.invalidEmail || this.invalidUsername || this.invalidPassword) {
        throw new Error("Invalid feild");
      }
    },
    isEmailInvalid() {
      return this.signupMode && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
    },
    resetErrors() {
      this.invalidUsername = false;
      this.invalidPassword = false;
      this.invalidEmail = false;
      this.error = "";
    },
    async checkUniqueUsername() {
      try {
        await loginState.verifyAvalibleUsername(this.username);
      } catch (error) {
        this.error = error.message;
      }
    },
  },
};
</script>
<style scoped>
.space-below {
  margin: 0 0 1rem 0;
}
.centered {
  margin: 0rem auto 1rem auto;
  width: fit-content;
}
.action-buttons {
  display: flex;
  justify-content: space-between;
}
@media screen and (max-width: 500px) {
  .action-buttons {
    flex-direction: column;
    align-items: center;
  }
  .toggle-action {
    margin-bottom: 1rem;
  }
}
</style>