<template>
  <footer>
    <div class="left">
      <span>优德医药网瑞达路</span>
    </div>
    <div class="right"  @click="_goToAndroid('toUdesk')">
      <span>咨询药师</span>
      <img src="./doctor.png"/>
    </div>
  </footer>
</template>

<script type="text/ecmascript-6">
  import {goToAndroid} from '@/api/go-android';
  export default {
    methods:{
      _goToAndroid(type){
        goToAndroid(type)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~@/common/scss/variable.scss";

  footer {
    height: 1.2rem;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    padding: 0 0.4rem;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    font-size: $font-size-m;
  .left {

  }
  .right {
    display: flex;
    align-items: center;
  img {
    width: 0.42rem;
    height: auto;
    margin-left: 0.08rem;
  }
  }
  }
</style>
