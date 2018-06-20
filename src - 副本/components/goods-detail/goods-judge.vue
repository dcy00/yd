<template>
  <div class="judge-container">
    <div class="title">
      <span v-if="data">好评度：</span>
      <span v-if="data" class="rating">{{rating}}%</span>
    </div>
    <div  v-if="data">
      <div class="judge-wrapper" v-for="(comment,index) in data">
        <div class="judge-item clearfix" >
          <star :score="comment.avgGrade"></star>
          <p class="content">{{comment.commentContent}}</p>
          <div class="judge-img-wrapper" v-if="comment.pictureList!=undefined">
            <img v-for="img in comment.pictureList" class="comment-img" :src="img"/>
          </div>
          <div class="judge-com">
            <p class="name">{{comment.commentAccount}}</p>
            <span class="time" >{{comment.createTime}}</span>
          </div>
        </div>
        <div class="line"></div>
      </div>
    </div>
      <empty-data v-else="" title="此商品还没有评价…"></empty-data>
  </div>
</template>

<script type="text/ecmascript-6">
  import Star from '@/base/star/star';
  import EmptyData from '@/base/empty-data/empty-data'
  export default {

      props:['data'],
      computed:{
        rating(){
            let score = 0;
            for(let i = 0;i<this.data.length; i++){
              score= score + this.data[i].avgGrade*20;
            }
            return score/this.data.length;
        }
      },
      components: {Star,EmptyData}
  }
</script>

<style scoped lang="scss">
  @import "~@/common/scss/variable.scss";
  .judge-container{
    background-color: #fff;
    height: 8.1rem;
    overflow: scroll;
  }
  .title {
    background-color: #f2dccf;
    height: 0.98rem;
    padding-left: 0.3rem;
    font-size: $font-size-s;
    color: #333;
    display: flex;
    align-items: center;
    .rating{
      display: block;
      font-size: 0.48rem;
      color: #E52222;
      font-weight: bold;
      padding-bottom: 0.2rem;
    }
  }
  .judge-item{
    padding: 0.2rem 0.2rem 0rem;
    .content{
      font-size: $font-size-s;
      color: #656565;
      margin-top: 0.2rem;
    }
    .judge-img-wrapper{
      font-size: 0;
      margin-top: 0.3rem;
      margin-left: 0.4rem;
      img{
        width: 0.94rem;
        height: 0.94rem;
        padding: 0.04rem;
        border: 0.01rem solid #c3c3c3;
        margin-right: 0.16rem;
      }
    }
  }
  .line{
    margin: 0.12rem 0.04rem 0 0.16rem;
    height: 0.01rem;
    background-color: #ccc;
  }
  .judge-com{
    margin-top: 0.2rem;
    font-size: $font-size-ss;
    color: #989898;
    float: right;
    .time{
      display: block;
      margin-top: 0.1rem;
      text-align: right;
    }
  }
</style>
