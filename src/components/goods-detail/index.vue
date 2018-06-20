<template>
  <div class="container">
    <header-hd v-if="initdata" :is-world="initdata.goodsGenre === 2"></header-hd>
    <div class="wrapper">
      <ul class="tabbar clearfix">
        <li class="tabbar-item" :class="{active: currentTabbar === 0}" @click="onClickTabbar(0)">
          <span>基本资料</span>
        </li>
        <li class="tabbar-item" :class="{active: currentTabbar === 1}" @click="onClickTabbar(1)">
          <span>详情</span>
        </li>
        <li class="tabbar-item" :class="{active: currentTabbar === 2}" @click="onClickTabbar(2)">
          <span>说明书</span>
        </li>
        <!--<li class="tabbar-item" :class="{active: currentTabbar === 3}" @click="onClickTabbar(3)">
          <span>优惠套餐</span>
        </li>-->
        <li class="tabbar-item" :class="{active: currentTabbar === 4}" @click="onClickTabbar(4)">
          <span>评价</span>
        </li>
      </ul>
      <div class="tabbar-container">
        <goods-info v-show="currentTabbar == 0" :data="initdata"></goods-info>
        <div v-show="currentTabbar == 1" class="content-wrapper goods_desc" v-if="imgList" v-html="imgList">
        </div>
        <goods-instruction v-show="currentTabbar == 2" :instructions="instruct"></goods-instruction>
        <goods-judge v-show="currentTabbar == 4" v-if="initdata" :data="initdata.spComments"></goods-judge>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import HeaderHd from './../header-hd';
  import GoodsInfo from './goods-info';
  import GoodsInstruction from './goods-instruction';
  import GoodsJudge from './goods-judge';
  import {getUid, replaceHTMLTag, local} from '@/common/js/util';
  import {
    getGoodsDetail,
    getGoodsInstruct,
    getGoodsImg,
    setConcern,
    cancelConcern,
    getPromotion,
    getGoodsInfo,
    joinCart
  } from '@/api/goods-detail';
  export default {
    data() {
      return {
        currentTabbar: 0,
        goodsId: null,
        initdata: null,
        imgList: null,
        instruct: []
      }
    },
    components: {HeaderHd, GoodsInfo, GoodsInstruction, GoodsJudge},
    created() {
      this.goodsId = this.$route.params.id;
      if (this.goodsId === "") {
        return;
      }
      this._ininData();
    },
    deactivated(){
      this.$destroy();
    },
    methods: {
      _ininData() { // 获取数据
        getGoodsDetail(this.goodsId).then((res) => {
          this.$parent.loading = false;
          if (res.status === 'success') {
            this.initdata = res.data;
          }
        })
      },
      _getGoodsImg(){//商品详情数据
        getGoodsImg(this.goodsId).then((res) => {
          if (res.status === 'success') {
            this.imgList = replaceHTMLTag(res.data.datas);

          }

        });
      },
      _getGoodsInstruct(){//商品说明书
        getGoodsInstruct(this.goodsId).then((res) => {
          if (res.status === 'success') {
            if (res.data !== undefined) {
              let introList = res.data.paramsList ? res.data.paramsList : [];
              if (res.data.productName) {
                introList.unshift({
                  name: "厂家名称",
                  pvalue: res.data.productName
                })
              }
              if (res.data.productNo) {
                introList.unshift({
                  name: "药品批号",
                  pvalue: res.data.productNo
                })
              }
              if (res.data.medicineName) {
                introList.unshift({
                  name: "药品名称",
                  pvalue: res.data.medicineName
                })
              }
              this.instruct = introList;
            }else {
                this.instruct.push({
                  name: "药品名称",
                  pvalue: this.initdata.title
                })
            }
          }
        });
      },
      onClickTabbar(index) {
        this.currentTabbar = index;
        if (index === 1 && this.imgList === null) {
          this._getGoodsImg();
        }
        if (index === 2 && this.instruct.length === 0) {
          this._getGoodsInstruct();
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~@/common/scss/variable.scss";
  @import "~@/common/scss/mixin.scss";

  .wrapper {
    position: fixed;
    top: 1.2rem;
    left: 0.7rem;
    right: 0.7rem;
    bottom: 0.8rem;
  }

  .tabbar-container {
    margin-top: 0.06rem;
  }

  .tabbar {
    margin-left: 2.06rem;
    width: 7.6rem;
    background-color: rgba(207, 204, 236, 0.9);
    height: 0.7rem;
    border-radius: 0.03rem;
    color: #fff;
    .tabbar-item {
      float: left;
      @include button-default(1.8rem);
      border: 0.05rem solid rgba(207, 204, 236, 0.9);
      font-size: $font-size-m;
      &.active {
        border: 0.05rem solid rgb(207, 204, 236);
        @include button-active();
        transition: all .2s;
        transform: translateY(0.05rem);
      }
    }
  }
</style>
