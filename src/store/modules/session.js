import { http, setHttpToken } from '@/axios'
import router from '@/router'
import filterUser from '@/utilities/filterUser'

const tokenName = 'auth_token'

export default {
  namespaced: true,

  state: {
    isAuthenticated: false,
    user: {
      id: null,
      email: null,
      firstName: null,
      lastName: null,
      avatar: null,
      machineDetection: null,
      forwardSoftphone: null,
      numbers: null
    }
  },

  getters: {
    userFullName(state) {
      return state.user.firstName + ' ' + state.user.lastName
    },
    currentUser(state) {
      return state.user
    }
  },

  mutations: {
    setIsAuthenticated(state, value) {
      state.isAuthenticated = value
    },
    setUser(state, payload) {
      state.user = filterUser(payload)
    }
  },

  actions: {
    authenticate({ commit }, payload) {
      if (!payload.token) {
        return console.error('Authentication token is required.')
      }
      localStorage.setItem(tokenName, payload.token)
      setHttpToken(payload.token)
      commit('setUser', payload)
      commit('setIsAuthenticated', true)
      router.push({ name: 'demo' })

    },

    verifyAuthentication({ state, commit }) {
      return new Promise((resolve, reject) => {
        if (state.isAuthenticated) {
          resolve()
        } else {
          const token = localStorage.getItem(tokenName)
          if (token) {
            setHttpToken(token)
            http.get('/auth/current')
              .then(({ data }) => {
                commit('setUser', data)
                commit('setIsAuthenticated', true)
                resolve(data)
              })
              .catch(reject)
          } else {
            reject()
          }
        }
      })
    },

    logout({ state, commit }) {
      if (state.isAuthenticated) {
        http.post('/users/logout')
          .then(() => { })
          .catch(() => { })
      }
      setHttpToken(null)
      commit('setUser', {})
      commit('setIsAuthenticated', false)
      localStorage.removeItem(tokenName)
      router.push({ name: 'home' })
    }
  }
}
