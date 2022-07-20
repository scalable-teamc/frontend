import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import axios from "axios";

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

function isValidJwt(jwt) {
    if (!jwt || jwt.split('.').length < 3) {
        return false
    }
    const data = JSON.parse(atob(jwt.split('.')[1]))
    const exp = new Date(data.exp * 1000) // JS deals with dates in milliseconds since epoch
    const now = new Date()
    return now < exp
}

router.beforeEach(async (to, from, next) => {
    let isLoggedIn = store.state.isLoggedIn;
    let token = sessionStorage.getItem("token")
    if (to.name !== "Login" && !isLoggedIn && !token) {
        // redirect to login page
        next({name: "Login"});
    } else if (isValidJwt(token) && !isLoggedIn) {
            let response = await axios.post("http://localhost:8082/auth/token", {'token': token})
            console.log(response.data)
            if (response.data.success) {
                let profile = await axios.post("http://localhost:8084/profile/getprof", {
                    "uid": response.data.uid,
                    "username": response.data.username
                });
                await store.dispatch("setLoggedInUser", {
                    "loggedIn": true,
                    "uid": response.data.uid,
                    "username": response.data.username,
                    "name": profile.data.display_name,
                    "image": profile.data.picture,
                    "desc": profile.data.description,
                    "following": profile.data.following,
                    "follower": profile.data.follower
                });
                console.log(token)
            next()
        }
    } else {
        //otherwise, let go
        next();
    }
});

export default router;
