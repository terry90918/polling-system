import Vue from "vue";
import VueRouter from "vue-router";
import Polls from "../views/polls";
import Poll from "../views/poll";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Polls",
    component: Polls,
  },
  {
    path: "/poll/:id",
    name: "Poll",
    component: Poll,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
