<template>
  <div class="header">
    <div class="left">
      <img src="./logo.png"/>
      <h1>优德医药网</h1>
    </div>
    <search :shadow="false" v-if="!simple" @jump="jump('/search')" :keywords="keywords"></search>
    <div class="right">
      <div class="item" v-if="!simple" @click="_goToCart">
        <div class="top">
          <span class="icon iconfont icon-gouwuche"></span>
          <i>{{cartNumber}}</i>
        </div>
        <span class="text">我的购物车</span>
      </div>
      <div class="item" @click="goBack">
        <div class="top">
          <span class="icon iconfont icon-fanhui"></span>
        </div>
        <span class="text">返回</span>
      </div>
      <div class="item" v-if="isIndex" @click="jump('/')">
        <div class="top">
          <span class="icon iconfont icon-shouye"></span>
        </div>
        <span class="text">主页</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Search from '@/base/search';
  import {goToAndroid} from '@/api/go-android';
  import {mapGetters} from 'vuex'
  export default {
    props: {
      simple: {
        type: Boolean,
        default: false
      },
      isIndex: {
        type: Boolean,
        default: true
      },
      keywords: {
        type: String,
        default: ''
      },
      replace: {
        type: Boolean,
        default: false
      },
      isWorld: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      ...mapGetters(
        ['cartNumber']
      )
    },
    components: {Search},
    methods: {
      goBack(){
        this.$router.back();
      },
      jump(item){
        if (this.replace) {
          this.$router.replace(item);
        } else {
          this.$router.push(item);
        }
      },
      _goToAndroid(type){
        goToAndroid(type)
      },
      _goToCart(){
          if(this.isWorld){
            this._goToAndroid('toWorldShoppingCart');
          }else {
            this._goToAndroid('toShoppingCart');
          }

      }

    }
  }
</script>

<style scoped lang="scss">
  @import "~@/common/scss/variable.scss";

  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 0.9rem;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    padding-left: 0.48rem;
    align-items: center;
    justify-content: space-between;
    background-color: $color-header;
    z-index: 100;
    .left {
      font-size: 0px;
      display: flex;
      flex-direction: row;
      align-items: center;
      img {
        margin-right: 0.1rem;
        vertical-align: text-bottom;
        width: 1.31rem;
        height: 0.63rem;
      }
      h1 {
        font-size: $font-size-m;
        color: #fff;
      }
    }
    .right {
      display: flex;
      color: #fff;
      align-items: center;
      padding-top: 0.06rem;
      .item {
        margin-right: 0.83rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 0.67rem;
        box-sizing: border-box;
        color: #f2f2f2;
        font-size: $font-size-s;
        .top {
          display: flex;
          position: relative;
          .icon {
            text-align: center;
            font-size: 0.44rem;
            color: #fff;
          }
          i {
            position: absolute;
            left: 0.48rem;
            top: -0.09rem;
            background-color: #ed2727;
            box-sizing: border-box;
            padding: 0.02rem 0.04rem;
            font-style: normal;
            font-size: $font-size-m;
            border-radius: 0.15rem;
            line-height: 0.3rem;
            height: 0.3rem;
            display: block;
            min-width: 0.3rem;
            text-align: center;
          }
        }
        .text {
          color: #f2f2f2;
        }
      }
    }
  }
</style>
