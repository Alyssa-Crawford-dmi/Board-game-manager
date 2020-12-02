<template>
  <div>
    <h1>Board games</h1>
    <Button
      class="p-button-raised p-button-text custom-button"
      :label="isLoggedIn ? 'Logout' : 'Login'"
      @click="loginChange"
    />
  </div>
</template>

<script>
import Button from "primevue/button";
import { loginState } from "../auth";

export default {
  name: "Header",
  components: {
    Button,
  },
  emits: ["login"],
  data() {
    return {
      isLoggedIn: loginState.loggedIn,
    };
  },
  methods: {
    loginChange() {
      if (this.isLoggedIn) {
        loginState.logout();
      } else {
        this.$emit("login");
      }
    },
  },
};
</script>
<style scoped>
div {
  position: relative;
}
.custom-button {
  position: absolute;
  right: 0;
  top: 0;
}
</style>

