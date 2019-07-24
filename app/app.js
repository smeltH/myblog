const express = require('express');
const mongoose = require('mongoose');
const Classify = require('./schema/classify')
const bodyParser = require('body-parser')
const UserInfo = require('./schema/userinfo')
const app = express();
let returnResult = {}

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json());

//首页路由

//注册路由
app.post('/register',(req,res,next)=>{
  returnResult = {}
  const {username,password} = req.body;
  UserInfo.findOne({
    username
  }).then((result)=>{
    if(!result){
      new UserInfo({username,password,isAdmin:false}).save()
      returnResult.msg = '注册成功！赶快登录吧'
      returnResult.statements = 0//注册成功
      return
    }
    returnResult.msg = '抱歉，该用户已存在'
    returnResult.statements = 1//用户已存在
  }).then(()=>{
    res.send(returnResult)
    return;
  })
})

//登录路由
app.post('/login',(req,res,next)=>{
  returnResult = {}
  const {username,password} = req.body;
  UserInfo.findOne({
    username
  })
  .then((result)=>{
    if(!result){
      returnResult.msg = '用户名错误'
      returnResult.statements = 1//用户已存在
      res.send(returnResult)
      return
    }
    UserInfo.findOne({
      username,
      password
    }).then((result2)=>{
      if(!result2){
        returnResult.msg = '密码错误'
        returnResult.statements = 2//密码错误
        return
      }
      returnResult.msg = '登录成功'
      returnResult.statements = 0//登录成功
    }).then(()=>{
      res.send(returnResult)
      return
    })
  })
})


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
















