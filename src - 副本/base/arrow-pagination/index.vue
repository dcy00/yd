<template>
  <div>
    <div class="prev" @click="prev">
      <span class="icon iconfont icon-prev" :class="{'grey':!hasPrev}"></span>
    </div>
    <div class="next" @click="next">
      <span class="icon iconfont icon-next" :class="{'grey':!hasNext}"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
      props:{
        hasPrev:{
            type:Boolean,
            default:  true
        },
        hasNext:{
          type:Boolean,
          default:  true
        }
      },
    methods: {
      prev() {
        this.$emit('prev');
      },
      next() {
        this.hasNext&&this.$emit('next');
      }
    }
  }
</script>

<style scoped lang="scss">
  .prev, .next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    .icon {
      font-size: 0.54rem;
      color: #fff;
      &.grey{
        color: #ccc;
      }
    }
    &.prev {
      left: 0rem;
    }
    &.next {
      right: 0rem;
    }
  }
</style>
