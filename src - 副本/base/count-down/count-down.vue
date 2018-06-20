<template>
  <div class="count-down" v-if="isBlack">
    <h3>限时秒杀</h3>
    <span class="title">{{countDownTitle}}</span>
    <div class="time-wrapper" >
      <div class="time-box time-box-day" v-show="day!='00'">
        <span>{{day}} </span>
      </div>

      <div class="time-box time-box-hour">
        <span>{{hour}}</span>
      </div>
      <div class="time-box time-box-minute">
        <span>{{minute}}</span>
      </div>
      <div class="time-box time-box-second">
        <span>{{second}}</span>
      </div>
    </div>
  </div>
  <div v-else="">
    <div class="time-wrapper" >
      <div class="time-box-s" v-show="day!='00'">
        <span>{{day}} </span>天
      </div>
      <div class="time-box-s">
        <span>{{hour}}</span>时
      </div>
      <div class="time-box-s">
        <span>{{minute}}</span>分
      </div>
      <div class="time-box-s">
        <span>{{second}}</span>秒
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      countDownTitle: {
        type: String,
        default: "距结束"
      },
      isTime: { //是否为时间戳
        type: Boolean,
        default: true
      },
      isBlack: { //是否为黑色
        type: Boolean,
        default: true
      },
      endTime: {
        type: String,
        default: 0
      },
      startTime: {
        type: String,
        default: 0
      }
    },
    data(){
      return {
        times: null,
        isInit: false,
      }
    },
    mounted(){
      this.countDownInterval()
    },
    computed: {
      second(){
        return this.times ? this.checkTime(Math.floor(this.times % 60)) : '00';
      },
      minute(){
        return this.times ? this.checkTime(Math.floor(this.times / 60% 60)) : '00';
      },
      hour(){
        return this.times ? this.checkTime(Math.floor(this.times / 3600%24)) : '00';
      },
      day(){
        return this.times ? this.checkTime(Math.floor(this.times / 86400)) : '00';
      }
    },
    mounted(){
      this.countDownInterval()
    },
    methods: {
      checkTime(i){
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      },
      countDownInterval(){
        if (this.isTime) {

          this.times = this.endTime - this.startTime; //时间形式为"1403058804)"时间戳
        } else {
          this.times = (Date.parse(this.endTime.replace(/-/g,'/')) - Date.parse(this.startTime.replace(/-/g,'/'))) / 1000; //时间形式为:"2018-03-04 09:10:15";
        }
        let Timer = setInterval(() => {
          this.times = this.times - 1;
          if (this.times === 0) {
            clearInterval(Timer);
          }
        }, 1000);

      }
    }
  }
</script>
<style scoped lang="scss">
  .count-down {
   height: 0.9rem;
    color: #fff;
    font-size: 0.24rem !important;
    display: flex;
    flex-direction: row;
    line-height: 0.4rem;
    align-items: center;
    h3{
      font-size:0.3rem;
      margin-right: 0.35rem;
    }
  }
  .time-wrapper{
    display: flex;
    align-items: center;
  }
  .count-down h3 {
    font-size: 0.3rem;
    display: inline-block;
    margin: 0 0.26rem 0 0.7rem;

  }
  .title {
    display: inline-block;
    margin-right: 6px;
    font-size:0.24rem;
    color:rgba(255,255,255,1);
  }

  .time-box,.time-box-s {
    display: block;
    width:0.4rem;
    height:0.34rem;
    border-radius: 0.04rem ;
    text-align: center;
    line-height: 0.34rem;
    &.time-box{
      background:rgba(217,18,18,1);
      margin-left: 0.2rem;
      position: relative;
      color:rgba(217,18,18,1);
    }
    &.time-box-s{
      color:rgba(51,51,51,1);
      font-size: 0.2rem;
      width: 0.66rem;
    }
    &.time-box-s span{
      display: inline-block;
      width:0.4rem;
      height:0.34rem;
      background:rgba(62,21,14,1);
      color:#fff;
      margin-right: 0.02rem;
      border-radius: 0.04rem ;
    }
    &.time-box-second:before,&.time-box-minute:before,&.time-box-day:after{
      content: "：";
      position: absolute;
      display: block;
      width: 0.2rem;
      text-align: center;
      right: 0.4rem;
      font-size: 0.2rem;
      color: #D91212;
    }
    &.time-box-day{
      margin-right: 0.2rem;
    }
    &.time-box-day:after{
      content: "天";
      top: 0;
      right: -0.3rem;
    }
  }

  .time-box span {
    color:rgba(43,25,133,1);
  }

  .is-red{
    flex-direction: column;
  }
  .is-red .time-box span{
    background: #ff5d5d !important;
  }
</style>
