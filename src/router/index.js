import Vue from 'vue'
import Router from 'vue-router'
import publicRoutes from './public'
import privateRoutes from './private'
import store from '@/store'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        ...publicRoutes,
        ...privateRoutes,
    ]
});

router.beforeEach((to, from, next) => {
    if (to.meta.isAuthRequired) {
        store.dispatch('session/verifyAuthentication')
            .then(() => {
                next()
            })
            .catch((e) => {
                console.error(e)
                next('/login')
            })
    } else {
        next()
    }
})


export default router