import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    Profile: '',
  },
  getters: {},
  mutations: {
    saveProfile(state, updateState) {
      state.Profile = updateState;
    },
  },
  actions: {},
  modules: {},
});
