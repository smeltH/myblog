<template>
    <div class="user-lists">
      <div class="crumbs-nav">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="line"></div>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="_id"
          label="用户id"
          width="300">
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="password"
          label="用户密码">
        </el-table-column>
        <el-table-column
          prop="isAdmin"
          label="是否为管理员">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">添加为管理员</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
  export default {
    name: "UserLists",
    data() {
      return {
        tableData: [],
        maxPages:0,
        totalCounts:0,
        currentPage:0,
        count:5
      }
    },
    async created(){
      const {data:{data,maxPages,totalCounts}} = await this.$axios.post('/api/admin/userlists',{page:0,count:this.count})
      this.tableData = data.map((item) => {
        if (item.isAdmin) {
          item.isAdmin = "是";
        } else {
          item.isAdmin = "否";
        }
        return item;
      });
      this.maxPages = maxPages;
      this.totalCounts = totalCounts;
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      async handleCurrentChange(val) {
        const {data:{data,maxPages,totalCounts}} = await this.$axios.post('/api/admin/userlists',{page:val-1,count:this.count})
        this.tableData = data.map((item) => {
          if (item.isAdmin) {
            item.isAdmin = "是";
          } else {
            item.isAdmin = "否";
          }
          return item;
        });
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
