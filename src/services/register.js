import requestMock, { requestReal } from '@/utils/request';

// 获取 部门 职位 制造处
export async function getAttachedMessage(){
    return requestReal('/api/SMCAccount/getAttachedMessage', {
        methods: 'GET',
        params: {}
    });
}

// 获取BU
export async function getBU(MFG){
    return requestReal('/api/SMCAccount/getBU', {
        methods: 'GET',
        params: {
            MFG
        }
    });
}

// 注册
export async function userRegister(msg){
    return requestReal('/api/SMCAccount/userRegister', {
        methods: 'GET',
        params: {
            ...msg
        }
    });
}

