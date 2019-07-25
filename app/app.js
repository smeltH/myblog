const express = require('express');
const mongoose = require('mongoose');
const Classify = require('./schema/classify')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser())
let returnResult = {}

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json());
//管理路由包含登录与注册
app.use('/admin',require('./routers/admin'))
//首页路由
app.use('/index',require('./routers/index'))
app.listen(33333,(err)=>{
  if(err){
    console.log('服务器开启失败')
    return
  }
  console.log('服务器开启成功');
})
mongoose.connect('mongodb://localhost:27020/myblog',{useNewUrlParser:true},(err)=>{
  if(err){
    console.log('数据库连接失败')
    return
  }
  console.log('数据库连接成功');
})
















