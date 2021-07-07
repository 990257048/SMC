/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import umiRequest, { extend } from 'umi-request';
import cookies from 'js-cookie';
import { notification } from 'antd';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/**
 * 异常处理程序
 */

const errorHandler = error => {
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }

  return response;
};
/**
 * 配置request请求时的默认参数
 */

const requestMock = extend({    // 请求模拟数据
  errorHandler,  // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

// umiRequest.interceptors.request.use(async (url, options) => {
//   console.log(url, options);
//   const headers = {
//     'Content-Type': 'application/json',
//     Accept: 'application/json',
//     Token: cookies.get('token'),
//     xxxc: 'xzxxxx'
//   };
//   return {
//     url: 'http://localhost:3001/umiui/info?t=1599788167981',
//     options: { ...options, headers },
//   };
// });

//==========================================================================

export const isMock = false;    // 是否使用模拟数据
export const isDebug = true;   // 是否DEBUG

//==========================================================================

let requestReal;
if (!isMock) {
  requestReal = (url, options, ...args) => {   // 请求真实数据
    isDebug && console.log(url, options);
    const host = 'http://10.132.50.107:800';
    // 'http://10.132.50.107:808'; 
    // 'http://10.132.50.107:800'; 正常
    // 'https://gsmc.efoxconn.com:809';   
    // 'http://10.132.50.107:800';  
    // 'http://10.132.37.63:800'; 
    // 'https://gcrc.efoxconn.com:8023'; 
    // http://localhost:3001  // 宿主

    return umiRequest(host + url, {
      ...options,
      // credentials: 'include',
      headers: {
        // 'Content-Type': 'application/json',
        Accept: 'application/json',
        token: cookies.get('token'),
        lang: localStorage.umi_locale
      },
    }, ...args);

  }
} else {
  //requestReal = requestMock;  //请求模拟数据
  requestReal = (...args) => {
    isDebug && console.log(args);
    return requestMock(...args);
  }
}


// credentials: 'include', // 默认请求是否带上cookie
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//       token: cookies.get('token')
//     },

export { requestReal };
export default requestMock;

/// 封装请求方法： 方便切换模拟数据和真实数据  20200909 add by gch

// const isMock = true;   // 是否使用Mock数据
// const host = 'http://10.132.37.63:800';  // 宿主

// const requestMock = extend({    // 请求模拟数据
//   errorHandler,  // 默认错误处理
//   credentials: 'include', // 默认请求是否带上cookie
// });

// const requestReal = (url, ...args) => {   // 请求真实数据
//   return umiRequest(host + url, ...args);
// }

// const request = (url, ...args) => {
//   if(isMock){
//     return requestMock(url, ...args);
//   }else{
//     return requestReal(url, ...args);
//   }
// }


