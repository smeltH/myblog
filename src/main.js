// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import store from './store/index'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/font/font-icon/iconfont.css'

//编辑器引入的
import jQuery from 'jquery'
import VueFroala from 'vue-froala-wysiwyg'

require('froala-editor/js/froala_editor.pkgd.min')
require('froala-editor/css/froala_editor.pkgd.min.css')
require('font-awesome/css/font-awesome.css')
require('froala-editor/js/languages/zh_cn')
require('froala-editor/css/froala_style.min.css')

window.$ = jQuery;
window.jQuery = jQuery;
Vue.use(VueFroala)

import Axios from 'axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

Vue.prototype.$axios = Axios
Vue.use(VueAwesomeSwiper)
Vue.use(router);
Vue.config.productionTip = false
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
