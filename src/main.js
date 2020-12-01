import { createApp } from "vue";
import App from "./App.vue";
import "primevue/resources/themes/bootstrap4-light-purple/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css"; //Layout
import "./assets/css/style.css";
import router from "./router";
// import gAuth from "vue3-google-auth";

// const $gAuth = gAuth.createGAuth({
//   clientId:
//     "446992655857 - ndsqdt9anhpq202c5q5mrtufsf6o9bd6.apps.googleusercontent.com",
// });
// app.use($gAuth);

const app = createApp(App);
app.use(router);
app.mount("#app");
