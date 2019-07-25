const mongoose = require('mongoose');
const articleSchemea = mongoose.Schema({
  tag:Array,//所属分类['css','vue']
  title:String,//文章标题
  content:String,//文章内容
  description:String,//文章简介
  author:String,//文章作者
  comments:Array,//评论内容
  releaseTime:Date,//发布时间
  commentNumber:Number,//评论数
  supportNumber:Number,//点赞数
  hotNumber:Number,//热度即阅读数
  isTop:Boolean,//是否置顶
})
module.exports = mongoose.model('articlelists',articleSchemea)
















