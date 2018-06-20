<template>
  <div>
    <div class="header">
      <div class="left">
        <img src="./logo.png"/>
      </div>

      <div class="right">
        <div class="item" @click="goBack">
          <div class="top">
            <span class="icon iconfont icon-fanhui"></span>
          </div>
          <span class="text">返回</span>
        </div>
      </div>
    </div>
    <div class="content content-world">
      <ul class="title-container clearfix">
        <li v-for="(item,index) in country" :class="{'active': index === activeIndex}" @click="changeItem(index,item)">
          {{item}}馆
        </li>
      </ul>
      <swiper :options="swiperOption" ref="mySwiper" class="swiper world-swiper" v-if="activeList.length>0">
        <swiper-slide v-for="(item,index) in activeList" class="world-swiping" :key="index">
          <div @click="goToDetail(item.id)">
            <div class="content-msg">
              <div class="msg">
                <div class="name">{{item.title}}</div>
                <div class="c clearfix">
                  <span class="price">{{item.minPrice / 100}}</span>
                  <span class="btn">抢购</span>
                </div>
              </div>
            </div>
            <div class="img-wrapper">
              <img v-lazy="item.thumbnail"/>
            </div>

          </div>
        </swiper-slide>
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
      <template v-if="activeList.length>0">
        <div class="swiper-button-prev" slot="button-prev" @click="next(-1)"></div>
        <div class="swiper-button-next" slot="button-next"  @click="next(1)"></div>
      </template>

    </div>
   <div class="promise">
     <img src="./zheng.png"/>
     <img src="./jian.png"/>
     <img src="./kuai.png"/>
   </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {swiper, swiperSlide} from 'vue-awesome-swiper';
  import 'swiper/dist/css/swiper.css';
  import {getSearch} from '@/api/search';
  export default {
    data(){
      return {
        country: ["加拿大", "秘录", "德国", "英国", "荷兰", "美国", "澳大利亚", "日本", "韩国"],
        activeIndex: 0,
        activeList: [],
        swiperOption: {//图片滑动配置
          refName: "mySwiper",
          slidesPerView: 4,
          spaceBetween: 30,
          pagination: {
            el: '.swiper-pagination'
          },
        }
      }
    },
    created(){
      this._getSearch(this.country[0]);
    },
    computed:{
      swiper(){
        return this.$refs.mySwiper.swiper;
      }
    },
    components: {swiper, swiperSlide},
    methods: {
      _getSearch(value){
        getSearch(value, 1, '', 20).then((res) => {
          if (res.status === 'success') {
            this.activeList = res.data;
          }
        })
      },
      next(type){
        if (type === 1) {
          this.swiper.slideNext();
        } else {
          this.swiper.slidePrev();
        }
      },
      changeItem(index, value){
        this.activeIndex = index;
        this._getSearch(value);
      },
      goBack(){
        this.$router.back();
      },
      goToDetail(goodsId){
        this.$router.push({path: `/goodsDetail/${goodsId}`})
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
        width: 1.55rem;
        height: 0.44rem;
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

  .content {
    width: 18rem;
    margin: 1.2rem auto 0;
    position: relative;
    .title-container {
      height: 1rem;
      width: 18rem;
      border-radius: 0.02rem;
      background-image: linear-gradient(#7615c8 20%, #6e14ce 80%);
      li {
        float: left;
        height: 1rem;
        width: 2rem;
        font-size: 0.24rem;
        font-family: MicrosoftYaHei;
        color: rgba(255, 255, 255, 1);
        line-height: 1rem;
        text-align: center;
        &.active {
          background-color: #fff;
          color: #000;
          position: relative;
          border-radius: 0.1rem 0.1rem 0rem 0rem;
          &:after {
            content: "";
            position: absolute;
            bottom: 0;
            right: -0.2rem;
            width: 0.21rem;
            height: 1rem;
            background: url("activeIcon.png") no-repeat bottom left;
            background-size: 100% 100%;
          }
        }
      }
    }
  }

  .swiper {
    width: 12.9rem;
    margin-top: 0.74rem;
    height: 6.1rem;
  }
  .world-swiping {
    width: 3rem;
    height: 5.2rem;
    background: rgba(255, 255, 255, 1);
    .content-msg {
      width: 3rem;
      height: 1.8rem;
      background: #000;
      overflow: hidden;
      box-sizing: border-box;
      border: 0.01rem solid #fff;
      .msg {
        width: 2.6rem;
        height: 1.6rem;
        border: 0.02rem solid #fff;
        border-bottom: none;
        margin: 0.2rem auto;
        .name {
          margin-top: 0.14rem;
          font-size: 0.24rem;
          font-family: SourceHanSansCN-Normal;
          color: rgba(255, 255, 255, 1);
          text-align: center;
          line-height: 0.3rem;
          height: 0.6rem;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .c {
          width: 2rem;
          height: 0.48rem;
          line-height: 0.48rem;
          font-size: 0;
          margin: 0.26rem auto;
          span {
            display: inline-block;
            width: 1rem;
            height: 0.48rem;
            box-sizing: border-box;
            vertical-align: top;
            text-align: center;
            &.price {
              border: 0.02rem #F12C2C solid;
              font-size: 0.28rem;
              font-family: SourceHanSansCN-Normal;
              color: rgba(241, 44, 44, 1);
              background-color: #000;
            }
            &.btn {
              font-size: 0.28rem;
              font-family: SourceHanSansCN-Normal;
              color: rgba(255, 255, 255, 1);
              background-color: #f12c2c;
            }
          }
        }
      }
    }
    .img-wrapper{
      width: 2.98rem;
      height: 3.4rem;
      background-color: #fff;
      margin-left: 0.01rem;
      display: table-cell;
      vertical-align: middle;
      text-align: center;
      img{
        width: 2.4rem;
        height: auto;
      }
    }
  }
  .promise{
    margin: 0.7rem auto 0;
    height: 0.7rem;
    width: 12.9rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>
