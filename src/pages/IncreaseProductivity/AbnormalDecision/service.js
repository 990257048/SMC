import request, { requestReal } from '@/utils/request';

export async function getGraph1 () {
    return requestReal('/api/abnormalDecision/getGraph1', {
        method: 'GET',
        params: {
            mfg: 'MFGII'
        }
    });
};

export async function getGraph2 () {
    return requestReal('/api/abnormalDecision/getGraph2', {
        method: 'GET'
    });
}

export async function getGraph3 () {
    return requestReal('/api/abnormalDecision/getGraph3', {
        method: 'GET'
    });
}

export async function getGraph4 () {
    return requestReal('/api/abnormalDecision/getGraph4', {
        method: 'GET'
    });
}

export async function getGraph5 () {
    return requestReal('/api/abnormalDecision/getGraph5', {
        method: 'GET'
    });
}