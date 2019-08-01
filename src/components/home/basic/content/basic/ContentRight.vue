<template>
    <div class="page-right">
      <div class="top-card">
        <div class="title">
          <h4>博主推荐</h4>
        </div>
        <ul class="new-article-lists">
          <router-link :to="{name:'detaillink',params:{id:article._id}}" tag="li" v-for="(article,index) in articles" :key="index">{{article.title}}</router-link>
        </ul>
      </div>
      <div class="bottom-recommand"></div>
    </div>
</template>

<script>
  export default {
    name: "ContentRight",
    data() {
        return {
          count:4,
          articles:[]
        }
    },
    async created(){
      const {data:{data}} = await this.$axios.post('/api/index/getCategoryArticles',{count:this.count})
      this.articles = data
    },
  }
</script>

<style scoped lang="less">
  .page-right{
    width: 290px;
    height: 314px;
    padding: 20px 10px;
    background-color: rgb(255,255,255);
    .title{
      width: 80px;
      height: 38px;
      border-bottom: 2px solid rgb(0,0,0);
      .h4{
      }
    }
    .new-article-lists{
      width: 100%;
      list-style: disc;
      li{
        height: 40px;
        padding: 5px 0 5px 20px;
        background-color: rgb(246,246,246);
        margin-top: 20px;
        font-size: 12px;
        line-height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
      }
    }
  }
</style>
