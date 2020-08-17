import { stringify } from 'querystring';
import { history } from 'umi';
import { fakeAccountLogin } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';

const Model = {
  namespace: 'login',
  state: {                // status: 登录状态（ok）  type: 登录类型（account账号登录）
    status: undefined,   
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      // console.log(payload, response);
      yield put({
        type: 'user/changeLoginStatus',     // 设置登录状态
        payload: response,
      }); // Login successfully
      setAuthority(response.currentAuthority);    // 设置账号权限


      if (response.status === 'ok') {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();    
        let { redirect } = params;  // 整个路由
        
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          // console.log(urlParams, params, redirect, redirectUrlParams);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            // console.log(redirect);
            if (redirect.match(/^\/.*#/)) {     // 如果是哈希路由去掉 # 号
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';     
            return;
          }
        }

        // history.replace(redirect || '/');    // 路由跳转
        history.push(redirect || '/');    // 路由跳转changeLoginStatus
      }
    },

    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note

      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    // changeLoginStatus(state, { payload }) {
    //   setAuthority(payload.currentAuthority);    // 设置账号权限
    //   return { ...state, status: payload.status, type: payload.type };
    // },
  },
};
export default Model;
