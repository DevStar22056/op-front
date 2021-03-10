import userRoutes from './user'
import addMeta from '@/router/addMeta'

const routes = [
    addMeta(userRoutes, { isUserRoute: true })
    // addMeta(admin, { isAdminRoute: true })
    // addMeta(sys_admin, { isSysAdminRoute: true })
]

export default addMeta(routes, { isAuthRequired: true, isPrivate: true })