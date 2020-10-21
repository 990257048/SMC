
import {getAllMfg, getBU, getGraph1, getGraph2, getGraph3, getGraph4, getGraph5} from './service'
import {deepClone} from '../../../utils/custom'
import {message} from 'antd'
import moment from 'moment'

let Model = {
    namespace: 'AbnormalDecision',
    state: {
        // 图（1 [1,2,3]，2，3，4，5，6）控件行状态　快速搜索　高级搜索　新增异常 表  
        anomalousGraph: { // 异常统计图组件
            activeKey: 'tab1', // 当前活动的tab页： tab1 | tab2 | tab3 | tab4 | tab5
            globalSearch: {    // 全局条件搜索（当前制造处 分类标准）
                allMFG: [], // ['ALL', 'MFGI', 'MFGII', 'MFGIII', 'MFGV'], //所有制造处
                allCategories: ['按發生區域', '按責任單位', '按責任人員', '按問題分類'], //所有查询类别
                MFG: '', // 'ALL', //当前制造处
                classify: '按發生區域', //当前查询类别
            },
            quickSearch: {     // 快速搜索（时间条件：年 季 月 周 时间段 -- 当前是否需要该条件， 当前选项卡位置，当前的值是多少）
                allYear: [],  //可选年份
                allCategories: ['year', 'season', 'month', 'week', 'time'], //所有查询类别
                classify: 'year', //当前查询类别
                year: '', // 当前年份
                season: '', // 当前季
                month: '', //当前月份
                week: '', //当前周
                time: ['2020-01-01', '2020-01-02'] //时间段
            },
            advancedSearch: {   // 高级搜索（选项卡 位置 控件值 ）
                allBU: [], // 所有BU
                BU: [], //按BU
                allRegion: ['Kitting', 'SMT', 'ICT', 'Packing', '5DX', '壓合', 'PTH', 'RE', 'MCEBU', '分板', 'BST', '其它'],  //所有发生区域
                region: [], //按发生区域
                abnormalClassify: {   //按异常分类
                    currentClassify: 'equipment',  //当前分类
                    equipment: { //设备异常
                        allDesc: ['設備檔機', '保養超時', '低效生產', '安全隱患', '功能缺失', '帶病運行'], //所有异常描述
                        allCategory: ['SMT設備', 'PTH設備', '測試設備', '流水線', 'SFC設備', '公務設備'], //所有機器類別
                        desc: [],  //异常描述
                        category: [], //機器類別
                        name: '',  // 设备名称
                        equipmentNumber: '' // 设备编号
                    },
                    material: { //物料异常
                        allDesc: ['來料短缺', '物料Delay', '錯料', '混料', '物料包裝異常', '特采過期', '包裝信息與實物不符', '有帳無務', '其它'],  //所有异常描述
                        desc: [], //异常描述
                        partNo: '', //零件料号
                        rejectRatio: '', //不良率
                        supplier: '', //供应商
                        DC: '',
                        LC: ''
                    },
                    person: { //人员异常
                        allDesc: ['人力不足', '新人技能不足', '外借人力技能不足', '其它'], //所有异常描述
                        desc: [] //异常描述
                    },
                    quality: { //品质异常
                        allProcess: ['SMT製程不良', 'PTH製程不良', '組裝製程不良', '測試製程不良', '維修製程不良', '壓合製程不良'], //所有制程段
                        allBadPhenomenon: ['批量損件', '燒機', '批量錯件', '批量少料', '批量反向', '不良率超標', '其它'], //所有不良现象
                        allScope: ['當前工站', '前置工站', '後續工站'], //所有影响范围
                        process: [], //制程段
                        badPhenomenon: [], //不良现象
                        scope: [], //影响范围
                        station: '', //发生站位
                        measures: '' //当前措施
                    },
                    tools: { //治工具异常
                        allDesc: ['治工具損壞', '治工具不足', '治工具功能不良', '治工具未點檢', '治工具要求不符', '其它'], //所有异常描述
                        desc: [],   //异常描述
                        skuno: '',  //涉及的产品料号
                        station: '' //使用站位
                    },
                    system: { //系统异常
                        allCategory: [
                            '測試系統異常', 'SFC系統異常', '氮氣供應系統異常', '電力系統異常', '壓縮空氣系統異常', '真空供氣系統異常', '冰水供應系統異常',
                            'ALL Parts系統異常', 'Beacon系統異常', 'Agile系統異常', 'Dom系統異常', 'SAP系統異常', '其它'
                        ], //所有异常类别
                        category: [], //异常类别
                        station: '' //使用站位
                    }
                },
                causeAnalysis: {   //按原因分析
                    currentClassify: 'parson',  //当前分类
                    parson: {   //人
                        chargePerson: '', //责任人
                        decision: '', //处理决定
                        improve: ''   //改善方向
                    },
                    equipment: { //机
                        chargePerson: '', //责任人
                        name: '',  // 机器名称
                        equipmentNumber: '', // 机器编号
                        cause: '', //具体原因
                        improve: '',   //改善方向
                        anImprove: [],  //橫向展開改善  Y | N
                        completionTime: '' //預計完成時間
                    },
                    material: {  //料
                        chargePerson: '', // 負責人
                        skuno: '', // 料號
                        DC: '', // DC
                        LC: '', // LC
                        vendor: '', // 廠商
                        result: '', // 處理結果
                        improve: '', // 改善方向
                        completionTime: '' // 預計完成時間
                    },
                    function: {  //法
                        chargePerson: '', // 負責人
                        result: '', // 改善結果
                        anImprove: [],  // 橫向展開改善 Y | N
                        completionTime: '' // 預計完成時間
                    },
                    annulus: {  //环
                        chargePerson: '', // 負責人
                        cause: '', // 具體原因
                        result: '', // 處理結果
                        improve: '',  // 改善方向
                        completionTime: '' // 預計完成時間
                    },
                    detection: {  //量检测
                        chargePerson: '', // 負責人
                        content: '', // 測試內容
                        result: '' // 測試結果
                    }
                }
            },
            newAbnormal: {  // 新增异常 状态
                type: '异常', // 通知单类型  异常 | 停线
                emergencyDegree: '一般', // 紧急程度  一般 | 紧急
                baseMsg: { //基本信息
                    issuer: '', // 發文人員
                    units: '', // 發文單位
                    date: '', // 發文日期
                    time: '', // 异常时期
                    class: '', // 异常班别
                    BU: '', // 异常BU
                    area: '', //异常区域
                    station: '', //异常工站
                    skuName: '', //机种名称
                    skuno: '', //机种料号
                    WO: '', //工單編號
                    stage: '' // 产品阶段
                },
                report: { //上报机制
                    sectionManager: '', //课级
                    minister: '', //部级
                    sectionChief: '', //处级
                },
                Problem: { //問題描述
                    handler: [],  //異常處理人
                    noticeTime: '', //異常通知時間
                    emailTitle: '', // 郵件標題
                    abnormalClassify: {   //按异常分类
                        currentClassify: 'equipment',  //当前分类
                        equipment: { //设备异常
                            desc: '',  //异常描述
                            category: '', //异常类别
                            name: '',  // 设备名称
                            equipmentNumber: '', // 设备编号
                            equipmentModel: '' // 設備型號
                        },
                        material: { //物料异常
                            desc: '', //异常描述
                            partNo: '', //零件料号
                            rejectRatio: '', //不良率
                            supplier: '', //供应商
                            DC: '',
                            LC: ''
                        },
                        person: { //人员异常
                            desc: '' //异常描述
                        },
                        quality: { //品质异常
                            process: '', //制程段
                            BadPhenomenon: '', //不良现象
                            scope: '', //影响范围
                            station: '', //发生站位
                            measures: '' //当前措施
                        },
                        tools: { //治工具异常
                            desc: '',   //异常描述
                            skuno: '',  //涉及的产品料号
                            station: '' //使用站位
                        },
                        system: { //系统异常
                            category: '', //异常类别
                            desc: '', //異常描述
                            startTime: '' //異常開始時間
                        }
                    },
                    countermeasures: { //临时对策
                        lostWorkTime: '', //损失工时
                        idleHuman: '', //闲置人力
                        manpowerArrangement: '', //闲置人力安排
                        lostOutput: '', //损失产出
                        lostYield: '', //良率損失
                        measures: '' //臨時解決措施
                    },
                    causeAnalysis: {  // 原因分析(只有填寫原因分析才能申請結案)
                        chargePerson: '', // 負責人
                        sectionManager: [], //負責人课级
                        minister: [], //負責人部级
                        sectionChief: [], //負責人处级
                        notifier: [] // 異常知會人
                    },
                    remarksAndAttachments: {  // 備註與附件
                        problemStatus: '', // 問題狀態
                        remarks: '', // 備註
                        attachments: {} // 附件
                    }
                }
            },
            graphData: {
                graph1: { // 异常状态统计（饼）
                    left: {},
                    center: {},
                    right: {}
                    // left: {  // 所有异常
                    //     sum: 1075,
                    //     seriesData: [
                    //         { value: 335, name: '设备异常' },
                    //         { value: 310, name: '系统异常' },
                    //         ...
                    //     ]
                    // },
                    // center: { status: '', ...  },    // red(#f5222d) yellow(#ffec3d) green(#52c41a)
                    // right: { status: '', ... }
                },
                graph2: {  // 异常类别统计（条形）
                    xAxisData: [],
                    seriesData: []
                    // xAxisData: ['设备异常', '品质异常', '物料异常', '系统异常', '治工具异常', '人员异常'],
                    // seriesData: [334, 1090, 700, 460, 560, 780]
                },
                graph3: {  // 原因类别统计（条形）
                    xAxisData: [],
                    seriesData: []
                    // xAxisData: ['环', '机', '法', '料', '人', '量检测'],
                    // seriesData: [334, 1090, 700, 460, 560, 780]
                },
                graph4: {  // 异常工时统计（条形折线混合）
                    xAxisData: [],
                    seriesData1: [],
                    seriesData2: []
                    // xAxisData: ['Jan', 'Feb', 'Mar', 'Apr', 'Mav', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    // seriesData1: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                    // seriesData2: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
                },
                graph5: {  // 结案状态统计（条形折线混合）
                    xAxisData: [],
                    seriesData1: [],
                    seriesData2: [],
                    seriesData3: []
                    // xAxisData: ['WEEK01', 'WEEK02', 'WEEK03', 'WEEK04', 'WEEK05', 'WEEK06', 'WEEK07', 'WEEK08', 'WEEK09', 'WEEK10', 'WEEK11', 'WEEK12'],
                    // seriesData1: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                    // seriesData2: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                    // seriesData3: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
                }
            }
        },
        anomalousTable: {  // 异常列表
            tableData: {

            }
        }
    },
    reducers: {
        setActiveKey: (state, { activeKey }) => { // 设置当前活动的tab页：activeKey： tab1 | tab2 | tab3 | tab4 | tab5
            return { ...state, anomalousGraph: { ...state.anomalousGraph, activeKey } };
        },
        setGlobalSearch: (state, { payload }) => { // 设置全局搜索条件
            return { ...state, anomalousGraph: { ...state.anomalousGraph, globalSearch: { ...state.anomalousGraph.globalSearch, ...payload } } };
        },
        setQuickSearch: (state, { payload }) => { // 设置快速搜索的条件
            return { ...state, anomalousGraph: { ...state.anomalousGraph, quickSearch: { ...state.anomalousGraph.quickSearch, ...payload } } };
        },
        
        setAdvancedSearchOfBuAndRegion: (state, { payload }) => { // 设置高级搜索中前两个tab内容（按BU 和 按发生区域查询）
            return { ...state, anomalousGraph: { ...state.anomalousGraph, advancedSearch: { ...state.anomalousGraph.advancedSearch, ...payload } } };
        },
        setAdvancedSearchOfAbnormalClassify: (state, { classify, payload }) => { // classify:当前异常分类 （设置高级搜索中第三个tab内容（按异常分类查询）） 
            let newState = deepClone(state);
            newState.anomalousGraph.advancedSearch.abnormalClassify[classify] = payload;
            return newState;
        },
        setAdvancedSearchOfCauseAnalysis: (state, { classify, payload }) => { // 设置高级搜索中第四个tab内容（按原因分析查询）
            let newState = deepClone(state);
            newState.anomalousGraph.advancedSearch.causeAnalysis[classify] = payload;
            return newState;
        },
        
        setGraphData: (state, { graphName, data }) => {   // 设置统计图数据 (graph1, graph2, graph3, graph4, graph5)
            let graphData = {...state.anomalousGraph.graphData};
            graphData[graphName] = data;
            return {
                ...state,
                anomalousGraph: {
                    ...state.anomalousGraph,
                    graphData
                }
            }
        }
    },
    effects: {
        *getAllMfg(_, {call, put, select}) {
            let {Status, Message, Data} = yield call(getAllMfg);
            // console.log(Status, Message, Data);
            if(Status == 'Pass'){
                yield put({ 
                    type: 'setGlobalSearch', 
                    payload: { allMFG: Data.Mfg, MFG: Data.Mfg[0] }
                })
            }else{
                message.error(Message);
            }
        },

        *getBU({MFG}, {call, put}) {
            let {Status, Message, Data} = yield call(getBU, MFG);
            if(Status == 'Pass'){
                yield put({
                    type: 'setAdvancedSearchOfBuAndRegion',
                    payload: { allBU: Data.BU }
                })
            }else{
                message.error(Message);
            }
        },

        *initQuickSearch(_, {call, put, select}) {  //初始化快速搜索条件
            let currentDate = moment();
            let year = currentDate.year(), month = currentDate.month() + 1, week = currentDate.week(), time, allYear = [], season; 
            for(var i = 2017; i <= year; i++ ) allYear.push(i);
            season = month <= 3 ? '第一季度' : month <=6 ? '第二季度' : month <= 9 ? '第三季度' : '第四季度';
            time = [ currentDate.subtract(1, 'days').format('YYYY-MM-DD'), currentDate.add(1, 'days').format('YYYY-MM-DD')];

            yield put({
                type: 'setQuickSearch',
                payload: {
                    allYear, year, season, month, week, time
                }
            })
        },


        *getGraph1(_, {call, put, select}) {
            // select...
            let {Status, Message, Data} = yield call(getGraph1, {});
            // console.log(Status, Message, Data);
            if(Status == 'Pass'){
                yield put({
                    type: 'setGraphData',
                    graphName: 'graph1',
                    data: Data
                });
            }else{
                message.error(Message);
            }
        },
        *getGraph2(_, {call, put, select}) {
            // select...
            let {Status, Message, Data} = yield call(getGraph2, {});
            console.log(Status, Message, Data);
            if(Status == 'Pass'){
                yield put({
                    type: 'setGraphData',
                    graphName: 'graph2',
                    data: Data
                });
            }else{
                message.error(Message);
            }
        },
        *getGraph3(_, {call, put, select}) {
            // select...
            let {Status, Message, Data} = yield call(getGraph3, {});
            if(Status == 'Pass'){
                yield put({
                    type: 'setGraphData',
                    graphName: 'graph3',
                    data: Data
                });
            }else{
                message.error(Message);
            }
        },
        *getGraph4(_, {call, put, select}) {
            // select...
            let {Status, Message, Data} = yield call(getGraph4, {});
            if(Status == 'Pass'){
                yield put({
                    type: 'setGraphData',
                    graphName: 'graph4',
                    data: Data
                });
            }else{
                message.error(Message);
            }
        },
        *getGraph5(_, {call, put, select}) {
            // select...
            let {Status, Message, Data} = yield call(getGraph5, {});
            if(Status == 'Pass'){
                yield put({
                    type: 'setGraphData',
                    graphName: 'graph5',
                    data: Data
                });
            }else{
                message.error(Message);
            }
        }
    }
}

export default Model;
