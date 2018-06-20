<template>
  <div class="search-wrapper" :class="{'shadow-wrapper':shadow,'no-shadow-wrapper':!shadow}">
    <div class="input-wrapper">
      <input placeholder="请输入商品关键字" @focus="doFocus" v-model="words" ref="input"/>
    </div>
    <div class="button-wrapper" @click="clickSubmit">
      <a class="search-btn">
        <span class="icon iconfont icon-sousuo1"></span>
        <span>搜索</span>
      </a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      shadow: {
          type:Boolean,
          default: true
      },
      jump: {
        type: Boolean,
        default:true
      },
      keywords: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
          words: this.keywords
      }
    },
    activated(){
      //this.words = this.keywords;
      if(!this.jump) {
          this.$refs.input.focus();
          this.words = ''
      }
    },
    methods: {
      doFocus() {
          if(this.jump){
              this.$emit('jump');
          }
      },
      clickSubmit(){
          if(!this.jump && this.words.trim() !== ''){
//          this.$emit('onsearch',this.words.trim());
            this.$store.commit('AddSearchHistory',this.words.trim());
            this.$store.commit('AddSearchHistoryToLS')
        }
      }
    },
    watch:{
        keywords(newVal) {
          this.words = newVal;
        }
    }
  }
</script>

<style scoped lang="scss">
  @import "~@/common/scss/variable.scss";
  @import "~@/common/scss/mixin.scss";

  .search-wrapper {
    display: flex;
    flex-direction: row;
    width: 9.14rem;
    height: 0.7rem;
    align-items: center;
    justify-content: center;
    .input-wrapper {
      input {
        text-indent: 12px;
        width: 7rem;
        height: 0.6rem;
        padding: 0.1rem 0;
        line-height: 0.4rem;
        box-sizing: border-box;
        border: 0.02rem solid #fff;
        border-radius: 0.04rem;
        font-size: $font-size-m;
        color:#fff;
        display: block;
      }
    }
    .button-wrapper {
      .search-btn {
        display: block;
        @include button-default(1.8rem);
        font-size: $font-size-l;
        @include button-active;
        .icon {
          font-size: 0.4rem;
        }
      }
    }
    &.no-shadow-wrapper {
      .input-wrapper {
        margin-right: 0.18rem;
        input{
          background: transparent;
        }
      }
    }
    &.shadow-wrapper {
      .input-wrapper {
        margin-right: 0.18rem;
        padding: 0.05rem;
        height: 0.6rem;
        background:rgba(255, 255, 255, 0.5);
        border-radius: 0.04rem;
        input{
          background: #fff;
          color:#333;
        }
      }
      .button-wrapper{
        padding: 0.05rem;
        background: rgba(249,153,101,0.5);
        border-radius: 0.04rem;
      }
    }
  }
</style>
