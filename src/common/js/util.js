/**
 * Created by liuxiaoya on 2017/11/15 0015.
 */
//格式化日期
export function formatDate(d) {
  var now = new Date(d * 1000);
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var date = now.getDate();
  var hour = addZero(now.getHours());
  var minute = addZero(now.getMinutes());
  var second = addZero(now.getSeconds());
  return year + "-" + month + "-" + date + "   " + hour + ":" + minute + ":" + second;
}

//日期个位数加0
export function addZero(d) {
  return d > 9 ? d : "0" + d;
}

//本地存储
export const local = {
  save(key, val){
    localStorage.setItem(key, JSON.stringify(val));
  },
  get(key){
    return JSON.parse(localStorage.getItem(key)) || '';
  }
};
//返回uuid
export function getUid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};
export function removeHTMLTag(str) {
  str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
  str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
  str = str.replace(/\n[\s| | ]*\r/g, '\n'); //去除多余空行
  str = str.replace(/ /ig, '');//去掉
  str = str.replace(/[ ]|[&nbsp;]/g, '');
  ;//去掉&nbsp;
  return str;
}
export function replaceHTMLTag(str) {
  let s = str.replace(/&lt;/g, '<'); //去除HTML tag
  s = s.replace(/&gt;/g, '>');
  s = s.replace(/<p>/g, '');
  s = s.replace(/<\/p>/g, '');
  s = s.replace(/<br>/g, '');
  s = s.replace(/style/g, 'style="width:100%;height:auto"');
  return s;
}
export const regPhone = {
  phone(str){//手机号位数简单验证
    var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    if (!myreg.test(str)) {
      return false;
    } else {
      return true;
    }
  },
  replaceTrim(str) {//去空格
    str.replace(/(^\s*)|(\s*$)/g, "");
  }
};

export function goTop() {//回到顶部
  var scrollToptimer = setInterval(function () {
    var top = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
    var speed = top / 4;
    if (document.body.scrollTop != 0) {
      document.body.scrollTop -= speed;
    } else {
      document.documentElement.scrollTop -= speed;
    }
    if (top == 0) {
      clearInterval(scrollToptimer);
    }
  }, 30);

};

export const arrString={
  toArr(str){          //以,链接的字符串变数组
    if(str.length==0){
      return [];
    }else if(str.indexOf(',') != -1){
      return str.split(",");
    }else{
      var arr=[];
      arr[0]=str;
      return arr;
    }

  },
  toStr(arr){           //将数组各元素以,链接
    if(arr==[]){
      return '';
    }else if(arr.length==1){
      return arr[0];
    }else{
      return arr.join(",");
    }
  },
  isRepeat(str,arr){        //判断元素是否在数组中
    return arr.indexOf(str);    //未找到则返回 -1。>-1则包含
  }
}
