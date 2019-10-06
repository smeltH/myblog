<template>
    <div class="create-article">
        <div class="crumbs-nav">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>内容管理</el-breadcrumb-item>
                <el-breadcrumb-item>写文章</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="line"></div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="文章标题" class="title">
                        <el-input v-model="form.title"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="文章作者" class="author">
                        <el-input v-model="form.author"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="文章分类">
                        <el-select v-model="form.categorys" placeholder="请选择文章分类">
                            <el-option v-for="(category,index) in categoryArr" :label="category.categoryName" :value="category._id" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否置顶" prop="isTop">
                        <el-col :span="12">
                            <el-switch v-model="form.isTop"></el-switch>
                            <span class="tip" v-if="form.isTop">开启置顶</span>
                            <span class="tip" v-if="!form.isTop">取消置顶</span>
                            <span class="isRecommend">是否推荐</span>
                        </el-col>
                        <el-col :span="12">
                            <el-switch v-model="form.isRecommend"></el-switch>
                            <span class="tip" v-if="form.isRecommend">推荐</span>
                            <span class="tip" v-if="!form.isRecommend">不推荐</span>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="grid-content bg-purple">
                <el-form-item label="文章简介" class="description">
                    <el-input type="textarea" v-model="form.description"></el-input>
                </el-form-item>
            </div>
            <el-form-item label="文章内容" class="content">
                <mark-down :initialValue="form.content"></mark-down>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">发布文章</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import MarkDown from 'vue-meditor'
    export default {
        name: "CreateArticle",
        data() {
            return {
                form: {
                    title: '',//文章标题
                    author: '',//文章作者
                    categorys:[],//文章分类
                    description: '',//文章简介
                    content: '',//文章内容
                    isTop:false,//文章是否置顶
                    isRecommend:false//文章是否推荐
                }
            }
        },
        components:{
            MarkDown
        },
        computed:{
            categoryArr(){
                return this.$store.state.category
            }
        },
        methods: {
            async onSubmit() {
                const {data} = await this.$axios.post('/api/admin/createArticle',this.form)
                if(data.statements === 1){
                    this.$message.error(data.msg)
                    return
                }
                this.$message({
                    message:data.msg,
                    type:'success'
                })
                this.$router.go(0)
            }
        }
    }
</script>

<style scoped lang="less">
    .crumbs-nav{
        padding: 30px 0;
        .el-breadcrumb__item{
            font-size: 16px;
        }
    }
    .el-form{
        padding: 20px 20px 0 0;
        .isRecommend{
            color: #606266;
            font-size: 14px;
            margin: 0 8px 0 10px;
        }
    }
    .description /deep/ .el-textarea__inner{
        height: 70px;
    }
    .content /deep/ .el-textarea__inner{
        height: 270px;
    }
    .title /deep/ .el-input{
        width: 200px;
    }
    .author /deep/ .el-input{
        width: 200px;
    }
    .tip{
        display: inline-block;
        margin-left: 8px;
    }
</style>
