import request, { requestReal } from '@/utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryNotices() {
  return request('/api/notices');
}

//----------------------------------------------

export async function getNotices() {
  return requestReal('/api/getNotices');
}

export async function queryCurrent(Token) {
  return requestReal('/api/SMCAccount/GetBUPrivillege', {
    method: 'GET',
    params: {
      Token
    }
  });
}
