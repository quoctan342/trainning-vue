import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import book from "./book";

export default new Vuex.Store({
  state: {
    is_loading: false as boolean,
    reqPending: 0 as number,
  },
  getters: {},
  mutations: {
    SET_LOADING(state: any, payload: boolean): void {
      state.is_loading = payload;
    },
    REQUEST_PENDING_ADD(state: any): void {
      state.reqPending += 1;
    },
    REQUEST_PENDING_DONE(state: any): void {
      state.reqPending -= 1;
    },
  },
  actions: {},
  modules: {
    book,
  },
});
