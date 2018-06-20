<template>
  <div class="container">
    <header-hd></header-hd>
    <div class="wrapper">
      <div class="left-wrapper">
        <h2>商品分类</h2>
        <ul class="list">
          <li v-for="(list,index) in listNames" class="item" :class="{active: currentId === index}" @click="onSelectItem(list.id,index)"><span>{{list.name}}</span></li>
        </ul>
      </div>
      <div class="right-wrapper">
         <goods-list ref="goodsList" v-if="searchList.length>0" :pageIndex="pageIndex" :pageCount="pageCount" :dataList="searchList" @pagination="_getSearch"></goods-list>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getCategory,getSearch} from '@/api/search'
  import HeaderHd from '@/components/header-hd';
  import GoodsList from './../goods-list';
  let datalist = [];
  export default {
    data() {
      return {
        listNames: [],
        currentId: 0,
        searchList:[],
        pageIndex:0,
        cateid:'',
        pageSize:10,
        pageCount:1
      }
    },
    created(){
      this._getCategory()
    },
    components: {HeaderHd, GoodsList},
    methods: {
      _getCategory(){ //初始化数据
        getCategory().then((res)=>{
          this.listNames = this.normalSerialization(res.data);
          this.cateid = this.listNames[0].id
        }).then(res=>{
          this._getSearch(2);
        })
      },
      _getSearch(type){
          if(type === 2 || type === 1 && datalist[this.currentId].pageIndex + 1 > datalist[this.currentId].searchMaxIndex){//判断下一页是否已加载，未加载请求数据
            this.pageIndex = datalist[this.currentId].pageIndex + 1;
            getSearch('', this.pageIndex, this.cateid,10).then((d)=>{
              if(d.status === 'success' && d.data && d.data.length){
                datalist[this.currentId].list.push(...d.data);//当前分类加入数据
                this.searchListSerialization();
                datalist[this.currentId].pageIndex = d.page.pageIndex;
                datalist[this.currentId].pageCount= d.page.pageCount;//当前分类总页数；
                datalist[this.currentId].searchMaxIndex = d.page.pageIndex;//当前分类加载到第几页
                this.pageCount = d.page.pageCount;
              }
            })
          }else {//数据已存在则直接取出
            datalist[this.currentId].pageIndex=datalist[this.currentId].pageIndex+type;
            this.pageIndex = datalist[this.currentId].pageIndex;
            this.pageCount = datalist[this.currentId].pageCount;
            this.searchListSerialization();
          }

      },
      searchListSerialization(){
         this.searchList = [];
         for(let i = 0;i<datalist[this.currentId].list.length;i++){
             this.searchList.push(datalist[this.currentId].list[i]);
         }
         this.$root.loading = false;
      },
      normalSerialization(data){
        return  data.map((d)=>{
          datalist.push(//初始化右边列表
            {
              pageIndex: 0,
              list:[],
              searchMaxIndex:0
            }
          );
              return {
                id: d.id,
                name:d.name
              }
          });
      },
      onSelectItem(cateid,index) {//左边列表点击事件
          this.currentId = index;
          this.cateid= cateid;
          this.pageIndex=1;
          if(datalist[this.currentId].pageIndex === 0){
            this._getSearch(2);
          }else {
            this.pageIndex = datalist[this.currentId].pageIndex;
            this.pageCount = datalist[this.currentId].pageCount;
            this.searchListSerialization();
          }

      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~@/common/scss/variable.scss";
  @import "~@/common/scss/mixin.scss";
  .wrapper {
    overflow: hidden;
    width: 100%;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    padding: 1.2rem 0.24rem 0 0.58rem;
    justify-content: center;
    .left-wrapper {
      width: 1.7rem;
      color: #fff;
      h2 {
        height: 0.58rem;
        line-height: 0.58rem;
        font-size: $font-size-l;
        text-indent: $font-size-l;
      }
      .item {
        @include button-default(1.5rem);
        margin-top: 0.1rem;
        font-size: 0.2rem;
        &.active{
          @include button-active();
          transition: all .5s;
          transform: translateX(0.2rem);
        }
      }
    }
    .right-wrapper{
      width: 16.68rem;
    }
  }
</style>
