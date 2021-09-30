import { createRouter, createWebHistory } from "vue-router";
import Home from "./Home.vue";
import Contact from "./Contact.vue";

const history = createWebHistory();

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/contact",
    name: "contact",
    component: Contact,
  },
];

const router = createRouter({ history, routes });

export default router;
