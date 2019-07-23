<template>
  <div class="home-content">
    <part-one></part-one>
  </div>
</template>

<script>
  import PartOne from 'content/partone/PartOne'
    export default {
      name: "HomeContent",
      data() {
          return {}
      },
      components:{
        PartOne
      }
    }
</script>

<style scoped>

</style>
