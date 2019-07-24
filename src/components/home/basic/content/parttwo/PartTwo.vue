<template>
    <div class="part-two">
      <part-two-left></part-two-left>
      <part-two-right></part-two-right>
    </div>
</template>

<script>
  import PartTwoLeft  from 'content/parttwo/basic/PartTwoLeft'
  import PartTwoRight  from 'content/parttwo/basic/PartTwoRight'
    export default {
      name: "PartTwo",
      data() {
          return {}
      },
      components:{
        PartTwoLeft,
        PartTwoRight
      }
    }
</script>

<style scoped lang="less">
  .part-two{
    display: flex;
    justify-content: space-between;
    width: 1300px;
    margin: 20px auto 0;
  }
</style>
