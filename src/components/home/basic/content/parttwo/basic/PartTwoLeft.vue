<template>
    <div class="part-two-left">
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
</template>

<script>
  import TopAndButtom from 'public/TopAndButtom'
  import FiveArticles from 'public/FiveArticles'
    export default {
      name: "PartTwoLeft",
      data() {
          return {
            activeName: 0,
            articleData:[],
            count:4
          }
      },
      async created(){
        const {data:{data,maxPages,totalCounts}} = await this.$axios.post(`/api/index/getCategoryArticles`,{count:this.count})
        console.log(data);
        this.articleData = data
      },
      computed:{
        getCategory(){
          return this.$store.state.category;
        }
      },
      methods: {
        async handleClick(tab, event) {
          const {data:{data}} = await this.$axios.post(`/api/index/getCategoryArticles`,{count:this.count,index:tab.index})
          this.articleData = data
        }
      },
      components:{
        TopAndButtom,
        FiveArticles
      }
    }
</script>

<style scoped lang="less">
  .part-two-left{
    width: 900px;
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
</style>
