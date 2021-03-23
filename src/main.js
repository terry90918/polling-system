import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vueHighcharts from "highcharts-vue";
import vueMoment from "vue-moment";

Vue.config.productionTip = false;

Vue.use(vueHighcharts);
Vue.use(vueMoment);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
