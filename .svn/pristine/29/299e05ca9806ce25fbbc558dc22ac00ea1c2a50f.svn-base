<template>
  <div class="cart-wrapper">
    <div class="decrease" @click="decrease" :class="{'no':number ===1}"></div>
    <input class="number"  v-model="number" v-on:keyup="clearNotNumber" type="number"/>
    <div class="add" @click="add" :class="{'no':number === max}"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {clearNotNumber} from '@/common/js/validate'
  export default {
    props: {
      max: {
        type: Number
      }
    },
    data() {
      return {
        number: 1
      }
    },
    methods: {
      clearNotNumber(){
        this.number = clearNotNumber(this.number);
        this.checkNum();

        this.$emit("changenumber", this.number);
      },
      checkNum(){
        if (this.number - this.max > 0) {
          this.number = this.max;
        }else if(this.number ==""){
          this.number = 1;
        }
      },
      decrease(){
        if (this.number > 1) {
          this.number = this.number - 1;
          this.$emit("changenumber", this.number)
        }
      },
      add(){
        if (this.number - this.max < 0) {
          this.number = this.number + 1;
          this.$emit("changenumber", this.number)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~@/common/scss/variable.scss";

  .cart-wrapper {
    height: 0.5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .decrease, .add {
      width: 0.24rem;
      height: 0.24rem;
      text-align: center;
      background-image: url("./ope.png");
      background-repeat: no-repeat;
      background-size: 0.24rem auto;
      &.decrease{
        background-position: 0 0;
        &.no{
          background-position: 0 -0.48rem;
        }
      }
      &.add{
        background-position: 0 -0.72rem;
        &.no{
          background-position: 0 -0.24rem;
        }
      }
    }
    .number {
      width: 0.6rem;
      height: 0.5rem;
      border: 0.01rem solid rgba(0, 0, 0, 1);
      margin: 0 0.08rem;
      box-sizing: border-box;
      text-align: center;
      font-size: $font-size-l;
    }
  }
</style>
