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
        result.hotNumber = result.hotNumber + 1;
        Article.updateOne({ _id }, { $set: { hotNumber: result.hotNumber } }, (err) => {
            if (err) {
                console.log(err);
            }
        });
        res.send(result);
    });
});

// 保存用户评论
router.post('/commitComment', (req, res) => {
    const { releaseContent, articleId, releaseUser } = req.body;
    const releaseTime = new Date();
    Article.findOne({ _id: articleId }).then((result) => {
        const newCommment = { releaseContent, releaseUser, releaseTime };
        result.comments.push(newCommment);
        Article.updateOne({ _id: articleId }, { $set: { comments: result.comments } }, (err) => {
            if (err) {
                returnData.msg = '评论失败，请稍后评论！';
                returnData.statements = 1;
                res.send(returnData);
                return;
            }
            returnData.msg = '恭喜你，评论成功！';
            returnData.statements = 0;
            returnData.result = result.comments;
            res.send(returnData);
        });
    });
});

// 返回已产生文章评论
router.post('/toSupport', (req, res) => {
    const { articleId, userId } = req.body;
    Article.findOne({ _id: articleId }).then((result) => {
        result.supportMembers.push(userId);
        Article.updateOne({ _id: articleId }, { $set: { supportMembers: result.supportMembers } }, (err) => {
            if (err) {
                returnData.msg = '点赞失败，请稍后点赞！';
                returnData.statements = 1;
                res.send(returnData);
                return;
            }
            returnData.msg = '恭喜你，点赞成功！';
            returnData.statements = 0;
            returnData.result = result.comments;
            res.send(returnData);
        });
    });
});

// 返回已产生文章评论
router.post('/toCancelSupport', (req, res) => {
    const { articleId, userId } = req.body;
    Article.findOne({ _id: articleId }).then((result) => {
        result.supportMembers.pop(userId);
        Article.updateOne({ _id: articleId }, { $set: { supportMembers: result.supportMembers } }, (err) => {
            if (err) {
                returnData.msg = '点赞失败，请稍后点赞！';
                returnData.statements = 1;
                res.send(returnData);
                return;
            }
            console.log(result);
            returnData.msg = '恭喜你，点赞成功！';
            returnData.statements = 0;
            returnData.result = result.comments;
            res.send(returnData);
        });
    });
});
module.exports = router;
