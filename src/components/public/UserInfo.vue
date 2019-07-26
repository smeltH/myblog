<template>
    <span class="isOut">
      <el-button class="user" @click="isOut"><slot name="users"></slot><i class="el-icon-arrow-down"></i>
        <el-button type="primary" class="sign-out" @click="signOut" v-show="isShow">退出登录</el-button>
      </el-button>
    </span>
</template>

<script>
  export default {
    name: "UserInfo",
    data() {
      return {
        isShow:false
      }
    },
    methods:{
      signOut(){
        this.$router.push('/');
        document.cookie = 'userinfo=' + '';
        this.$router.go(0)
      },
      isOut(){
        this.isShow = !this.isShow;
      }
    }
  }
</script>

<style scoped lang="less">
  .isOut{
    display: inline-block;
    box-sizing: border-box;
    padding-right: 10px;
    text-align: right;
    .user{
      position: relative;
      .sign-out{
        width: 100%;
        position: absolute;
        bottom: -40px;
        left: 50%;
        transform: translateX(-50%);
      }
      .el-icon-arrow-down{
        padding-left: 4px;
      }
    }
  }
  .isOut /deep/ .el-button:focus, .el-button:hover{
    background-color: #fff;
    color: #606266;
  }
  .isOut /deep/ .el-button--primary{
    background-color: #fff;
    color: #606266;
    border: 1px solid #606266;
  }
</style>
