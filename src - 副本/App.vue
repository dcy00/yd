<template>
  <div id="app">
    <keep-alive>
      <router-view class="Router"/>
    </keep-alive>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex';
  import {getCarNum} from '@/api/go-android';
  export default {
    name: 'app',
    data(){
       return {
           loading:{
               isloading:false
           }
       }
    },
 /*   data() {
      return {
        transitionName: 'slide-right'  // 默认动态路由变化为slide-right
      }
    },
    watch: {
      '$route' (to, from) {
          console.log(this.$router.isBack)
        let isBack = this.$router.isBack;  //  监听路由变化时的状态为前进还是后退
        /!*if(isBack === undefined){
            this.transitionName = "";
            return;
        }*!/
        if(isBack) {
          this.transitionName = 'slide-right'
        } else {
          this.transitionName = 'slide-left'
        }
        this.$router.isBack = false
      }
    },*/
    created(){
        window.setCartNumber = this.setCartNumber;
      console.log(this.loading)
        let num = getCarNum();
      this.setCartNumber(num);
    },
    methods:{
      ...mapMutations({
        setCartNumber: 'SetCartNumber'
      })
    },
   /* watch:{
        loading: {
          handle(){
            if (this.loading.isloading) {
              window.hd.showLoadding();
            } else {
              window.hd.cacleLoadding();
            }
          },
          deep:true
        }
    }*/
  }
</script>

<style>
/*  .Router {
    position: absolute;
    width: 100%;
    transition: all .8s ease;
  }
  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }

  .slide-left-leave-active,
  .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100% 0);
  }*/
</style>
