<template>
    <div class="page-right">
        <div class="self-introduction">
            <div class="self-content">
                <div class="self-bg">
                    <img class="self-avator" src="../assets/images/avatar.png">
                </div>
                <div class="self-info">
                    <h5 class="self-name">LoginErr</h5>
                    <p class="self-qq"><span>QQ</span>846261654</p>
                    <p class="self-email"><span>邮箱</span>lian73278075@126.com</p>
                    <p class="self-school"><span>学校</span>中南民族大学</p>
                    <p class="self-github"><span>Github</span>https://github.com/Login-err</p>
                </div>
                <div class="web-info"></div>
            </div>
        </div>
        <div class="article-recommand">
            <div class="top-card">
                <div class="title">
                    <h4>博主推荐</h4>
                </div>
                <ul class="new-article-lists">
                    <router-link :to="{name:'detaillink',params:{id:article._id}}" tag="li" v-for="(article,index) in articles" :key="index">{{article.title}}</router-link>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ContentRight",
        data() {
            return {
                count:4,
                articles:[]
            }
        },
        async created(){
            const {data:{data}} = await this.$axios.post('/api/index/getCategoryArticles',{count:this.count})
            this.articles = data
        },
    }
</script>

<style scoped lang="less">
    .page-right{
        width: 310px;
        .article-recommand{
            width: 290px;
            height: 314px;
            padding: 20px 10px;
            margin-top: 50px;
            background-color: rgb(255,255,255);
            .title{
                width: 80px;
                height: 38px;
                border-bottom: 2px solid rgb(0,0,0);
                .h4{
                }
            }
            .new-article-lists{
                width: 100%;
                list-style: disc;
                li{
                    height: 40px;
                    padding: 5px 0 5px 20px;
                    background-color: rgb(246,246,246);
                    margin-top: 20px;
                    font-size: 12px;
                    line-height: 40px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    cursor: pointer;
                }
            }
        }
        .self-introduction{
            width: 310px;
            background-color: rgb(255,255,255);
            .self-content{
                .self-bg{
                    position: relative;
                    width: 100%;
                    height: 160px;
                    background-repeat: round;
                    background-image: url('../assets/images/avatarBg.jpg');
                    .self-avator{
                        display: block;
                        position: absolute;
                        left: 50%;
                        top: 100%;
                        transform: translate(-50%, -50%);
                        width: 60px;
                        height: 60px;
                        border-radius: 100%;
                        background-color: #eee;
                    }
                }
                .self-info{
                    width: 100%;
                    padding-bottom: 20px;
                    .self-name{
                        width: 100%;
                        padding-top: 30px;
                        height: 50px;
                        text-align: center;
                    }
                    p{
                        font-size: 14px;
                        padding: 8px 20px;
                        font-weight: 400;
                        user-select: text;
                        > span{
                            display: inline-block;
                            font-size: 16px;
                        }
                        > span::after{
                            content: ':';
                            display: inline-block;
                            width: 6px;
                            padding-right: 6px;
                        }
                    }
                }
                .web-info{
                    width: 100%;
                    height: 80px;
                    background-color: #1c2327;
                }
            }
        }
    }
</style>
