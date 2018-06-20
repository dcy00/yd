<template>
  <div class="container">
    <header-hd :keywords="keywords" :replace="true"></header-hd>
    <div class="wrapper" v-if="pageCount>0">
      <goods-list :dataList="initdata" :pageIndex="currentPage" :pageCount="pageCount"
                  @pagination="_initData"></goods-list>
    </div>
    <demand-register :keywords="keywords" v-if="loadAll && pageCount===0"></demand-register>
  </div>
</template>

<script type="text/ecmascript-6">
  import HeaderHd from './../header-hd';
  import GoodsList from './../goods-list';
  import {getSearch} from '@/api/search';
  import DemandRegister from './../demand-register'
  export default {
    data() {
      return {
        keywords: '',
        refreshSearch: true,
        searchList: [],//搜索结果数据
        currentPage: 0,//当前页
        pageSize: 10, //每页数
        pageCount: 0, //共几页
        loadAll: false,
        initdata: [],
        pageIndex:1//后台用
      }
    },
    components: {HeaderHd, GoodsList,DemandRegister},
    created() {
      this.keywords = this.$route.query.keywords;
      //this.keywords = '双花草珊瑚含片'
      //this._initData();
    },
    activated(){
      if (this.refreshSearch) {
         this.loadAll = false;
         this.pageIndex = 1;
         this.currentPage = 0;
        this.initdata = [];
        this._initData(1);
      } else {
        this.refreshSearch = true
      }
    },
    methods: {
      _initData(flag) {
        if (flag === 1) {
          this.currentPage++;
          if(this.currentPage > this.pageCount && this.currentPage >1){
              return;
          }
          if(this.currentPage* this.pageSize <= this.initdata.length) {
            this.setSearchList();
            return;
          }
        } else {
          this.currentPage--;
          this.setSearchList();
          return;
        }
        !this.loadAll && getSearch(this.keywords, this.pageIndex,'',10).then((res) => {
          if (res.status === 'success') {
              if(res.page.totalCount>0){
                this.initdata =this.initdata.concat(res.data);
                this.pageIndex = res.page.pageIndex + 1;
                this.setSearchList();
                if (this.pageIndex > res.page.pageCount) {
                  this.loadAll = true;
                }
                this.pageCount = Math.ceil(res.page.totalCount / this.pageSize);
              }else {
                this.loadAll = true;
              }
          } else {
            this.loadAll = true;
          }
        })
      },
      setSearchList() {
       /* this.searchList = [];
        let i = 0;
        for (i ; i<this.initdata.length; i ++){
              this.searchList.push(this.initdata[i])
        }*/
        this.$root.loading=false;
      }
    },
    watch: {
      $route(newVal){
        if (newVal.query.keywords !== this.keywords) {
          this.keywords = newVal.query.keywords;
          this.refreshSearch = true;
        } else {
          this.refreshSearch = false;
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~@/common/scss/variable.scss";

  .wrapper {
    overflow: hidden;
    width: 100%;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    padding: 1.2rem 0.24rem 0 0.58rem;
    justify-content: center;
    .left-wrapper {
      flex: 0 0 1.7rem;
      color: #fff;
      h2 {
        height: 0.6rem;
        line-height: 0.6rem;
        font-size: $font-size-l;
        text-indent: 0.14rem;
      }
      .item {
        background-image: linear-gradient(#43ABFE 20%, #147EDB 80%);
        width: 1.5rem;
        height: 0.6rem;
        line-height: 0.6rem;
        margin-top: 0.1rem;
        text-align: center;
        font-size: $font-size-m;
        border-radius: 0.03rem;
        &.active {
          background-image: linear-gradient(#F99A67 20%, #ED6E28 80%);
          transition: all .5s;
          transform: translateX(0.2rem);
        }
      }
    }
    .right-wrapper {

    }
  }
</style>
