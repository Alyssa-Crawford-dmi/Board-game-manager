<template>
  <div>
    <h1>Board games</h1>
    <Button
      class="p-button-raised p-button-text custom-button"
      :label="loggedIn ? 'Logout' : 'Login'"
      @click="loginChange"
    />
  </div>
</template>

<script>
import Button from "primevue/button";
import auth from "../auth";

export default {
  name: "Header",
  components: {
    Button,
  },
  data() {
    return { loggedIn: auth.loggedIn() };
  },
  emits: ["login"],
  created() {
    auth.onChange = (loggedIn) => {
      this.loggedIn = loggedIn;
    };
  },
  methods: {
    loginChange() {
      if (this.loggedIn) {
        auth.logout(() => {});
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

