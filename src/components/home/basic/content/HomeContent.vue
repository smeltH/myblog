<template>
  <div class="home-content">
    <part-two></part-two>
    <other-content></other-content>
  </div>
</template>

<script>
  import PartTwo from 'content/parttwo/PartTwo'
  import OtherContent from 'content/othercontent/OtherContent'
    export default {
      name: "HomeContent",
      data() {
          return {}
      },
      components:{
        PartTwo,
        OtherContent
      }
    }
</script>

<style scoped>
  .home-content{
    background-color: rgb(233,234,237);
    padding-top: 60px;
    overflow: hidden;
  }
</style>
