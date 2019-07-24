<template>
    <div class="swiper-one">
      <div class="left-swiper">
        <swiper :options="swiperOption" class="swiper-container">
          <swiper-slide v-for="(slide, index) in swiperInfo" :key="index">
            <img :src="slide.url" alt="">
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
          <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
        </swiper>
      </div>
      <div class="right-article">
        <top-and-buttom>
          <a href="/notice/27.html" title="为什么说10月24日是程序员的节日？" slot="article-one">
            <img src="http://jxhx2.yangqq.com/skin/jxhx/images/h1.jpg" alt="为什么说10月24日是程序员的节日？">
            <span>为什么说10月24日是程序员的节日？</span>
          </a>
          <a href="/notice/27.html" title="为什么说10月24日是程序员的节日？" slot="article-two">
            <img src="http://jxhx2.yangqq.com/skin/jxhx/images/h1.jpg" alt="为什么说10月24日是程序员的节日？">
            <span>为什么说10月24日是程序员的节日？</span>
          </a>
        </top-and-buttom>
      </div>
    </div>
</template>

<script>
  import TopAndButtom from 'public/TopAndButtom'
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
      },
      components:{
        TopAndButtom
      }
    }
</script>

<style scoped lang="less">
  .swiper-one{
    width: 940px;
    display: flex;
    justify-content: space-between;
    height: 100%;
    .swiper-container{
      max-width: 600px;
      height: 100%;
      img{
        width: 100%;
      }
      .swiper-pagination-bullet-active{
        color: #fff;
      }
    }
    .right-article{
      width: 300px;
    }
  }
</style>
