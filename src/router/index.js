import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Playground from "../views/playground.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/play",
    name: "playground",
    component: Playground,
  },
  {
    path: "/:pathMatch(.*)",
    redirect: { name: "Home" },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
