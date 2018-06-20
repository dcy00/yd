// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import VueLazyLoad from 'vue-lazyload'
import '@/common/scss/app.scss';
import 'mint-ui/lib/style.css'
/*import { sync } from 'vuex-router-sync'*/
Vue.config.productionTip = false;
/*sync(store, router)*/
Vue.use(VueLazyLoad,{
  loading:require('@/assets/img/lazy.jpg')
});
Vue.filter('myPrice', function (value) {
  if (!value) return '0.00';
  return (value/100).toFixed(2);
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
