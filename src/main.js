import { createApp } from "vue";
import App from "./App.vue";
import "primevue/resources/themes/saga-blue/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import router from "./router";

createApp(App)
  .use(router)
  .mount("#app");
