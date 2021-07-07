import request, { requestReal } from '@/utils/request';


export async function getAllMFG(Token) {
    return requestReal('/api/SMCAccount/GetMfg', {
        method: 'GET',
        params: {
            Token
        }
    });
}


export async function getLineData(Mfg) {
    return requestReal('/api/SMCKanBan/GetLineByMfg', {
        method: 'GET',
        params: {
            Mfg
        }
    });
}



export async function getRealTimeProductionData(ClassName, Mfg, LineName, Date) {
    // ClassName 班别  （D為白班，N為夜班）
    // LineName  線體名
    // Mfg          製造處
    // Date       日期(格式：2020-09-21,不傳，默認為當天)
    return requestReal('/api/SMCKanBan/GetKanbanInfo', {
        method: 'GET',
        params: {
            ClassName,
            LineName,
            Mfg,
            Date
        }
    });
}

// http://10.132.50.107:800/api/SMCKanBan/GetDefaultDate?Mfg=MFGI

export async function getDefaultDate(Mfg) {   //获取班别
    return requestReal('/api/SMCKanBan/GetDefaultDate', {
        method: 'GET',
        params: {
            Mfg
        }
    });
}

// 获取pcas信息(包含licode )
// http://10.132.37.63:800/api/LineMsg/GetLineInfoFromPCAS?mfg=MFGII&lineName=DA3S2A
export async function GetLineInfoFromPCAS(mfg, lineName) {
    return requestReal('/api/LineMsg/GetLineInfoFromPCAS', {
        method: 'GET',
        params: {
            mfg, lineName
        }
    })
}


// 初始化获取异常大项
// http://10.132.37.63:800/api/appKanBanAbnormal/findAllAbnormalCategoryByLiCode?liCode=LI0071
export async function findAllAbnormalCategory(liCode) {
    return requestReal('/api/appKanBanAbnormal/findAllAbnormalCategoryByLiCode', {
        method: 'GET',
        params: {
            liCode
        }
    })
}

// findAllAbnormalCategory, findAllSubAbnormal, findSubAbnormalCategoryByLiCodeTypeCode, findAllAbnormalCategoryByLCTCIC, 
// getPCASOrgsByPcasUserID, responsibilitydepartment, insertAbnormal, bindPcasid

// 初始化异常小项 
// http://10.132.37.63:800/api/appKanBanAbnormal/findAllSubAbnormalCategory?liCode=LI0071
export async function findAllSubAbnormal(liCode) {
    return requestReal('/api/appKanBanAbnormal/findAllSubAbnormalCategory', {
        method: 'GET',
        params: {
            liCode
        }
    })
}


// 异常大项 -->  异常小项
// http://10.132.37.63:800/api/appKanBanAbnormal/findSubAbnormalCategoryByLiCodeTypeCode?liCode=LI0071&typeCode=05
export async function findSubAbnormalCategoryByLiCodeTypeCode(liCode, typeCode) {
    return requestReal('/api/appKanBanAbnormal/findSubAbnormalCategoryByLiCodeTypeCode', {
        method: 'GET',
        params: {
            liCode, typeCode
        }
    })
}

// 异常大项 +  异常小项 -》异常描述
// http://10.132.37.63:800/api/appKanBanAbnormal/findAllAbnormalCategoryByLCTCIC?liCode=LI0071&typeCode=05&itemCode=05c
export async function findAllAbnormalCategoryByLCTCIC(liCode, typeCode, itemCode) {
    return requestReal('/api/appKanBanAbnormal/findAllAbnormalCategoryByLCTCIC', {
        method: 'GET',
        params: {
            liCode, typeCode, itemCode
        }
    })
}

// 获取组织名称
// http://10.132.37.63:800/api/appKanBanAbnormal/getPCASOrgsByPcasUserID?pcasUserID=F4185878
export async function getPCASOrgsByPcasUserID(pcasUserID) {
    return requestReal('/api/appKanBanAbnormal/getPCASOrgsByPcasUserID', {
        method: 'GET',
        params: {
            pcasUserID
        }
    })
}

// 获取责任单位
// http://10.132.37.63:800/api/appKanBanAbnormal/responsibilitydepartment?liCode=LI0071
export async function responsibilitydepartment(liCode) {
    return requestReal('/api/appKanBanAbnormal/responsibilitydepartment', {
        method: 'GET',
        params: {
            liCode
        }
    })
}

// 提交***
// http://localhost:12807/api/appKanBanAbnormal/insertAbnormal?liCode=&workId=&abnormalType=&abnormalTypeDesc=&abnormalItem=&abnormalItemDesc=&partnum=&dept=&startDate=&startTime=&endDate=&endTime=&desc=&wo=&f_organno=&secode=&MFG=
export async function insertAbnormal(...data) {
    // liCode workId abnormalType abnormalTypeDesc abnormalItem abnormalItemDesc partnum dept startDate startTime endDate endTime desc wo f_organno secode MFG
    //        
    return requestReal('/api/appKanBanAbnormal/insertAbnormal', {
        method: 'GET',
        params: {
            ...data
        }
    })
}

// PCAS账号绑定***
// http://localhost:12807/api/appKanBanAbnormal/bindPcasid?smcWorkId=&pcasUserId=
export async function bindPcasid(smcWorkId, pcasUserId) {
    // smcWorkId pcasUserId
    return requestReal('/api/appKanBanAbnormal/bindPcasid', {
        method: 'GET',
        params: {
            smcWorkId, pcasUserId
        }
    })
}



