/**
 * Created by liuxiaoya on 2017/12/22 0022.
 */
import {local,arrString} from '../common/js/util.js'
const mutations = {
  SetCartNumber(state, number){
    state.cartNumber =  number;
  },
  GetSearchHistoryIn(state){      //向本地arr中赋值
    var str=localStorage.getItem('searchHis');
    if(str !=null || str !=undefined || str !=''){ //有该键存储
      state.searchHis=str.split(',')   //取得键值赋给
    }
  },
  AddSearchHistory(state,str){   //向本地arr中添加搜索历史,除去重复
    if(state.searchHis.indexOf(str)<0){   //数组中不存在
      if(state.searchHis.length<5)
      state.searchHis.unshift(str);       //头部添加元素
      else{
      state.searchHis.unshift(str);
      state.searchHis=state.searchHis.slice(0,5);  //取数组前五项
      }
    }else{

    }
  },
  AddSearchHistoryToLS(state){   //赋值到LS
    if(state.searchHis !==[]){   //数组不为空
      localStorage.setItem('searchHis',state.searchHis.join(','))
    }

  }
}


export default mutations;
