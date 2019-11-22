// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import ELEMENT from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/index';
import './assets/font/font-icon/iconfont.css';

import Axios from 'axios';

Vue.prototype.$axios = Axios;
// Vue.use(router);
Vue.config.productionTip = false;
Vue.use(ELEMENT);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
});
