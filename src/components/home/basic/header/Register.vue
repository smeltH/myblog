<template>
    <div class="register">
      <el-form :model="userinfo" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userinfo.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="userinfo.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="userinfo.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="register-btn" @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
    export default {
      name: "Register",
      data() {
          return {
            userinfo:{
              username:"",
              password:"",
              checkPass:""
            },
            rules: {
              username: [
                {required: true, message: '请输入用户名', trigger: 'blur'},
                {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
              ],
              password: [
                {required: true, message: '请输入密码', trigger: 'blur'},
                {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
              ],
              checkPass: [
                {required: true, message: '请确认密码', trigger: 'blur'},
                {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
              ]
            }
          }
      },
      methods:{
        register(){
          this.$axios.post('/api/register',this.userinfo).then((res)=>{
            console.log(res);
          })
        }
      }
    }
</script>

<style scoped lang="less">
  .register{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 400px;
    height: 200px;
    margin: auto;
    .register-btn{
      width: 300px;
    }
  }
</style>
