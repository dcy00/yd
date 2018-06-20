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
    case 'toLogistics':
      window.hd.toLogistics();
      break;
    case 'toPersonal':
      window.hd.toPersonal();
      break;
    case 'toIntegral':
      window.hd.toIntegral();
      break;
    case 'toUdesk':
      window.hd.toUdesk();
      break;
    case 'toShoppingCart':
      window.hd.toShoppingCart();
      break;
    case 'toWorldShoppingCart':
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
