import Vue from 'vue';
import Axios from 'axios';
import Vuex from 'vuex';
import { getArticleList } from '../api/home/index';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        username: '', // 用户名
        articleInfo: {}, // 文章信息
        category: [], // 文章分类
        count: 5,
        articleList: []// 文章列表
    },
    mutations: {
    // 同步保存用户名
        saveUserName(state, value) {
            state.username = value;
        },
        // 同步文章分类
        saveCategory(state, value) {
            state.category = value;
        },
        /*
    * 同步保存所有的文章
    *
    */
        saveArticleList(state, value) {
            state.articleList = value;
        }
    },
    actions: {
    // 获取文章分类
        getCategorys(cxt) {
            return new Promise(() => {
                Axios.post('/api/admin/category').then((result) => {
                    cxt.commit('saveCategory', result.data);
                });
            });
        },
        /*
    * 获取文章内容列表
    * value：传过来文章第几页和每页多少条消息
    *       {page:0,count:0}
    * */
        getArticleLists(cxt, value) {
            getArticleList(value).then((result) => {
                console.log(result);
                result.data.data.map(item => item.releaseTime = new Date(item.releaseTime).toLocaleDateString().replace(/\//g, '-'));
                cxt.commit('saveArticleList', result.data.data);
            });
        }
    }
});
