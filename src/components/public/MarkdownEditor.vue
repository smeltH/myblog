<template>
    <div class="markdownEditor">
        <el-row>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple-light">
                    <vue-markdown>i am a ~~tast~~ **test**.</vue-markdown>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "MarkdownEditor",
        data() {
            return {}
        },
        components: {
        }
    }
</script>

<style scoped lang="less">

</style>
