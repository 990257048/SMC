import React, { useRef, useState, useLayoutEffect, useEffect, useMeno, useCallback, useMemo } from 'react';
import { connect, FormattedMessage, formatMessage } from 'umi';
import echarts from 'echarts';
import { Button, Space, Input, Tabs, Popover, Row, Col, Statistic, Divider, Select, Spin } from 'antd';
import { PageLoading } from '@ant-design/pro-layout';
import { SearchOutlined, TagsOutlined, ProfileOutlined, BarsOutlined } from '@ant-design/icons'
import styles from '../style.less';


// let option = {
//     title: {
//         text: '所有异常',
//         subtext: '纯属虚构',
//         left: 'center'
//     },
//     tooltip: {
//         trigger: 'item',
//         formatter: '{a} <br/>{b} : {c} ({d}%)'
//     },
//     // toolbox: {
//     //     feature: {
//     //         dataView: { show: true, readOnly: false },
//     //         magicType: { show: true, type: ['pie'] },
//     //         restore: { show: true },
//     //         saveAsImage: { show: true }
//     //     }
//     // },
//     // legend: {
//     //     orient: 'vertical',
//     //     left: 'left',
//     //     data: ['设备异常', '系统异常', '物料异常', '人员异常', '品质异常']
//     // },
//     series: [
//         {
//             name: '所有异常',
//             type: 'pie',
//             radius: '45%',
//             center: ['50%', '50%'],
//             data: [
//                 { value: 335, name: '设备异常' },
//                 { value: 310, name: '系统异常' },
//                 { value: 274, name: '物料异常' },
//                 { value: 235, name: '人员异常' },
//                 { value: 400, name: '品质异常' }
//             ],
//             emphasis: {
//                 itemStyle: {
//                     shadowBlur: 10,
//                     shadowOffsetX: 0,
//                     shadowColor: 'rgba(0, 0, 0, 0.5)'
//                 }
//             }
//         }
//     ]
// };

let ret_option = (tit, seriesData) => {
    return {
        backgroundColor: '#fff', //'#012140',
        // color: ['#52c41a', '#13c2c2', '#87e8de', '#91d5ff', '#722ed1', '#eb2f96', '#f5222d', '#d4380d', '#fa8c16', '#faad14', '#ffec3d'],
        color: ['#798ffc', '#6f9efc', '#65bbfc', '#5bd1fc', '#47fca2', '#56fc7d', '#6afc6c', '#fce560', '#fcc360', '#fc9468', '#fc7779', '#fc79a1'],
        // color: ['#576b95', '#6467f0', '#1485ee', '#10aeff', '#07c160', '#95ec69', '#91d300', '#ffc300', '#fa9d3b', '#fa5151', '#fc7779', '#fc79a1'],
        title: {
            text: tit, // + '（' + num + '）',
            left: 'center',
            top: 20,
            textStyle: {
                color: '#000'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        // visualMap: {
        //     show: false,
        //     min: 20,
        //     max: 1000,
        //     inRange: {
        //         colorLightness: [0, 1]
        //     }
        // },
        series: [
            {
                name: tit,
                type: 'pie',
                radius: ['33%', '50%'],
                center: ['50%', '55%'],
                data: seriesData,
                // [
                //     // { value: 335, name: '设备异常' },
                //     // { value: 310, name: '系统异常' },
                //     // { value: 274, name: '物料异常' },
                //     // { value: 235, name: '人员异常' },
                //     // { value: 400, name: '品质异常' },
                //     // { value: 200, name: '5DX' },
                //     // { value: 100, name: 'BST' },
                //     // { value: 300, name: 'ICT' },
                //     // { value: 500, name: 'KITTING' },
                //     // { value: 200, name: 'MCEBU' },
                //     // { value: 100, name: 'PACKING' },
                //     // { value: 100, name: 'PCBU' },
                //     // { value: 100, name: 'PTH' },
                //     // { value: 100, name: 'RE' },
                //     // { value: 100, name: 'SMT' },
                //     // { value: 100, name: '分板' },
                //     // { value: 100, name: '压合' }
                // ],  // .sort(function (a, b) { return a.value - b.value; }),
                // roseType: 'radius',
                // label: {
                //     color: 'rgba(255, 255, 255, 0.5)'
                // },
                // labelLine: {
                //     lineStyle: {
                //         color: 'rgba(255, 255, 255, 0.5)'
                //     },
                //     smooth: 0.2,
                //     length: 10,
                //     length2: 20
                // },
                // itemStyle: {
                //     color: '#c23531',
                //     shadowBlur: 200,
                //     shadowColor: 'rgba(0, 0, 0, 0.5)'
                // },
                // animationType: 'scale',
                // animationEasing: 'elasticOut',
                // animationDelay: function (idx) {
                //     return Math.random() * 200;
                // }
            }
        ]
    }
}

let Tab1 = props => {   // 异常状态
    let {
        dispatch,
        collapsed, width, loading, activeKey,
        globalSearch, quickSearch, advancedSearch,
        graph1: { left, center, right }
    } = props;  // {sum, seriesData}

    let graph1 = useRef();
    let graph2 = useRef();
    let graph3 = useRef();

    let [w, setW] = useState(100);

    // ***** 灵活运用 loading(异步) isReady（得到关键数据）20201009 add by gch *****

    let isReady = useMemo(() => {  // ***重要*** 未得到初次渲染依赖的数据时被认为没有准备好，不能进行相关的操作（比如组件渲染，生命周期的执行）
        if (Object.keys(left) == 0 || Object.keys(center) == 0 || Object.keys(right) == 0) {
            return false;
        }
        return true;
    }, [props.graph1]);

    useMemo(() => {   //请求图表数据
        activeKey === 'tab1' && globalSearch.MFG && dispatch({  // tab,条件发生变化时 1.当前在tab1 2.全局条件必须有，再去拿数据
            type: 'AbnormalDecision/getGraph1'
        });
    }, [activeKey, globalSearch, quickSearch, advancedSearch]);  // BUG：advancedSearch上存在个别状态发生变化时，也不需要重新请求数据

    useEffect(() => {   // 设置宽度
        isReady && activeKey === 'tab1' && setW(graph1.current.clientWidth);   // 未准备好就没有graph1.current.clientWidth, 会报错
    }, [isReady, collapsed, width, activeKey]);  //width 已经做了防抖处理

    // ===========================================================================================

    let [myCharts, setMyCharts] = useState(null); //定义图表实例，方便后续操作
    useEffect(() => {
        if(activeKey == 'tab1'){
            setTimeout(() => {
                let charts = {
                    chart1: echarts.init(graph1.current),
                    chart2: echarts.init(graph2.current),
                    chart3: echarts.init(graph3.current)
                }
                setMyCharts(charts);     // set 3个echarts实例
            }, 5000);
        }
    }, [activeKey]);   // 只有activeKey变化会引起图表重新创建或销毁

    // 方法 2， 借助useMemo 也可以引出图表实例，一样的效果
    // let [isMounted, setIsMounted] = useState(false);
    // useEffect(() => {
    //     setTimeout(() => {
    //         setIsMounted(true);
    //     }, 1000);
    // }, [])
    // let myCharts = useMemo(() => {
    //     let charts = null;
    //     if (isMounted && activeKey === 'tab1') {
    //         // console.log(isMounted, activeKey, graph1.current);
    //         charts = {
    //             chart1: echarts.init(graph1.current),
    //             chart2: echarts.init(graph2.current),
    //             chart3: echarts.init(graph3.current)
    //         }
    //         charts.chart1.off('click');
    //         charts.chart2.off('click');
    //         charts.chart3.off('click');
    //     }
    //     return charts;
    // }, [isMounted, activeKey]);

    useEffect(() => {   //图表数据源变化时重新渲染
        if (isReady && myCharts) {
            let option1 = ret_option('所有异常', left.seriesData);
            let option2 = ret_option('未结案异常', center.seriesData);
            let option3 = ret_option('待签核异常', right.seriesData);
            myCharts.chart1.setOption(option1);
            myCharts.chart2.setOption(option2);
            myCharts.chart3.setOption(option3);
        }
    }, [myCharts, isReady, props.graph1]);

    useEffect(() => {   //宽度变化时，设置图像宽度
        if (myCharts) {
            myCharts.chart1.resize({ width: w });
            myCharts.chart2.resize({ width: w });
            myCharts.chart3.resize({ width: w });
        }
    }, [myCharts, w]);

    useEffect(() => {  //图表绑定事件
        if(myCharts){
            let link = e => {
                dispatch({
                    type: 'AbnormalDecision/getTableData',
                    graphLink: { 
                        seriesName: e.seriesName, 
                        name: e.name 
                    }
                });
            }
            myCharts.chart1.on('click', link);
            myCharts.chart2.on('click', link);
            myCharts.chart3.on('click', link);
        }
        return () => {  //组件卸载前先取消绑定事件
            if(myCharts){
                myCharts.chart1.off('click');
                myCharts.chart2.off('click');
                myCharts.chart3.off('click');
            }
        }
    }, [myCharts]);

    // ================================================================================================

    // 不能这样写，切记。。。
    // useEffect(() => {
    //     if (isReady && activeKey === 'tab1') {  // 未准备好会报错
    //         let chart1 = echarts.init(graph1.current);
    //         let chart2 = echarts.init(graph2.current);
    //         let chart3 = echarts.init(graph3.current);
    //         let option1 = ret_option('所有异常', left.seriesData);
    //         let option2 = ret_option('未结案异常', center.seriesData);
    //         let option3 = ret_option('待签核异常', right.seriesData);
    //         chart1.resize({ width: w });
    //         chart2.resize({ width: w });
    //         chart3.resize({ width: w });
    //         chart1.setOption(option1);
    //         chart2.setOption(option2);
    //         chart3.setOption(option3);
    //         // chart1.on('click', e => {
    //         //     console.log(e)
    //         // });
    //         // chart2.on('click', e => {
    //         //     console.log(e);
    //         // });
    //         // chart3.on('click', e => {
    //         //     console.log(e);
    //         // });
    //         // return () => {
    //         //     chart1.on('click', null);
    //         //     chart2.on('click', null);
    //         //     chart3.on('click', null);
    //         // }
    //     }
    // }, [isReady, w, activeKey, props.graph1]);

    if (loading || !isReady) {   // 加载数据或没有得到关键数据时为loading状态
        return <PageLoading size="large" />
    }
    return <div className={styles.tab1}>
        <Row gutter={[24, 24]}>
            <Col span={8}>
                <div className={styles['graph-total']}> <p style={{ color: '#47fca2' }}> {left.sum} </p> </div>
                <div ref={graph1} className={styles.graph}></div>
            </Col>
            <Col span={8} style={{ position: 'relative' }}>
                {/* <div className={styles['graph-status']} style={{ background: center.status }}></div> */}
                <div className={styles['graph-total']}> <p style={{ color: center.status }}> {center.sum} </p> </div>
                <div ref={graph2} className={styles.graph}></div>
            </Col>
            <Col span={8} style={{ position: 'relative' }}>
                {/* <div className={styles['graph-status']} style={{ background: right.status }}></div> */}
                <div className={styles['graph-total']}> <p style={{ color: right.status }}> {right.sum} </p> </div>
                <div ref={graph3} className={styles.graph}></div>
            </Col>
        </Row>
    </div>
}
// collapsed
let mapStateToProps = state => ({
    collapsed: state.global.collapsed,
    width: state.global.width,
    loading: state.loading.AbnormalDecision,
    activeKey: state.AbnormalDecision.anomalousGraph.activeKey,
    globalSearch: state.AbnormalDecision.anomalousGraph.globalSearch,
    quickSearch: state.AbnormalDecision.anomalousGraph.quickSearch,
    advancedSearch: state.AbnormalDecision.anomalousGraph.advancedSearch,
    graph1: state.AbnormalDecision.anomalousGraph.graphData.graph1
})
export default connect(mapStateToProps)(Tab1);