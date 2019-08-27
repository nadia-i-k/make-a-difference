import Vue from 'vue'
import Router from 'vue-router'
import SignIn from './views/sign-in.vue'
import CauseList from './views/cause-list.vue'
import MyCauses from './views/my-causes.vue'

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
        path: '/my',
        component: MyCauses
    },
    {
      path: '/sign-in',
      component: SignIn
    },
  ]
})
