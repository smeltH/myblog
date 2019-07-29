<template>
    <div class="article">
      <div class="article-right">
        <div class="right-title">
          <slot name="title">使用ES2018正则Unicode属性类过滤Emoji表情</slot>
        </div>
        <div class="right-content">
          <slot name="description">便的方法，之前也没有注意</slot>
        </div>
        <div class="operate-info">
          <span class="iconlists release-date">
            <i class="iconfont icon-rili"></i><slot name="time">2019-07-08 20:49:25</slot>
          </span>
          <span class="iconlists degree">
            <i class="iconfont icon-redu"></i><slot name="hot">103</slot>
          </span>
          <span class="iconlists comment-number">
            <i class="iconfont icon-pinglun-copy-copy"></i><slot name="comments">51</slot>
          </span>
          <span class="iconlists support-number">
            <i class="iconfont icon-dianzan11"></i><slot name="support">22</slot>
          </span>
          <slot name="readMore"></slot>
        </div>
      </div>
      <div class="article-top">
        <slot class="iconfont icon-iconfont-zd" name="isTop"></slot>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Article",
        data() {
            return {
              isTop:false
            }
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
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      h2{
        font-size: 16px;
        padding: 8px 0;
      }
      .right-content{
        padding-top: 10px;
        p{
          font-size: 14px;
          line-height: 26px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
      }
      .operate-info{
        margin-top: 10px;
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
