/**
 * Created by liuxiaoya on 2017/12/22 0022.
 */
export const cartNumber = ({commit,state}, cartNum) => {
  commit('SetCartNumber', cartNum);
};
export const GetSearchHistoryIn =({commit,state}) => {   //向本地arr中赋值
  commit('GetSearchHistoryIn');
};
export const AddSearchHistory =({commit,state},str) => {   ////向本地arr中添加搜索历史,除去重复
  commit('AddSearchHistory',str);
};
export const AddSearchHistoryToLS=({commit,state}) =>{      //赋值到LS
  commit('AddSearchHistoryToLS')
}


