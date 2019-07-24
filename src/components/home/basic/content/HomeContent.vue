<template>
  <div class="home-content">
    <part-one></part-one>
    <part-two></part-two>
    <other-content></other-content>
  </div>
</template>

<script>
  import PartOne from 'content/partone/PartOne'
  import PartTwo from 'content/parttwo/PartTwo'
  import OtherContent from 'content/othercontent/OtherContent'
    export default {
      name: "HomeContent",
      data() {
          return {}
      },
      components:{
        PartOne,
        PartTwo,
        OtherContent
      }
    }
</script>

<style scoped>
  .home-content{
    background-color: rgb(233,234,237);
    overflow: hidden;
  }
</style>
