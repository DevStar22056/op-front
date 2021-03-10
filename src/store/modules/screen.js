export default {
  namespaced: true,
  state: {
    width: 0,
    height: 0
  },
  getters: {
    isAtLeastXL(state) {
      return state.width > 1200
    },
    isAtLeastLG(state) {
      return state.width > 992
    },
    isAtLeastMD(state) {
      return state.width > 768
    },
    isAtLeastSM(state) {
      return state.width > 576
    }
  },
  mutations: {
    updateWidth(state, value) {
      state.width = value
    },
    updateHeight(state, value) {
      state.height = value
    }
  }
}
