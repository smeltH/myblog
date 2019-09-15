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
        <div class="article-lists" v-for="(article,index) in getArticleList">
          <articles>
            <h2 slot="title">{{article.title}}</h2>
            <p slot="description">{{article.description}}</p>
            <span slot="time">{{article.releaseTime}}</span>
            <span slot="hot">{{article.hotNumber}}</span>
            <span slot="comments">{{article.comments}}</span>
            <span slot="support">{{article.supportNumber}}</span>
            <i class="iconfont icon-iconfont-zd" slot="isTop" v-if="article.isTop"></i>
            <router-link slot="readMore" :to="{name:'detaillink',params:{id:article._id}}" class="read-more" tag="button">查看全文</router-link>
          </articles>
        </div>
        <!--文章分页跳转部分-->
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
  import {getTime} from "../../../../../static/js/getTime";
  import {getCategory,getFirstCategoryArcticle} from "../../../../../api/home";

  export default {
      name: "ContentLeft",
      data() {
          return {
            activeName: 0,//当前tab栏的下标
            articleData:[],//每个tab栏里面的内容
            count1:4,//最新文章显示上面的tab分类文章条数限制
            // articles:[
            //   {}
            // ],
            count2:5,//最新文章显示条数
            currentPage:0,//当前页的位置
            totalCounts:0,//文章的总数
            maxPages:0,//最后一页
            // getArticlelist:[]
          }
      },
      async created(){
        // this.getFilterCategory
        const articletype = this.$route.query.articletype
        if( articletype ){
          this.$axios.post(`/api/index/getCategoryArticles?articletype=${articletype}`,{count:this.count1}).then((result)=>{
            this.$store.commit('saveArticleList',result.data.data)
            this.maxPages = result.data.maxPages;
            this.totalCounts = result.data.totalCounts;
          })
        }else {
          this.$store.dispatch('getArticleLists',{page:0,count:this.count2})
        }
        console.log(articletype);

        /*
        * 获取分类文章
        * data：文章内容 array
        * maxPages：文章最后一页 number
        * totalCounts 文章总共数 number
        * */
        const {data:{data,maxPages,totalCounts}} = await getCategory(articletype,this.count2)
        // this.$axios.post(`/api/index/getCategoryArticles?articletype=${articletype}`,{count:})
        // const {} = await this.$axios.post(`/api/index/getCategoryArticles?articletype=${articletype}`,{count:this.count1})
        // 上面的分类面板赋值
        this.articleData = data;
        data.map((item)=>{
          item.releaseTime = getTime(item.releaseTime)
        })
        // this.getArticlelist = results;
        this.maxPages = maxPages;
        this.totalCounts = totalCounts;
      },
      /*
      * 给分类tab出获取数据并进行渲染
      * */
      async mounted(){
        const {data:{data}} = await getFirstCategoryArcticle(this.$store.state.category,{count:this.count2,page:0})
        this.articleData = data;
      },
      computed:{
        /*
        *  获取文章分类
        * */
        getCategory(){
          return this.$store.state.category;
        },
        /*
        * 获取文章列表
        *   在HomePage初始化时就请求了文章数据，将文章数据保存到store中
        * */
        getArticleList(){
          return this.$store.state.articleList
        }
      },
      methods: {
        /*
        * 最新文章处的分页点击事件触发
        * val是点击了第几页 从1开始
        * */
        async handleCurrentChange(val) {
          this.$store.dispatch('getArticleLists',{count:this.count2,page:val-1});
          // const query = this.$route.query.articletype
          // const {data:{data,maxPages,totalCounts}} = await this.$axios.post(`/api/index/getCategoryArticles?articletype=${query}`,{count:this.count2,page:val-1})
          // this.getArticlelist = data
        },
        /*
        * 上面的分类栏里面的点击事件
        * */
        async handleClick(tab) {
          this.getFilterCategory
          const {data:{data}} = await this.$axios.post(`/api/index/getCategoryArticles?articletype=${tab.label}`,{count:this.count1})
          this.articleData = data
        }
      },
      components:{
        TopAndButtom,
        FiveArticles,
        Articles
      },
      watch:{
        /*
        * 监听query参数的变化,即点击头部的分类标签数据发生变化
        * */
        '$route.query'(){
          // const articletype = this.$route.query.articletype
          const articletype = this.$route.query.articletype
          if( articletype ){
            this.$axios.post(`/api/index/getCategoryArticles?articletype=${articletype}`,{count:this.count1}).then((result)=>{
              this.$store.commit('saveArticleList',result.data.data)
              this.maxPages = result.data.maxPages;
              this.totalCounts = result.data.totalCounts;
            })
          }else {
            this.$store.dispatch('getArticleLists',{page:0,count:this.count2})
          }
        }
      },
      filters:{
        getFilterCategory(){
          // if(  ){
          //
          // }
          console.log(this.$store.state.articleList);
          return this.$store.state.articleList
        }
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
