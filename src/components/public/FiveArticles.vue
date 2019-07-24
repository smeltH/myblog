<template>
    <div class="five-articles">
      <el-collapse  accordion v-model="activeName" @change="handleChange">
        <slot name="article"></slot>
      </el-collapse>
    </div>
</template>

<script>
  export default {
    name: "FiveArticles",
    data() {
      return {
        activeName: '1',
        agoinfo:[]
      }
    },
    methods:{
      handleChange(val){
        console.log(val);
        if( !val ){
          this.activeName = this.$children[0].value === '4' ? '1':(this.$children[0].value*1 + 1+'');
        }
      }
    },
  }
</script>

<style scoped lang="less">
  .el-collapse{
    width: 560px;
     /deep/ .el-collapse-item__content{
       height: 46px;
       p{
         height: 46px;
         overflow: hidden;
         text-overflow: ellipsis;
         display: -webkit-box;
         -webkit-line-clamp: 2;
         -webkit-box-orient: vertical;
       }
    }
  }
</style>
