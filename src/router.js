import Vue from 'vue'
import Router from 'vue-router'
import SignIn from './views/sign-in.vue'
import CauseList from './views/cause-list.vue'
import MyCauses from './views/my-causes.vue'
import store from './store';

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            component: CauseList,
            meta: {
                protected: false
            }
        },
        {
            path: '/my',
            component: MyCauses,
            meta: {
                protected: true
            }
        },
        {
            path: '/sign-in',
            component: SignIn,
            meta: {
                protected: false
            }
        },
    ]
})

router.beforeEach((to, from, next) => {
    const isProtected = to.meta.protected || false;

    if (isProtected) {
        if (store.state.username) {
            next();
        }
        else {
            next('/sign-in');
        }
    }
    else {
        next();
    }
});

export default router;
