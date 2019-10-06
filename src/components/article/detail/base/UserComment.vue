<template>
    <div>
        <div class="publishing">
            <div class="comment-box">
                <textarea class="comment-commit" :placeholder="bgText" ref="releaseValue"></textarea>
                <div class="btn">
                    <button class="commit-btn" @click="releaseComment">发表评论</button>
                </div>
            </div>
        </div>
        <div class="published">
            <div v-for="(comment,idx) in commentList" :key="idx">
                <div class="user-comment">
                    <div class="per-comment">
                        <div class="left-img">
                            <img src="" alt="">
                        </div>
                        <div class="right-comment-content">
            <span class="user-name">
                {{comment.userComments.commentUser}}
            </span>
                            <p class="per-comment-content">
                                {{comment.userComments.commentContent}}
                            </p>
                            <div class="per-comment-info">
                                <span class="per-time">{{comment.userComments.commentTime}}</span>
                                <div>
                                    <span class="support" @click="support(comment.userComments.isSupport,idx,'first')"><i :class="comment.userComments.isSupport"></i>{{comment.userComments.commentSupport}}</span>
                                    <span class="reply" @click="reply(!comment.userComments.isShow,comment._id,'first')">回复<i class="el-icon-chat-round"></i></span>
                                </div>
                            </div>
                            <div class="reply-box" v-if="comment.userComments.isShow">
                                <textarea class="reply-content" :placeholder="bgText" :ref="comment._id"></textarea>
                                <div class="btn">
                                    <button class="commit-reply" @click="commitReply(comment._id)">添加回复</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="line" v-if="!comment.userComments.reply.length"></div>
                <div class="other-comments" v-if="comment.userComments.reply.length">
                    <div class="per-comment" v-for="(replyCurr,index) in comment.userComments.reply" :key="index">
                        <div class="left-img">
                            <img src="" alt="">
                        </div>
                        <div class="right-comment-content">
                <span class="user-name">
                  {{replyCurr.replyUser}}
                </span>
                            <p class="per-comment-content" ref="userComment">{{replyCurr.replyContent}}
                            </p>
                            <div class="per-comment-info">
                                <span class="per-time">{{replyCurr.replyTime}}</span>
                                <div>
                                    <span class="support" @click="support(replyCurr.replyIsSupport,idx,'second',replyCurr._id)"><i :class="replyCurr.replyIsSupport"></i>{{replyCurr.replySupport}}</span>
                                    <span class="reply" @click="reply(!replyCurr.isShowReply,comment._id,'second',replyCurr._id,comment.userComments.commentUser)">回复<i class="el-icon-chat-round"></i></span>
                                </div>
                            </div>
                            <div class="reply-box" v-if="replyCurr.isShowReply">
                                <textarea class="reply-content" :placeholder="bgText" :ref="replyCurr._id"></textarea>
                                <div class="btn">
                                    <button class="commit-reply" @click="commitCurrReply(replyCurr._id,comment._id,replyCurr.replyUser)">添加回复</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="line" v-if="comment.userComments.reply.length"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getCookie} from "../../../../static/js/getCookie";
    import {getComment,support,reply,replyContent,initBox,commitComment,secondReplyContent} from "../../../../api/home/index";
    import {getTime} from "../../../../static/js/getTime";

    export default {
        name: "UserComment",
        props:['articleId'],
        data() {
            return {
                isReply:false,
                bgText:'请先登录再评论',
                isOtherReply:true,
                commentList:[],
                isSupp:false,
                time:new Date()
            }
        },
        methods:{
            /*
            * 用户评论发布
            * */
            releaseComment(){
                const userName = JSON.parse(getCookie('userinfo')).username
                if(this.$refs.releaseValue.value){
                    commitComment({releaseContent:this.$refs.releaseValue.value,articleId:this.articleId,releaseUser:userName}).then((result)=>{
                        const {data} = result;
                        if( data.statements === 0 ){
                            this.commentList = this.commentList.map((item)=>{
                                item.userComments.commentTime = getTime(item.userComments.commentTime)
                                item.userComments.reply = item.userComments.reply.map((item1)=>{
                                    item1.replyTime = getTime(item1.replyTime)
                                    item1.isShowReply = false;
                                    //保持点赞图标不消失
                                    if(!item1.replyIsSupport){
                                        item1.replyIsSupport = 'el-icon-star-off'
                                    }else{
                                        item1.replyIsSupport = 'el-icon-star-on'
                                    }
                                    return item1
                                })
                                item.userComments.isShow = false
                                if(!item.userComments.isSupport){
                                    item.userComments.isSupport = 'el-icon-star-off'
                                }else{
                                    item.userComments.isSupport = 'el-icon-star-on'
                                }
                                return item;
                            })
                            this.commentList = data.result.reverse();
                            this.$refs.releaseValue.value = '';
                            this.bgText = '开始评论'
                            this.$message({
                                type: 'success',
                                message: '评论发布成功'
                            });
                        }
                    })
                }else{
                    this.$message({
                        type: 'info',
                        message: '请添加评论'
                    });
                }
            },
            //点击回复按钮
            async reply(value,id,level,id2){
                let time = new Date();
                if(getCookie('userinfo')) {
                    this.commentList.map((item1) => {
                        if (level === 'first') {
                            if (item1._id == id) {
                                item1.userComments.isShow = !item1.userComments.isShow;
                            }
                        } else {
                            item1.userComments.reply.map((item2) => {
                                if (item2._id == id2) {
                                    item2.isShowReply = !item2.isShowReply;
                                }
                            })
                        }
                    })
                }
            },
            //点击点赞按钮
            async support(value,idx,level,id2){
                let time = new Date();
                if(time-this.time < 1300){
                    return
                }
                //取消点赞
                if(level === 'first'){
                    if(value == 'el-icon-star-on'){
                        await support(false,this.commentList[idx]._id,level)
                        this.commentList[idx].userComments.isSupport = 'el-icon-star-off'
                    }else{
                        //点赞
                        await support(true,this.commentList[idx]._id,level)
                        this.commentList[idx].userComments.isSupport = 'el-icon-star-on'
                    }
                }else {
                    if(value == 'el-icon-star-on'){
                        await support(false,this.commentList[idx]._id,level,id2)
                        this.commentList[idx].userComments.reply.map((item)=>{
                            if(item._id == id2){
                                item.replyIsSupport = 'el-icon-star-off'
                            }
                        })
                    }else{
                        //点赞
                        await support(true,this.commentList[idx]._id,level,id2)
                        this.commentList[idx].userComments.reply.map((item)=>{
                            if(item._id == id2){
                                item.replyIsSupport = 'el-icon-star-on'
                            }
                        })
                    }
                }
                this.time = time
                const data = await getComment()
                this.commentList = data.data.reverse();
                this.commentList = this.commentList.map((item)=>{
                    console.log(item);
                    item.userComments.reply = item.userComments.reply.reverse();
                    item.userComments.commentTime = getTime(item.userComments.commentTime)
                    if(!item.userComments.isSupport){
                        item.userComments.isSupport = 'el-icon-star-off'
                    }else{
                        item.userComments.isSupport = 'el-icon-star-on'
                    }
                    item.userComments.reply.map((item1)=>{
                        if(!item1.replyIsSupport){
                            item1.replyIsSupport = 'el-icon-star-off'
                        }else{
                            item1.replyIsSupport = 'el-icon-star-on'
                        }
                        item1.replyTime = getTime(item1.replyTime);
                        return item1
                    })
                    return item;
                })
            },
            /*
            * 一级评论内容提交
            * */
            async commitReply(id){
                const value = this.$refs[id][0].value;
                const user = JSON.parse(getCookie('userinfo')).username;
                const time = getTime(new Date())
                reply(value,id,user,time).then((result)=>{
                    const {data} = result
                    data.result = data.result.map((item)=>{
                        item.userComments.reply = item.userComments.reply.reverse();
                        return item;
                    })
                    this.commentList = data.result.reverse();
                    this.commentList = this.commentList.map((item)=>{
                        item.userComments.commentTime = getTime(item.userComments.commentTime)
                        item.userComments.reply = item.userComments.reply.map((item1)=>{
                            item1.replyTime = getTime(item1.replyTime)
                            item1.isShowReply = false;
                            //保持点赞图标不消失
                            if(!item1.replyIsSupport){
                                item1.replyIsSupport = 'el-icon-star-off'
                            }else{
                                item1.replyIsSupport = 'el-icon-star-on'
                            }
                            return item1
                        })
                        item.userComments.isShow = false
                        if(!item.userComments.isSupport){
                            item.userComments.isSupport = 'el-icon-star-off'
                        }else{
                            item.userComments.isSupport = 'el-icon-star-on'
                        }
                        return item;
                    })
                });
            },
            /*
            * 二级评论内容提交
            * id:二级回复的id
            * firstId:一级回复的id
            * oldUser:被回复的用户名
            * */
            async commitCurrReply(id,firstId,oldUser){
                const value = this.$refs[id][0].value;
                const nowUser = JSON.parse(getCookie('userinfo')).username
                secondReplyContent(firstId,id,oldUser,nowUser,value).then((result)=>{
                    const {data} = result
                    if( data.statements === 0 ){
                        data.result = data.result.map((item)=>{
                            item.userComments.reply = item.userComments.reply.reverse();
                            return item;
                        })
                        this.commentList = data.result.reverse();
                        this.commentList = this.commentList.map((item)=>{
                            item.userComments.commentTime = getTime(item.userComments.commentTime)
                            item.userComments.reply = item.userComments.reply.map((item1)=>{
                                item1.replyTime = getTime(item1.replyTime)
                                item1.isShowReply = false;
                                //保持点赞图标不消失
                                if(!item1.replyIsSupport){
                                    item1.replyIsSupport = 'el-icon-star-off'
                                }else{
                                    item1.replyIsSupport = 'el-icon-star-on'
                                }
                                return item1
                            })
                            item.userComments.isShow = false
                            if(!item.userComments.isSupport){
                                item.userComments.isSupport = 'el-icon-star-off'
                            }else{
                                item.userComments.isSupport = 'el-icon-star-on'
                            }
                            return item;
                        })
                    }
                })
            }
        },
        async created(){
            if( getCookie('userinfo') ){
                this.bgText = '开始评论'
            }else {
                this.bgText = '请先登录再评论'
            }
            console.log(this);
            const data = await getComment(this.articleId)
            data.data = data.data.map((item)=>{
                item.userComments.reply = item.userComments.reply.reverse();
                return item;
            })
            this.commentList = data.data.reverse();
            this.commentList = this.commentList.map((item)=>{
                item.userComments.commentTime = getTime(item.userComments.commentTime)
                item.userComments.reply = item.userComments.reply.map((item1)=>{
                    item1.replyTime = getTime(item1.replyTime)
                    item1.isShowReply = false;
                    //保持点赞图标不消失
                    if(!item1.replyIsSupport){
                        item1.replyIsSupport = 'el-icon-star-off'
                    }else{
                        item1.replyIsSupport = 'el-icon-star-on'
                    }
                    return item1
                })
                item.userComments.isShow = false
                if(!item.userComments.isSupport){
                    item.userComments.isSupport = 'el-icon-star-off'
                }else{
                    item.userComments.isSupport = 'el-icon-star-on'
                }
                return item;
            })
        },
        //回复框初始化
        // beforeCreate(){
        //   initBox();
        // },
    }
</script>

<style scoped lang="less">
    .comment-box{
        width: 100%;
    }
    textarea{
        display: block;
        width: 100%;
        height: 150px;
        margin: 20px auto 0;
        font-size: 20px;
        color: #000;
        outline: none;
        border: 1px solid #e9e9e9;
        resize: none;
    }
    .btn{
        width: 100%;
        height: 34px;
        margin: 10px auto;
        position: relative;
        .commit-btn{
            position: absolute;
            right: 0;
            top: 4px;
            width: 80px;
            height: 26px;
            line-height: 26px;
            background-color: #4395ff;
            font-size: 16px;
            text-align: center;
            color: #fff;
            border-radius: 6px;
            border: none;
            outline: none;
            cursor: pointer;
        }
    }
    .per-comment{
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 10px 0 10px;
        .left-img{
            width: 40px;
            height: 40px;
            border-radius: 100%;
            background-color: #ccc;
            img{
                display: block;
                width: 100%;
                height: 100%;
            }
        }
        .right-comment-content{
            padding-left: 20px;
            width: 100%;
            .user-name{
                font-size: 18px;
                padding: 4px 0;
            }
            .per-comment-content{
                width: 100%;
                font-size: 16px;
                line-height: 24px;
            }
            .per-comment-info{
                display: flex;
                justify-content: space-between;
                padding: 6px 0;
                font-size: 16px;
                > div{
                    width: 130px;
                }
                .support{
                    padding-right: 24px;
                }
                .reply{
                    user-select: none;
                    i{
                        padding-left: 4px;
                    }
                }
                .support,
                .reply{
                    cursor: pointer;
                }
            }
            .reply-box{
                width: 100%;
                /*padding-top: 20px;*/
                display: flex;
                justify-content: space-between;
            }
            textarea{
                display: block;
                width: 86%;
                height: 30px;
                font-size: 17px;
                line-height: 30px;
                color: #000;
                text-indent: 4px;
                outline: none;
                border: 1px solid #e9e9e9;
                resize: none;
            }
            .btn{
                width: 8%;
                height: 34px;
                position: relative;
                .commit-reply{
                    position: absolute;
                    right: 0;
                    top: 14px;
                    width: 80px;
                    height: 26px;
                    line-height: 26px;
                    background-color: #4395ff;
                    font-size: 16px;
                    text-align: center;
                    color: #fff;
                    border-radius: 6px;
                    border: none;
                    outline: none;
                    cursor: pointer;
                }
            }
        }
        span{
            display: inline-block;
        }
    }
    .line{
        width: 100%;
        height: 1px;
        background-color:#ccc;;
    }
    .other-comments{
        padding-left: 56px;
        .per-comment{
            background-color: #ccc;
            border-radius: 8px;
            margin: 10px 0;
            .left-img{
                margin-left: 10px;
                background-color: pink;
            }
        }
    }
</style>
