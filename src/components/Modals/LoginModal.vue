<template>
  <form>
    <div class="space-below" v-if="signupMode">
      <InputText
        id="email"
        type="email"
        v-model="email"
        placeholder="Email"
        :class="['bounded-width', invalidEmail ? 'p-invalid' : '']"
      />
      <small id="email-help" class="p-invalid" v-if="invalidEmail"
        >Email can not be empty</small
      >
    </div>
    <div class="space-below">
      <InputText
        id="username"
        type="text"
        v-model="username"
        placeholder="Username"
        :class="['bounded-width', invalidUsername ? 'p-invalid' : '']"
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
      />
      <small id="password-help" class="p-invalid" v-if="invalidPassword"
        >Password can not be empty</small
      >
    </div>
    <div class="p-grid">
      <div class="p-col-4" style="text-align: left">
        <Button
          :label="signupMode ? 'Switch to login' : 'Switch to signup'"
          class="p-button-text p-button-secondary"
          @click="toggleMode"
        />
      </div>
      <div class="p-col-4" style="text-align: center">
        <Button
          :label="signupMode ? 'Signup' : 'Login'"
          class="p-button-rounded"
          @click="loginUser"
        />
      </div>
    </div>
  </form>
</template>
<script>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import auth from "../../auth";

export default {
  name: "LoginModal",
  components: {
    InputText,
    Button,
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
      this.$emit("toggle-mode");
    },
    loginUser() {
      this.resetErrors();
      try {
        this.validateFeilds();
      } catch (error) {
        return;
      }

      auth.login(this.username, this.password, (loggedIn) => {
        if (!loggedIn) {
          console.log("An error occured");
        } else {
          this.resetErrors();
          this.$emit("close-login");
        }
      });
    },
    validateFeilds() {
      if (this.signupMode && this.email.trim().length === 0) {
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
    resetErrors() {
      this.invalidUsername = false;
      this.invalidPassword = false;
      this.invalidEmail = false;
    },
  },
};
</script>
<style scoped>
.space-below {
  margin: 0 0 1rem 0;
}
.centered {
  margin: 0 auto;
  width: fit-content;
}
</style>