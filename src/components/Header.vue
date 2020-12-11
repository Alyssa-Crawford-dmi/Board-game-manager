<template>
  <div class="p-grid p-ai-center vertical-container header">
    <div class="p-col-12 p-sm-4" :style="{ textAlign: centerOrLeftPos }">
      <h1>
        {{ activeUsername ? `${activeUsername}'s games` : "Board games" }}
      </h1>
    </div>
    <div
      class="p-col-12 p-sm-4"
      v-if="activeUsername !== ''"
      :style="{ display: 'flex', justifyContent: 'center' }"
    >
      <div class="smallest-wrapping">
        <GameListTypeNav />
      </div>
    </div>
    <div class="p-col-12 p-sm-4" :style="{ textAlign: centerOrRightPos }">
      <Button
        class="p-button-raised p-button-text custom-button"
        label="My account"
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
      centerOrLeftPos: screen.width > 576 ? "left" : "center",
      centerOrRightPos: screen.width > 576 ? "right" : "center",
    };
  },
  computed: {
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
          label: "Shared with me",
          command: () => {
            console.log("shared");
            this.sharedAction();
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
.header {
  padding: 0 2rem;
}
.smallest-wrapping {
  margin: 0;
  padding: 0;
  width: fit-content;
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

