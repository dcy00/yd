<template>
  <div class="container">
    <header-hd :simple="true" :isIndex="false"></header-hd>
    <img src="./vip.png" class="title-img"/>
    <v-touch v-on:swipeleft="clickNext" v-on:swiperight="clickPrev">
    <div class="vip-wrapper container-middle">
        <div  v-if="initData.length>0" class="arrow-wrapper">
          <div class="goods-item clearfix" v-for="item in searchList"  @click="goToDetail(item.id)">
            <div class="left">
              <img v-lazy="item.thumbnail"/>
            </div>
            <div class="right-wrapper">
              <p class="name">{{item.title}}</p>
              <div class="vip" v-if="item.entityCardMoneyLimit"><label>VIP卡</label><span>满{{item.entityCardMoneyLimit | myPrice}}减{{item.entityCardMoney | myPrice}}</span></div>
              <div class="pAndcart">
                <p class="price"> {{item.minPrice | myPrice}}</p>
                <p class="go-cart"><img src="../../assets/img/cartred.png" alt="">加入购物车</p>
              </div>
            </div>
          </div>
          <arrow-pagination v-if="pageCount>0" @prev="clickPrev" @next="clickNext" :hasPrev="currentPage > 1"
                            :hasNext="currentPage < pageCount"></arrow-pagination>
        </div>

    </div>
    </v-touch>
    <pagination :currentPage="currentPage" :allPage="pageCount"></pagination>
  </div>
</template>

<script type="text/ecmascript-6">
  import HeaderHd from './../header-hd';
  import arrowPagination from '@/base/arrow-pagination';
  import Pagination from '@/base/pagination';
  import {getCategoryList} from '@/api/search'
  export default {
    data(){
      return {
        currentPage: 0,
        pageSize: 6,
        pageCount: 0, //共几页
        initData:[],
        searchList:[]
      }
    },
    created() {
      this._initData(1)
    },
   methods:{
    _initData(flag) {
      if (flag === 1) {
        this.currentPage++;
        if(this.currentPage > this.pageCount && this.currentPage >1){
          return;
        }
        if(this.currentPage* this.pageSize <= this.initData.length) {
          this.setSearchList();
          return;
        }
      } else {
        this.currentPage--;
        this.setSearchList();
        return;
      }
      getCategoryList(2,'6c3967acb1184ca5826d12fdeb80625d','8',this.currentPage,this.pageSize).then((res) => {
        if (res.status === 'success') {
          this.pageCount = res.page?res.page.pageCount:0;
          if (this.pageCount > 0) {
              console.dir(res.data);
            this.initData = this.initData.concat(res.data);
            this.setSearchList();
          }
        }
      })
    },
     setSearchList() {
       this.searchList = [];
       let i = (this.currentPage - 1) * this.pageSize;
       for (i ; i < this.currentPage*this.pageSize; i ++){
         if(i<this.initData.length){
           this.searchList.push(this.initData[i])
         }
       }
     },
     clickPrev(){
       if (this.currentPage > 1) {
         this.currentPage = this.currentPage - 1;
         this.setSearchList();
       }
     },
     clickNext(){
       this._initData(1);
     },
     goToDetail(goodsId){
       this.$router.push({path: `/goodsDetail/${goodsId}`})
     }
   },
    components: {HeaderHd, arrowPagination, Pagination},
  }
</script>

<style scoped lang="scss">
  .title-img{
    width: 1.13rem;
    height: 0.3rem;
    left: 0.7rem;
    position: absolute;
    top: 1.3rem;
  }
  .pAndcart{
    margin-top: 0.2rem;
    line-height:0.48rem;
    .go-cart{
      float: right;
      line-height:0.48rem;
      font-size:0.38rem;
      padding: 0.2rem 0.2rem 0 0;
      color:rgba(51,51,51,1);
      font-family:PingFangSC-Regular;
      img{
        height:0.39rem;
        vertical-align: middle;
      }
    }
    .price{
      display: inline-block;
      width:30%;
      height:0.48rem;
      font-size:0.48rem;
      font-family:PingFangSC-Regular;
      color:rgba(238,61,32,1);
      line-height:0.48rem;
      /*margin-top: 0.5rem;*/
      position: relative;
      box-sizing: content-box;
      padding-left: 0.25rem;
      &:before{
        position: absolute;
        left: 0;
        content: "¥";
        font-size: 0.3rem;
        line-height: 0.3rem;
        bottom: 0.03rem;
      }
    }
  }
  .vip-wrapper {
    padding-top: 0.01rem;
    .arrow-wrapper{
      margin: 0 0.255rem;
      position: relative;
      clear: left;
      height: 7.79rem;
    }
    .goods-item{
      float: left;
      width: 6.69rem;
      border-radius: 0.04rem;
      border: 1px solid #a39dd8;
      background-color: #fff;
      &:nth-child(odd){
        margin:0 1.05rem 0.1rem 0.795rem;
      }
      &:nth-child(even){
        margin:0 0.795rem 0.1rem 1.05rem;
      }
      .left{
        float: left;
        width: 2.5rem;
        height: 2.5rem;
        text-align: center;
        img{
          width: 2rem;
          height: 2rem;
          margin-top: 0.25rem;
        }
      }
      .right-wrapper{
        float: left;
        width: 4.19rem;
        height: 2rem;
        .name{
          font-size:0.3rem;
          font-family:PingFangSC-Regular;
          color:rgba(51,51,51,1);
          line-height:0.36rem;
          height: 0.72rem;
          margin-top: 0.1rem;
          margin-right: 0.1rem;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          margin-bottom: 0.1rem;
        }
        .vip{
          font-size: 0;
          padding-top: 0.08rem;
          label{
            width:0.5rem;
            height:0.24rem;
            border:1px solid rgba(238,61,32,1);
            border-radius: 0.03rem ;
            color: #EE3D20;
            font-size: 0.18rem;
            padding: 0 0.1rem;
            margin-right: 0.2rem;
          }
          span{
            height:0.23rem;
            font-size:0.24rem;
            font-family:PingFangSC-Regular;
            color:rgba(51,51,51,1);
            line-height:0.24rem;
          }
        }
      }
    }
  }
</style>
