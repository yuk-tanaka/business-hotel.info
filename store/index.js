export const state = () => ({
  loading: false,
})

export const getters = {
  isLoading: state => state.loading,
}

export const mutations = {
  setLoading: state => state.loading = !state.loading,
}

export const actions = {
  async switchLoading ({ commit }) {
    await commit('setLoading')
  },
}