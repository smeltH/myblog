import Axios from 'axios';
/*
* 获取文章列表
* value：{
*   page：第几页
*   count：每页几条消息
* }
* */
const getArticleList = (value)=>{
  return Axios.post('/api/index/getArticleLists',value)
}
/*
*  获取分类标签里面的第一个
*
* */
const getFirstCategoryArcticle = (categoryName,value)=>{
  const {count,page} = {value}
  return Axios.post(`/api/index/getCategoryArticles?articletype=${categoryName}`,{count,page})
}
const getCategory = (articletype,count)=>{
  return Axios.post(`/api/index/getCategoryArticles?articletype=${articletype}`,{count})
}
export {getArticleList,getCategory,getFirstCategoryArcticle}

