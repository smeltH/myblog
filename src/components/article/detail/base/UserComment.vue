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
            <div v-for="item,index in getCommentList" :key="index">
                <div class="comment-lists">
                    <div class="left"><img src="" alt=""></div>
                    <div class="right">
                        <h6>
                            <span class="time">{{item.releaseTime}}</span><span class="user-name">{{item.releaseUser}}</span>
                        </h6>
                        <input type="checkbox" :id="index" class="toggle">
                        <div>
                            <p class="content">{{item.releaseContent}}</p>
                            <label :for="index">
                                <span class="show">展开</span>
                                <span class="hide">收起</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <el-pagination
                small
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                layout="total, prev, pager, next"
                :page-size="commentCount"
                :total="commentLists.length"
                hide-on-single-page>
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {getCookie} from "../../../../static/js/getCookie";
    import {commitComment, getComment} from "../../../../api/home/index";
    import {getTime} from "../../../../static/js/getTime";

    export default {
        name: "UserComment",
        props:['commentLists', 'articleId'],
        data() {
            return {
                isReply:false,
                bgText:'请先登录再评论',
                isOtherReply:true,
                commentList:[],
                isSupp:false,
                time:new Date(),
                commentCount: 5,
                currentPage: 1,
                currentComment: []
            }
        },
        methods:{
            /*
            * 用户评论发布
            * */
            async releaseComment(){
                if (!getCookie('userinfo')) {
                    this.$router.push({path:'/login', name:'loginlink'})
                   return
                }
                const userName = JSON.parse(getCookie('userinfo')).username;
                if(this.$refs.releaseValue.value){
                    const {data} = await commitComment({releaseContent:this.$refs.releaseValue.value,articleId:this.articleId,releaseUser:userName});
                    if( data.statements === 0 ){
                        this.$message({
                            type: 'success',
                            message: data.msg
                        });
                    }else{
                        this.$message({
                            type: 'info',
                            message: data.msg
                        });
                    }
                    setTimeout(() => {
                        this.$refs.releaseValue.value = '';
                    },200)
                }else{
                    this.$message({
                        type: 'info',
                        message: '请添加评论'
                    });
                }
            },
            handleSizeChange(){
                this.currentPage++;
            },
            handleCurrentChange(val){
                this.currentPage = val;
            }
        },
        async created(){
            if( getCookie('userinfo') ){
                this.bgText = '开始评论'
            }else {
                this.bgText = '请先登录再评论'
            }
        },
        computed:{
            getCommentList:{
                get(){
                    return this.currentComment = this.commentLists.slice((this.currentPage-1) * this.commentCount, this.currentPage * this.commentCount)
                }
            }
        }
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
    .comment-lists{
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 4px 0 10px;
        border-bottom: 1px dashed #ccc;
        .left{
            width: 40px;
            height: 40px;
            margin-top: 8px;
            border-radius: 100%;
            background-color: #ccc;
            img{
                display: block;
                width: 100%;
                height: 100%;
            }
        }
        .right{
            position: relative;
            padding-left: 20px;
            width: 100%;
            h6{
                span{
                    display: inline-block;
                }
                .user-name{
                    font-size: 18px;
                    padding: 4px 0 4px 20px;
                }
                .time{
                    padding: 6px 0;
                    font-size: 16px;
                }
            }
            .content{
                position: relative;
                width: 100%;
                font-size: 16px;
                line-height: 24px;
                word-break: break-all;
                overflow: hidden;
            }
            label{
                width: 34px;
                height: 24px;
                position: absolute;
                right: 0;
                bottom: 0;
                font-size: 16px;
                padding-left: 8px;
                background-color: #fff;
                cursor: pointer;
                user-select: none;
            }
            .toggle,
            .hide,
            .toggle:checked ~ div label .show{
                position: absolute;
                left: -9999px;
            }
            .toggle:checked ~ div label .hide{
                position: static;
            }
            .toggle ~ div .content{
                max-height: 48px;
            }
            .toggle:checked ~ div .content{
                max-height: 9999px;
            }
            .user-name{
                font-size: 18px;
                padding: 4px 0;
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
    .published /deep/ .el-pagination{
        margin-top: 14px;
        text-align: center;
    }
</style>
