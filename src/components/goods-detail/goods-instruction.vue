<template>
  <div class="instructions-wrapper content-wrapper" v-if="instructions">
    <h3>请仔细阅读说明书并在医师指导下使用</h3>
    <div class="instructions-container">
      <div class="left">
        <div class="instructions" v-for="(item,index) in instructions" v-if="index<9">
          <p class="title">【{{item.name}}】</p>
          <p class="content">{{item.pvalue}}</p>
        </div>
      </div>
      <div class="right">
        <div class="instructions" v-for="(item,index) in instructions" v-if="index>=9">
          <p class="title">【{{item.name}}】</p>
          <p class="content">{{item.pvalue}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
      props:{
        instructions:{
              type:Array
          }
      },
    created (){
    },
    methods:{

    }
  }
</script>

<style scoped lang="scss">
  @import "~@/common/scss/variable.scss";
  .instructions-wrapper {
    h3{
      font-size: $font-size-m;
      margin-top: 0.45rem;
      color: #333;
      text-align: center;
    }
  }
.instructions-container{
  display: flex;
  flex-direction: row;
  margin: 0.58rem;
}
.left,.right{
  flex: 1;
  -webkit-box-flex: 1;
  padding-bottom: 0.2rem;
  &.right{
    margin-left: 0.52rem;
    padding-left: 0.52rem;
    border-left: 1px solid rgba(195,195,195,1);
  }
}
  .instructions {
    display: flex;
    display: -webkit-box;
    font-size: $font-size-s;
    line-height: 0.24rem;
    flex-direction: row;
    color: #656565;
    margin-top: 0.3rem;
  p {
    color: #676767;
  &.title {
     text-indent: 0.1rem;
    margin-right: 0.02rem;
   }
  &.content {
     margin-right: 0.1rem;
     flex: 1;
    -webkit-box-flex: 1;
   }
  }
  }
</style>
