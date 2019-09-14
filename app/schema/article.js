const mongoose = require('mongoose');
const Schema = mongoose.Schema
const articleSchemea = mongoose.Schema({
  tag:{
    type:Schema.Types.ObjectId,
    ref:'categorys'
  },//所属分类,多表关联查询
  title:String,//文章标题
  content:String,//文章内容
  description:String,//文章简介
  author:String,//文章作者
  releaseTime:{
    type: Date,
    default: Date.now
  }, //发布时间
  supportNumber:{
    type:Number,
    default:0
  },//点赞数
  hotNumber:{
    type:Number,
    default:0
  },//热度即阅读数
  isTop:{
    type:Boolean,
    default: false
  },//是否置顶
  isRecommend:{
    type:Boolean,
    default: false
  },//是否推荐
  commentNumber:{
    type:Number,
    default:0
  },//评论数
})
module.exports = mongoose.model('articlelists',articleSchemea)
















