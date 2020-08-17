import request from 'umi-request';

export async function test_api(params) {
    return request('/repair-wip/test', {
        method: 'POST',
        data: params,
    });
}

export async function test_api1(params) {
    return request('/repair-wip/test1', {
        method: 'GET',
        params
    });
}