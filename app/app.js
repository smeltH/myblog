const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();


//使用cookie-parser中间件  处理post请求
app.use(cookieParser())

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json());


//管理路由包含登录与注册
app.use('/admin',require('./routers/admin'))
//首页路由
app.use('/index',require('./routers/index'))



// 开启服务器
app.listen(33333,(err)=>{
  if(err){
    console.log('服务器开启失败')
    return
  }
  console.log('服务器开启成功');
})

// 连接数据库
mongoose.connect('mongodb://localhost:27020/myblog',{useNewUrlParser:true},(err)=>{
  if(err){
    console.log('数据库连接失败')
    return
  }
  console.log('数据库连接成功');
})
