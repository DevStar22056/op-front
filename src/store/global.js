export default {
  namespaced: false,
  state: {
    mask: {
      show: false
    }
  },
  getters: {
    routeName (state) {
      return state.route.name
    }
  },
  mutations: {
    setMaskState (state, { show }) {
      state.mask.show = show
    }
  }
}
