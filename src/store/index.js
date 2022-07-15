import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLoggedIn: false,
        username: null,
        name: null,
        desc: null,
        image: "",
        uid: null,
        following: [],
        follower: []
    },
    getters: {
        getIsLoggedIn(state) {
            return state.isLoggedIn;
        },
    },
    mutations: {
        setIsLoggedIn(state, isLoggedIn) {
            state.isLoggedIn = isLoggedIn;
        },
        setUsername(state, username) {
            state.username = username;
        },
        setUid(state, uid) {
            state.uid = uid;
        },
        setName(state, name) {
            state.name = name;
        },
        setImg(state, image) {
            state.image = image
        },
        setDesc(state, desc) {
            state.desc = desc
        },
        setFollowing(state, following) {
            state.following = following
        },
        setFollower(state, follower) {
            state.follower = follower
        }
    },
    actions: {
        setLoggedInUser({commit}, payload) {
            commit("setIsLoggedIn", payload.loggedIn);
            commit("setUid", payload.uid);
            commit("setUsername", payload.username);
            commit("setName", payload.name);
            commit("setImg", payload.image);
            commit("setDesc", payload.desc);
            commit("setFollowing", payload.following);
            commit("setFollower", payload.follower);
        },
        clearUser({commit}) {
            commit("setIsLoggedIn", false);
            commit("setUid", null);
            commit("setUsername", null);
            commit("setName", null);
            commit("setImg", null);
            commit("setDesc", null);
        },
        setFollow({commit}, payload) {
            commit("setFollowing", payload.following);
            commit("setFollower", payload.follower);
        },
        setProfile({commit}, payload) {
            commit("setName", payload.name);
            commit("setImg", payload.image);
            commit("setDesc", payload.desc);
        }
    },
});