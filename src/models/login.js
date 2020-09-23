import { stringify } from 'querystring';
import cookies from 'js-cookie';
import { history } from 'umi';
import { message } from 'antd';
import { fakeAccountLogin, accountLogin } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(accountLogin, payload);
      console.log(response);
      // console.log(payload, response);
      yield put({
        type: 'user/changeLoginStatus',     // 设置登录状态
        payload: response,
      }); // Login successfully
      
      if (response.Status === 'Pass') {
        setAuthority('admin');    // 设置账号权限
        cookies.set('token', response.Data.Token)  // 设置token

        const urlParams = new URL(window.location.href);
        const params = getPageQuery(); // 解密路由
        let { redirect } = params;  // 整个路由（解密后）

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

        history.replace(redirect || '/');    // 路由跳转
        // history.push(redirect || '/');    // 路由跳转changeLoginStatus
      }else{
        message.error(response.Message);
      }

    },

    logout() {
      // const { redirect } = getPageQuery(); // Note: There may be security issues, please note

      // console.log(window.location, {search: stringify({
      //   redirect: window.location.href,
      // })} );

      cookies.remove('token');
      history.replace({
        pathname: '/user/login',
        search: stringify({
          redirect: window.location.href,
        }),
      });

      // if (window.location.pathname !== '/user/login' && !redirect) {
      //   history.replace({
      //     pathname: '/user/login',
      //     search: stringify({
      //       redirect: window.location.href,
      //     }),
      //   });
      // }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);    // 设置账号权限
      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;
