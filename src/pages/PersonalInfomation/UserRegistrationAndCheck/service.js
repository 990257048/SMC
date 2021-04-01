import {requestReal} from '@/utils/request';

export async function getUserRegistrationMsg (){   //获取用户注册（待签核）信息
    return requestReal('/api/SMCAccount/getUserRegistrationMsg', {
        methods: 'GET',
        params: {}
    });
}

export async function userRegistrationSign (status, ID){  //status: 'pass' 通过 | 'reject' 驳回）
    return requestReal('/api/SMCAccount/userRegistrationSign', {     // /api/userRegistrationAndCheck/userRegistrationSign   
        methods: 'GET',
        params: {
            status,
            ID: ID.join(',')
        }
    });
}

// export async function userRegistrationResolve (ID){  //通过申请
//     return requestReal('/api/userRegistrationAndCheck/userRegistrationResolve', {
//         methods: 'GET',
//         params: {
//             ID: ID.join(',')
//         } 
//     });
// }

// export async function userRegistrationReject (ID){  //驳回申请
//     return requestReal('/api/userRegistrationAndCheck/userRegistrationReject', {
//         methods: 'GET',
//         params: {
//             ID: ID.join(',')
//         } 
//     });
// }
