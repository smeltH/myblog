<template>
    <div class="comment-box">
      <textarea class="comment-commit" :placeholder="bgText" ref="releaseValue"></textarea>
      <div class="btn">
        <button class="commit-btn" @click="releaseComment">发表评论</button>
      </div>
    </div>
</template>

<script>
  import {getCookie} from "../../../../static/js/getCookie";
  // import {commitComment} from "../../../../api";

  export default {
      name: "CommentBox",
      props:['articleId'],
      data() {
          return {
            bgText:'请先登录再评论',
          }
      },
      methods:{
        releaseComment(){
          const userName = JSON.parse(getCookie('userinfo')).username
          if(this.$refs.releaseValue.value){
            commitComment({releaseContent:this.$refs.releaseValue.value,articleId:this.articleId,releaseUser:userName}).then(()=>{})
          }else{
            this.$message({
              type: 'info',
              message: '请添加评论'
            });
          }
        }
      },
      created(){
        console.log(getCookie('userinfo'));
        if( getCookie('userinfo') ){
          this.bgText = '开始评论'
        }else {
          this.bgText = '请先登录再评论'
        }
      }
    }
</script>

<style scoped lang="less">
  .comment-box{
    width: 100%;
  }
  textarea{
    display: block;
    width: 90%;
    height: 150px;
    margin: 20px auto 0;
    font-size: 20px;
    color: #000;
    outline: none;
    border: 1px solid #e9e9e9;
    resize: none;
  }
  .btn{
    width: 90%;
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
</style>
