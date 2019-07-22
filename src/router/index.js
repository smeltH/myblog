import Vue from 'vue'
import Router from 'vue-router'
import HomePage from 'home/HomePage'
import Login from 'home/basic/Login'
import Register from 'home/basic/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'HomePage',
      component: HomePage,
      children:[
        {
          path:'login',
          name:'loginlink',
          component: Login
        },
        {
          path:'register',
          name:'registerlink',
          component: Register
        },
      ]
    },
  ]
})
