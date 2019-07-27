import Vue from 'vue';
import Axios from 'axios';
import Vuex from 'vuex'

Vue.use(Vuex);


export default new Vuex.Store({
  state:{
    username:'',
    category:[]
  },
  mutations:{
    saveUserName(state,value){
      state.username = value;
    },
    saveCategory(state,value){
      state.category = value;
    }
  },
  actions:{
    getCategorys(cxt){
      return new Promise(()=>{
        Axios.post('/api/admin/category').then((result)=>{
          cxt.commit('saveCategory',result.data)
        })
      })
    }
  }
})















