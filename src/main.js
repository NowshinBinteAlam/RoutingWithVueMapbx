import Vue from 'vue';
import 'bootswatch/dist/cosmo/bootstrap.css';
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue';
import 'leaflet/dist/leaflet.css';

import VueGeolocation from '../node_modules/vue-browser-geolocation/dist/vue-geolocation';
import 'vue-strap';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'bootstrap/dist/css/bootstrap.css';


Vue.use(VueGeolocation);
Vue.use(BootstrapVue);
// import 'leaflet.icon.glyph';

Vue.config.productionTip = false;
window.Vue = Vue;

new Vue({
  render: h => h(App),
  data: {
    map: null,
    markers: [],
    selectedTileSet: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
  },
}).$mount('#app');
