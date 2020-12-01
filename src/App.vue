<template>
  <Header @login="showLogin = true" />
  <router-view />
  <Dialog
    header="Login"
    v-model:visible="showLogin"
    :modal="true"
    :style="{ width: '50vw' }"
  >
    <LoginModal @close-login="showLogin = false" />
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
    return { showLogin: false };
  },
};
</script>
