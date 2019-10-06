const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const UserInfo = require('../schema/userinfo');
const Category = require('../schema/category');
const Article = require('../schema/article');
const Comment = require('../schema/comment');
const DeleteArticle = require('../schema/deletearticle');
const returnData = {};
/*
* 获取文章列表
* page:第几页
* count:每页几条消息
* maxPages:一共有多少页
* 返回值：
*   data:文章内容
*   totalCounts:文章总数
*   maxPages:最后一页
* */
router.post('/getArticleLists', (req, res) => {
    const { page, count } = req.body;
    let articleLists = [];// 文件列表数组
    Article.countDocuments().then((totalCounts) => {
        const maxPages = Math.ceil(totalCounts / count);
        Article.find().populate('tag').sort({ _id: -1 }).then((result) => {
            /*
      * 判断是否置顶并调整顺序
      * */
            result.map((item) => {
                item.releaseTime = new Date(item.releaseTime).toLocaleString();
                if (item.isTop) {
                    articleLists.push(item);
                }
            });
            result.map((item1) => {
                if (!item1.isTop) {
                    articleLists.push(item1);
                }
            });
            if (page + 1 < maxPages) {
                articleLists = articleLists.slice(page * count, (page + 1) * count);
            } else {
                articleLists = articleLists.slice(page * count);
            }
            res.send({ data: articleLists, totalCounts, maxPages });
        });
    });
});
// 获取文章列表 通过query判断是否要分类
router.post('/getCategoryArticles', (req, res) => {
    let msg = {};
    const { page, count } = req.body;
    let { articletype } = req.query;
    articletype = articletype + '';
    Category.find().then((result1) => {
        let index = 0;
        result1.map((item, idx) => {
            if (item.categoryName === articletype) {
                index = idx;
            }
        });
        if (articletype === 'undefined') {
            msg = {};
        } else {
            msg.tag = result1[index];
        }
        Article.countDocuments(msg).then((totalCounts) => {
            const maxPages = Math.ceil(totalCounts / count);
            Article.find(msg).populate('tag').sort({ _id: -1 }).limit(count).skip(page * count).then((result) => {
                res.send({ data: result, totalCounts, maxPages });
            });
        });
        const totalCounts = result1.length;
        const maxPages = Math.ceil(totalCounts / count);
    });
});

// 获取文章详情文章
router.post('/articleDetail', (req, res) => {
    const { _id } = req.body;
    Article.findOne({ _id }).populate('tag').then((result) => {
        res.send(result);
    });
});

// 保存用户评论
router.post('/commitComment', (req, res) => {
    const { releaseContent, articleId, releaseUser } = req.body;
    new Comment({
        article: articleId,
        userComments: { commentContent: releaseContent, commentUser: releaseUser }
    }).save().then(() => {
        Comment.find().then(result => {
            returnData.result = result;
            returnData.msg = '操作成功';
            returnData.statements = 0;
            res.send(returnData);
        });
    }).catch((err) => {
        throw err;
    });
});

// 返回已产生文章评论
router.post('/releaseComment', (req, res) => {
    const { id } = req.body;
    Comment.find({ _id: id }).then(result => {
        console.log(result);
        res.send(result);
    });
});

// 用户点赞
router.get('/support', (req, res) => {
    const { newState, id, who: level, secondId: id2 } = req.query;
    Comment.findOne({ _id: id }).then((result) => {
        let count;
        if (level == 'first') {
            if (newState === 'true') {
                count = result.userComments.commentSupport + 1;
            } else {
                count = result.userComments.commentSupport - 1;
            }
            result.userComments.commentSupport = count;
            result.userComments.isSupport = newState;
        } else {
            result.userComments.reply.map((item) => {
                if (item._id == id2) {
                    if (newState === 'true') {
                        count = item.replySupport + 1;
                    } else {
                        count = item.replySupport - 1;
                    }
                    item.replySupport = count;
                    item.replyIsSupport = newState;
                }
                return item;
            });
        }
        Comment.updateOne({ _id: id }, { userComments: result.userComments }, (err) => {
            if (err) {
                returnData.msg = '操作失败';
                returnData.statements = 1;
                res.send(returnData);
                return;
            }
            returnData.msg = '操作成功';
            returnData.statements = 0;
            res.send(returnData);
        });
    });
});

// 用户回复框
// router.get('/replyBox',(req,res)=>{
//   const {isShow,id,who:level,secondId:id2} = req.query
//   Comment.findOne({_id:id}).then((result)=>{
//     if(level === 'first'){
//       result.userComments.isShow = isShow
//       result.userComments.isReply = true
//     }else {
//       result.userComments.reply.map((item)=>{
//         if(item._id == id2){
//           item.isShowReply = isShow
//         }
//         return item
//       })
//     }
//     Comment.updateOne({_id:id},{userComments:result.userComments},(err)=>{
//       if(err){
//         returnData.msg = "操作失败"
//         returnData.statements = 1
//         res.send(returnData)
//         return
//       }
//       returnData.msg = "操作成功"
//       returnData.statements = 0
//       res.send(returnData)
//     })
//   })
//
// })

// 用户回复
router.post('/reply', (req, res) => {
    const { replyUser, replyContent, id, replyUsered } = req.body;
    Comment.findOne({ _id: id }).then(result => {
        if (result.userComments.reply === false) {
            result.userComments.isReply = true;
        }
        result.userComments.reply.push({ replyContent, replyUser, replyUsered });
        Comment.updateOne({ _id: id }, { userComments: result.userComments }, (err) => {
            if (err) {
                returnData.msg = '操作失败';
                returnData.statements = 1;
                res.send(returnData);
                return;
            }
            Comment.find().then(result => {
                returnData.result = result;
                returnData.msg = '操作成功';
                returnData.statements = 0;
                res.send(returnData);
            });
        });
    });
});

// 用户回复内容
router.post('/replyContent', (req, res) => {
    const { id } = req.body;
    Comment.findOne({ _id: id }).then((result) => {
        res.send(result);
    });
});

router.post('/secondReplyContent', (req, res) => {
    const { firstId, secondId, perUser, nowUser, value } = req.body;
    Comment.findOne({ _id: firstId }).then((result) => {
        const newData = {};
        newData.replyUsered = perUser;
        newData.replyUser = nowUser;
        newData.replyContent = value;
        result.userComments.reply = result.userComments.reply.concat(newData);
        Comment.updateOne({ _id: firstId }, { userComments: result.userComments }, (err) => {
            if (err) {
                returnData.msg = '操作失败';
                returnData.statements = 1;
                res.send(returnData);
                return;
            }
            Comment.find().then(result1 => {
                returnData.result = result1;
                returnData.msg = '操作成功';
                returnData.statements = 0;
                res.send(returnData);
            });
        });
    });
});
//
// //回复框初始化
// router.get('/initBox',(req,res)=>{
//   Comment.find().then((result)=>{
//     result.map((item1)=>{
//       item1.userComments.isShow = false;
//       if( item1.reply ){
//         item1.reply.map((item2)=>{
//           item2.isShowReply = false;
//           return item2;
//         })
//       }
//       return item1;
//     })
//     Comment.updateMany({},{$set:{userComments:result.userComments}},(err,result)=>{
//       if(err){
//         returnData.msg = "初始化失败"
//         returnData.statements = 1
//         res.send(returnData);
//         return
//       }
//       returnData.msg = "操作成功"
//       returnData.statements = 0
//       res.send(returnData)
//       console.log(result);
//     })
//   })
// })
module.exports = router;
