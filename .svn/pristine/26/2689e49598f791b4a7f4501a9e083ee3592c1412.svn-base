/**
 * Created by liuxiaoya on 2017/12/25 0025.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import state from './state'
import mutations from './mutations'
import * as getters from './getters'
import * as actions from './actions'
Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  strict: debug
})
