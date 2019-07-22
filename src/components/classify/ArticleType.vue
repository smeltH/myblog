<template>
  <div class="article-type">
    <home-header></home-header>
  </div>
</template>

<script>
  import HomeHeader from 'header/HomeHeader'
  export default {
    name: "ArticleType",
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
