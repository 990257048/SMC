
import {getGraph1, getGraph2, getGraph3, getGraph4, getGraph5} from './service'
import {message} from 'antd'

let Model = {
    namespace: 'AbnormalDecision',
    state: {
        // 图（1 [1,2,3]，2，3，4，5，6）控件行状态　快速搜索　高级搜索　新增异常 表  
        anomalousGraph: { // 异常统计图组件
            activeKey: 'tab1', // 当前活动的tab页： tab1 | tab2 | tab3 | tab4 | tab5
            globalSearch: {    // 全局条件搜索（当前制造处 分类标准）

            },
            quickSearch: {     // 快速搜索（时间条件：年 季 月 周 时间段 -- 当前是否需要该条件， 当前选项卡位置，当前的值是多少）

            },
            advancedSearch: {   // 高级搜索（选项卡 位置 控件值 ）

            },
            newAbnormal: {  // 新增异常 状态

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
