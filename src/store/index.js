import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    year: '',
    region: '',
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
