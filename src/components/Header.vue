<template>
  <div class="p-grid p-ai-center vertical-container header">
    <div class="p-col-6">
      <h1>Alyssa's games</h1>
    </div>
    <div class="p-col-6" style="text-align: right">
      <Button
        class="p-button-raised p-button-text custom-button"
        label="My account"
        @click="showOverlay"
        aria-haspopup="true"
        aria-controls="overlay_menu"
        icon="pi pi-user"
        iconPos="right"
      />
      <Menu id="overlay_menu" ref="menu" :model="items" :popup="true" />
    </div>
  </div>
</template>

<script>
import Menu from "primevue/menu";
import Button from "primevue/button";
import { loginState } from "../utils/auth";

export default {
  name: "Header",
  components: {
    Button,
    Menu,
  },
  emits: ["login"],
  data() {
    return {
      isLoggedIn: loginState.loggedIn,
    };
  },
  computed: {
    disabled() {
      return !this.isLoggedIn;
    },
    items() {
      return [
        {
          label: "My wishlist",
          command: () => {
            console.log("Wishlist");
          },
          disabled: this.disabled,
        },
        {
          label: "Owned games",
          command: () => {
            console.log("Owned");
          },
          disabled: this.disabled,
        },
        {
          label: "Shared with me",
          command: () => {
            console.log("shared");
          },
          disabled: this.disabled,
        },
        {
          label: this.isLoggedIn ? "Sign out" : "Login",
          command: () => {
            this.loginChange();
          },
          icon: "pi pi-user",
        },
      ];
    },
  },
  methods: {
    loginChange() {
      if (this.isLoggedIn) {
        loginState.logout();
      } else {
        this.$emit("login");
      }
    },
    showOverlay(event) {
      this.$refs.menu.toggle(event);
    },
  },
};
</script>
<style scoped>
.header {
  padding: 0 2rem;
}
div {
  padding: 0;
  margin: 0;
}
@media screen and (max-width: 700px) {
  .header {
    padding: 0 0.5rem;
  }
}
</style>

