<template>
  <Dialog
    :header="headerText"
    v-model:visible="showLogin"
    :modal="true"
    :style="{ width: modalWidth }"
  >
    <form v-if="!tryingLogin">
      <p class="p-invalid centered">{{ error }}</p>
      <div class="space-below" v-if="!isLoginModal && !isResetModal">
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
          :onBlur="isSignupModal ? checkUniqueUsername : ''"
        />
        <small id="username-help" class="p-invalid" v-if="invalidUsername"
          >Username can not be empty</small
        >
      </div>
      <div>
        <InputText
          id="password"
          type="password"
          v-model="password"
          placeholder="Password"
          :class="['bounded-width', invalidPassword ? 'p-invalid' : '']"
          @keyup.enter="enterPressed"
          v-if="!isResetModal"
        />
        <small id="password-help" class="p-invalid" v-if="invalidPassword"
          >Password can not be empty</small
        >
      </div>

      <div class="other-options space-below" v-if="!isResetModal">
        <div class="p-field-checkbox">
          <Checkbox id="staySignedIn" v-model="staySignedIn" :binary="true" />
          <label for="staySignedIn">Stay signed in</label>
        </div>
        <Button
          v-if="isLoginModal"
          label="Forgot password?"
          class="p-button-text fogotPassword"
          @click="forgotPassword"
        />
      </div>
      <div class="action-buttons">
        <Button
          :label="secondaryActionLabel"
          class="p-button-secondary p-button-outlined toggle-action p-button-rounded"
          @click="toggleMode"
        />
        <Button
          :label="headerText"
          class="p-button-rounded"
          @click="loginUser"
        />
      </div>
    </form>
    <ProgressSpinner v-else />
  </Dialog>
</template>
<script>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { loginState } from "../../utils/auth";
import Checkbox from "primevue/checkbox";
import ProgressSpinner from "primevue/progressspinner";
import { systemInfo } from "../../utils/systemInfo";
import { LoginModalTypes } from "../../utils/modalTypes";
import Dialog from "primevue/dialog";

export default {
  name: "LoginModal",
  components: {
    InputText,
    Button,
    Checkbox,
    ProgressSpinner,
    Dialog,
  },
  emits: ["close-login"],
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
      tryingLogin: false,
      modalType: LoginModalTypes.LOGIN,
      showLogin: true,
      windowWidth: systemInfo.windowWidth,
    };
  },
  computed: {
    modalWidth() {
      const bigScreen = this.windowWidth > 700;
      if (bigScreen) {
        return "50vw";
      }
      return "90vw";
    },
    headerText() {
      switch (this.modalType) {
        case LoginModalTypes.LOGIN:
          return "Login";
        case LoginModalTypes.SIGN_UP:
          return "Sign Up";
        case LoginModalTypes.RESET_PASSWORD:
          return "Reset Password";
        default:
          return "";
      }
    },
    isSignupModal() {
      return this.modalType === LoginModalTypes.SIGN_UP;
    },
    isLoginModal() {
      return this.modalType === LoginModalTypes.LOGIN;
    },
    isResetModal() {
      return this.modalType === LoginModalTypes.RESET_PASSWORD;
    },
    secondaryActionLabel() {
      switch (this.modalType) {
        case LoginModalTypes.LOGIN:
          return "Switch to sign up";
        case LoginModalTypes.SIGN_UP:
          return "Switch to login";
        case LoginModalTypes.RESET_PASSWORD:
          return "Return to login";
        default:
          return "";
      }
    },
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
    showLogin: function () {
      if (!this.showLogin) {
        this.$emit("close-login");
      }
    },
  },

  methods: {
    toggleMode() {
      this.resetErrors();
      switch (this.modalType) {
        case LoginModalTypes.LOGIN:
          this.modalType = LoginModalTypes.SIGN_UP;
          break;
        case LoginModalTypes.SIGN_UP:
        case LoginModalTypes.RESET_PASSWORD:
          this.modalType = LoginModalTypes.LOGIN;
          break;
      }
    },
    forgotPassword() {
      this.resetErrors();

      this.modalType = LoginModalTypes.RESET_PASSWORD;
    },
    async loginUser() {
      this.tryingLogin = true;
      this.resetErrors();
      try {
        this.validateFeilds();
      } catch (error) {
        this.tryingLogin = false;
        return;
      }
      try {
        if (this.modalType === LoginModalTypes.SIGN_UP) {
          await loginState.register(this.email, this.username, this.password);
          this.toggleMode();
        } else if (this.modalType === LoginModalTypes.LOGIN) {
          await loginState.login(this.username, this.password);
        } else {
          await loginState.resetPassword(this.username);
          this.tryingLogin = false;
          return;
        }
        loginState.saveLocalUser(this.username, this.staySignedIn);
        this.tryingLogin = false;
        this.$emit("close-login");
      } catch (error) {
        this.tryingLogin = false;
        this.error = error.message;
      }
    },
    validateFeilds() {
      switch (this.modalType) {
        case LoginModalTypes.LOGIN:
          this.invalidUsername = !this.isFeildValid(this.username);
          this.invalidPassword = !this.isFeildValid(this.password);
          break;
        case LoginModalTypes.SIGN_UP:
          this.invalidEmail = !this.isEmailValid();
          this.invalidUsername = !this.isFeildValid(this.username);
          this.invalidPassword = !this.isFeildValid(this.password);
          break;
        case LoginModalTypes.RESET_PASSWORD:
          this.invalidUsername = !this.isFeildValid(this.username);
      }
      if (this.invalidEmail || this.invalidUsername || this.invalidPassword) {
        throw new Error("Invalid feild");
      }
    },
    isEmailValid() {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
    },
    isFeildValid(fieldToTest) {
      return fieldToTest.trim().length > 0;
    },
    resetErrors() {
      this.invalidUsername = false;
      this.invalidPassword = false;
      this.invalidEmail = false;
      this.error = "";
    },
    async checkUniqueUsername() {
      try {
        console.log("Verifing unique user");
        await loginState.verifyAvalibleUsername(this.username);
      } catch (error) {
        this.error = error.message;
      }
    },
    enterPressed() {
      document.getElementById("password").blur();
      this.loginUser();
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
.other-options {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 0.5rem;
}
.fogotPassword {
  padding: 0;
  margin: 0;
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