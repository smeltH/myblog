<template>
    <div class="other-content-left">
      <div class="other-title">
        <h2>最新文章</h2>
      </div>
      <div class="article-lists" v-for="(article,index) in 5">
        <articles></articles>
      </div>
    </div>
</template>

<script>
  import Articles from 'public/Article'
  export default {
    name: "OtherContentLeft",
    data() {
        return {
          articles:[
            {}
          ]
        }
    },
    components:{
      Articles
    }
  }
</script>

<style scoped lang="less">
  .other-content-left{
    width: 900px;
    padding: 0 20px;
    border-bottom: 2px solid #e9eaed;
    background-color: rgb(255,255,255);
    .other-title{
      padding-bottom: 8px;
      border-bottom: 2px solid #409EFF;
      h2{
        width: 88px;
        padding: 20px 0 8px 0;
        font-size: 22px;
      }
    }
  }
</style>
