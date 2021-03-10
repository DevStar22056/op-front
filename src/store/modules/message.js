import includes from 'lodash/includes'

let id = 0

export default {
  namespaced: true,
  state: {
    content: null,
    type: 'success'
  },
  mutations: {
    setMessage (state, value) {
      state.content = value
    },
    setType (state, value) {
      state.type = value
    }
  },
  actions: {
    display ({ commit }, payload) {
      const message = typeof payload === 'string' ? payload : payload.message
      const type = payload.type || 'success'
      const delay = payload.delay || 3000

      const messageId = ++id
      const allowedTypes = ['success', 'warning', 'error']
      if (!includes(allowedTypes, type)) {
        console.error('Message type must be one of', allowedTypes.join(', '))
      }
      commit('setMessage', message)
      commit('setType', type)
      setTimeout(() => {
        if (id === messageId) {
          commit('setMessage', null)
        }
      }, delay)
    }
  }
}
