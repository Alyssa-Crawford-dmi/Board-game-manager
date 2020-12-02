<template>
  <Header @login="showLogin = true" />
  <router-view />
  <Dialog
    :header="signupMode ? 'Signup' : 'Login'"
    v-model:visible="showLogin"
    :modal="true"
    :style="{ width: '50vw' }"
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

export default {
  name: "App",
  components: {
    Header,
    Dialog,
    LoginModal,
  },
  data() {
    return { showLogin: false, signupMode: false };
  },
};
</script>
