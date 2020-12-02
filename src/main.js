import { createApp } from "vue";
import App from "./App.vue";
import "primevue/resources/themes/bootstrap4-light-purple/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css"; //Layout
import "./assets/css/style.css";
import router from "./router";

const app = createApp(App);
app.use(router);
app.mount("#app");
