import request, {isMock, requestReal} from '@/utils/request';
import {mapByObj} from '@/utils/custom';
import cookies from 'js-cookie';

let apis = {
    getAllMfg: {
        mock: '/api/SMCAccount/GetMfg',
        real: '/api/SMCAccount/GetMfg'
    },
    getBU: {
        mock: '/api/getBU',
        real: '/api/abnormalDecision/getBU'
    },
    //---------------------------------------------------
    getGraph1: {
        mock: '/api/abnormalDecision/getGraph1',
        real: '/api/SMCAbnormalChar/GetAbnormalChar'
    },
    getGraph2: {
        mock: '/api/abnormalDecision/getGraph2',
        real: '/api/SMCAbnormalChar/GetTypeChar'
    },
    getGraph3: {
        mock: '/api/abnormalDecision/getGraph3',
        real: '/api/SMCAbnormalChar/GetReasonChar'
    },
    getGraph4: {
        mock: '/api/abnormalDecision/getGraph4',
        real: '/api/SMCAbnormalChar/GetAbnormalHours'
    },
    getGraph5: {
        mock: '/api/abnormalDecision/getGraph5',
        real: '/api/SMCAbnormalChar/GetAbnormalStatus'
    },
    getTableData: {
        mock: '/api/abnormalDecision/getTable',
        // mock: '/api/SMCAbnormalChar/GetAbnormalTable',
        real: '/api/SMCAbnormalChar/GetAbnormalTable'
    },
    // ---------------------------------------------------
    toggerCollect: {
        mock: '/api/abnormalDecision/toggerCollect',
        real: '/api/abnormalDecision/toggerCollect'
    },
    getNewAbnormalMsg: {
        mock: '/api/abnormalDecision/getNewAbnormalMsg',
        real: '/api/abnormalDecision/getNewAbnormalMsg'
    },
    getAbnormalMaintenanceMsg: {
        mock: '/api/abnormalDecision/getAbnormalMaintenanceMsg',
        real: '/api/abnormalDecision/getAbnormalMaintenanceMsg'
    },
    uploadFile: {
        mock: '/api/abnormalDecision/uploadFile',
        real: '/api/abnormalDecision/uploadFile'
    },
    abnormalMaintenanceSaveDraft: {
        mock: '/api/abnormalDecision/abnormalMaintenanceSaveDraft',
        real: '/api/abnormalDecision/abnormalMaintenanceSaveDraft'
    },
    abnormalMaintenanceSubmit: {
        mock: '/api/abnormalDecision/abnormalMaintenanceSubmit',
        real: '/api/abnormalDecision/abnormalMaintenanceSubmit'
    },
    abnormalMaintenanceResolve: {
        mock: '/api/abnormalDecision/abnormalMaintenanceResolve',
        real: '/api/abnormalDecision/abnormalMaintenanceResolve'
    },
    abnormalMaintenanceReject: {
        mock: '/api/abnormalDecision/abnormalMaintenanceReject',
        real: '/api/abnormalDecision/abnormalMaintenanceReject'
    }
}

apis = mapByObj(apis, o => isMock ? o.mock : o.real);

export async function getAllMfg () {
    return requestReal(apis.getAllMfg, {
        method: 'GET',
        params: {
            Token: cookies.get('token')
        }
    });
}

export async function getBU (MFG) {
    return requestReal(apis.getBU, {
        method: 'GET',
        params: {
            MFG
        }
    });
}

export async function getGraph1 (sendData) {
    return requestReal(apis.getGraph1, {
        method: 'GET',
        params: {
            data: sendData
        }
    });
};

export async function getGraph2 (sendData) {
    return requestReal(apis.getGraph2, {
        method: 'GET',
        params: {
            data: sendData
        }
    });
}

export async function getGraph3 (sendData) {
    return requestReal(apis.getGraph3, {
        method: 'GET',
        params: {
            data: sendData
        }
    });
}

export async function getGraph4 (sendData) {
    return requestReal(apis.getGraph4, {
        method: 'GET',
        params: {
            data: sendData
        }
    });
}

export async function getGraph5 (sendData) {
    return requestReal(apis.getGraph5, {
        method: 'GET',
        params: {
            data: sendData
        }
    });
}

export async function getTableData (sendData) {   //获取异常列表
    return requestReal(apis.getTableData, {
        method: 'GET',
        params: {
            data: sendData
        }
    });
}

export async function toggerCollect (id) {   //切换收藏操作
    return requestReal(apis.toggerCollect, {
        method: 'GET',
        params: {
            id
        }
    });
}

export async function getNewAbnormalMsg (sendData) {   //获取新增异常需要的附带信息
    return requestReal(apis.getNewAbnormalMsg, {
        method: 'GET',
        params: {
            data: sendData
        }
    });
}

export async function getAbnormalMaintenanceMsg (sendData) {  //获取异常维护需要的附带信息
    return requestReal(apis.getAbnormalMaintenanceMsg, {
        method: 'POST',
        data: sendData
    });
}

export async function uploadFile (sendData) {  //上传文件操作(作废)
    return requestReal(apis.uploadFile, {
        method: 'POST',
        data: sendData
    })
}

export async function newAbnormal (sendData) {   //新增异常操作
    return requestReal(apis.newAbnormal, {
        method: 'POST',
        data: sendData
    });
}

// abnormalMaintenanceSaveDraft

export async function abnormalMaintenanceSaveDraft (sendData) {   //異常維護： 保存草稿
    return requestReal(apis.abnormalMaintenanceSaveDraft, {
        method: 'POST',
        data: sendData
    })
}


export async function abnormalMaintenanceSubmit (sendData) {   //異常維護： 提交
    return requestReal(apis.abnormalMaintenanceSubmit, {
        method: 'POST',
        data: sendData
    })
}


export async function abnormalMaintenanceResolve (sendData) {   //異常維護： 結案申請通過
    return requestReal(apis.abnormalMaintenanceResolve, {
        method: 'GET',
        params: {
            data: sendData
        }
    })
}


export async function abnormalMaintenanceReject (sendData) {   //異常維護： 結案申請拒絕
    return requestReal(apis.abnormalMaintenanceReject, {
        method: 'GET',
        params: {
            data: sendData
        }
    })
}


// export async function getAllMfg () {
//     // console.log(cookies.get('token'));
//     return requestReal('/api/SMCAccount/GetMfg', {
//         method: 'GET',
//         params: {
//             Token: cookies.get('token')
//         }
//     });
// }

// export async function getBU (MFG) {
//     return requestReal('/api/getBU', {
//         method: 'GET',
//         params: {
//             MFG
//         }
//     });
// }

// export async function getGraph1 (sendData) {
//     return requestReal('/api/abnormalDecision/getGraph1', {
//         method: 'GET',
//         params: {
//             data: sendData
//         }
//     });
// };

// export async function getGraph2 (sendData) {
//     return requestReal('/api/abnormalDecision/getGraph2', {
//         method: 'GET',
//         params: {
//             data: sendData
//         }
//     });
// }

// export async function getGraph3 (sendData) {
//     return requestReal('/api/abnormalDecision/getGraph3', {
//         method: 'GET',
//         params: {
//             data: sendData
//         }
//     });
// }

// export async function getGraph4 (sendData) {
//     return requestReal('/api/abnormalDecision/getGraph4', {
//         method: 'GET',
//         params: {
//             data: sendData
//         }
//     });
// }

// export async function getGraph5 (sendData) {
//     return requestReal('/api/abnormalDecision/getGraph5', {
//         method: 'GET',
//         params: {
//             data: sendData
//         }
//     });
// }

// export async function getTableData (sendData) {   //获取异常列表
//     return requestReal('/api/abnormalDecision/getTable', {
//         method: 'GET',
//         params: {
//             data: sendData
//         }
//     });
// }

// export async function toggerCollect (id) {   //切换收藏操作
//     return requestReal('/api/abnormalDecision/toggerCollect', {
//         method: 'GET',
//         params: {
//             id
//         }
//     });
// }

// export async function getNewAbnormalMsg (sendData) {   //获取新增异常需要的附带信息
//     return requestReal('/api/abnormalDecision/getNewAbnormalMsg', {
//         method: 'GET',
//         params: {
//             data: sendData
//         }
//     });
// }

// export async function getAbnormalMaintenanceMsg (sendData) {  //获取异常维护需要的附带信息
//     return requestReal('/api/abnormalDecision/getAbnormalMaintenanceMsg', {
//         method: 'POST',
//         data: sendData
//     });
// }

// export async function uploadFile (sendData) {  //上传文件操作(作废)
//     return requestReal('/api/abnormalDecision/uploadFile', {
//         method: 'POST',
//         data: sendData
//     })
// }

// export async function newAbnormal (sendData) {   //新增异常操作
//     return requestReal('/api/abnormalDecision/newAbnormal', {
//         method: 'POST',
//         data: sendData
//     });
// }

// // abnormalMaintenanceSaveDraft

// export async function abnormalMaintenanceSaveDraft (sendData) {   //異常維護： 保存草稿
//     return requestReal('/api/abnormalDecision/abnormalMaintenanceSaveDraft', {
//         method: 'POST',
//         data: sendData
//     })
// }


// export async function abnormalMaintenanceSubmit (sendData) {   //異常維護： 提交
//     return requestReal('/api/abnormalDecision/abnormalMaintenanceSubmit', {
//         method: 'POST',
//         data: sendData
//     })
// }


// export async function abnormalMaintenanceResolve (sendData) {   //異常維護： 結案申請通過
//     return requestReal('/api/abnormalDecision/abnormalMaintenanceResolve', {
//         method: 'GET',
//         params: {
//             data: sendData
//         }
//     })
// }


// export async function abnormalMaintenanceReject (sendData) {   //異常維護： 結案申請拒絕
//     return requestReal('/api/abnormalDecision/abnormalMaintenanceReject', {
//         method: 'GET',
//         params: {
//             data: sendData
//         }
//     })
// }
