<template>
    <div class="part-one">
      <part-one-swiper></part-one-swiper>
      <part-one-content></part-one-content>
    </div>
</template>

<script>
  import PartOneSwiper from 'content/partone/basic/PartOneSwiper'
  import PartOneContent from 'content/partone/basic/PartOneContent'
  export default {
    name: "PartOne",
    data() {
      return {

      }
    },
    components:{
      PartOneSwiper,
      PartOneContent
    }
  }
</script>

<style scoped lang="less">
  .part-one{
    display: flex;
    width: 1300px;
    height: 260px;
    margin: 20px auto 0;
    justify-content: space-between;
  }
</style>
