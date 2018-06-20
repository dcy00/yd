<template>
  <div id="app">
    <keep-alive>
      <router-view/>
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
    created(){
        window.setCartNumber = this.setCartNumber;
        let num = getCarNum();
      this.setCartNumber(num);
    },
    methods:{
      ...mapMutations({
        setCartNumber: 'SetCartNumber'
      })
    }
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
