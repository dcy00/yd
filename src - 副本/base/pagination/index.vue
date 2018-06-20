<template>
  <div class="pagination">
    当前为第{{currentPage}}页，共{{allPage}}页
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
      props:{
          currentPage:{
              type: Number
          },
          allPage:{
          type: Number
          }
      }
  }
</script>

<style scoped lang="scss">
  @import "~@/common/scss/variable.scss";
  .pagination{
    font-size: $font-size-m;
    color: #fff;
    text-align: right;
    padding-right: 0.76rem;
    margin-top: 0.22rem
  }
</style>
