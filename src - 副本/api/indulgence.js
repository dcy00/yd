/**
 * Created by liuxiaoya on 2017/11/3 0003.
 * 每日特惠
 */
import axios from 'axios'
import {URL} from './config'

//获取秒杀数据seckill
export function getSeckillData() {
  const url = URL + "/f/hd/s_10020/periods/indexGoods";
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
//获取秒杀数据seckill秒杀Id
export function findPeriodsInfo() {
  const url = URL + "/f/app/s_10020/periods/findPeriodsInfo";
  let param = {
    periodsId:""
  }
  return axios.get(url, {params: param}).then((res) => {
    return Promise.resolve(res.data)
  })
}
//获取秒杀数据seckill秒杀详情页
export function findSeckillData(periodsId,pageIndex,pageSize) {
  const url = URL + "/f/app/s_10020/periods/findGoodsList";
  let param = {
    periodsId,pageIndex,pageSize
  }
  return axios.get(url, {params: param}).then((res) => {
    return Promise.resolve(res.data)
  })
}
