import Vue from 'vue'
import Router from 'vue-router'
import SignIn from './views/sign-in.vue'
import CauseList from './views/cause-list.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: CauseList
    },
    {
      path: '/sign-in',
      component: SignIn
    },
  ]
})
