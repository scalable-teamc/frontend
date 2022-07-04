import Vue from 'vue'
import App from './App.vue'
import router from './router';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'
import VModal from 'vue-js-modal'


Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueAxios, axios)
Vue.use(VModal)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
