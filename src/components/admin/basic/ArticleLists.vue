<template>
  <div class="article-lists">
    <div class="crumbs-nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        <el-breadcrumb-item>文章列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="line"></div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="_id"
        label="文章id"
        width="250">
      </el-table-column>
      <el-table-column
        prop="title"
        label="文章标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="author"
        label="作者">
      </el-table-column>
      <el-table-column
        prop="tag.categoryName"
        label="文章分类">
      </el-table-column>
      <el-table-column
        prop="releaseTime"
        label="发布时间">
      </el-table-column>
      <el-table-column
        prop="isTop"
        label="是否置顶">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">修改文章</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除文章</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {getTime} from "../../../static/js/getTime";

  export default {
    name: "ArticleLists",
    data() {
      return {
        tableData: [
          {
            _id:'',
            title:'',
            tag:'',
            author:'',
            releaseTime:''
          }
        ],
        count:5
      }
    },
    methods: {
      handleEdit(index, row) {
        this.$router.push(`/admin/articleLists/editArticle?id=${row._id}`)
      },
      async handleDelete(index, row) {
        const {data} = await this.$axios.post('/api/admin/deleteArticle',{_id:row._id});
        if(data.statements === 1){
          this.$message.error(data.msg)
          return
        }
        this.$message({
          message:data.msg,
          type:'success'
        })
        this.$router.go(0)
      }
    },
    async created(){
      const {data:{data}} = await this.$axios.get('/api/admin/articlelists',{page:0,count:5})
      data.map((item)=>{
        item.releaseTime = getTime(item.releaseTime)
        if(item.isTop){
          item.isTop = '是'
        }else{
          item.isTop = '否'
        }
      })
      this.tableData = data;
    }
  }
</script>

<style scoped lang="less">
  .crumbs-nav{
    padding: 30px 0;
    .el-breadcrumb__item{
      font-size: 16px;
    }
  }
</style>

