// import Vue from 'vue';
import VueRouter from 'vue-router';

const Index = () => import('@/pages/home/Index');
const Login = () => import('@/pages/Login');
const Register = () => import('@/pages/Register');
const ArticleDetail = () => import('@/pages/article/ArticleDetail');
const Article = () => import('@/components/Article');
const NotFound = () => import('@/components/NotFound');

// Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
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
        // {
        //     path: '/admin',
        //     name: 'adminlink',
        //     component: AdminPage,
        //     redirect: '/admin/userLists',
        //     children: [
        //         { path: 'userLists', name: 'userlink', component: UserLists },
        //         { path: 'articleLists/editArticle', name: 'editlink', component: EditArticle },
        //         { path: 'articleLists', name: 'articlelink', component: ArticleLists },
        //         { path: 'categoryAdd', name: 'categoryAddlink', component: CategoryAdd },
        //         { path: 'categoryLists', name: 'categorylink', component: CategoryLists },
        //         { path: 'createArticle', name: 'createArticlelink', component: CreateArticle }
        //     ]
        // },
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
