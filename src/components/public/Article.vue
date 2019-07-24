<template>
    <div class="article">
      <div class="article-left">
        <img src="https://www.xuanmo.xin/wp-content/uploads/2019/07/QQ20190704-201427@2x.png" alt="">
      </div>
      <div class="article-right">
        <div class="right-title">
          <h2>使用ES2018正则Unicode属性类过滤Emoji表情</h2>
        </div>
        <div class="right-content">
          <p>最近项目中有遇到前端需要文本输入框中的Emoji表情给匹配出来，不让用户输入，百度搜索出来很多答案都是匹配不全的，后边在阮一峰老师的正则扩展中找到了一个比较方便的方法，之前也没有注意过正则的扩展，记录一下，使用下边这段正则即可匹配Emoji表情： /\p{Emoji_Modifier_Base}\p{Emoji_Mod</p>
        </div>
        <div class="operate-info">
          <span class="iconlists release-date">
            <i class="iconfont icon-rili"></i>2019-07-08 20:49:25
          </span>
          <span class="iconlists degree">
            <i class="iconfont icon-redu"></i>103
          </span>
          <span class="iconlists comment-number">
            <i class="iconfont icon-pinglun-copy-copy"></i>51
          </span>
          <span class="iconlists support-number">
            <i class="iconfont icon-dianzan11"></i>22
          </span>
          <button class="read-more">查看全文</button>
        </div>
      </div>
      <div class="article-top">
        <i class="iconfont icon-iconfont-zd"></i>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Article",
        data() {
            return {}
        }
    }
</script>

<style scoped lang="less">
  .article{
    position: relative;
    width: 940px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 20px 0px;
    border-bottom: 1px solid #e9eaed;
    .article-left{
      width: 280px;
      height: 160px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .article-right{
      width: 600px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      h2{
        font-size: 16px;
        padding: 8px 0;
      }
      p{
        font-size: 14px;
        line-height: 26px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
      .operate-info{
        position: relative;
        .iconlists{
          font-size: 12px;
          margin-right: 24px;
          .iconfont{
            margin-right: 4px;
          }
        }
        .read-more{
          position: absolute;
          right: 0;
          bottom: 0;
          width: 80px;
          height: 26px;
          line-height: 26px;
          color: #fff;
          background-color: rgb(18,183,222);
          border-radius: 5px;
          border:none;
          outline: none;
          cursor: pointer;
        }
      }
    }
    .article-top{
      position: absolute;
      right: 0;
      top: 20px;
      color: rgb(255,0,0);
    }
  }
</style>
