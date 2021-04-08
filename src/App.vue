<template>
  <Header @login-change="showLogin = true" />
  <router-view />
  <Dialog
    :header="signupMode ? 'Signup' : 'Login'"
    v-model:visible="showLogin"
    :modal="true"
    :style="{ width: modalWidth }"
  >
    <LoginModal
      @close-login="showLogin = false"
      :signupMode="signupMode"
      @toggle-mode="signupMode = !signupMode"
    />
  </Dialog>
</template>
<script>
import Header from "@/components/Header.vue";
import Dialog from "primevue/dialog";
import LoginModal from "@/components/Modals/LoginModal";
import { loginState } from "./utils/auth";
import { systemInfo } from "./utils/systemInfo";

export default {
  name: "App",
  components: {
    Header,
    Dialog,
    LoginModal,
  },
  data() {
    return {
      showLogin: false,
      signupMode: false,
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
