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
        <ul class="right">
          <li class="article article-one">
            <a href="/notice/27.html" title="为什么说10月24日是程序员的节日？">
              <img src="http://jxhx2.yangqq.com/skin/jxhx/images/h1.jpg" alt="为什么说10月24日是程序员的节日？">
              <span>为什么说10月24日是程序员的节日？</span>
            </a>
          </li>
          <li class="article article-one">
            <a href="/notice/27.html" title="为什么说10月24日是程序员的节日？">
              <img src="http://jxhx2.yangqq.com/skin/jxhx/images/h1.jpg" alt="为什么说10月24日是程序员的节日？">
              <span>为什么说10月24日是程序员的节日？</span>
            </a>
          </li>
        </ul>
      </div>
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
      .right{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        .article{
          width: 100%;
          position: relative;
          height: 47%;
          overflow: hidden;
          a{
            width: 100%;
            height: 100%;
            img{
              width: 100%;
              height: 100%;
              opacity: .9;
              transition: all 0.5s;
            }
            span{
              position: absolute;
              top: 25%;
              left: 0;
              right: 0;
              color: #fff;
              font-size: 15px;
              text-align: center;
              margin-top: 5px;
              padding: 0 40px;
              overflow: hidden;
              text-overflow: ellipsis;
              line-height: 24px;
              height: 48px;
            }
          }
          a:hover img{
            transform: scale(1.1);
            transition: all 0.5s;
          }
        }
      }
    }
  }
</style>
