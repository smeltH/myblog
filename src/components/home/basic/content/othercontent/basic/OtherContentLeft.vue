<template>
    <div class="other-content-left">
      <div class="other-title">
        <h2>最新文章</h2>
      </div>
      <div class="article-lists" v-for="(article,index) in getArticlelist.data">
        <articles>
          <h2 slot="title">{{article.title}}</h2>
          <p slot="description">{{article.description}}</p>
          <span slot="time">{{article.releaseTime}}</span>
          <span slot="hot">{{article.hotNumber}}</span>
          <span slot="comments">{{article.comments.length}}</span>
          <span slot="support">{{article.supportNumber}}</span>
          <i class="iconfont icon-iconfont-zd" slot="isTop" v-if="article.isTop"></i>
          <router-link slot="readMore" :to="{name:'detaillink',params:{id:article._id}}" class="read-more" tag="button">查看全文</router-link>
        </articles>
      </div>
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="count"
          layout="total, prev, pager, next, jumper"
          :total="totalCounts">
        </el-pagination>
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
          ],
          count:8,
          currentPage:0,
          totalCounts:0,
          maxPages:0,
        }
    },
    computed:{
      getArticlelist(){
        const {data,maxPages,totalCounts} = this.$store.getters.getArticle
        this.maxPages = maxPages
        this.totalCounts = totalCounts
        return this.$store.getters.getArticle
      }
    },
    components:{
      Articles
    },
    methods:{
      //切换页面按钮
      handleCurrentChange(val) {
        const {data,maxPages,totalCounts} = this.$store.getters.getArticle
        this.tableData.data = data
      }
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
  .block{
    width: auto;
    margin: 50px 150px 10px 10px;
    text-align: center;
  }
  .block /deep/ .el-pagination{
    display: inline-block;
    margin: 0 auto;
  }
</style>
