import addMeta from '@/router/addMeta'
import dashboard from './dashboard'

const PrivateUser = () => import(/* webpackChunkName: "PrivateUser" */ 'private')

const redirect = { name: 'home' }

export default {
    path: '/u',
    name: 'user',
    component: PrivateUser,
    redirect,
    children: [
        ...addMeta(dashboard, { isUser: true }),
        {
            path: '*',
            redirect
        }
    ]
}