import { createRouter, createWebHistory } from "vue-router";
import { systemInfo } from "../utils/systemInfo";
import Friends from "../views/Friends.vue";
import Home from "../views/Home.vue";
import Playground from "../views/playground.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/friends",
    name: "friends",
    component: Friends,
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

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition;
  } else {
    return { top: 0 };
  }
};

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior,
});

router.beforeEach((_, from, next) => {
  if (systemInfo.isModalOpen.value) {
    systemInfo.setIsModalOpen(false, true);
    console.log("Overiding nav", from);
    next(from);
    return;
  }
  next();
});

export default router;
