<template>
  <div class="split-wrapper" :class="{'gift': isGift}">
    <span>{{text}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      text: {
        type: String,
        default: "自营"
      },
      isGift: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~@/common/scss/variable.scss";
  .split-wrapper {
    height: 24px;
    line-height: 24px;
    border-radius: 3px;
    background-color: rgba(43, 127, 200, 1);
    padding: 0 7px;
    color: #fff;
    display: inline-block;
    font-size: $font-size-ss;
    margin-right: 4px;
    &.gift {
      color: #EE3D20;
      background-color: #fff;
      border: 1px solid #EE3D20;
      padding: 0 8px;
    }
  }
</style>
