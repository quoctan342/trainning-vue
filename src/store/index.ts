import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import book from './book';

export default new Vuex.Store({
    state: {
        is_loading: false as boolean,
    },
    getters: {},
    mutations: {
        SET_LOADING(state: any, payload: boolean): void {
            state.is_loading = payload;
        },
    },
    actions: {},
    modules: {
        book,
    },
});
