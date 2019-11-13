import Vue from 'vue';
import Router from 'vue-router';
import AdminPage from '@/pages/admin/AdminPage';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import UserLists from '@/pages/admin/basic/UserLists';
import ArticleLists from '@/pages/admin/basic/ArticleLists';
import CategoryAdd from '@/pages/admin/basic/CategoryAdd';
import CategoryLists from '@/pages/admin/basic/CategoryLists';
import CreateArticle from '@/pages/admin/basic/CreateArticle';
import EditArticle from '@/pages/admin/basic/EditArticle';
import ArticleDetail from '@/pages/article/ArticleDetail';
import Article from '@/components/Article';
import NotFound from '@/components/NotFound';

import Index from '@/pages/home/index';

Vue.use(Router);

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
            component: Index
        },
        {
            path: '/login',
            name: 'loginlink',
            component: Login
        },
        {
            path: '/register',
            name: 'registerlink',
            component: Register
        },
        {
            path: '/article/:articletype',
            name: 'typelink',
            component: Article
        },
        {
            path: '/deatil/:id',
            name: 'detaillink',
            component: ArticleDetail
        },
        {
            path: '/admin',
            name: 'adminlink',
            component: AdminPage,
            redirect: '/admin/userLists',
            children: [
                { path: 'userLists', name: 'userlink', component: UserLists },
                { path: 'articleLists/editArticle', name: 'editlink', component: EditArticle },
                { path: 'articleLists', name: 'articlelink', component: ArticleLists },
                { path: 'categoryAdd', name: 'categoryAddlink', component: CategoryAdd },
                { path: 'categoryLists', name: 'categorylink', component: CategoryLists },
                { path: 'createArticle', name: 'createArticlelink', component: CreateArticle }
            ]
        },
        {
            path: '/404',
            name: 'notfoundlink',
            component: NotFound
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
