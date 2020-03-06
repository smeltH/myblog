import Axios from 'axios';

// 发布文章
const createArticle = (data) => {
    return Axios.post('/api/admin/createArticle', data);
};

// 切换时文章列表查询
const articlelists = (pageInfo) => {
    return Axios.post('/api/admin/articlelists', pageInfo);
};

// 增加新的分类
const categoryAdd = (newCategory) => {
    return Axios.post('/api/admin/categoryAdd', newCategory);
};

// 获取用户列表
const userlists = (userInfo) => {
    return Axios.post('/api/admin/userlists', userInfo);
};


export {
    createArticle,
    articlelists,
    categoryAdd,
    userlists
};
