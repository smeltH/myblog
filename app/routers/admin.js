const express = require('express')
const router = express.Router();
const UserInfo = require('../schema/userinfo');
const Category = require('../schema/category');
const Article = require('../schema/article');
const DeleteArticle = require('../schema/deletearticle');
const app = express();

const returnData = {}

//用户注册路由
router.post('/register',(req,res)=>{
  const {username,password} = req.body;
  UserInfo.findOne({
    username
  }).then((result)=>{
    if(!result){
      new UserInfo({username,password,isAdmin:false}).save()
      returnData.msg = '注册成功！赶快登录吧'
      returnData.statements = 0//注册成功
      return
    }
    returnData.msg = '抱歉，该用户已存在'
    returnData.statements = 1//用户已存在
  }).then(()=>{
    res.send(returnData)
    return;
  })
})
//用户登录路由
router.post('/login',(req,res,next)=>{
  const {username,password} = req.body;
  UserInfo.findOne({
    username
  })
    .then((result)=>{
      if(!result){
        returnData.msg = '用户名错误'
        returnData.statements = 1//用户已存在
        res.send(returnData)
        return
      }
      UserInfo.findOne({
        username,
        password
      })
      .then((result2)=>{
        if(!result2){
          returnData.msg = '密码错误'
          returnData.statements = 2//密码错误
          return
        }
        const {userName,_id} = result2
        if(result2.isAdmin){
          returnData.isAdmin = true
        }
        returnData.msg = '登录成功'
        returnData.statements = 0//登录成功
        res.cookie('userinfo',JSON.stringify({
          username,
          _id:result2._id,
          isAdmin:!!returnData.isAdmin
        }),{maxAge:324000000})
      }).then(()=>{
        res.send(returnData)
        return
      })
    })
})

//用户列表路由
router.post('/userlists',(req,res)=>{
  const {page,count} = req.body;
  UserInfo.countDocuments().then((totalCounts)=>{
    let maxPages = Math.ceil(totalCounts/count);
    UserInfo.find().limit(count).skip(page*count).sort({'_id':-1}).then((result)=>{
      res.send({data:result,totalCounts,maxPages})
    })
  })
})

//用户管理员更新路由
router.post('/updataAdmin',(req,res)=>{
  const {isAdmin:admin,_id} = req.body;
  UserInfo.updateOne({_id},{$set:{isAdmin:!admin}},(err,result)=>{
    if(err){
      if(admin){
        returnData.msg = "取消管理员失败"
      }else{
        returnData.msg = "设置管理员失败"
      }
      returnData.statements = 1
      res.send(returnData)
      return
    }
    if(admin){
      returnData.msg = "取消管理员成功"
    }else{
      returnData.msg = "设置管理员成功"
    }
    returnData.statements = 0
    res.send(returnData)
  })
})

//分类添加路由
router.post('/categoryAdd',(req,res)=>{
  const {category} = req.body;
  Category.findOne({
    categoryName:category
  }).then((result)=>{
    if(result){
      returnData.msg = "该分类已存在"
      returnData.statements = 1
      res.send(returnData)
      return
    }
    new Category({
      categoryName:category
    }).save()
    returnData.msg = "分类添加成功"
    returnData.statements = 0
    res.send(returnData)
  })
})


//查询文章分类路由
router.post('/category',(req,res)=>{
  Category.find().then((result)=>{
    res.send(result)
  })
})


//写文章路由
router.post('/createArticle',(req,res)=>{
  const {title,author,categorys,description,content,isTop} = req.body;
  Article.findOne({
    title
  }).then((result)=>{
    if(result){
      returnData.msg = "该标题已存在"
      returnData.statements = 1
      res.send(returnData)
      return
    }
    new Article({
      title,
      author,
      description,
      content,
      isTop,
      tag:categorys
    }).save()
    returnData.msg = "文章添加成功"
    returnData.statements = 0
    res.send(returnData)
  })
})


//给分类重命名路由
router.post('/editCategory',(req,res)=>{
  const {_id,value} = req.body
  Category.findOne({
    categoryName:value
  }).then((result)=>{
    if(result){
      returnData.msg = "该分类已存在"
      returnData.statements = 1
      res.send(returnData)
      return
    }
    Category.updateOne({_id},{$set:{categoryName:value}},(err)=>{
      if(err){
        returnData.msg = "分类修改失败"
        returnData.statements = 2
        res.send(returnData)
        return
      }
      returnData.msg = "分类修改成功"
      returnData.statements = 0
      res.send(returnData)
    })
  })
})


//删除分类路由
router.post('/delete',(req,res)=>{
  const {categoryName,_id} = req.body
  Article.find({
    tag:_id
  }).populate('tag').then((result)=>{
    //要删除文章备份
    result.map((item)=>{
      new DeleteArticle({
        item
      }).save();
    });
    Category.deleteOne({categoryName},(err)=>{
      if(err){
        returnData.msg = "标签删除失败"
        returnData.statements = 2
        res.send(returnData)
        return
      }
    })
    //文章删除
    Article.deleteMany({tag:_id},(err)=>{
      if(err){
        returnData.msg = "文章删除失败"
        returnData.statements = 1
        res.send(returnData)
        return
      }
      returnData.msg = "删除成功"
      returnData.statements = 0
      res.send(returnData);
    })
    //分类删除
  })
})


// 查询文章列表路由
router.get('/articlelists',(req,res)=>{
  const {page,count} = req.body;
  Article.countDocuments().then((totalCounts)=>{
    let maxPages = Math.ceil(totalCounts/count);
    Article.find().populate('tag').limit(count).skip(page*count).sort({'_id':-1}).then((result)=>{
      res.send({data:result,totalCounts,maxPages})
    })
  })
})
//查找准备要修改文章的相关信息
router.post('/findArticle',(req,res)=>{
  const {_id} = req.body;
  Article.findOne({_id}).populate('tag').then((result)=>{
    res.send(result)
  }).catch((err)=>{
    if(err){
      returnData.msg = "该文章已不存在"
      returnData.statements = 1
      res.send(returnData)
      return
    }
  })
})
//修改文章
router.post('/editArticle',(req,res)=>{
  const {title,author,categorys,description,content,isTop,_id} = req.body;
  Article.findOne({
    title
  }).then((result)=>{
    if(result){
      returnData.msg = "该标题已存在"
      returnData.statements = 1
      res.send(returnData)
      return
    }
    Article.updateOne(
      {_id},
      {$set:{title,author,categorys,description,content,isTop}},
      (err)=>{
      if(err){
        returnData.msg = "文章更新失败"
        returnData.statements = 1
        res.send(returnData)
        return
      }
      returnData.msg = "文章更新成功"
      returnData.statements = 0
      res.send(returnData)
    })
  })
})

//删除文章
router.post('/deleteArticle',(req,res)=>{
  const {_id} = req.body;
  Article.deleteOne({_id},(err)=>{
    if(err){
      returnData.msg = "文章删除失败"
      returnData.statements = 1
      res.send(returnData)
      return
    }
    returnData.msg = "文章删除成功"
    returnData.statements = 0
    res.send(returnData)
  })
})
module.exports = router
















