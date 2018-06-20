<template>
  <div class="star">
    <i class="icon iconfont icon-star" v-for="(item,index) in length" :key="index" :class="itemClass(index)"></i>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'star',
    props: {
      score: {
        type: Number,
        default: 5,
        validator: function (value) {
          if (value >= 0 && value <= 5) {
            return value
          } else {
            return 5
          }
        }
      }
    },
    data(){
      return {
        length: 5
      }
    },
    methods: {
      itemClass(index){
        if (this.score - index > 0) {
          return 'on';
        } else {
          return 'off';
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  .star {
    .icon {
      font-size: 28px;
      display: inline-block;
      color: #EED610;
      margin-right: 10px;
      &.on {
        color: #EED610;
      }
      &.off {
        color: #999;
      }
    }
  }
</style>
