<template>
    <div class="login">
        <el-form :model="userinfo" status-icon :rules="rules" ref="ruleForm" label-width="66px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="userinfo.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="userinfo.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="login-btn" @click="login">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {login} from '@/api/home/index';
    export default {
        name: "Login",
        data() {
            return {
                userinfo:{
                    username:"",
                    password:""
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
                    ]
                }
            }
        },
        methods:{
            async login(){
                const {data} = await login(this.userinfo);
                console.log(data);

                //登录成功
                if(data.statements === 0){
                    this.$store.commit('saveUserName', this.userinfo.username)
                    localStorage.setItem('username', this.userinfo.username)
                    localStorage.setItem('userId', this.userinfo._id)
                    this.$message({
                        message: data.msg,
                        type: 'success'
                    })
                    setTimeout(()=>{
                        this.$store.commit('saveUserName',this.userinfo.username)
                        this.$router.push('/')
                    },200)
                    return
                }
                if(data.statements === 1){
                    this.$message.error(data.msg)
                    return
                }
                this.$message.error(data.msg)
            }
        }
    }
</script>

<style scoped lang="less">
    .login{
        opacity: 1;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 400px;
        height: 200px;
        margin: auto;
        .login-btn{
            width: 334px;
        }
    }
</style>
