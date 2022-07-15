import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Auth.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/MyProfile.vue"),
  },
  {
    path: "/archive",
    name: "Archive",
    component: () => import("../views/Archive.vue"),
  },
  {
    path: "/user-profile/:uid",
    name: "UserProfile",
    props: true,
    component: () => import("../views/UserProfile.vue"),
  },
  {
    path: "/search",
    name: "Search",
    props: true,
    component: () => import("../views/Search.vue"),
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  let isLoggedIn = store.state.isLoggedIn;
  if (to.name !== "Login" && !isLoggedIn) {
    // redirect to login page
    next({ name: "Login" });
  } else {
    //otherwise, let go
    next();
  }
});

export default router;
