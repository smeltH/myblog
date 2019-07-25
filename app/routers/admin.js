const express = require('express')
const router = express.Router();
const UserInfo = require('../schema/userinfo');
const app = express();
router.post('/register',(req,res,next)=>{
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
router.post('/login',(req,res,next)=>{
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
      })
      .then((result2)=>{
        if(!result2){
          returnResult.msg = '密码错误'
          returnResult.statements = 2//密码错误
          return
        }
        const {userName,_id} = result2
        if(result2.isAdmin){
          returnResult.isAdmin = true
        }
        returnResult.msg = '登录成功'
        returnResult.statements = 0//登录成功
        res.cookie('userinfo',JSON.stringify({
          username,
          _id:result2._id,
          isAdmin:!!returnResult.isAdmin
        }))
      }).then(()=>{
        res.send(returnResult)
        return
      })
    })
})
module.exports = router
















