<template>
  <div class="home-content">
    <!--<part-two></part-two>-->
    <!--<other-content></other-content>-->
    <content-left></content-left>
    <content-right></content-right>
  </div>
</template>

<script>
  // import PartTwo from 'content/parttwo/PartTwo'
  // import OtherContent from 'content/othercontent/OtherContent'
  import ContentLeft from 'content/basic/ContentLeft'
  import ContentRight from 'content/basic/ContentRight'
    export default {
      name: "HomeContent",
      data() {
          return {}
      },
      components:{
        ContentLeft,
        ContentRight
      }
    }
</script>

<style scoped>
  .home-content{
    width:1300px;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    background-color: rgb(233,234,237);
    padding-top: 110px;
    overflow: hidden;
  }
</style>
