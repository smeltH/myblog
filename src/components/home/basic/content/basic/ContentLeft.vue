<template>
    <div class="page-left">
      <div class="top-content">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane :label="category.categoryName" :name="(index1).toString()" v-for="(category,index1) in getCategory" :key="index1">
            <div class="content">
              <five-articles>
                <el-collapse-item :name="(index*1+1).toString()" v-for="(article,index) in articleData" slot="article" :key="index">
                  <template slot="title">
                    <h5>{{article.title}}</h5>
                  </template>
                  <p v-html="article.description "></p>
                </el-collapse-item>
              </five-articles>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="gray-content"></div>
      <div class="bottom-content">
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
            :page-size="count2"
            layout="total, prev, pager, next, jumper"
            :total="totalCounts">
          </el-pagination>
        </div>
      </div>
    </div>
</template>

<script>
  import Articles from 'public/Article'
  import TopAndButtom from 'public/TopAndButtom'
  import FiveArticles from 'public/FiveArticles'
    export default {
      name: "ContentLeft",
      data() {
          return {
            activeName: 0,
            articleData:[],
            count1:4,
            articles:[
              {}
            ],
            count2:8,
            currentPage:0,
            totalCounts:0,
            maxPages:0,
          }
      },
      async created(){
        const {data:{data,maxPages,totalCounts}} = await this.$axios.post(`/api/index/getCategoryArticles`,{count:this.count1})
        console.log(data);
        this.articleData = data
      },
      computed:{
        getArticlelist(){
          const {data,maxPages,totalCounts} = this.$store.getters.getArticle
          this.maxPages = maxPages
          this.totalCounts = totalCounts
          return this.$store.getters.getArticle
        },
        getCategory(){
          return this.$store.state.category;
        }
      },
      methods: {
        //切换页面按钮
        handleCurrentChange(val) {
          const {data,maxPages,totalCounts} = this.$store.getters.getArticle
          this.tableData.data = data
        },
        async handleClick(tab, event) {
          const {data:{data}} = await this.$axios.post(`/api/index/getCategoryArticles`,{count:this.count1,index:tab.index})
          this.articleData = data
        }
      },
      components:{
        TopAndButtom,
        FiveArticles,
        Articles
      }
    }
</script>

<style scoped lang="less">
  .page-left{
    width: 900px;
    background-color: #fff;
    border-radius: 4px;
    box-sizing: border-box;
    .top-content{
      background-color: #fff;
      padding: 20px;
      background-color: #fff;
      .content{
        width: 100%;
        height: 260px;
        display: flex;
        justify-content: space-between;
        .left-content{
          /*width: 300px;*/
          height: 260px;
        }
      }
    }
    .gray-content{
      width: 100%;
      height: 40px;
      background-color: rgb(233,234,237);
    }
    .bottom-content{
      background-color: #fff;
      margin-top: 20px;
      border-bottom: 2px solid #e9eaed;
      background-color: rgb(255,255,255);
      padding: 20px;
      background-color: #fff;
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
  }
  .page-right{
    width: 310px;
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
