/**
 * Created by liuxiaoya on 2018/3/19 0019.
 */
export function joinCart(goodsId, num, goodsType, siteId, specValueId, businessId, type,goodsGenre) { //加入购物车
  let data = {
    goodsId, num, goodsType, siteId, specValueId, businessId, type,goodsGenre
  }
  window.hd.addCart(JSON.stringify(data));
}
export function goToAndroid(type) { //加入购物车
  /*
   *物流中心：toLogistics();
   *  个人中心：toPersonal();
   *  积分商城：toIntegral();
   *  客服：toUdesk();
   *  跳转到购物车：toShoppingCart();
   * */
  switch (type) {
    case 'toLogistics':     //物流查询
      window.hd.toLogistics();
      break;
    case 'toPersonal':      //个人中心
      window.hd.toPersonal();
      break;
    case 'toIntegral':      //积分商城
      window.hd.toIntegral();
      break;
    case 'toUdesk':          //客服
      window.hd.toUdesk();
      break;
    case 'toShoppingCart':   //购物车
      window.hd.toShoppingCart();
      break;
    case 'toWorldShoppingCart':   //全球购
      window.hd.toWorldShoppingCart();
      break;
    default:
      break;
  }
}
export function getCarNum() {
  if(window.hd.setCarNum() === undefined){
    return 0;
  }else {
    return window.hd?window.hd.setCarNum() :0;
  }

}
export function showLoadding() {
  window.hd&&window.hd.showLoadding();
}
export function cancelLoadding() {
  window.hd&&window.hd.cacleLoadding();
}
