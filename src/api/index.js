import Axios from 'axios'

//用户评论提交
const commitComment = (value)=>{
  return Axios.post('/api/index/commitComment',value)
}


//获得用户评论
const getComment = ()=>{
  return Axios.post('/api/index/releaseComment')
}

//用户点赞
const support = (value,id,level,id2)=>{
  console.log(value, id, level, id2);
  return Axios.get(`/api/index/support?newState=${value}&id=${id}&who=${level}&secondId=${id2}`)
}


//提交用户回复内容
const reply = (value,id,user,time) =>{
  return Axios.post('/api/index/reply',{
    replyUser:user,
    replyContent:value,
    id,
    time
  })
}

const replyContent = (id) => {
  return Axios.post('/api/index/replyContent',{
    id
  })
}
//回复框初始化
const initBox = () => {
  return Axios.get('/api/index/initBox');
}
export {getComment,commitComment,support,reply,replyContent,initBox}
