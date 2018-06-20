<template>
  <div class="container">
    <header-hd :simple="true" :isIndex="false"></header-hd>
    <h2 class="title-img">老年专区</h2>
    <div class="vip-wrapper container-middle">
        <div class="arrow-wrapper">
          <div class="goods-item clearfix" v-for="item in searchList"  @click="goToDetail(item.id)">
            <div class="left">
              <img v-lazy="item.thumbnail"/>
            </div>
            <div class="right-wrapper">
              <p class="title">{{item.title}}</p>
              <!--<span class="spec">0.3g*18片*2板/盒</span>-->
              <p class="price">￥{{item.minPrice | myPrice}}</p>
              <!--<p class="active">满2瓶  得黑米醋一件（价值...</p>
              <p class="active">满2瓶  得黑米醋一件（价值...</p>-->
            </div>
          </div>
          <arrow-pagination v-if="pageCount>0" @prev="clickPrev" @next="clickNext" :hasPrev="currentPage > 1"
                            :hasNext="currentPage < pageCount"></arrow-pagination>
        </div>
    </div>
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
        pageSize: 9,
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
      getCategoryList(2,'e079315e321d430eba121997b8b7c9f6','8',this.currentPage,this.pageSize).then((res) => {
        if (res.status === 'success') {
          this.pageCount = res.page?res.page.pageCount:0;
          if (this.pageCount > 0) {
            this.initData = this.initData.concat(res.data);
            this.pageIndex = res.page.pageIndex + 1;
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
    font-size:0.3rem;
    height: 0.3rem;
    left: 0.7rem;
    position: absolute;
    top: 1.3rem;
    color: #fff;
  }
  .vip-wrapper {
    box-sizing: border-box;
    padding: 0.54rem 0 0;
    position: relative;
    .arrow-wrapper{
      margin: 0 0.37rem 0 0.37rem;
      position: absolute;
      padding-left: 0.24rem;
    }
    .goods-item{
      float: left;
      width: 4rem;
      margin:0 0.75rem 0.36rem;
      border-radius: 0.04rem;
      border: 1px solid #a39dd8;
      background-color: #fff;
      .left{
        float: left;
        width: 2rem;
        height: 2rem;
        text-align: center;
        img{
          width: 1.5rem;
          height: 1.5rem;
          margin-top: 0.25rem;
        }
      }
      .right-wrapper{
        float: left;
        width: 1.9rem;
        height: 2rem;
        margin-left: 0.1rem;
        font-size: 0;
        .title{
          width:1.68rem;
          height:0.48rem;
          font-size:0.18rem;
          color:rgba(51,51,51,1);
          line-height:0.24rem;
          margin-top: 0.1rem;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          margin-bottom: 0.1rem;
        }
        .spec{
          font-size:0.14rem;
          color:rgba(101,101,101,1);
        }
        .price{
          font-size:0.24rem;
          font-family:Adobe Heiti Std R;
          color:rgba(238,61,32,1);
          line-height:0.5rem;
        }
        .active{
          font-size:0.14rem;
          color:rgba(239,117,51,1);
          height: 0.24rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 0.24rem;
        }
      }
    }
  }
</style>
