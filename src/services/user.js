import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}
// export async function queryCurrent() {
//   return request('/api/currentUser');
// }
export async function queryNotices() {
  return request('/api/notices');
}

//----------------------------------------------

export async function queryCurrent(token) {
  return request('/api/currentUser_new', {
    method: 'GET',
    params: {
      token
    }
  });
}
