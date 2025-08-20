import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import AccView from "../views/AccountView.vue";
import CustomerListView from "../views/CustomerListView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: LoginView,
    },
    {
      path: "/home",
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: "/account",
      component: AccView,
      meta: { requiresAuth: true },
    },
    {
      path: "/customers",
      component: CustomerListView,
      meta: { requiresAuth: true },
    },
  ],
});

export default router;
