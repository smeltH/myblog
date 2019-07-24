<template>
    <div class="top-and-bottom">
      <ul class="right">
        <li class="article article-one">
          <slot name="article-one"></slot>
        </li>
        <li class="article article-one">
          <slot name="article-two"></slot>
        </li>
      </ul>
    </div>
</template>

<script>
    export default {
        name: "TopAndButtom",
        data() {
            return {}
        }
    }
</script>

<style scoped lang="less">
  .top-and-bottom{
    width: 100%;
    height: 100%;
    .right{
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      .article{
        width: 100%;
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
            top: 50%;
            transform: translateY(-50%);
            left: 0;
            right: 0;
            color: #fff;
            font-size: 15px;
            text-align: center;
            padding: 0 40px;
            height: 48px;
          }
          span::after{
            display:inline-block;
            content:"";
            height:50%;
            vertical-align:center;
          }
        }
        a:hover img{
          transform: scale(1.1);
          transition: all 0.5s;
        }
      }
    }
  }
</style>
