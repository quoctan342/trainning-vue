import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import book from './book';

export default new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        book,
    },
});
