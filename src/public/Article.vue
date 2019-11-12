<template>
    <div class="article">
        <div class="article-left">
            <img v-if="article.articleImg" :src="article.articleImg" alt="">
            <img v-else src="../assets/images/no-pic.png" alt="">
        </div>
        <div class="article-right">
            <div class="right-title">
                <h2>{{article.title}}</h2>
            </div>
            <div class="right-content">
                <p>{{article.description}}</p>
            </div>
            <div class="operate-info">
                <span class="iconlists release-date">
                    <i class="iconfont icon-rili"></i>
                    <span>{{article.releaseTime}}</span>
                </span>
                <span class="iconlists degree">
                    <i class="iconfont icon-liulanshu"></i>
                    <span>{{article.hotNumber}}</span>
                </span>
                <span class="iconlists comment-number">
                    <i class="iconfont icon-wsdzb_zzgzt_zzsh_mzpy_dymzpyjl"></i>
                    <span v-if="article.comments">{{article.comments.length}}</span>
                </span>
                <span class="iconlists support-number">
                    <i class="iconfont icon-dianzan"></i>
                    <span v-if="article.supportMembers">{{article.supportMembers.length}}</span>
                </span>
                <router-link :to="{name:'detaillink',params:{id:article._id}}" class="read-more" tag="button">查看全文</router-link>
            </div>
        </div>
        <div class="article-top">
            <i class="iconfont icon-zhiding" v-if="article.isTop"></i>
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
        },
        props: ['article']
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
                border-radius: 10px;
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
            top: -6px;
            color: #ffc800;
            .icon-zhiding{
                font-size: 40px;
            }
        }
    }
</style>
