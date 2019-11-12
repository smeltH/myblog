<template>
    <div class="home-page">
        <home-header></home-header>
        <div class="page-content">
            <div class="page-left">
                <div class="top-content">
                    <el-carousel indicator-position="outside" trigger="click" >
                        <el-carousel-item v-for="item in 4" :key="item">
                            <h3>{{ item }}</h3>
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <div class="gray-content"></div>
                <div class="bottom-content">
                    <div class="other-title">
                        <h2>最新文章</h2>
                    </div>
                    <div class="article-lists" v-for="article in getArticleList">
                        <articles :article="article">
                        </articles>
                    </div>
                    <!--文章分页跳转部分-->
                    <div class="block">
                        <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-size="count2"
                            layout="total, prev, pager, next, jumper"
                            :total="totalCounts">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <content-right></content-right>
        </div>
    </div>
</template>

<script>
    import HomeHeader from '@/components/HomeHeader'
    import ContentRight from '@/components/ContentRight'
    import Article from '@/public/Article'
    import {getCookie} from "@/static/js/getCookie";
    import Articles from '@/public/Article'
    import TopAndButtom from '@/public/TopAndButtom'
    import FiveArticles from '@/public/FiveArticles'
    import {getTime} from "@/static/js/getTime";
    import {getCategory,getFirstCategoryArcticle} from "@/api/home";
    export default {
        name: "HomePage",
        data() {
            return {
                isAdmin:false,
                isLogin:false,
                username:'无名氏',
                activeName: 0,//当前tab栏的下标
                articleData:[],//每个tab栏里面的内容
                count1:4,//最新文章显示上面的tab分类文章条数限制
                count2:5,//最新文章显示条数
                currentPage:0,//当前页的位置
                totalCounts:0,//文章的总数
                maxPages:0,//最后一页
            }
        },
        components:{
            HomeHeader,
            Article,
            ContentRight,
            TopAndButtom,
            FiveArticles,
            Articles
        },
        computed:{
            getCategory(){
                return this.$store.state.category
            },
            /*
            * 获取文章列表
            *   在HomePage初始化时就请求了文章数据，将文章数据保存到store中
            * */
            getArticleList(){
                return this.$store.state.articleList
            }
        },
        async created(){
            const articletype = this.$route.query.articletype
            if( articletype ){
                const {data:{data}} = await this.$axios.post(`/api/index/getCategoryArticles?articletype=${articletype}`,{count:this.count1})
                    this.maxPages = data.maxPages;
                    this.totalCounts = data.totalCounts;
            }else {
                this.$store.dispatch('getArticleLists',{page:0,count:this.count2})
            }

            /*
            * 获取分类文章
            * data：文章内容 array
            * maxPages：文章最后一页 number
            * totalCounts 文章总共数 number
            * */
            const {data:{data,maxPages,totalCounts}} = await getCategory(articletype,this.count2);
            // 上面的分类面板赋值
            this.articleData = data;
            this.maxPages = maxPages;
            this.totalCounts = totalCounts;

            let userInfo = getCookie('userinfo');
            if(userInfo){
                userInfo = JSON.parse(userInfo)
                this.isLogin = true;
                this.username = userInfo.username;
                this.isAdmin = userInfo.isAdmin;
                return;
            }
        },
        methods:{
            /*
            * 最新文章处的分页点击事件触发
            * val是点击了第几页 从1开始
            * */
            async handleCurrentChange(val) {
                this.$store.dispatch('getArticleLists',{count:this.count2,page:val-1});
                // const query = this.$route.query.articletype
                // const {data:{data,maxPages,totalCounts}} = await this.$axios.post(`/api/index/getCategoryArticles?articletype=${query}`,{count:this.count2,page:val-1})
                // this.getArticlelist = data
            },
            /*
            * 上面的分类栏里面的点击事件
            * */
            async handleClick(tab) {
                this.getFilterCategory
                const {data:{data}} = await this.$axios.post(`/api/index/getCategoryArticles?articletype=${tab.label}`,{count:this.count1})
                this.articleData = data
            }
        },
        /*
        * 给分类tab出获取数据并进行渲染
        * */
        async mounted(){
            const {data:{data}} = await getFirstCategoryArcticle(this.$store.state.category,{count:this.count2,page:0})
            this.articleData = data;
        },
        watch:{
            /*
            * 监听query参数的变化,即点击头部的分类标签数据发生变化
            * */
            '$route.query'(){
                const articletype = this.$route.query.articletype
                if( articletype ){
                    this.$axios.post(`/api/index/getCategoryArticles?articletype=${articletype}`,{count:this.count1}).then((result)=>{
                        this.$store.commit('saveArticleList',result.data.data)
                        this.maxPages = result.data.maxPages;
                        this.totalCounts = result.data.totalCounts;
                    })
                }else {
                    this.$store.dispatch('getArticleLists',{page:0,count:this.count2})
                }
            }
        },
        filters:{
            getFilterCategory(){
                console.log(this.$store.state.articleList);
                return this.$store.state.articleList
            }
        }
    }
</script>

<style lang="less" scoped>
    .page-content{
        width: 1370px;
        display: flex;
        margin: 0 auto;
        justify-content: space-between;
        background-color: rgb(233,234,237);
        padding-top: 110px;
        overflow: hidden;
        .page-left{
                width: 1000px;
                background-color: #fff;
                border-radius: 4px;
                box-sizing: border-box;
                .top-content{
                    background-color: #fff;
                    .content{
                        width: 100%;
                        height: 260px;
                        display: flex;
                        justify-content: space-between;
                        .left-content{
                            height: 260px;
                        }
                    }
                }
                .gray-content{
                    width: 100%;
                    height: 40px;
                    background-color: rgb(233,234,237);
                }
                .bottom-content{
                    margin-top: 20px;
                    border-bottom: 2px solid #e9eaed;
                    background-color: rgb(255,255,255);
                    padding: 20px;
                    background-color: #fff;
                    .other-title{
                        padding-bottom: 8px;
                        h2{
                            position: relative;
                            margin: 20px 0 8px 0;
                            font-size: 22px;
                            padding-left: 10px;
                        }
                        h2::before{
                            position: absolute;
                            left: 0;
                            top: 0;
                            content: '';
                            width: 4px;
                            height: 100%;
                            background-color: #5784c7;
                        }
                    }
                }
            }
        .page-right{
            width: 310px;
            // 文章推荐
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
            // 右边个人信息部分
            .self-introduction{
                width: 310px;
                background-color: rgb(255,255,255);
                .self-content{
                    .self-bg{
                        position: relative;
                        width: 100%;
                        height: 160px;
                        background-repeat: round;
                        background-image: url('../../assets/images/avatarBg.jpg');
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
        // 底部页面分页部分
        .block{
            width: auto;
            margin: 50px 150px 10px 10px;
            text-align: center;
        }
        .block /deep/ .el-pagination{
            display: inline-block;
            margin: 0 auto;
        }
    }
</style>
