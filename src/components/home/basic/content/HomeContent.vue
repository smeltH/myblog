<template>
  <div class="home-content">
    <part-one></part-one>
    <part-two></part-two>
  </div>
</template>

<script>
  import PartOne from 'content/partone/PartOne'
  import PartTwo from 'content/parttwo/PartTwo'
    export default {
      name: "HomeContent",
      data() {
          return {}
      },
      components:{
        PartOne,
        PartTwo
      }
    }
</script>

<style scoped>
  .home-content{
    background-color: rgb(233,234,237);
    overflow: hidden;
  }
</style>
