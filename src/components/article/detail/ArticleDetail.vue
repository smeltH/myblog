<template>
  <div class="article-detail">
    <home-header></home-header>
    <div class="article-content">
      <div class="article">
        <h2>{{detail.title}}</h2>
        <div class="article-info">
          发布时间：<span class="time">{{detail.releaseTime}}</span>
          作者：<span class="author">{{detail.author}}</span>
          阅读数：<span class="hot">{{detail.hotNumber}}</span>
          评论数：<span class="comment">{{detail.commentNumber}}</span>
          点赞数：<span class="support">{{detail.supportNumber}}</span>
        </div>
        <div v-html="detail.content" class="content"></div>
      </div>
      <content-right></content-right>
    </div>
  </div>
</template>

<script>
  import {getTime} from "../../../static/js/getTime";
  import HomeHeader from 'header/HomeHeader'
  import ContentRight from 'content/basic/ContentRight'
  export default {
    name: "ArticleDetail",
    data() {
      return {
        detail:{}
      }
    },
    components:{
      HomeHeader,
      ContentRight
    },
    async created(){
      const _id = this.$route.params.id
      const {data} = await this.$axios.post('/api/index/articleDetail',{_id})
      console.log(data);
      data.releaseTime = getTime(data.releaseTime)
      data.commentNumber = data.comments.length
      this.detail = data
    }
  }
</script>

<style scoped lang="less">
  .article-type /deep/ .router-link-exact-active{
    color: #00c1de;
  }
  .article-detail{
    background-color: rgb(233,234,237);
  }
  .article-content{
    width: 1300px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    padding-top: 110px;
    .article{
      width: 900px;
      border-bottom: 2px solid #e9eaed;
      background-color: rgb(255,255,255);
      padding: 20px;
      background-color: #fff;
      user-select: text;
      h2{
        padding: 20px 0;
        text-align: center;
      }
      .article-info{
        padding: 20px 0;
        font-size: 14px;
        text-align: center;
      }
      .content{
        font-size: 16px;
        word-wrap:break-word
      }
    }
  }
  .content /deep/ pre{
    display: block;
    line-height: 18px;
    overflow-x: auto;
    background-color: rgb(248,248,248);
    padding: 10px 5px 10px 20px;
    margin: 0;
    white-space: pre-line;
    word-wrap: break-word;
    border: none;
  }
  .content /deep/ p{
    line-height: 240%;
    letter-spacing: 2px;
  }
</style>
