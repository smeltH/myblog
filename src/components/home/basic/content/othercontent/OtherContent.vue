<template>
    <div class="other-content">
      <other-content-left></other-content-left>
      <other-content-right></other-content-right>
    </div>
</template>

<script>
  import OtherContentLeft from 'content/othercontent/basic/OtherContentLeft'
  import OtherContentRight from 'content/othercontent/basic/OtherContentRight'
  export default {
    name: "OtherContent",
    data() {
      return {
      }
    },
    components:{
      OtherContentLeft,
      OtherContentRight
    }
  }
</script>

<style scoped lang="less">
  .other-content{
    display: flex;
    width: 1300px;
    margin: 20px auto 10px;
    justify-content: space-between;
  }
</style>
