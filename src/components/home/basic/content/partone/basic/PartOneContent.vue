<template>
    <div class="part-one-content">
      <div class="my-card">
        <h4>LoginErr的个人名片</h4>
        <div class="my-info">
          <p>就读于：中南民族大学</p>
          <p>理想职业：全栈工程师</p>
          <p>兴趣爱好：唱、跳、rap、篮球</p>
          <p>Email：846261654@qq.com</p>
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
    padding-left:20px;
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
