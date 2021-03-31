<template>
  <div class="flex-container header">
    <h1 class="header-item">
      {{ headerText }}
    </h1>
    <GameListTypeNav
      v-if="activeUsername !== '' && onHomePage"
      class="header-item"
    />
    <div class="header-item">
      <Button
        class="p-button-raised p-button-text custom-button p-button-rounded"
        :label="accountBtnLabel"
        @click="showOverlay"
        aria-haspopup="true"
        aria-controls="overlay_menu"
        icon="pi pi-user"
        iconPos="right"
      />
      <Menu id="overlay_menu" ref="menu" :model="accountItems" :popup="true" />
    </div>
  </div>
</template>

<script>
import Menu from "primevue/menu";
import Button from "primevue/button";
import { loginState } from "../utils/auth";
import { activeUserState } from "../utils/activeUser";
import GameListTypeNav from "./GameListTypeNav.vue";

export default {
  name: "Header",
  components: {
    Button,
    Menu,
    GameListTypeNav,
  },
  emits: ["login"],
  data() {
    return {
      isLoggedIn: loginState.loggedInUser,
      activeUsername: activeUserState.activeUser,
    };
  },
  computed: {
    accountBtnLabel() {
      return this.isLoggedIn ? this.isLoggedIn : "My account";
    },
    onHomePage() {
      return this.$route.name === "Home";
    },
    headerText() {
      if (this.onHomePage) {
        return this.activeUsername
          ? `${this.activeUsername}'s games`
          : "Board games";
      }
      return "Friends";
    },
    disabled() {
      return !this.isLoggedIn;
    },
    accountItems() {
      return [
        {
          label: "My wishlist",
          command: () => {
            activeUserState.setActiveUserAndListMode(
              loginState.loggedInUser.value,
              true
            );
            this.sharedAction();
          },
          disabled: this.disabled,
        },
        {
          label: "Owned games",
          command: () => {
            activeUserState.setActiveUserAndListMode(
              loginState.loggedInUser.value,
              false
            );
            this.sharedAction();
          },
          disabled: this.disabled,
        },
        {
          label: "Friends",
          command: () => {
            this.$router.push("/friends");
          },
          disabled: this.disabled,
        },
        {
          label: this.isLoggedIn ? "Sign out" : "Login",
          command: () => {
            this.loginChange();
            this.sharedAction();
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
        activeUserState.setActiveUserAndListMode("");
      } else {
        this.$emit("login");
      }
    },
    showOverlay(event) {
      this.$refs.menu.toggle(event);
    },
    sharedAction() {
      this.$router.push("/");
    },
  },
};
</script>
<style scoped>
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}
div,
h1 {
  padding: 0;
  margin: 0;
}

@media screen and (max-width: 700px) {
  .flex-container {
    flex-direction: column;
    padding: 0;
  }
  .header-item {
    padding-bottom: 1rem;
  }
}
</style>

