<template>
    <div class="part-one-content">
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
    width: 310px;
    height: 100%;
    padding: 0 10px;
    .my-card{
      width: 100%;
      height: 100%;
      background-color: rgb(42,42,42);
      color: #d0d2d4;
      h4{
        padding: 16px 0 20px 20px;
      }
      p{
        padding: 14px 0 0 20px;
        font-size: 16px;
      }
    }
  }
</style>
