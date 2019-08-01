<template>
    <div id="homePage" class="homepage">
      <home-header></home-header>
      <home-content></home-content>
    </div>
</template>

<script>
  import HomeHeader from 'header/HomeHeader'
  import HomeContent from 'content/HomeContent'
  export default {
    name: "HomePage",
    data() {
        return {}
    },
    components:{
      HomeHeader,
      HomeContent
    }
  }
</script>

<style scoped>
  .homepage{
    background-color: rgb(233,234,237);
  }
</style>
