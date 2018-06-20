<template>
  <div class="container">
    <home-header></home-header>
    <div class="content">
      <div class="left-wrapper">
        <div class="list">
          <router-link to="/search" class="item">
            <img src="./search.png"/>
          </router-link>
          <router-link to="/goods" class="item">
            <img src="./category.png"/>
          </router-link>
        </div>
        <div class="list">
          <div class="item" @click="_goToAndroid('toLogistics')">
            <img src="./logistic.png"/>
          </div>
          <div class="item"  @click="_goToAndroid('toPersonal')">
            <img src="./mine.png"/>
          </div>
        </div>
        <router-link to="/vip" class="item bottom">
          <img src="./vip.jpg"/>
        </router-link>
      </div>
      <div class="right-wrapper">
        <div class="list">
          <router-link to="/world"  class="item world">
            <img src="./world.png"/>
          </router-link>
          <router-link to="/indulgence" class="item second">
            <img src="./second.png"/>
          </router-link>
        </div>
        <div class="list bottom">
          <router-link to="/old" class="item old">
            <img src="./old.jpg"/>
          </router-link>
          <div class="right">
            <router-link to="/house" class="item">
              <img src="./house.png"/>
            </router-link>
            <div class="item inter"  @click="_goToAndroid('toIntegral')">
              <img src="./intergory.png"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer-hd></footer-hd>
  </div>
</template>

<script type="text/ecmascript-6">
  import homeHeader from './../home-header';
  import FooterHd from './../footer-hd';
  import {goToAndroid} from '@/api/go-android';
  export default {
    components: {homeHeader, FooterHd},
    methods:{
        _goToAndroid(type){
        goToAndroid(type)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~@/common/scss/variable.scss";

  .container {
    .content {
      display: flex;
      box-sizing: border-box;
      height: 8.29rem;
      width: 15.49rem;
      justify-content: space-between;
      margin: 1.4rem auto 0;
      .item{
        display: block;
        width: 3rem;
        height: 2.67rem;
        &.bottom,&.second{
          width: 6.12rem;
        }
        &.bottom{
          height: 2.7rem;
        }
        &.old{
          width: 6.12rem;
          height: 5.48rem;
        }
        &.inter{
        margin-top: 0.12rem;
      }
        img {
          width: 100%;
          height: 100%;
        }
      }
      .left-wrapper{
        width: 6.12rem;
        .list{
          width: 6.12rem;
          height: 2.67rem;
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.12rem;
        }
      }
      .right-wrapper{
        width: 9.26rem;
        .list{
          width:9.26rem;
          height: 2.67rem;
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.12rem;
          &.bottom{
            height: 5.48rem;
          }
        }
      }
    }
  }

</style>
