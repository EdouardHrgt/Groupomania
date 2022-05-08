import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    storedUser: {
      userId: null,
      permission: '',
      username: '',
      token: '',
      image: '',
    },
    Profile: '',
  },
  getters: {
    //Effectuer des calculs
    doTheMaths(state) {
      return state.storedUser.userId * 2;
    },
  },
  mutations: {
    //MAJ les datas
    saveStoredUser(state, updateState) {
      state.storedUser = updateState;
    },
    saveProfile(state, updateState) {
      state.Profile = updateState
    },
  },
  actions: {},
  modules: {},
});
