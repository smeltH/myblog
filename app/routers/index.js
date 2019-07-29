const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const UserInfo = require('../schema/userinfo');
const Category = require('../schema/category');
const Article = require('../schema/article');
const DeleteArticle = require('../schema/deletearticle');
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
//获取分好类文章列表
router.post('/getCategoryArticles',(req,res)=>{
  let {page,count,index} = req.body;
  if(!index){index=0}
  Category.find().then((result1)=>{
    Article.countDocuments({tag:result1[index]}).then((totalCounts)=>{
      let maxPages = Math.ceil(totalCounts/count);
      Article.find({tag:result1[index]}).populate('tag').sort({'_id':-1}).limit(count).skip(page*count).then((result)=>{
        res.send({data:result,totalCounts,maxPages})
      })
    })
    const totalCounts = result1.length;
    let maxPages = Math.ceil(totalCounts/count);

  })
})

module.exports = router
