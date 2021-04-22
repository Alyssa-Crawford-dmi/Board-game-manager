<template>
  <Header @login-change="showLogin = true" />
  <router-view />
  <LoginModal v-if="showLogin" @close-login="showLogin = false" />
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
    };
  },

  mounted() {
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
};
</script>
