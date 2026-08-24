import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import AdventureNotes from "../pages/AdventureNotes.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: Home },
    { path: "/notas", name: "notas", component: AdventureNotes },
  ],
});

export default router;