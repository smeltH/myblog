<template>
    <div class="editor">
        <mark-down :initialValue="originContent" @sendContent="submitContent"></mark-down>
    </div>
</template>

<script>
    import MarkDown from 'vue-meditor'
    export default {
        name: "Editor",
        data() {
            return {
            }
        },
        props:[
            'resultContent',
            'originContent'
        ],
        methods: {
            submitContent(){
                this.$emit('sendContent', this.originContent);
            }
        },
        components: {
            MarkDown
        }
    }
</script>

<style scoped lang="less">
    .editor{
        border: 1px solid #C0C4CC;
    }
</style>
