import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './styles/scss/main.scss';
import Vuelidate from 'vuelidate';
Vue.prototype.$eventBus = new Vue();
Vue.config.productionTip = false;

Vue.use(Vuelidate);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
