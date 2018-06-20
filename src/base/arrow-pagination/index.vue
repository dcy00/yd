<template>
  <div>
    <div class="prev" @click="prev">
      <span><</span>
    </div>
    <div class="next" @click="next">
      <span>></span>
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
    width:40px;
    height:40px;
    background-color: #fff;
    border-radius: 50%;
    top: 50%;
    display: flex;
    justify-content:center;
    align-items:center;
    color:rgb(77,61,177);
    font-size: 0.54rem;
    &.prev {
      left: 0.1rem;
    }
    &.next {
      right: 0.1rem;
    }
  }
</style>
