/**
 * Created by liuxiaoya on 2017/12/25 0025.
 */
import {URL} from './config';
import axios from 'axios';

export function getSearch(keywords,pageIndex,pCateId,pageSize) {
  let url =URL + '/f/hd/s_10020/goods/list/json';
  const data = {
    keywords: keywords,
    pageIndex: pageIndex,
    pageSize:10,
    pCateId: pCateId,
  };
 return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data);
  })
}
//热门搜索
export function getSearchHot(keywords) {
  let url = URL + '/f/hd/s_10020/advertising/list';
  const data = {
      type: 5
    }
  ;
  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data);
  })
}
export function getCategory() { //商品分类
  const url = URL + "/f/hd/s_10020/loadCategory";
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
//需求登记
export function postRegister(userMobile, userName, goodsName, goodsNum, goodsSpec,content) {
  let url = URL + '/f/hd/s_10020/spgoodsrequirement/add';
  const data = {
    userMobile,
    userName,
    goodsName,
    goodsNum,
    goodsSpec,
    content
    }
  ;
  return axios.post(url, 'post', {params: data}).then((res) => {
    return Promise.resolve(res.data);
  })
}
//获取分类数据
export function getCategoryList(type, jumpVal, jumpType,pageIndex,pageSize) {
  let url = URL + '/s/s_10020/shop/adver/xcx/getDatas';
  const data = {
    type, jumpVal, jumpType,pageIndex,pageSize
  }
  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data);
  })
}
