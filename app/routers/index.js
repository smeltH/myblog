const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const UserInfo = require('../schema/userinfo');
const Category = require('../schema/category');
const Article = require('../schema/article');
const Comment = require('../schema/comment')
const DeleteArticle = require('../schema/deletearticle');
const returnData = {};
//获取文章列表
router.post('/getArticleLists',(req,res)=>{
  const {page,count} = req.body;
  Article.countDocuments().then((totalCounts)=>{
    let maxPages = Math.ceil(totalCounts/count);
    Article.find().populate('tag').limit(count).skip(page*count).sort({'_id':-1}).then((result)=>{
      res.send({data:result,totalCounts,maxPages})
    })
  })
})
//获取文章列表 通过query判断是否要分类
router.post('/getCategoryArticles',(req,res)=>{
  let msg = {};
  let {page,count} = req.body;
  let  {articletype} = req.query
  articletype = articletype+'';
  Category.find().then((result1)=>{
    let index = 0;
    result1.map((item,idx)=>{
      if(item.categoryName === articletype){
        index = idx
      }
    })
    if(articletype === 'undefined'){
      msg = {};
    }else{
      msg.tag = result1[index]
    }
    Article.countDocuments(msg).then((totalCounts)=>{
      let maxPages = Math.ceil(totalCounts/count);
      Article.find(msg).populate('tag').sort({'_id':-1}).limit(count).skip(page*count).then((result)=>{
        res.send({data:result,totalCounts,maxPages})
      })
    })
    const totalCounts = result1.length;
    let maxPages = Math.ceil(totalCounts/count);

  })
})

//获取文章详情文章
router.post('/articleDetail',(req,res)=>{
  const {_id} = req.body;
  Article.findOne({_id}).populate('tag').then((result)=>{
    res.send(result)
  })
})

//保存用户评论
router.post('/commitComment',(req,res)=>{
  const {releaseContent,articleId,releaseUser} = req.body;
  new Comment({
    article:articleId,
    userComments:{commentContent:releaseContent,commentUser:releaseUser}
  }).save();
  res.send('1')
})

//返回已产生文章评论
router.post('/releaseComment',(req,res)=>{
  Comment.find().then(result=>{
    res.send(result)
  })
})

//用户点赞
router.get('/support',(req,res)=>{
  const {newState,id} = req.query
  Comment.findOne({_id:id}).then((result)=>{
    let count;
    if(newState === 'true'){
      count = result.userComments.commentSupport + 1;
    }else {
      count = result.userComments.commentSupport - 1;
    }
    result.userComments.commentSupport = count
    result.userComments.isSupport = newState
    Comment.updateOne({_id:id},{userComments:result.userComments},(err)=>{
      if(err){
        returnData.msg = "操作失败"
        returnData.statements = 1
        res.send(returnData)
        return
      }
      returnData.msg = "操作成功"
      returnData.statements = 0
      res.send(returnData)
    })
  })
})

//用户回复框
router.get('/replyBox',(req,res)=>{
  const {isShow,id} = req.query
  Comment.findOne({_id:id}).then((result)=>{
    result.userComments.isShow = isShow
    Comment.updateOne({_id:id},{userComments:result.userComments},(err)=>{
      if(err){
        returnData.msg = "操作失败"
        returnData.statements = 1
        res.send(returnData)
        return
      }
      returnData.msg = "操作成功"
      returnData.statements = 0
      res.send(returnData)
    })
  })

})

//用户回复
router.post('/reply',(req,res)=>{
  const {replyUser,replyContent,id,time} = req.body;
  Comment.findOne({_id:id}).then(result=>{
    result.userComments.reply.push({replyContent,replyUser})
    Comment.updateOne({_id:id},{userComments:result.userComments},(err)=>{
      if(err){
        returnData.msg = "操作失败"
        returnData.statements = 1
        res.send(returnData)
        return
      }
      returnData.msg = "操作成功"
      returnData.statements = 0
      res.send(returnData)
    })
  })
})

//用户回复内容
router.post('/replyContent',(req,res)=>{
  const {id} = req.body;
  Comment.findOne({_id:id}).then((result)=>{
    console.log("144"+result);
    res.send(result)
  })
})
module.exports = router
