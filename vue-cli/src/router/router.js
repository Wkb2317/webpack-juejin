import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/about",
    component: () => import("../views/About.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
