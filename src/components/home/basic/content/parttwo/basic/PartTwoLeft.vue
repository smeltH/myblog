<template>
    <div class="part-two-left">
      <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">
        <div class="content">
          <div class="left-content">
            <top-and-buttom>
              <a href="/notice/27.html" title="" slot="article-one">
                <img src="http://jxhx2.yangqq.com/skin/jxhx/images/4.jpg" alt="">
                <span>个人网站做好了，百度不收录怎么办？来，看看他们怎么做的</span>
              </a>
              <a href="/notice/27.html" title="" slot="article-two">
                <img src="http://jxhx2.yangqq.com/skin/jxhx/images/2.jpg" alt="">
                <span>个人博客，属于我的小世界！</span>
              </a>
            </top-and-buttom>
          </div>
          <five-articles>
            <el-collapse-item :name="(index*1+1).toString()" v-for="(article,index) in articleData" slot="article" :key="index">
              <template slot="title">
                <h5>{{article.title}}</h5>
              </template>
              <p>{{article.content}}</p>
            </el-collapse-item>
          </five-articles>
        </div>
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="second">
        <div class="content">
          <div class="left-content">
            <top-and-buttom>
              <a href="/notice/27.html" title="" slot="article-one">
                <img src="http://jxhx2.yangqq.com/skin/jxhx/images/4.jpg" alt="">
                <span>个人网站做好了，百度不收录怎么办？来，看看他们怎么做的</span>
              </a>
              <a href="/notice/27.html" title="" slot="article-two">
                <img src="http://jxhx2.yangqq.com/skin/jxhx/images/2.jpg" alt="">
                <span>个人博客，属于我的小世界！</span>
              </a>
            </top-and-buttom>
          </div>
          <five-articles>
            <el-collapse-item :name="(index*1+1).toString()" v-for="(article,index) in articleData" slot="article" :key="index">
              <template slot="title">
                <h5>{{article.title}}</h5>
              </template>
              <p>{{article.content}}</p>
            </el-collapse-item>
          </five-articles>
        </div>
      </el-tab-pane>
      <el-tab-pane label="角色管理" name="third">
        <div class="content">
          <div class="left-content">
            <top-and-buttom>
              <a href="/notice/27.html" title="" slot="article-one">
                <img src="http://jxhx2.yangqq.com/skin/jxhx/images/4.jpg" alt="">
                <span>个人网站做好了，百度不收录怎么办？来，看看他们怎么做的</span>
              </a>
              <a href="/notice/27.html" title="" slot="article-two">
                <img src="http://jxhx2.yangqq.com/skin/jxhx/images/2.jpg" alt="">
                <span>个人博客，属于我的小世界！</span>
              </a>
            </top-and-buttom>
          </div>
          <five-articles>
            <el-collapse-item :name="(index*1+1).toString()" v-for="(article,index) in articleData" slot="article" :key="index">
              <template slot="title">
                <h5>{{article.title}}</h5>
              </template>
              <p>{{article.content}}</p>
            </el-collapse-item>
          </five-articles>
        </div>
      </el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">
        <div class="content">
          <div class="left-content">
            <top-and-buttom>
              <a href="/notice/27.html" title="" slot="article-one">
                <img src="http://jxhx2.yangqq.com/skin/jxhx/images/4.jpg" alt="">
                <span>个人网站做好了，百度不收录怎么办？来，看看他们怎么做的</span>
              </a>
              <a href="/notice/27.html" title="" slot="article-two">
                <img src="http://jxhx2.yangqq.com/skin/jxhx/images/2.jpg" alt="">
                <span>个人博客，属于我的小世界！</span>
              </a>
            </top-and-buttom>
          </div>
          <five-articles>
            <el-collapse-item :name="(index*1+1).toString()" v-for="(article,index) in articleData" slot="article" :key="index">
              <template slot="title">
                <h5>{{article.title}}</h5>
              </template>
              <p>{{article.content}}</p>
            </el-collapse-item>
          </five-articles>
        </div>
      </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
  import TopAndButtom from 'public/TopAndButtom'
  import FiveArticles from 'public/FiveArticles'
    export default {
      name: "PartTwoLeft",
      data() {
          return {
            activeName: 'first',
            articleData:[
              {
                title:'安静地做一个爱设计的女子',
                content:'自从入了这行，很多人跟我说可以做网络教程，我也有考虑，但最终没有实现，因为我觉得在这个教程泛滥的时代，直接做一套免费的原创个人博客模板更为实在。每当看到自己喜欢的配色图片'
              },
              {
                title:'电话以外的宁静',
                content:'电话很久没有响过了，我的QQ也很久没有在线了，消失了很多天，刚刚结识的朋友因为我身上又起了红疹，每天都发来消息询问我的情况，我做到了这么多天来的沉默，我相信，没有网络，我还是可以继续我自己的生活'
              },
              {
                title:'遇见一个未知的你',
                content:'听着那熟悉的歌曲看着那一张张可爱的图片.-读着我们共同欣赏的诗……也许我们曾经相遇,看着你远去的背影 ,沿着你来的方向 ,回忆时间穿梭于幸福的点点滴滴....'
              },
              {
                title:'个人网站做好了，百度不收录怎么办？来，看看他们怎么做的',
                content:'不管你是学前端的还是后端的，作为一个程序员，做一个自己的博客，那是必然的。咱们的圈子就这么大，想让更多的人了解你，看看你的技术多牛逼，扔一个博客地址就行了'
              },
            ]
          }
      },
      methods: {
        handleClick(tab, event) {
          console.log(tab, event);
        }
      },
      components:{
        TopAndButtom,
        FiveArticles
      }
    }
</script>

<style scoped lang="less">
  .part-two-left{
    width: 900px;
    padding: 20px;
    background-color: #fff;
    .content{
      width: 100%;
      height: 260px;
      display: flex;
      justify-content: space-between;
      .left-content{
        width: 300px;
        height: 260px;
      }
    }
  }
</style>
