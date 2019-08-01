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
//获取文章列表 通过query判断是否要分类
router.post('/getCategoryArticles',(req,res)=>{
  let msg = {};
  let {page,count} = req.body;
  let  {articletype} = req.query
  console.log(articletype);
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
        console.log(result);
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

module.exports = router
