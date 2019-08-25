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
const support = (value,id)=>{
  return Axios.get(`/api/index/support?newState=${value}&id=${id}`)
}

//用户回复框
const replyBox = (value,id)=>{
  return Axios.get(`/api/index/replyBox?isShow=${value}&id=${id}`)
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
export {getComment,commitComment,support,replyBox,reply,replyContent}
