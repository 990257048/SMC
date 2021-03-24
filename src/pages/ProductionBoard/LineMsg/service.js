
import {requestReal} from '@/utils/request';

// 1.获取制造处
export async function getAllMFG(Token) {
    return requestReal('/api/SMCAccount/GetMfg', {
        method: 'GET',
        params: {
            Token
        }
    });
}

// 2.获取线别
export async function getLineData(Mfg) {
    return requestReal('/api/LineMsg/GetLineListByMfg', {   ///api/SMCKanBan/GetLineByMfg   /api/LineMsg/GetLineListByMfg
        method: 'GET',
        params: {
            Mfg
        }
    });
}

// 查询附带信息 （包括 操作权限， 所有【產線|ME等相關】【课级】【部级】【处级】【线体管理员】信息）
export async function getLineAdditionalInformation(MFG) {
    return requestReal('/api/LineMsg/getLineAdditionalInformation', {
        method: 'GET',
        params: {MFG}
    });
}

// 3.查询线别基本信息 
export async function getLineBaseMsg(MFG, line) {
    return requestReal('/api/LineMsg/getLineBaseMsg', {
        method: 'GET',
        params: {
            MFG, line
        }
    });
}



// 4.修改线体名称
export async function updateLineName(MFG, originLine, currentLine) {
    return requestReal('/api/LineMsg/updateLineName', {
        method: 'GET',
        params: {
            MFG, originLine, currentLine
        }
    })
}

// 8.查询 【PCAS系统名】 对应的LICODE
export async function getLineCode(MFG, PCAS_SYS_name) {
    return requestReal('/api/LineMsg/getLineCode', {
        method: 'GET',
        params: {
            MFG, PCAS_SYS_name
        }
    })
}

// 5.修改线别信息
export async function updateLineMsg(MFG, line, data) {
    return requestReal('/api/LineMsg/updateLineMsg', {
        method: 'GET',
        params: {
            MFG, line, data
        }
    })
}

// 6.删除当前线别
export async function deleteLine(MFG, line) {
    return requestReal('/api/LineMsg/deleteLine', {
        method: 'GET',
        params: {
            MFG, line
        }
    })
}

// 7.新增线别
export async function addLine(MFG, data) {
    return requestReal('/api/LineMsg/addLine', {
        method: 'GET',
        params: {
            MFG, data
        }
    })
}


