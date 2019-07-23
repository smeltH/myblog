<template>
    <div class="part-one-content">
      <ul class="left">
        <li class="article article-one">
          <a href="/notice/27.html" title="为什么说10月24日是程序员的节日？">
            <img src="http://jxhx2.yangqq.com/skin/jxhx/images/h1.jpg" alt="为什么说10月24日是程序员的节日？">
            <span>为什么说10月24日是程序员的节日？</span>
          </a>
        </li>
        <li class="article article-one">
          <a href="/notice/27.html" title="为什么说10月24日是程序员的节日？">
            <img src="http://jxhx2.yangqq.com/skin/jxhx/images/h1.jpg" alt="为什么说10月24日是程序员的节日？">
            <span>为什么说10月24日是程序员的节日？</span>
          </a>
        </li>
      </ul>
      <div class="right">
        <div class="my-card">
          <h4>我的名片</h4>
          <div class="my-info">
            <p>网名：DanceSmile | 即步非烟</p>
            <p>职业：Web前端设计师、网页设计</p>
            <p>现居：四川省-成都市</p>
            <p>Email：dancesmiling@qq.com</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: "PartOneContent",
    data() {
      return {

      }
    }
  }
</script>

<style scoped lang="less">
  .part-one-content{
    display: flex;
    justify-content: space-around;
    flex: 1;
    height: 100%;
    .left,
    .right{
      width: 45%;
      height: 100%;
      box-sizing: border-box;
    }
    .left{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .article{
        position: relative;
        height: 47%;
        overflow: hidden;
        a{
          width: 100%;
          height: 100%;
          img{
            width: 100%;
            height: 100%;
            opacity: .9;
            transition: all 0.5s;
          }
          span{
            position: absolute;
            top: 25%;
            left: 0;
            right: 0;
            color: #fff;
            font-size: 15px;
            text-align: center;
            margin-top: 5px;
            padding: 0 40px;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 24px;
            height: 48px;
          }
        }
        a:hover img{
          transform: scale(1.1);
          transition: all 0.5s;
        }
      }
    }
    .right{
      padding: 0 10px;
      .my-card{
        width: 100%;
        height: 100%;
        background-color: rgb(42,42,42);
        color: #fff;
        h4{
          padding: 16px 0 20px 20px;
        }
        p{
          padding: 14px 0 0 20px;
          font-size: 16px;
        }
      }
    }
  }
</style>
