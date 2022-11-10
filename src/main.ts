import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuelidate from "vuelidate";
import vuetify from "./plugins/Vuetify";
import VueMoment from "vue-moment";
import "./styles/scss/main.scss";
import "./plugins/Veevalidate/CustomRules";
import "./plugins/Directive";

Vue.config.productionTip = false;
Vue.prototype.$eventBus = new Vue();

Vue.use(Vuelidate);
Vue.use(VueMoment);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
