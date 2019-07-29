<template>
  <div class="article-detail">
    <home-header></home-header>
  </div>
</template>

<script>
  import HomeHeader from 'header/HomeHeader'
  export default {
    name: "ArticleDetail",
    data() {
      return {}
    },
    components:{
      HomeHeader
    }
  }
</script>

<style scoped>
  .article-type >>> .router-link-exact-active{
    color: #00c1de;
  }
</style>
