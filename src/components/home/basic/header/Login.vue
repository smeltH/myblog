<template>
    <div class="login">
      <el-form :model="userinfo" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userinfo.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="userinfo.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
              userinfo:{
                userinfo:"",
                pass:""
              },
              rules: {
                username: [
                  {required: true, message: '请输入用户名', trigger: 'blur'},
                  {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
                ],
                pass: [
                  {required: true, message: '请输入密码', trigger: 'blur'},
                  {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
                ]
              }
            }
        }
    }
</script>

<style scoped lang="less">

  .login{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 400px;
    height: 200px;
    margin: auto;
    .login-btn{
      width: 300px;
    }
  }
</style>
