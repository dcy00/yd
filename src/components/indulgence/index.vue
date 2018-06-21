<template>
  <div class="container">
    <header-hd :simple="true" :isIndex="false"></header-hd>
    <div class="count-wrapper">
      <count-down v-if="seckillTime"
                  :startTime="seckillTime.nowSystemTime"
                  :endTime="seckillTime.endTime"
                  :isTime="false"
                  :countDownTitle="startendTitle"></count-down>
    </div>

    <div class="indelgence-wrapper container-middle">
      <div class="left-wrapper">
        <img src="./banner.jpg"/>
      </div>
      <div class="right-wrapper">
        <ul class="goods-wrapper clearfix" v-if="initData.length>0">
          <li class="goods-item" v-for="(item,index) in searchList" :key="index"
              @click="goToDetail(item.goodsId)">
            <div class="left">
              <img v-lazy="item.goodsThumbnail"/>
            </div>
            <div class="right">
              <p class="name">{{item.goodsTitle}}</p>
              <p class="price">秒杀价：<span>¥{{item.minGoodsPrice | myPrice}}</span></p>
              <p class="market-price">原价：¥{{item.maxGoodsPrice | myPrice}}</p>
              <a class="button-buy">立即抢购</a>
            </div>
          </li>
        </ul>
        <div v-if="noShow" style="height: 6.42rem;background-color: #fff;margin-top: 0.2rem;"><empty-data title="暂无秒杀活动"></empty-data></div>
        <arrow-pagination v-if="pageCount>0" @prev="clickPrev" @next="clickNext" :hasPrev="currentPage > 1"
                          :hasNext="currentPage < pageCount"></arrow-pagination>
      </div>
    </div>
    <pagination :currentPage="currentPage" :allPage="pageCount"></pagination>
  </div>

</template>

<script type="text/ecmascript-6">
  import CountDown from '@/base/count-down/count-down';
  import arrowPagination from '@/base/arrow-pagination';
  import Pagination from '@/base/pagination';
  import EmptyData from '@/base/empty-data/empty-data'
  import HeaderHd from './../header-hd';
  import {findSeckillData, findPeriodsInfo} from '@/api/indulgence';
  export default {
    data() {
      return {
        noShow:false,
        initData: [],
        searchList:[],
        countDown: true,
        seckillTime: '',
        startendTitle: '',
        pageCount: 0,
        currentPage: 0,
        pageSize: 9
      }
    },
    components: {CountDown, HeaderHd, arrowPagination, Pagination,EmptyData},
    computed:{
    },
    deactivated(){
      this.$destroy()
    },
    created(){
      this._initData();
    },
    methods: {
      //初始化数据
      _initData(){
        findPeriodsInfo().then((res) => {
          if (res.status === 'success' && res.data !== undefined) {
            let d = res.data;
            let seckillTime;
            this.periodsId = d.id;
            if (d.state === 4) {
              this.startendTitle = "距离结束";
              seckillTime = {
                endTime: d.endTime,
                startTime: d.startTime,
                nowSystemTime: d.nowSystemTime
              };
            } else if (d.state === 3) {
              this.startendTitle = "距离开始";
              seckillTime = {
                endTime: d.startTime,
                nowSystemTime: d.nowSystemTime
              }
            }
            this.seckillTime = seckillTime;
            this._findSeckillData(1);
          }else {
              this.noShow=true;
          }

        })
      },
      _findSeckillData(flag){
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
        findSeckillData(this.periodsId,this.currentPage,this.pageSize).then((res) => {//获取秒杀数据
          if (res.status === 'success') {
            this.pageCount = res.page?res.page.pageCount:0;
            if (this.pageCount > 0) {
              this.initData = this.initData.concat(res.data);
              console.log(this.initData)
              this.setSearchList();
            }
          }

        });
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
      clickPrev() {
        if (this.currentPage > 1) {
          this.currentPage = this.currentPage - 1;
          this.setSearchList();
        }
      },
      clickNext(){
       this._findSeckillData(1)
      },
      goToDetail(goodsId)
      {
        this.$router.push({path: `/goodsDetail/${goodsId}`})
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~@/common/scss/variable.scss";

  .count-wrapper {
    margin-top: 0.9rem;
  }

  .indelgence-wrapper {
    display: flex;
    flex-direction: row;
    padding-top: 0.36rem;
    overflow: hidden;
    margin-top: 0;
    box-sizing: border-box;
    .left-wrapper {
      width: 2.86rem;
      height: 6.42rem;
      margin-top: 0.2rem;
      margin-left: 0.28rem;
      img {
        width: 2.86rem;
        height: 6.42rem;
      }
    }
    .right-wrapper {
      margin: 0 0.3rem 0 0.38rem;
      flex: 1;
      -webkit-box-flex: 1;
      position: relative;
      .goods-wrapper {
        padding: 0 0.6rem;
        height: 6.63rem;
        overflow: hidden;
        .goods-item {
          margin-top: 0.2rem;
          margin-left: 0.2rem;
          width: 4rem;
          height: 2rem;
          float: left;
          display: flex;
          .left {
            width: 2rem;
            height: 2rem;
            background: rgba(255, 255, 255, 1);
            text-align: center;
            img {
              margin-top: 0.25rem;
              width: 1.5rem;
              height: 1.5rem;
            }
          }
          .right {
            width: 2rem;
            height: 2rem;
            background: rgba(255, 209, 0, 1);
            padding: 0.1rem 0 0 0.08rem;
            box-sizing: border-box;
            .name {
              height: 0.48rem;
              font-size: 0.18rem;
              color: rgba(51, 51, 51, 1);
              line-height: 0.24rem;
              overflow: hidden;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
            }
            .price {
              font-size: $font-size-s;
              font-family: DFLiJinHeiW8;
              color: rgba(51, 51, 51, 1);
              font-weight: bold;
              margin-top: 0.32rem;
              span {
                font-size: $font-size-m;
                font-family: Adobe Heiti Std R;
                color: rgba(238, 61, 32, 1);
              }
            }
            .market-price {
              text-decoration: line-through;
              font-size: $font-size-ss;
              font-family: MicrosoftYaHei;
              color: rgba(101, 101, 101, 1);
              line-height: 0.24rem;
              margin-top: 0.04rem;
            }
            .button-buy {
              display: block;
              width: 1.5rem;
              height: 0.34rem;
              line-height: 0.34rem;
              text-align: center;
              background: linear-gradient(#F36C22, #EA4C4C);
              border-radius: 0.04rem;
              color: #fff;
              font-size: 0.18rem;
              margin-top: 0.16rem;
            }
          }
        }
      }
    }
  }
</style>
