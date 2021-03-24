import {requestReal} from './../../../utils/request';

// {getMFG, getSMCLine, getSkuno, getUPHMsg, updateSMCUPH, addUPHMsg, getSkuName, updateSkuName}

// 拿制造处
export function getMFG() {  // token
    return requestReal('/api/SMCAccount/GetMfg', {
        methods: 'GET'
    });
}

// 拿SMC线体
export function getSMCLine(MFG) {
    return requestReal('/api/UPHAndSKUSetting/getSMCLine', {
        methods: 'GET',
        params: {
            MFG
        }
    });
}

// 拿机种料号
export function getSkuno(MFG, line) {
    return requestReal('/api/UPHAndSKUSetting/getSkuno', {
        methods: 'GET',
        params: {
            MFG, line
        }
    });
}

// 查询UPH信息
export function getUPHMsg(MFG, line, skuno) {
    return requestReal('/api/UPHAndSKUSetting/getUPHMsg', {
        methods: 'GET',
        params: {
            MFG, line, skuno
        }
    });
}

// 修改SMC UPH值
export function updateSMCUPH(skuno, SMCUPH) {
    return requestReal('/api/UPHAndSKUSetting/updateSMCUPH', {
        methods: 'GET',
        params: {
            skuno, SMCUPH
        }
    });
}

// 添加UPH信息
export function addUPHMsg({MFG, line, face, skuno, smcUPH}) {
    return requestReal('/api/UPHAndSKUSetting/addUPHMsg', {
        methods: 'GET',
        params: {
            MFG, line, face, skuno, smcUPH
        }
    });
}

// 查料号
export function skuSetting_getSkuno() {
    return requestReal('/api/UPHAndSKUSetting/skuSetting_getSkuno', {
        methods: 'GET',
        params: {}
    });
}

// 查机种名
export function getSkuName(skuno) {
    return requestReal('/api/UPHAndSKUSetting/getSkuName', {
        methods: 'GET',
        params: {
            skuno
        }
    });
}

// 修改机种名
export function updateSkuName(skuno, skuName) {
    return requestReal('/api/UPHAndSKUDSetting/updateSkuName', {
        methods: 'GET',
        params: {
            skuno, skuName
        }
    });
}

