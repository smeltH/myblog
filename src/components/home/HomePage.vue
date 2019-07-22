<template>
    <div id="homePage" class="homepage">
      <home-header></home-header>
    </div>
</template>

<script>
  import HomeHeader from 'home/basic/HomeHeader'
  export default {
    name: "HomePage",
    data() {
        return {}
    },
    components:{
      HomeHeader
    }
  }
</script>

<style scoped>

</style>
