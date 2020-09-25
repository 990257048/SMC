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

