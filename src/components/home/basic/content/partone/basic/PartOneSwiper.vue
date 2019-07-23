<template>
    <div class="swiper-one">
      <swiper :options="swiperOption" class="swiper-container">
        <swiper-slide v-for="(slide, index) in swiperInfo" :key="index">
          <img :src="slide.url" alt="">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
        <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
      </swiper>
    </div>
</template>

<script>
    export default {
      name: "PartOneSwiper",
      data() {
        return {
          swiperInfo:[
            {
              url:'http://jxhx2.yangqq.com/skin/jxhx/images/1.jpg'
            },
            {
              url:'http://jxhx2.yangqq.com/skin/jxhx/images/2.jpg'
            },
            {
              url:'http://jxhx2.yangqq.com/skin/jxhx/images/3.jpg'
            },
            {
              url:'http://jxhx2.yangqq.com/skin/jxhx/images/4.jpg'
            }
          ],
          swiperOption: {
            loop : true,
            pagination: {
              el: '.swiper-pagination',
              clickable :true,
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          }
        }
      }
    }
</script>

<style scoped lang="less">
  .swiper-one{
    max-width: 600px;
    height: 100%;
    .swiper-container{
      width: 100%;
      height: 100%;
      img{
        width: 100%;
      }
      .swiper-pagination-bullet-active{
        color: #fff;
      }
    }
  }
</style>
