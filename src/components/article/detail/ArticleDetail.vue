<template>
    <div class="article-detail">
        <home-header></home-header>
        <div class="article-content">
            <div class="article-operate">
                <el-badge :value="comment" :max="99" class="item" type="primary">
                    <i class="el-icon-chat-dot-round"></i>
                </el-badge>
                <el-badge :value="support" :max="99" class="item" type="primary">
                    <i class="el-icon-star-off"></i>
                </el-badge>
            </div>
            <div class="article">
                <h2>{{detail.title}}</h2>
                <div class="article-info">
                    发布时间：<span class="time">{{detail.releaseTime}}</span>
                    作者：<span class="author">{{detail.author}}</span>
                    阅读数：<span class="hot">{{detail.hotNumber}}</span>
                    <!--评论数：<span class="comment">{{detail.comments.length}}</span>-->
                    点赞数：<span class="support">{{detail.supportNumber}}</span>
                </div>
                <!--<markdown-it-vue :content="detail.contentHtml" :options="options"/>-->
                <article v-html="detail.contentHtml"></article>
                <div class="article-comments">
                    <div class="comment-box">
                        <user-comment v-if="detail.comments" :commentLists="detail.comments" :articleId="detail._id"></user-comment>
                    </div>
                </div>
            </div>
            <content-right></content-right>
        </div>
    </div>
</template>

<script>
    import MarkdownItVue from 'markdown-it-vue'
    import {getTime} from "../../../static/js/getTime";
    import HomeHeader from 'header/HomeHeader'
    import ContentRight from 'content/basic/ContentRight'
    import UserComment from 'article/detail/base/UserComment'
    import {getCookie} from "../../../static/js/getCookie";
    export default {
        name: "ArticleDetail",
        data() {
            return {
                options:{
                    markdownIt: {
                        linkify: true,
                        html: true
                    },
                    linkAttributes: {
                        attrs: {
                            target: '_self',
                            rel: 'noopener'
                        }
                    },
                    katex: {
                        throwOnError: false,
                        errorColor: '#cc0000'
                    },
                    icons: 'font-awesome',
                    githubToc: {
                        tocFirstLevel: 2,
                        tocLastLevel: 3,
                        tocClassName: 'toc',
                        anchorLinkSymbol: '',
                        anchorLinkSpace: false,
                        anchorClassName: 'anchor',
                        anchorLinkSymbolClassName: 'octicon octicon-link'
                    }
                },
                detail:{
                    isLogin:false,
                },
                support: 0,
                comment: 0
            }
        },
        components:{
            HomeHeader,
            ContentRight,
            UserComment,
            MarkdownItVue
        },
        methods: {
        },
        watch: {
        },
        async created(){
            const _id = this.$route.params.id;
            const {data} = await this.$axios.post('/api/index/articleDetail',{_id})
            data.releaseTime = new Date(data.releaseTime).toLocaleDateString().replace(/\//g, '-');
            data.comments = data.comments.map(item => {
                item.releaseTime = new Date(item.releaseTime).toLocaleDateString().replace(/\//g, '-');
                return item;
            }).reverse();
            this.comment = data.comments.length;
            this.support = data.supportNumber;
            this.detail = data;
        }
    }
</script>

<style scoped lang="less">
    .article-type /deep/ .router-link-exact-active{
        color: #00c1de;
    }
    .article-detail{
        background-color: rgb(233,234,237);
    }
    .article-content{
        position: relative;
        width: 1300px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        padding-top: 110px;
        .article{
            width: 900px;
            border-bottom: 2px solid #e9eaed;
            background-color: rgb(255,255,255);
            padding: 20px;
            background-color: #fff;
            user-select: text;
            h2{
                padding: 20px 0;
                text-align: center;
            }
            .article-info{
                padding: 20px 0;
                font-size: 14px;
                text-align: center;
            }
            .content{
                font-size: 16px;
                word-wrap:break-word
            }
        }
        .article-operate{
            position: absolute;
            left: -80px;
            top: 220px;
            width: 50px;
            height: 200px;
            background-color: #bbb;
            i{
                cursor: pointer;
            }
        }
    }
    article /deep/ pre{
        font-size: 14px !important;
        line-height: 1.6 !important;
        word-break: break-all;
        word-wrap: break-word;
        padding: 20px !important;
        border-radius: 4px !important;
        overflow-y: hidden !important;
        overflow-x: auto !important;
        margin: 20px 0 !important;
        background-color: #f7f7f7 !important;
    }
    article /deep/ pre code .hljs-string{
        color: #d14;
    }
    article /deep/ pre code .hljs-built_in{
        color: #0086b3;
    }
    article /deep/ pre code .hljs-function{
        color: #900;
        font-weight: 700;
    }
    article /deep/ pre code .hljs-tag{
        color: #d14;
    }
    article /deep/ pre code .hljs-comment{
        color: #736f5c;
    }
    article /deep/ pre code .hljs-keyword{
        color: #0086b3;
    }
    article /deep/ p{
        font-size: 14px !important;
        color: #555;
        line-height: 22px;
        margin: 8px 0;
    }
    article /deep/ code{
        font-size: 13px;
        line-height: 22px !important;
        color: #444;
    }
    .article-comments{
        padding: 20px;
        min-height: 400px;
        /*background-color: #e6e6e6;*/
        margin-top: 20px;
        border: 1px solid #efefef;
        .no-login{
            background-color: #ddd;
            user-select: none;
        }
        .comment-box{
            .publishing{
                background-color: #F7F7F7;
                overflow: hidden;
            }
            .published{
                width: 90%;
                margin: 0 auto;
            }
        }
    }
    h2{
        font-size: 20px;
        line-height: 50px;
    }
    h3{
        font-size: 20px;
        line-height: 40px;
    }
</style>
