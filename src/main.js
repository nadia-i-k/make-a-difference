import Vue from 'vue'
import app from './app.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(app)
}).$mount('#app')
