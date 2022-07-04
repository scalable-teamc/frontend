import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLoggedIn: false,
        username: null,
        name: null,
    },
    getters: {
        getIsLoggedIn(state) {
            return state.isLoggedIn;
        }
    },
    mutations: {
        setIsLoggedIn(state, isLoggedIn) {
            state.isLoggedIn = isLoggedIn;
        },
        setUsername(state, username) {
            state.username = username;
        },
        setName(state, name) {
            state.name = name;
        },
    },
    actions: {
        setLoggedInUser({ commit }, payload) {
            commit("setIsLoggedIn", payload.loggedIn);
            commit("setUsername", payload.username);
            // commit("setName", payload.name);
        },
        clearUser({ commit }) {
            commit("setIsLoggedIn", false);
            commit("setUsername", null);
            commit("setName", null);
        },
    },
});