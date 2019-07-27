<template>
  <div class="category-lists">
    <div class="crumbs-nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>分类管理</el-breadcrumb-item>
        <el-breadcrumb-item>分类列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="line"></div>
    <el-table
      :data="getCategoryList"
      stripe
      style="width: 100%">
      <el-table-column
        prop="_id"
        label="分类id"
        width="600">
      </el-table-column>
      <el-table-column
        prop="categoryName"
        label="分类名"
        width="500">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="open(scope.$index, scope.row)">重命名</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "CategoryLists",
    data() {
      return {
        tableData: []
      }
    },
    methods:{
      // 重命名按钮点击事件
      open(index,row){
        this.$prompt('请输入新的分类', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          this.$axios.post('/api/admin/editCategory',{_id:row._id,value})
            .then((result)=>{
              if(result.data.statements === 1){
                this.$message({
                  type: 'info',
                  message: result.data.msg
                });
                return
              }
              this.$message({
                type: 'success',
                message: result.data.msg
              });
              setTimeout(()=>{
                this.$router.go(0)
              },300)
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      // 删除按钮点击事件
      async handleDelete(index,row){
        const {data} = await this.$axios.post('/api/admin/delete',{_id:row._id,categoryName:row.categoryName})
        if(data.statements === 1){
          this.$message({
            type: 'info',
            message: data.msg
          });
          return
        }
        if(data.statements === 2){
          this.$message({
            type: 'info',
            message: data.msg
          });
          return
        }
        this.$message({
          type: 'success',
          message: data.msg
        });
        setTimeout(()=>{
          this.$router.go(0)
        },300)
      },
    },
    computed:{
      getCategoryList(){
        return this.$store.state.category
      }
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
