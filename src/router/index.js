import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);
// 首页
const Home = (resolve) => {
  import('@/components/home').then((module) => {
    resolve(module);
  })
};
// 商品列表
const Goods = (resolve) => {
  import('@/components/goods').then((module) => {
    resolve(module);
  })
};
// 搜索结果页
const searchList = (resolve) => {
  import('@/components/search-list').then((module) => {
    resolve(module);
  })
};
//商品详情页
const goodsDetail = (resolve) => {
  import('@/components/goods-detail').then((module) => {
    resolve(module);
  })
};
//全球购
const world = (resolve) => {
  import('@/components/world').then((module) => {
    resolve(module);
  })
};
//vip
const vip = (resolve) => {
  import('@/components/vip').then((module) => {
    resolve(module);
  })
};
//老人
const old = (resolve) => {
  import('@/components/old').then((module) => {
    resolve(module);
  })
};
//house
const house = (resolve) => {
  import('@/components/house').then((module) => {
    resolve(module);
  })
};
//搜索页
const search = () => import('@/components/search');
//限时秒杀页
const indulgence = () => import('@/components/indulgence');
export default new Router({
  mode: 'history',
  scrollBehavior(to,from,savePosition){
    //to：记录目标 点击浏览器前进后退或者切换导航触发
    //from:记录来源 点击浏览器前进后退或者切换导航触发
    //savePosition：记录滚动条的坐标 点击浏览器前进后退触发
    if(savePosition){
      return savePosition
    }else {
      return {x:0,y:0}
    }
  },
  routes: [
    {
      path: '/',
      component: Home,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/goods',
      component: Goods,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/searchList',
      component: searchList,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/goodsDetail/:id',
      component: goodsDetail,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/search',
      component: search,
      meta: {
        keepAlive: false // 需要被缓存
      }
    },
    {
      path: '/indulgence',
      component: indulgence,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/vip',
      component: vip,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/house',
      component: house,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/old',
      component: old,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path:'/world',
      component: world,
      meta: {
        keepAlive: true // 需要被缓存
      }
    }
  ]
})
