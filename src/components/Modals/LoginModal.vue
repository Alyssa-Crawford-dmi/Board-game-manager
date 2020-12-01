<template>
  <form>
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
    <div>
      <InputText
        id="password"
        type="password"
        v-model="password"
        placeholder="Password"
        :class="[
          'bounded-width',
          'space-below',
          invalidPassword ? 'p-invalid' : '',
        ]"
      />
      <small id="password-help" class="p-invalid" v-if="invalidPassword"
        >Password can not be empty</small
      >
    </div>
    <div class="centered">
      <Button
        :label="'Login'"
        class="p-button-rounded p-button-secondary"
        @click="loginUser"
      />
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
  emits: ["close-login"],
  data() {
    return {
      username: "",
      password: "",
      invalidUsername: false,
      invalidPassword: false,
    };
  },
  watch: {
    username: function () {
      this.invalidUsername = false;
    },
    password: function () {
      this.invalidPassword = false;
    },
  },
  methods: {
    loginUser() {
      if (this.username.trim().length === 0) {
        this.invalidUsername = true;
        return;
      }
      if (this.password.trim().length === 0) {
        this.invalidPassword = true;
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
    resetErrors() {
      this.invalidUsername = false;
      this.invalidPassword = false;
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