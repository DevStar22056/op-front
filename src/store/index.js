import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import global from './global'
import session from './modules/session'
import screen from './modules/screen'
import message from './modules/message'

export default new Vuex.Store({
    modules: {
        session,
        message,
        screen,
    },
    ...global,
    strict: process.env.NODE_ENV !== 'production'
})
