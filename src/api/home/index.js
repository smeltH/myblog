import Axios from 'axios';
/*
* 获取文章列表
* value：{
*   page：第几页
*   count：每页几条消息
* }
* */
const getArticleList = (value) => {
    return Axios.post('/api/index/getArticleLists', value);
};
/*
*  获取分类标签里面的第一个
*
* */
const getFirstCategoryArcticle = (categoryName, value) => {
    const { count, page } = { value };
    return Axios.post(`/api/index/getCategoryArticles?articletype=${categoryName}`, { count, page });
};
const getCategory = (articletype, count) => {
    return Axios.post(`/api/index/getCategoryArticles?articletype=${articletype}`, { count });
};

// 用户评论提交
const commitComment = (value) => {
    return Axios.post('/api/index/commitComment', value);
};

// 获得用户评论
const getComment = (id) => {
    return Axios.post('/api/index/releaseComment', id);
};

// 用户点赞
const support = (value, id, level, id2) => {
    console.log(value, id, level, id2);
    return Axios.get(`/api/index/support?newState=${value}&id=${id}&who=${level}&secondId=${id2}`);
};

// 提交用户回复内容
const reply = (value, id, user, time, used) => {
    return Axios.post('/api/index/reply', {
        replyUser: user,
        replyUsered: used,
        replyContent: value,
        id,
        time
    });
};

// 用户回复内容
const replyContent = (id) => {
    return Axios.post('/api/index/replyContent', {
        id
    });
};

const secondReplyContent = (firstId, secondId, perUser, nowUser, value) => {
    return Axios.post('/api/index/secondReplyContent', {
        firstId, secondId, perUser, nowUser, value
    });
};

// 回复框初始化
const initBox = () => {
    return Axios.get('/api/index/initBox');
};
export {
    getArticleList,
    getCategory,
    getFirstCategoryArcticle,
    getComment,
    commitComment,
    support,
    reply,
    replyContent,
    initBox,
    secondReplyContent
};
