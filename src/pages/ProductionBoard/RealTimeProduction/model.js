import { message } from 'antd'
import moment from 'moment';
import { getAllMFG, getLineData, getRealTimeProductionData } from './service'
import cookies from 'js-cookie';

let Model = {
    namespace: 'realTimeProduction',  //实时生产看板
    state: {
        //全局条件
        allMFG: [], // ["MFGI", "MFGII", "MFGIIII", "MFGV", "MFGVI", "MFGVII", "MFGVIII"],    //  所有制造处 
        currentAllLine: [],  // 当前所有线体

        currentDate: null,
        currentMFG: null,
        currentLine: null,
        currentClass: 'D',
        //异常统计 box 条形图
        Abnormal: {
            Abnormal_NoOK_Count: "4",  // 待维护异常
            Abnormal_Count: "4",    // 异常数量
            Abnormal_Time: "0",     // 异常工时
            Capacity_achievement_rate: "100%"  // 目标达成率
        },
        AbnormalChart: {
            yAxis: [],    //机种
            series: []    //值
        },
        //异常表格
        AbnormalTable: []
        // COST_TIME: "45"         有效工时
        // DIFF: "-41"             差异
        // KANBAN_ID: "10421084"   key
        // PERIOD: "8:00~9:00"     时间段
        // REAL_OUT: "4"           实际产出
        // REMARK: ""              描述
        // SKUNO: "74-120728-01(D)" 料号
        // SKU_NAME: null          机种
        // TOTAL_DIFF: "-41"       累计差异
        // TOTAL_OUT: "4"          总产出
        // UPH: "45"               目标产能
    },
    effects: {
        // 渲染前： 1.获取当前时间，制造处 2.拿到制造处加载线体 3.拿到线体加载生产数据，4.拿到生产数据开始渲染
        *init(_, { call, put, select }) {  // 渲染前初始化
            // 获取时间
            let date = moment();
            // [0-8] 前一天（晚班） [8-20]当天（白班） [20-23]当天(晚班)
            let h = date.hours(), className, dateStr;

            if(h >= 8) {    //今天
                dateStr = date.format('YYYY-MM-DD');
                if(h < 20){    //白班
                    className = 'D';
                }else{  // 晚班
                    className = 'N';
                }
            }else{  // 前天晚班
                dateStr = date.subtract(1, 'days').format('YYYY-MM-DD'); //前一天
                className = 'N';
            }

            yield put({
                type: 'setGlobalState',
                payload: {
                    currentDate: dateStr,
                    currentClass: className
                }
            })
        },
        *getAllMfg(_, { put, call }) {  // 获取所有制造处
            console.log("获取所有制造处");
            let token = cookies.get('token');
            let { Status, Message, Data: { Mfg } } = yield call(getAllMFG, token);
            if (Status == "Pass") {
                console.log(Mfg);
                yield put({
                    type: 'setGlobalState',
                    payload: {
                        allMFG: Mfg,
                        currentMFG: Mfg[0]
                    }
                });
            } else {
                message.error(Message);
            }
        },
        *getLineData(_, { put, call, select }) {  // 获取线体数据
            console.log("获取线体数据");
            let { currentMFG } = yield select(state => state.realTimeProduction);
            if (currentMFG) {
                let { Status, Message, Data: { LineName } } = yield call(getLineData, currentMFG);
                if (Status == "Pass") {
                    console.log(LineName);
                    yield put({
                        type: 'setGlobalState',
                        payload: {
                            currentAllLine: LineName,
                            currentLine: LineName[0]
                        }
                    })
                } else {

                    message.error(Message);
                }
            }
        },
        *getProductionData(_, { call, put, select }) {    // 获取生产数据
            console.log("获取生产数据");
            let {currentClass, currentMFG, currentLine, currentDate } = yield select(state => state.realTimeProduction);
            if (currentMFG && currentLine && currentDate) {
                let { Status, Message, Data } = yield call(getRealTimeProductionData, currentClass, currentMFG, currentLine, currentDate);
                if (Status == "Pass") {
                    console.log(Data);
                    yield put({
                        type: 'mapToState',
                        Data
                    });
                    message.success(Message);
                } else {
                    message.error(Message);
                }
            }
        }
    },
    reducers: {
        setGlobalState(state, { payload }) {
            return {
                ...state,
                ...payload
            }
        },
        mapToState(state, { Data }) {
            let { Abnormal, Chart, KanBan } = Data;
            return {
                ...state,
                Abnormal,
                AbnormalChart: {
                    yAxis: Chart.map(row => row.SKUNO),
                    series: Chart.map(row => row.TOTAL_REALOUT)
                },
                AbnormalTable: KanBan.map(row => {
                    let newRow = {};
                    Object.keys(row).forEach(k => {
                        newRow[k] = row[k] ? row[k] : ''
                    })
                    return {
                        ...newRow, key: row.KANBAN_ID
                    }
                })
            }
        }
    }
};

export default Model;