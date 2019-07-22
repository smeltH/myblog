const express = require('express');
const mongoose = require('mongoose');
const Classify = require('./schema/classify')
const app = express();

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
















