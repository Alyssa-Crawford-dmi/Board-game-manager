<template>
  <Header @login-change="showLogin = true" />
  <router-view />
  <LoginModal
    v-if="showLogin"
    @close-login="showLogin = false"
    :resetUsername="resetUsername"
  />
</template>
<script>
import Header from "@/components/Header.vue";
import LoginModal from "@/components/Modals/LoginModal";
import { loginState } from "./utils/auth";
import { systemInfo } from "./utils/systemInfo";

export default {
  name: "App",
  components: {
    Header,
    LoginModal,
  },
  data() {
    return {
      showLogin: false,
      resetUsername: "",
    };
  },

  mounted() {
    this.resetUsername = this.$route.query.user;
    if (this.resetUsername) {
      loginState.logout();
      this.showLogin = true;
    }
    loginState.signInLocalUser();
    if (!loginState.loggedInUser.value) {
      this.showLogin = true;
    }
    window.addEventListener(
      "resize",
      systemInfo.updateWindowSize.bind(systemInfo)
    );
  },
  unmounted() {
    window.removeEventListener("resize", systemInfo.updateWindowSize);
  },
  watch: {
    $route(to) {
      this.resetUsername = to.query.user;
      if (this.resetUsername) {
        loginState.logout();
        this.showLogin = true;
      }
    },
  },
};
</script>
