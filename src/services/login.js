import requestMock, { requestReal } from '@/utils/request';

// mock

// export async function fakeAccountLogin(params) {   // 请求登录
//   return requestMock('/api/login/account_new', {
//     method: 'POST',
//     data: params
//   });
// }

export async function getFakeCaptcha(mobile) {
  return requestMock(`/api/login/captcha_new?mobile=${mobile}`);
}

//----------------------------------------------------------------------------

export async function accountLogin(params) {
  console.log(params);
  return requestMock('/api/login/account_new', {
    method: 'POST',
    data: params
  });
}


// export async function accountLogin(params) {
//   console.log(params);
//   return requestReal( '/api/SMCAccount/CheckUserInfo1?WORKID=F1320854&KEY=123&LANGUAGE=ENGLISH' // '/api/DutySheet/GetDutySheet' // '/api/SMCAccount/Connect?User=F1320854',
//     // {
//     //   method: 'GET',
//     //   credentials: 'include',
//     //   headers: {
//     //     "Content-Type": "application/x-www-form-urlencoded",
//     //   },
//     //   data: params
//     // }
//   );
// }



























//===========================================================================================================================================
// real

// export async function fakeAccountLogin(params) {   // 请求登录
//   console.log(params);
//   return requestReal('/api/SMCAccount/CheckUserInfo', {
//     method: 'POST',
//     // credentials: 'include',
//     // headers: {
//     //   "Content-Type": "application/x-www-form-urlencoded",
//     // },
//     data: {
//       WORKID: 'F1320854',
//       KEY: 'Ff1320854!!!',
//       LANGUAGE: 'ENGLISH'
//     }
//   });
// }

// export async function fakeAccountLogin(params) {   // 请求登录
//   console.log(params);
//   return requestReal('/api/SMCAccount/CheckUserInfo', {
//     method: 'GET',
//     // credentials: 'include',
//     // headers: {
//     //   "Content-Type": "application/x-www-form-urlencoded",
//     // },
//     params: {
//       WORKID: 'F1320854',
//       KEY: 'Ff1320854!!!',
//       LANGUAGE: 'ENGLISH'
//     }
//   });
// }

// export async function fakeAccountLogin(params) {   // 请求登录
//   console.log(params);
//   return requestReal('/api/DutySheet/GetDutySheet', {
//     method: 'GET',
//     credentials: 'include'
//   });
// }

// export async function fakeAccountLogin(params) {   // 请求登录
//   console.log(params);
//   return requestReal('/umiui/info?t=1599639944611', {
//     method: 'GET',
//     credentials: 'include'
//   });
// }

// http://localhost:3001/umiui/info?t=1599639944611

// http://10.132.37.63:800/api/SMCAccount/CheckUserInfo?WORKID=F1320854&KEY=Ff1320854!!!&LANGUAGE=ENGLISH

// http://10.132.37.63:800/api/SMCAccount/Connect?WORKID=F1320854

// https://gcrc.efoxconn.com:8023/api/DutySheet/GetDutySheet?SearchText=&ScreenArray=[{"key":"DutySheet_Info_Date","value":"2020-07-10"},{"key":"DutySheet_Info_Type","value":"白班"},{"key":"Type","value":"IT"},{"key":"DutySheet_Type_Name","value":"SFC(D區)"}]

// https://gcrc.efoxconn.com:8023/api/DutySheet/GetDutySheet?SearchText=&ScreenArray=[{"key":"DutySheet_Info_Date","value":"2020-07-10"},{"key":"DutySheet_Info_Type","value":"白班"},{"key":"Type","value":"IT"},{"key":"DutySheet_Type_Name","value":"SFC(E區)"}]

// https://gcrc.efoxconn.com:8023/api/DutySheet/GetDutySheet?SearchText=&ScreenArray=[{"key":"DutySheet_Info_Date","value":"2020-07-10"},{"key":"DutySheet_Info_Type","value":"白班"},{"key":"Type","value":"IT"},{"key":"DutySheet_Type_Name","value":"SFC(F區)"}]



// https://gcrc.efoxconn.com:8023/api/DutySheet/GetDutySheet?SearchText=&ScreenArray=[{"key":"DutySheet_Info_Date","value":"2020-07-10"},{"key":"DutySheet_Info_Type","value":"夜班"},{"key":"Type","value":"IT"},{"key":"DutySheet_Type_Name","value":"SFC(D區)"}]

// https://gcrc.efoxconn.com:8023/api/DutySheet/GetDutySheet?SearchText=&ScreenArray=[{"key":"DutySheet_Info_Date","value":"2020-07-10"},{"key":"DutySheet_Info_Type","value":"夜班"},{"key":"Type","value":"IT"},{"key":"DutySheet_Type_Name","value":"SFC(E區)"}]

// https://gcrc.efoxconn.com:8023/api/DutySheet/GetDutySheet?SearchText=&ScreenArray=[{"key":"DutySheet_Info_Date","value":"2020-07-10"},{"key":"DutySheet_Info_Type","value":"夜班"},{"key":"Type","value":"IT"},{"key":"DutySheet_Type_Name","value":"SFC(F區)"}]

