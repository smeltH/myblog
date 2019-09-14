<template>
    <div id="homePage" class="homepage">
      <home-header></home-header>
      <home-content></home-content>
    </div>
</template>

<script>
  import HomeHeader from 'header/HomeHeader'
  import HomeContent from 'content/HomeContent'
  export default {
    name: "HomePage",
    data() {
        return {}
    },
    components:{
      HomeHeader,
      HomeContent
    },
    created(){
      // //页面渲染前将所有的文章列表添加到store里面
      // this.$store.dispatch('getArticleLists',{page:0,count:5})
    }
  }
</script>

<style scoped>
  .homepage{
    background-color: rgb(233,234,237);
  }
</style>
