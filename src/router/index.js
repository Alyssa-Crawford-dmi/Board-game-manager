import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Playground from "../views/playground.vue";
import GameDetail from "../views/GameDetail.vue";

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
    path: "/game/:id",
    name: "gameDetail",
    component: GameDetail,
  },
  {
    path: "/:pathMatch(.*)",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
