<template>
    <div class="article">
        <div class="article-left">
            <img src="" alt="">
        </div>
        <div class="article-right">
            <div class="right-title">
                <slot name="title">使用ES2018正则Unicode属性类过滤Emoji表情</slot>
            </div>
            <div class="right-content">
                <slot name="description">便的方法，之前也没有注意</slot>
            </div>
            <div class="operate-info">
          <span class="iconlists release-date">
            <i class="iconfont icon-rili"></i><slot name="time">2019-07-08 20:49:25</slot>
          </span>
                <span class="iconlists degree">
            <i class="iconfont icon-redu"></i><slot name="hot">103</slot>
          </span>
                <span class="iconlists comment-number">
            <i class="iconfont icon-pinglun-copy-copy"></i><slot name="comments">51</slot>
          </span>
                <span class="iconlists support-number">
            <i class="iconfont icon-dianzan11"></i><slot name="support">22</slot>
          </span>
                <slot name="readMore"></slot>
            </div>
        </div>
        <div class="article-top">
            <slot class="iconfont icon-iconfont-zd" name="isTop"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Article",
        data() {
            return {
                isTop:false
            }
        }
    }
</script>

<style scoped lang="less">
    .article{
        position: relative;
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 20px;
        background-color: #8b98c7;
        border-radius: 8px;
        border-bottom: 2px solid #e9eaed;
        box-sizing: border-box;
        .article-left{
            width: 245px;
            height: 150px;
            img{
                width: 100%;
                height: 100%;
                background-color: #ccc;
                border-radius: 8px;
            }
        }
        .article-right{
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding-left: 20px;
            box-sizing: border-box;
            h2{
                font-size: 16px;
                padding: 8px 0;
                color: #fff;
            }
            .right-content{
                color: #fff;
                p{
                    height: 81px;
                    font-size: 14px;
                    line-height: 27px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    color: #ccc;
                }
            }
            .operate-info{
                margin-top: 6px;
                position: relative;
                color: #fff;
                .iconlists{
                    font-size: 12px;
                    margin-right: 24px;
                    color: #fff;
                    .iconfont{
                        margin-right: 4px;
                        color: #fff;
                    }
                }
                .read-more{
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    width: 80px;
                    height: 26px;
                    line-height: 26px;
                    color: #fff;
                    background-color: #8cb1df;
                    border-radius: 5px;
                    border:none;
                    outline: none;
                    cursor: pointer;
                    color: #fff;
                }
            }
        }
        .article-top{
            position: absolute;
            right: 0;
            top: 20px;
            color: #ffc800;
            .icon-iconfont-zd{
            }
        }
    }
</style>
