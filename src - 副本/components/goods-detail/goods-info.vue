<template>
  <div class="goods-info-wrapper" v-if="goodsInfo">
    <div class="left-wrapper">
      <img v-if="reachStart" class="prev btn" src="./prev.png"/>
      <img v-else="" class="prev-not-start btn" src="./next.png" @click="next(-1)"/>
      <swiper :options="swiperOption" ref="mySwiper" class="swiper">

        <swiper-slide v-for="(item,index) in goodsInfo.pictures" class="stop-swiping" style="height: 1.6rem"
                      :key="index">
          <img :src="item.filepath"/>
        </swiper-slide>
      </swiper>

      <img v-if="!reachEnd && goodsInfo.pictures.length>4" class="next btn" src="./next.png" @click="next(1)"/>
      <img v-else="" class="next-end btn " src="./prev.png"/>
    </div>

    <div class="right-wrapper">
      <div class="left">
        <img :src="currentImg"/>
      </div>
      <div class="right">
        <div class="goods-msg">
          <p class="name">{{goodsInfo.title}}</p>
          <div class="goods-item goods-name">{{goodsInfo.recommendSpeech}}</div>
          <!-- <div class="goods-item">品牌：佐力</div>-->
          <div class="goods-item price">
            <span class="item-title">价格：</span>
            <span class="shop-price">¥{{goodsInfo.minPrice | myPrice}}</span>
            <span class="market-price">¥{{goodsInfo.maxTagPrice | myPrice}}</span>
          </div>
          <div class="goods-item price"  v-if="goodsInfo.goodsGenre === 2">
            <span class="item-title">税费：</span>
            <span>¥{{goodsInfo.taxationPrice | myPrice}}</span>
          </div>
          <div class="goods-item sales-wrapper">
            <span class="item-title">促销：</span>
            <ul class="sales-wrapper-ul clearfix">
              <li v-for="item in promotionData">
                <span class="title">{{item.promType}}</span>
                <span class="desc">{{item.proDes}}</span>
              </li>
            </ul>
          </div>
          <div class="goods-item select-spec">
            <div class="spec-item-wrapper" v-for="(item,index) in goodsInfo.spectypes" v-if="item.specList">
              <span class="item-title title">{{item.name}}：</span>
              <div class="item">
              <span v-for="it in item.specList" :class="{'active':it.id == specifications[index]}"
                    @click="changeSpec(it.id,index,it.id == specifications[index])">{{it.specValue}}</span>
              </div>
            </div>
          </div>
          <div class="goods-item second-wrapper"  v-if="goodsInfo.goodsType === 2 || goodsInfo.goodsType === 3">
            <span class="item-title" style="width: auto;text-align: left;margin-left: -0.6rem;">距离活动结束仅剩：</span>
            <count-down
                        :startTime="goodsInfo.systemTime"
                        :endTime="goodsInfo.endTime"
                        :isTime="false"
                        :isBlack="false"></count-down>
          </div>
          <div class="goods-item number-wrapper">
            <span class="title item-title">数量：</span>
            <div class="cart-control-wrapper">
              <cart-control v-bind:max="stock" v-on:changenumber="changeNumber"></cart-control>
            </div>
            <span class="stock">剩余库存：{{stock}}</span>
            <span class="stock" v-if="goodsInfo.goodsType===1">已售：{{goodsInfo.salesVolume}}</span>
          </div>
          <div class="button-wrapper " v-if="goodsInfo.state === 2">
            <a class="cart-button">商品已下架</a>
          </div>
          <div class="button-wrapper" v-else-if="stock==0">
            <a class="cart-button">库存不足</a>
          </div>
          <div class="button-wrapper" v-else>
            <a class="cart-button cart-button-join" @click="addCart('1')"><span class="icon iconfont icon-cart"></span>加入购物车</a>
            <a class="cart-button cart-button-buy" @click="addCart('2')">立即购买</a>
          </div>
          <template v-if="goodsInfo.goodsGenre === 1">
            <ul class="sell-info clearfix">
              <li>
                <span class="icon iconfont icon-check"></span>
                <span class="sell-info-text">正品保障</span>
              </li>
              <li>
                <span class="icon iconfont icon-check"></span>
                <span class="sell-info-text">99元包邮</span>
              </li>
              <li>
                <span class="icon iconfont icon-check"></span>
                <span class="sell-info-text">药监认证</span>
              </li>
            </ul>
          </template>
          <template v-if="goodsInfo.goodsGenre === 2">
            <!--  <div class="goods-item" v-if="goodsInfo.area">产地：{{goodsInfo.area}}</div>-->
            <ul class="sell-info clearfix">
              <li>
                <span class="icon iconfont icon-check"></span>
                <span class="sell-info-text">正品保障</span>
              </li>
              <li>
                <span class="icon iconfont icon-check"></span>
                <span class="sell-info-text">99元包邮</span>
              </li>
              <li>
                <span class="icon iconfont icon-check"></span>
                <span class="sell-info-text">保税仓发货</span>
              </li>
            </ul>
          </template>
          <p class="sell-rule">药品一经出库无质量问题不接受退换，敬请悉知！</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  import CartControl from '@/base/cart-control/cart-control';
  import CountDown from '@/base/count-down/count-down';
  import {swiper, swiperSlide} from 'vue-awesome-swiper';
  import 'swiper/dist/css/swiper.css';
  import {joinCart} from '@/api/go-android';
  import {
    setConcern,
    cancelConcern,
    getPromotion,
    getGoodsInfo
  } from '@/api/goods-detail';
  export default {
    data(){
      return {
        joinNumber: 1,//加入购物车数量
        reachEnd: false,
        reachStart: true,//上箭头状态
        activeIndex: 0,
        promotionData: [],//促销数据
        specifications: [],//选中规格数组
        specId: "",//规格id
        businessId:"",//秒杀场次Id
        swiperOption: {//图片滑动配置
          refName: "mySwiper",
          pagination: false,
          slidesPerView: 4,
          direction: 'vertical',
          spaceBetween: 10,
          on: {
            touchEnd: () => {
              this.activeIndex = this.swiper.clickedIndex ? this.swiper.clickedIndex : 0;
            },
            slideChange: (swiper) => {
              this.activeIndex = this.swiper.activeIndex;
              if (this.swiper.isEnd === true) {
                this.reachEnd = true
              } else {
                this.reachEnd = false;
              }
              if (this.swiper.isBeginning === true) {
                this.reachStart = true
              } else {
                this.reachStart = false;
              }
            }
          }
        }
      }
    },
    props: {
      data: {
        type: Object
      }
    },
    components: {swiper, swiperSlide, CartControl,CountDown},
    computed: {
      goodsInfo(){
        return this.data;
      },
      currentImg(){
        return this.data.pictures[this.activeIndex].filepath;
      },
      swiper(){
        return this.$refs.mySwiper.swiper;
      },
      stock(){
        if(this.data.stock > 0) {
          return this.data.stock;
        }else if(this.data.specValues.length>0){
          return this.data.specValues[0].stock;
        }
      },
    },
    methods: {
      getDataPromotion(){ //获取促销详情
        getPromotion(this.$parent.goodsId).then((res) => {
          if (res.status === 'success') {
            this.promotionData = res.data;
          }
        })
      },
      changeSpec(id, index, status){ //选择规格
        if (!status) {
          this.$set(this.specifications, index, id);
          this._getGoodsInfo();
        }
      },
      _getGoodsInfo(type){ //获取specId
        getGoodsInfo(this.$parent.goodsId, this.specifications, this.goodsInfo.goodsType).then((res) => {
          if (res.status === 'success') {
            this.goodsInfo.maxTagPrice = res.data.price;
            this.goodsInfo.minPrice = res.data.xsPrice;
            this.specId = res.data.id;
            this.businessId = res.data.businessId?res.data.businessId: "";
            if(type){
                this.addCart(type);
            }
          }
        })
      },
      addCart(type){//加入购物车
          if(this.specId === ""){
            this._getGoodsInfo(type)
          }else {
            joinCart(this.$parent.goodsId, this.joinNumber, this.goodsInfo.goodsType,this.goodsInfo.siteId, this.specId,this.businessId,type,this.goodsInfo.goodsGenre);
          }

      },
      changeNumber(number){//改变购物车数量
        this.joinNumber = number;
      },
      next(type){
        if (type === 1) {
          this.swiper.slideNext();
        } else {
          this.swiper.slidePrev();
        }
      }
    },
    watch: {
      goodsInfo: {
        handler(newVal, oldVal){
          if (oldVal && newVal.id === oldVal.id) {
            return
          }
          this.getDataPromotion();
          if(!this.goodsInfo.spectypes){
              return;
          }
          this.specifications = this.goodsInfo.spectypes.map((value) => {
              if(value.specList){
                return value.specList[0].id;
              }else {
                  return "";
              }
          });
        },
        deep: true
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~@/common/scss/variable.scss";
  @import "~@/common/scss/mixin.scss";

  .item-title {
    display: inline-block;
    width: 1rem;
    text-align: right;
  }

  .goods-info-wrapper {
    display: flex;
    display: -webkit-box;
    flex-direction: row;
    .left-wrapper {
      width: 1.8rem;
      height: 8.1rem;
      position: relative;
      text-align: center;
      .swiper {
        position: absolute;
        top: 0.1rem;
        margin: 0.54rem 0 0.44rem;
        width: 1.8rem;
        height: 6.96rem;
        overflow: hidden;
        text-align: center;
        font-size: 0;
        .swiper-slide {
          height: 1.6rem;
        }
        img {
          background-color: #fff;
          width: 100%;
          height: 100%;
        }
      }
      .btn {
        height: 0.38rem;
        width: 0.68rem;
        position: absolute;
        left: 50%;
        margin-left: -0.34rem;
        &.next, &.next-end {
          bottom: 0;
        }
        &.next-end {
          transform: rotate(180deg);
        }
        &.prev {
          top: 0;
        }
        &.prev-not-start {
          top: 0;
          transform: rotate(180deg);
        }
      }
    }
    .right-wrapper {
      flex: 1;
      -webkit-box-flex: 1;
      margin-left: 0.18rem;
      background-color: #fff;
      padding-bottom: 0.04rem;
      border-radius: 0.04rem;
      display: flex;
      display: -webkit-box;
      flex-direction: row;
      .left {
        width: 8.8rem;
        text-align: center;
        img {
          width: 7.54rem;
          height: 7.54rem;
          vertical-align: middle;
        }
      }
      .right {
        flex: 1;
        -webkit-box-flex: 1;
        .name {
          font-size: $font-size-l;
          max-height: 0.64rem;
          line-height: 0.32rem;
          color: #333;
          margin-top: 0.36rem;
        }
        .goods-item {
          font-size: $font-size-s;
          color: #656565;
          line-height: $font-size-m;
          margin-top: 0.16rem;
          &.goods-name {
            margin-top: 0.5rem;
          }
          &.second-wrapper{
            display: flex;
            flex-direction: row;
            align-items: center;
          }
        }
        .price {
          vertical-align: bottom;
          .shop-price {
            font-size: 0.36rem;
            color: $color-red;
            line-height: 0.36rem;
            display: inline-block;
            height: 0.36rem;
          }
          .market-price {
            text-decoration: line-through;
          }
        }
        .number-wrapper {
          display: flex;
          display: -webkit-box;
          flex-direction: row;
          font-size: 0;
          position: relative;
          align-items: flex-end;
          height: 0.5rem;
          .title {
            font-size: $font-size-s;
            line-height: 0.5rem;
          }
          .stock{
            position: relative;
            display: inline-block;
            bottom: 0;
            font-size:0.18rem;
            color:rgba(101,101,101,1);
            margin-left: 0.2rem;
          }
        }
        .button-wrapper {
          margin-top: 0.34rem;
          display: flex;
          flex-direction: row;
          .cart-button {
            display: block;
            @include button-default(1.8rem);
            background-image: none;
            border-radius: 0.02rem;
            background: rgba(237,79,79,1);;
            margin-right: 0.18rem;
            font-size: $font-size-m;
            &.cart-button-join {
              .icon {
                font-size: $font-size-l;
                display: inline-block;
                margin-right: 0.1rem;
              }
            }
            &.cart-button-buy{
              background: linear-gradient(top,#F36C22,#EA4C4C);
            }
          }
        }
        .sell-info {
          margin-left: 1rem;
          font-size: 0;
          li {
            float: left;
            margin-right: 0.24rem;
            color: #989898;
            font-size: $font-size-ss;
            line-height: 0.2rem;
            margin-top: 1rem;
            .icon {
              display: inline-block;
              color: #2B7FC8;
              font-size: 0.2rem;
              margin-right: 0.08rem;
            }
          }
        }
        .sell-rule {
          color: #989898;
          font-size: $font-size-ss;
          margin-top: 0.26rem;
          margin-left: 1rem;
        }
      }
    }
    .sales-wrapper, .spec-item-wrapper {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      &.spec-item-wrapper {
        margin-bottom: 0.2rem;
        line-height: 0.4rem;
      }
      .item {
        flex: 1;
        -webkit-box-flex: 1;
        span {
          margin-right: 0.3rem;
          display: inline-block;
          padding: 0 0.1rem;
          margin-bottom: 0.1rem;

          border: 1px solid #C3C3C3;
          &.active {
            border: 1px solid #ef7533;
            background: url("./checked.png") no-repeat bottom right;
          }
        }

      }
      .sales-wrapper-ul {
        flex: 1;
        -webkit-box-flex: 1;
        li {
          float: left;
          margin-right: 0.3rem;
          .title {
            height: 0.24rem;
            line-height: 0.24rem;
            background: rgba(238, 61, 32, 1);
            border-radius: 0.03rem;
            font-size: 0.14rem;
            color: rgba(255, 255, 255, 1);
            display: inline-block;
            padding: 0 0.1rem;
          }
          .desc {
            font-size: 0.18rem;
            color: rgba(101, 101, 101, 1);
          }
        }

      }
    }
  }

</style>
