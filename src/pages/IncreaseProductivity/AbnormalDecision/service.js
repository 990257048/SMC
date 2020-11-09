import request, { requestReal } from '@/utils/request';
import cookies from 'js-cookie';

export async function getAllMfg () {
    // console.log(cookies.get('token'));
    return requestReal('/api/SMCAccount/GetMfg', {
        method: 'GET',
        params: {
            Token: cookies.get('token')
        }
    });
}

export async function getBU (MFG) {
    console.log(MFG);
    return requestReal('/api/getBU', {
        method: 'GET',
        params: {
            MFG
        }
    });
}

export async function getGraph1 (sendData) {
    console.log(sendData);
    return requestReal('/api/abnormalDecision/getGraph1', {
        method: 'GET',
        params: {
            data: sendData
        }
    });
};

export async function getGraph2 (sendData) {
    console.log(sendData);
    return requestReal('/api/abnormalDecision/getGraph2', {
        method: 'GET',
        params: {
            data: sendData
        }
    });
}

export async function getGraph3 (sendData) {
    console.log(sendData);
    return requestReal('/api/abnormalDecision/getGraph3', {
        method: 'GET',
        params: {
            data: sendData
        }
    });
}

export async function getGraph4 (sendData) {
    console.log(sendData);
    return requestReal('/api/abnormalDecision/getGraph4', {
        method: 'GET',
        params: {
            data: sendData
        }
    });
}

export async function getGraph5 (sendData) {
    console.log(sendData);
    return requestReal('/api/abnormalDecision/getGraph5', {
        method: 'GET',
        params: {
            data: sendData
        }
    });
}

export async function getTableData (sendData) {
    return requestReal('/api/abnormalDecision/getTable', {
        method: 'GET',
        params: {
            data: sendData
        }
    });
}

export async function toggerCollect (id) {
    return requestReal('/api/abnormalDecision/toggerCollect', {
        method: 'GET',
        params: {
            id
        }
    });
}