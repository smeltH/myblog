import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/home/HomePage'
import Login from 'header/Login'
import Register from 'header/Register'
import Article from 'type/ArticleType'

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
    },
    {
      path:'/login',
      name:'loginlink',
      component: Login
    },
    {
      path:'/register',
      name:'registerlink',
      component: Register
    },
    {
      path:'/article/:articletype',
      name:'typelink',
      component:Article
    },
  ]
})
