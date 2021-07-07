import { requestReal } from '../../../utils/request';

export async function getSMCApp() {
    return requestReal('https://eface.efoxconn.com/api/DownLoadFile/GetFile?appName=SMC.apk', {
        method: 'POST'
    })
}