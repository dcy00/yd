<template>
  <div>
    <header-hd :simple="true"></header-hd>
    <div class="container container-middle">
      <div class="search">
        <search :jump="false" @onsearch="onSearch"></search>
        <div class="search-hot" v-show="hotList.length > 0">
          <h3>热门搜索</h3>
          <ul class="search-list">
            <li class="item"  v-for="item in hotList" @click="onSearch(item.content)">
              <span>{{item.content}}</span>
            </li>
          </ul>
        </div>
        <div class="search-his" v-show="searchHis.length > 0">
          <h3>搜索历史</h3>
          <ul class="search-list">
            <li class="item"  v-for="item in searchHis" @click="onSearch(item)">
              <span>{{item}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <footer-hd></footer-hd>
  </div>

</template>

<script type="text/ecmascript-6">
  import Search from '@/base/search/index';
  import {getSearchHot} from '@/api/search';
  import {getSearchHistory,saveSearch} from '@/api/go-android';
  import HeaderHd from '@/components/header-hd';
  import FooterHd from '@/components/footer-hd'
  export default {
    components: {Search, HeaderHd,FooterHd},
    data(){
      return {
        hotList: [],
        searchHis: [],
      }
    },
    created(){

      window.getHistoryList=this.getHistoryList;  //与android的通过window联系
      this._getSearchHot();
      this._getSearchHis();
    },
    methods: {
      getHistoryList(list){
          console.info(list);
          this.searchHis=list;
      },
      //热门搜索
      _getSearchHot(){
        getSearchHot().then((res) => {
          if (res.data.length > 0) {
            this.hotList = res.data;
//            console.log(this.hotList)
          }
        })
      },
      //搜索历史
      _getSearchHis(){
          getSearchHistory();
      },
      onSearch(keywords) {
         saveSearch(keywords);
         this.$router.replace({path: 'searchList',query: {keywords: keywords}});
//         this.$destroy();
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "~@/common/scss/variable.scss";

  .container {
    .search {
      width: 9.14rem;
      padding-top: 0.8rem;
      margin: 0 auto;
      .search-hot,.search-his {
        font-size: 0;
        margin-top: 0.66rem;
        margin-bottom: 1.66rem;
        margin-left: 0.14rem;
        h3 {
          font-size: $font-size-m;
          color: #fff;
          padding-bottom: 0.26rem;
          border-bottom: 0.01rem solid #fff;
        }
        .search-list {
          margin-top: 0.2rem;
          li {
            float: left;
            padding: 0 0.14rem;
            margin-top: 0.18rem;
            margin-right: 0.48rem;
            font-size: $font-size-m;
            height: 0.5rem;
            line-height: 0.5rem;
            background: rgb(255, 209, 0);
            border-radius: 0.06rem;
            min-width: 0.9rem;
            text-align: center;
            span {
              color: #333;
            }
          }
        }
      }
    }
  }
</style>
