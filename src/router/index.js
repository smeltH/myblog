import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/home/HomePage'
import AdminPage from '@/components/admin/AdminPage'
import Login from 'header/Login'
import Register from 'header/Register'
import UserLists from 'admin/basic/UserLists'
import ArticleLists from 'admin/basic/ArticleLists'
import CategoryAdd from 'admin/basic/CategoryAdd'
import CategoryLists from 'admin/basic/CategoryLists'
import CreateArticle from 'admin/basic/CreateArticle'
import EditArticle from 'admin/basic/EditArticle'
import ArticleDetail from 'article/detail/ArticleDetail'
import Article from 'article/ArticleType'
import NotFound from 'public/NotFound'

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
    {
      path:'/deatil/:id',
      name:'detaillink',
      component:ArticleDetail
    },
    {
      path:'/admin',
      name:'adminlink',
      component:AdminPage,
      redirect:'/admin/userLists',
      children:[
        {path:'userLists',name:'userlink',component:UserLists},
        {path:'articleLists/editArticle',name:'editlink',component:EditArticle},
        {path:'articleLists',name:'articlelink',component:ArticleLists},
        {path:'categoryAdd',name:'categoryAddlink',component:CategoryAdd},
        {path:'categoryLists',name:'categorylink',component:CategoryLists},
        {path:'createArticle',name:'createArticlelink',component:CreateArticle},
      ]
    },
    {
      path:'/404',
      name:'notfoundlink',
      component:NotFound
    },
    {
      path: "*",
      redirect: "/404"
    }
  ]
})
