import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vuelidate from 'vuelidate';
import vuetify from './plugins/vuetify';
import './styles/scss/main.scss';
import './plugins/Veevalidate';

Vue.config.productionTip = false;
Vue.prototype.$eventBus = new Vue();

Vue.use(Vuelidate);

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount('#app');
