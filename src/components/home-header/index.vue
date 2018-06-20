<template>
  <header>
    <div class="left">
      <img src="./logo.png"/>
      <h1>优德自助终端系统</h1>
    </div>
    <div class="right" @click="_goToAndroid('toShoppingCart')">
      <div class="cart">
        <span class="icon iconfont icon-gouwuche"></span>
        <i>{{cartNumber}}</i>
      </div>
      <span class="go-cart">我的购物车</span>
    </div>
  </header>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex';
  import {goToAndroid} from '@/api/go-android';
  export default {
    computed: {
        ...mapGetters(
            ['cartNumber']
        )
    },
    methods:{
      _goToAndroid(type){
        goToAndroid(type)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~@/common/scss/variable.scss";
  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 0.9rem;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    padding: 0 0.48rem;
    align-items: center;
    justify-content: space-between;
    z-index: 100;
  .left {
    font-size: 0px;
    display: flex;
    flex-direction: row;
    align-items: center;
  img{
    margin-right: 0.1rem;
    vertical-align: text-bottom;
    width: 1.31rem;
    height: 0.63rem;
  }
  h1{
    font-size: $font-size-m;
    color: #fff;
  }
  }
  .right{
    display: flex;
    font-size: $font-size-m;
    color: #fff;
    align-items: center;
  .cart{
    display: flex;
  .icon{
    font-size: 0.48rem;
    color: #fff;
  }
  i{
    margin-left: 0.08rem;
    margin-top: -0.06rem;
    background-color: $color-red;
    box-sizing: border-box;
    padding: 0 4px;
    font-style: normal;
    font-size: $font-size-m;
    border-radius: 0.3rem;
    line-height: 0.3rem;
    height:0.3rem;
    display: block;
    min-width: 0.3rem;
    text-align: center;
  }
  }
  .go-cart{
    display: inline-block;
    margin-left: 0.24rem;
  }
  }
  }
</style>
