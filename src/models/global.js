import { getNotices } from '@/services/user';
import { message } from 'antd';

const GlobalModel = {
  namespace: 'global',
  state: {
    width: null,
    height: null,
    collapsed: false,
    notices: [
      // {
      //   msg: '異常決策中心-未結案事項(5個)',
      //   count: 5,
      //   url: '/increase-productivity/abnormal-decision?description=open-case'
      // },
      // {
      //   msg: 'SMT超5天未轉板（5個）',
      //   count: 5,
      //   url: '/increase-productivity/xxx?xxx=xxx'
      // }
    ],

  },

  reducers: {
    setSize(state, { height, width }) {
      return { ...state, height, width }
    },

    changeLayoutCollapsed(
      state = {
        notices: [],
        collapsed: true,
      },
      { payload },
    ) {
      return { ...state, collapsed: payload };
    },

    setNotices(state, { notices }) {
      return { ...state, notices }
    }
  },

  effects: {
    *getNotices(_, { call, put, select }) {  // 每次系統路由變化後執行(獲取全局通知)
      let { Status, Data, Message } = yield call(getNotices);
      console.log(Data);
      if (Status == 'Pass') {
        yield put({
          type: 'setNotices',
          notices: Data
        });
      } else {
        message.error(Message);
      }
    }
  },

  subscriptions: {
    setup({ history, dispatch }) {  // 打開系統時執行一次
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      history.listen(({ pathname, search, query }) => {   // 系統路由發生變化後執行
        if (typeof window.ga !== 'undefined') {  // 原本就有的
          window.ga('send', 'pageview', pathname + search);
        }

        // 路由變化後獲取全局通知
        dispatch({
          type: 'getNotices'
        });
        switch (pathname) {
          case '/increase-productivity/abnormal-decision': // 異常決策中心
            if (query.description && query.description == 'open-case') { // 未結案異常快捷入口
              // 加載異常表數據
              setTimeout(() => {
                dispatch({
                  type: 'AbnormalDecision/getTableDataByOpenCase'
                });
              }, 1000);
            }
            break;
          default:
            // 不做任何處理
            break;
        }
      });
    },
  },
};
export default GlobalModel;
