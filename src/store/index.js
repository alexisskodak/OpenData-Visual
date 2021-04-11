import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })],
  state: {
    year: '',
    region: '',
    baseUrl:' https://opendata-visual.herokuapp.com/api'
  },
  getters: {
    getYear: state => {
      return state.year
    },
    getRegion: state => {
      return state.region
    }
  },
  mutations: {
    updateYear: (state, y) => {
      state.year = y
    },
    updateRegion: (state, r) => {
      state.region = r
    }
  },
  actions: {
  },
  modules: {
  }
})
