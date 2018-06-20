<template>
  <transition name="fade">
  <div class="goods-list-wrapper">
    <div class="container-wrapper">
      <div class="animals-wrapper">
      <div class="goods-wrapper" data-point="goodsList" :style="{'width': goodsWidth}">
        <router-link :to="'/goodsDetail/'+item.id" class="goods-list" v-for="(item, index) in dataList" :key="index" v-if="index%2===0">
          <div class="img-wrapper">
            <img v-lazy="item.thumbnail"/>
          </div>
          <p class="price">{{ item.minPrice | myPrice }}</p>
          <p class="name">{{item.title}}</p>
          <div class="active">

            <text-split v-for="(it,i) in changeArray(item.protations)" :key="i" :isGift="true" :text="it"></text-split>
          </div>
          <!-- <div class="cart" @click.prevent="addCart">
             <span class="icon iconfont icon-cart"></span>
             <span>加入购物车</span>
           </div>-->
        </router-link>
      </div>
        <div class="goods-wrapper goods-wrapper-below" data-point="goodsList"  :style="{'width': goodsWidth}">
          <router-link :to="'/goodsDetail/'+item.id" class="goods-list" v-for="(item, index) in dataList" :key="index" v-if="index%2===1">
            <div class="img-wrapper">
              <img v-lazy="item.thumbnail"/>
            </div>
            <p class="price">{{ item.minPrice | myPrice }}</p>
            <p class="name">{{item.title}}</p>
            <div class="active">

              <text-split v-for="(it,i) in changeArray(item.protations)" :key="i" :isGift="true" :text="it"></text-split>
            </div>
            <!-- <div class="cart" @click.prevent="addCart">
               <span class="icon iconfont icon-cart"></span>
               <span>加入购物车</span>
             </div>-->
          </router-link>
        </div>
      </div>
      <arrow-pagination @prev="clickPrev" @next="clickNext" :hasPrev="pageIndex > 1"
                        :hasNext="pageIndex < pageCount"></arrow-pagination>
    </div>
    <pagination :currentPage="pageIndex" :allPage="pageCount"></pagination>
  </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import TextSplit from '@/base/text-split';
  import arrowPagination from '@/base/arrow-pagination';
  import Pagination from '@/base/pagination';
  import {mapActions} from 'vuex';
  export default {
    props: {
      dataList: {
        type: Array,
        default: []
      },
      pageIndex: {
        type: Number,
        default: 1
      },
      pageCount: {
        type: Number,
        default: 1
      }
    },
    computed:{
        goodsWidth(){
            return 15.2*this.pageCount+"rem"
        }
    },
    components: {TextSplit, arrowPagination, Pagination},
    methods: {
     /* addCart() {
        this.cartNumber(1);
      },*/
      clickPrev(){
          if(this.$root.loading){
              return;
          }
        if (this.pageIndex > 1) {
          this.$root.loading=true;
          this.$emit('pagination', -1);
        /*  let left=-15.2*(this.pageIndex-2)+"rem";
          let goodsList = $("[data-point=goodsList]");
          goodsList.animate({left:left},()=>{
            this.$root.loading = false;
          });*/

        }
      },
      changeArray(item){
        return item.split(',')
      },
      clickNext(){
        if(this.$root.loading){
          return;
        }
        if (this.pageIndex < this.pageCount) {
          this.$root.loading=true;
          this.$emit('pagination', 1);
        /*  let left=-15.2*(this.pageIndex)+"rem";
          let goodsList = $("[data-point=goodsList]");
            goodsList.animate({left:left});
*/
        }
      },
      ...mapActions([
        'cartNumber'
      ])
    },
    watch:{
        pageIndex(){
          let left=-15.2*(this.pageIndex-1)+"rem";
          let goodsList = $("[data-point=goodsList]");
          setTimeout(()=>{
            this.$nextTick(function(){
              goodsList.animate({left:left});
            });

          },50)


        }
    }
  }
</script>

<style scoped lang="scss">
  @import "~@/common/scss/variable.scss";

  .container-wrapper {
    position: relative;
    height: 8.73rem;
    overflow: hidden;
    justify-content: center;
    align-items: center;

    .animals-wrapper{
      width: 15.2rem;
      height: 8.73rem;
      margin: 0 0.72rem;
      position: relative;
      overflow: hidden;
    }
    .goods-wrapper {
      width: 15.2rem;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 0;
      &.goods-wrapper-below{
        top:4.38rem;
      }
      .goods-list {
        flex: 0 0 2.96rem;
        height: 4.3rem;
        box-sizing: border-box;
        padding: 0.3rem 0.16rem 0.14rem 0.16rem;
        border: 0.01rem solid #e1e1e1;
        border-radius: 0.04rem;
        background-color: #fff;
        position: relative;
        margin-right: 0.08rem;
        margin-bottom: 0.07rem;
        .img-wrapper {
          width: 2.4rem;
          height: 2.4rem;
          overflow: hidden;
          margin-left: 0.12rem;
          img {
            width: 2.4rem;
            height: 2.4rem;
          }
        }
        .price {
          color: #EE3D20;
          font-size: $font-size-m;
          margin-top: 0.06rem;
          &:before {
            content: '￥';
            font-size: $font-size-s;
          }
        }
        .name {
          margin-top: 0.24rem;
          font-size: $font-size-ss;
          color: rgba(51, 51, 51, 1);
          line-height: 0.18rem;
          height: 0.36rem;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .factory {
          margin-top: 0.08rem;
          color: #989898;
          font-size: $font-size-ss;
        }
        .active {
          margin-top: 0.09rem;
          font-size: 0;
        }
        .cart {
          position: absolute;
          right: 0.12rem;
          bottom: 0.12rem;
          color: #656565;
          font-size: $font-size-ss;
          .icon {
            font-size: $font-size-ml;
            color: #EE3D20;
          }
        }
      }
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
