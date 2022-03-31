import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    storedUser: {
      userId: 0,
      permission: null,
      username: null,
      token: '',
      image: '',
    },
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
  },
  actions: {},
  modules: {},
});
