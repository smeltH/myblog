import Vue from 'vue';
import Axios from 'axios';
import Vuex from 'vuex'


Vue.use(Vuex);


export default new Vuex.Store({
  state:{
    username:''
  },
  mutations:{
    saveUserName(state,value){
      state.username = value;
    }
  }
})















