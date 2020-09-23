import { queryCurrent, query as queryUsers } from '@/services/user';
import { message } from 'antd';

const UserModel = {
  namespace: 'user',
  state: {
    login: {
      status: undefined,
      type: undefined
    },
    currentUser: {},
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchCurrent({ token }, { call, put }) {
      // console.log("fetchCurrent run !!");
      const {Status, Message, Data} = yield call(queryCurrent, token);
      console.log({Status, Message, Data});
      if(Status == 'Pass'){
        message.success(Message);
        yield put({
          type: 'saveCurrentUser',
          payload: Data,
        });
      }else{
        message.error(Message);
      }
    },
  },
  reducers: {
    changeLoginStatus(state, {payload}){   // status: 登录状态（ok）  type: 登录类型（account账号登录）
      // console.log(payload);
      return {...state, login: {...state.login, status: payload.status, type: payload.type }};
    },
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
