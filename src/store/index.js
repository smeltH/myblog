import Vue from 'vue';
import Axios from 'axios';
import Vuex from 'vuex'
import {getTime} from "../static/js/getTime";

Vue.use(Vuex);


export default new Vuex.Store({
  state:{
    username:'',
    articleInfo:{},
    category:[],
    count:5
  },
  mutations:{
    saveUserName(state,value){
      state.username = value;
    },
    saveCategory(state,value){
      state.category = value;
    },
    saveArticle(state,value){
      state.articleInfo = value;
    }
  },
  actions:{
    getCategorys(cxt){
      return new Promise(()=>{
        Axios.post('/api/admin/category').then((result)=>{
          cxt.commit('saveCategory',result.data)
        })
      })
    },
    getArticles(cxt){
      return new Promise(()=>{
        Axios.post('/api/index/getArticleLists',{count:cxt.state.count}).then((result)=>{
          const arr1 = [],
                arr2 = [];
          result.data.data.map((item)=>{
            item.releaseTime = getTime(item.releaseTime)
            if(item.isTop){
              arr1.push(item)
            }else {
              arr2.push(item)
            }
          })
          const results = arr1.concat(arr2)
          cxt.commit('saveArticle',results)
        })
      })
    }
  },
  getters:{
    getArticle(state){
      return {data:state.articleInfo,maxPages:state.articleInfo.maxPages,totalCounts:state.articleInfo.totalCounts}
    }
  }
})















