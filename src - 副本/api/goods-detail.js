/**
 * Created by liuxiaoya on 2017/11/14 0003.
 * 分类列表
 */



import axios from 'axios'
import {URL} from './config.js'

//商品详情详情部分请求
export function getGoodsDetail(goods_id,goodsType, userId) {
  const url = URL + "/f/hd/s_10020/goods/ajax/goods";
  let data = {
    id: goods_id
  }
  if(goodsType) {
    data.goodsType = goodsType;
  }
  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  })
}
//商品详情商品说明书，店铺资质请求
export function getGoodsImg(goods_id) {//获取图片详情
  const url = URL + "/f/hd/s_10020/xcxgoods/goodsInfo";
  let data = {
    goodsId: goods_id
  }
  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  })
}
//商品详情商品说明书，店铺资质请求
export function getGoodsInstruct(goods_id) {//获取商品说明书
  const url = URL + "/f/hd/s_10020/xcxgoods/manualInfo";
  let data = {
    goodsId: goods_id
  }
  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  })
}
//促销获取数据
export function getPromotion(goods_id) {//获取促销数据
  const url = URL + "/f/hd/s_10020/spCart/promotion/list/json";
  let data = {
    goodsId: goods_id
  }
  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function setConcern(goods_id, userId) {//关注
  const url = URL + "/uc/hd/s_10020/spusercollect/add";
  const data = {
    collectType: 1,
    bid: goods_id,
    siteId:"s_10020",
    springraintoken:userId,
    "deviceType":"web"
  }
  return axios.post(url,"post", {params: data}).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function cancelConcern(goods_id,userId) {//取消关注
  const url = URL + "/uc/hd/s_10020/spusercollect/delete";
  const data = {
    collectType: 1,
    bid: goods_id,
    siteId:"s_10020",
    springraintoken:userId,
    "deviceType":"web"
  }
  return axios.post(url,"post", {params: data}).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function getGoodsInfo(goods_id,specIds,goodsType) { //获取选择规格Id
  const url = URL + "/f/hd/s_10020/goods/ajax/goodsInfo";
  const data = {
    goodsId: goods_id,
    specIds: specIds.join(','),
    goodsType:goodsType
  }
  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function joinCart(goodsId, num, orderType, specValueId, businessId, uuid,springraintoken) { //加入购物车
  let url = URL + "/f/hd/s_10020/spCart/update";
  let data = {
    goodsId, num, orderType, specValueId, businessId, uuid,springraintoken
  }
  data.siteId = 's_10020';
  data.deviceType="web";
  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  })
}


