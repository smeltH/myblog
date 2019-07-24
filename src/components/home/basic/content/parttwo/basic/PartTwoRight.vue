<template>
    <div class="part-two-right">
      <div class="title">
        <h4>博主推荐</h4>
      </div>
      <ul class="new-article-lists">
        <li>【个人博客空间申请】金牛云服，免费领空间啦</li>
        <li>双十一，阿里云特惠活动，快来领券啦</li>
        <li>第二届 优秀个人博客模板比赛参选活动</li>
        <li>为什么说10月24日是程序员的节日？</li>
      </ul>
    </div>
</template>

<script>
    export default {
        name: "PartTwoRight",
        data() {
            return {}
        }
    }
</script>

<style scoped lang="less">
  .part-two-right{
    width: 290px;
    padding: 20px 10px;
    background-color: rgb(255,255,255);
    .title{
      width: 80px;
      height: 38px;
      border-bottom: 2px solid rgb(0,0,0);
      .h4{
      }
    }
    .new-article-lists{
      width: 100%;
      list-style: disc;
      li{
        height: 40px;
        padding: 5px 0 5px 20px;
        background-color: rgb(246,246,246);
        margin-top: 20px;
        font-size: 12px;
        line-height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
      }
    }
  }
</style>
