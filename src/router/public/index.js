const Login = () => import(/* webpackChunkName: "Login" */  'public/login.vue')
// const Register = () => import(/* webpackChunkName: "Register" */  'public/register.vue')
const ForgotPassword = () => import(/* webpackChunkName: "ForgotPassword" */  'public/forgot_password.vue')
const ResetPassword = () => import(/* webpackChunkName: "ResetPassword" */  'public/reset_password.vue')
const routes = [
    { path: '/', name: "home", component: Login },
    { path: '/login', name: "login", component: Login },
    // { path: '/register', name: "register", component: Register },
    { path: '/forgot_password', name: "forgot_password", component: ForgotPassword },
    { path: '/reset_password/:hash', name: "reset_password", component: ResetPassword },
]

export default routes.map(route => {
    return {
        path: route.path,
        name: route.name,
        components: {
            default: route.component,
        },
        meta: {
            isPublic: true
        }
    }
})