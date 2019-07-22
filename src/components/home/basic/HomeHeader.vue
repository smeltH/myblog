<template>
  <div id="home-header" class="home-header">
    <el-row class="header">
      <el-col :span="4">
        <div class="grid-content">
          <h3 class="blog-name">黄炼的个人博客</h3>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content">
          <div class="classifies">
            <span v-for="(classify,index) in classifies" :key="index" class="curr-classify">{{classify}}</span>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content">
          <span class="login blog-enter">登录</span>
          <span class="register blog-enter">注册</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
      name: "HomeHeader",
      data() {
          return {
            classifies:["css","html","vue","javascript","h5"]
          }
      },
      methods: {
      }
    }
</script>

<style lang="less" scoped>
  .home-header{
    height: 60px;
    background-color: rgb(28,35,39);
    color: #fff;
    .header{
      display: flex;
      width: 1300px;
      height: 100%;
      margin: 0 auto;
      .grid-content {
        height: 100%;
        background-color: rgb(28,35,39);
        .blog-name,
        .blog-enter{
          height: 36px;
          line-height: 36px;
        }
      }
      .el-col-16{
        padding-right: 50px;
        display: flex;
        justify-content: center;
      }
      .el-col{
        .classifies{
          display: inline-block;
          .curr-classify{
            display: inline-block;
            height: 100%;
            line-height: 60px;
            padding: 0 34px;
            cursor: pointer;
          }
          .curr-classify:hover{
            color: #00c1de;
          }
        }
      }
      .el-col-4{
        margin-top: 12px;
        .blog-enter{
          display: inline-block;
          padding: 0 8px;
          cursor: pointer;
        }
      }
      .el-col-4{
        .grid-content{
          display: flex;
          justify-content: space-around;
          .blog-enter{
          }
        }
      }
    }
  }
</style>
