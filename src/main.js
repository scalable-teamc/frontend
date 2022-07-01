import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueAxios, axios)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
