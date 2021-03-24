import {getMFG, getSMCLine, getSkuno, getUPHMsg, updateSMCUPH, addUPHMsg, skuSetting_getSkuno, getSkuName, updateSkuName} from './service';
import {message} from 'antd';

export default {
    namespace: 'UPHAndSKUSetting',
    state: {
        UPHMsg: {
            MFG: '',
            line: '',
            skuno: '',
            allMFG: ['MFGI', 'MFGII'],
            allLine: ['LINE1', 'LINE2', 'LINE3'],
            allSkuno: ['68-100056-01', '68-100056-02', '68-100056-03']
        },
        skuMsg: {
            skuno: '',
            allSkuno: ['68-100056-01', '68-100056-02', '68-100056-03'],
            skuName: 'aaaa'
        }
    },
    reducers: {
        // 设置UPH信息
        setUPHMsg: (_, {payload}) => ({ ..._, UPHMsg: {..._.UPHMsg, ...payload} }),
        // 设置机种信息
        setSkuMsg: (_, {payload}) => ({ ..._, skuMsg: {..._.skuMsg, ...payload} })
        
    },
    effects: {
        getMFG: function* (_, {select, put, call}){
            let {Status, Message, Data: {Mfg}} = yield call(getMFG);
            if(Status == 'Pass'){
                // yield put({type: 'setUPHMsg', payload: {allMFG: Mfg, MFG: Mfg[0], line: '', skuno: ''}});
                yield put({type: 'setUPHMsg', payload: {allMFG: Mfg, MFG: Mfg[0]}});
            }else{
                message.error(Message);
            }
        },
        getSMCLine: function* ({MFG}, {select, put, call}){
            let {Status, Message, Data} = yield call(getSMCLine, MFG);
            if(Status == 'Pass'){
                // yield put({type: 'setUPHMsg', payload: {allLine: Data, line: '', skuno: ''}});
                yield put({type: 'setUPHMsg', payload: {allLine: Data}});
            }else{
                message.error(Message);
            }
        },
        getSkuno: function* ({MFG, line}, {select, put, call}){
            let {Status, Message, Data} = yield call(getSkuno, MFG, line);
            if(Status == 'Pass'){
                // yield put({type: 'setUPHMsg', payload: {allSkuno: Data, skuno: ''}});
                yield put({type: 'setUPHMsg', payload: {allSkuno: Data}});
            }else{
                message.error(Message);
            }
        },
        skuSetting_getSkuno: function* (_, {select, put, call}){
            let {Status, Message, Data} = yield call(skuSetting_getSkuno);
            if(Status == 'Pass'){
                yield put({type: 'setSkuMsg', payload: {allSkuno: Data, skuno: Data[0]}});
            }else{
                message.error(Message);
            }
        },
        getSkuName: function* ({skuno}, {select, put, call}){
            let {Status, Message, Data} = yield call(getSkuName, skuno);
            if(Status == 'Pass'){
                yield put({type: 'setSkuMsg', payload: {skuName: Data}});
            }else{
                message.error(Message);
            }
        },
        updateSkuName: function* ({skuno, skuName}, {select, put, call}){
            let {Status, Message, Data} = yield call(updateSkuName, skuno, skuName);
            if(Status == 'Pass'){
                message.success(Message);
            }else{
                message.error(Message);
            }
        }
    }
}