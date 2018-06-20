<template>
  <div>
    <div class="demand-title">抱歉！没有找到与“{{keywords}}”相关的信息！</div>
    <div class="demand-wrapper container-middle">
      <h3 class="title">您可以填写以下需求登记表：</h3>
      <div class="form-wrapper">
        <div class="row-wrapper">
          <div class="left">
            <span class="name">*药品名称：</span>
            <input type="text" v-model="goodsName"/>
          </div>
          <div class="right">
            <span class="name">*姓名：</span>
            <input type="text"  v-model="userName"/>
          </div>
        </div>
        <div class="row-wrapper">
          <div class="left">
            <span class="name">*药品数量：</span>
            <input type="number"  v-model="goodsNum"/>
          </div>
          <div class="right">
            <span class="name">*手机号码：</span>
            <input type="text" v-model="userMobile"/>
          </div>
        </div>
        <div class="row-wrapper">
          <div class="left">
            <span class="name">*药品规格：</span>
            <input type="text" v-model="goodsSpec"/>
          </div>
          <div class="right">
            <span class="name">备注：</span>
            <input type="text"  v-model="content"/>
          </div>
        </div>
      </div>
      <input class="form-button" value="确定" type="button" @click="clickSubmit"/>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import HeaderHd from './../header-hd';
  import {postRegister} from '@/api/search';
  import {regPhone} from '@/common/js/util'
  import {Toast} from 'mint-ui'
  export default {
    props: {
      keywords: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        content: '',
        userName: '',
        userMobile: '',
        goodsName:'',
        goodsNum:null,
        goodsSpec:'',
        mobilePass: false,
        namePass: false
      }
    },
    components: {HeaderHd,Toast},
    methods: {
      clickSubmit(){
        if(this.goodsName === ''){
          Toast('请输入药品名称');
          return false;
        }
        if(this.goodsNum<1){
          Toast('请输入药品数量');
          return false;
        }
        if(this.goodsSpec === ''){
          Toast('请输入药品规格');
          return false;
        }
        if (!this.namePass) {
          Toast('请输入您的姓名');
          return false;
        }
        if (!this.mobilePass) {
          Toast('请输入您的手机号码');
          return false;
        }
        postRegister(this.userMobile,this.userName,this.goodsName, this.goodsNum, this.goodsSpec, this.content).then((res) => {
          if (res.status === 'success') {
            Toast('您的需求已提交');
            setTimeout(() => {
              this.$router.back();
            }, 3000)
          }
        })
      }
    },
    watch: {
      userMobile(newVal){
        if (regPhone.phone(newVal)) {
          this.mobilePass = true;
        } else {
          this.mobilePass = false;
        }
      },
      userName(newVal){
        if (newVal.length >= 2) {
          this.namePass = true;
        } else {
          this.namePass = false;
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "~@/common/scss/variable.scss";
  @import "~@/common/scss/mixin.scss";
  .demand-title {
    height: 0.48rem;
    line-height: 0.48rem;
    left: 50%;
    position: absolute;
    top: 1.3rem;
    color: #E52222;
    font-size: 0.32rem;
    transform: translate(-50%, 0);
  }

  .demand-wrapper {
    padding: 0 0.9rem;
    overflow: hidden;
    .title {
      color: #ffd100;
      font-size: 0.3rem;
      margin-top: 0.9rem;
      line-height: 0.7rem;
    }
    .form-wrapper {
      background: #fff;
      height: 5rem;
      border-radius: 0.2rem;
      box-sizing: border-box;
      padding-top: 0.78rem;
      .row-wrapper, .left, .right {
        display: flex;
        flex-direction: row;
        height: 0.6rem;
        &.row-wrapper {
          margin: 0 0.5rem 0.8rem;
          input {
            text-indent: 0.18rem;
            border-radius: 0.04rem;
            width: 5rem;
            height: 0.6rem;
            border: 1px solid #dcdce4;
            font-size: 0.22rem;
            background: #E1E1E1;
            box-shadow: 0 -1px 2px rgba(38, 34, 92, 0.4);
          }
        }
        &.left, &.right {
          align-items: center;
        }
        &.left {
          margin-right: 1.28rem;
        }
      }
      .name {
        display: inline-block;
        font-size: 0.24rem;
        color: rgba(51, 51, 51, 1);
        width: 1.4rem;
        text-align: right;
      }
    }
    .form-button {
      display: block;
      @include button-default(1.8rem);
      @include button-active;
      border-radius: 0.02rem;
      font-size: $font-size-m;
      float: right;
      margin-top: 0.08rem;
      box-shadow: 0.02rem 0.02rem 0.08rem #463B94;
    }
  }
</style>
