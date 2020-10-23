import React, { useRef, useState, useEffect, useMeno, useCallback, useMemo } from 'react';
import { connect, FormattedMessage, formatMessage } from 'umi';
import echarts from 'echarts';
import { Button, Space, Input, Tabs, Popover, Row, Col, Divider, Select, Spin } from 'antd';
import { PageLoading } from '@ant-design/pro-layout';
import { SearchOutlined, TagsOutlined, ProfileOutlined, BarsOutlined } from '@ant-design/icons'
import styles from '../style.less';


let option = {
    title: {
        text: '所有异常',
        subtext: '纯属虚构',
        left: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    // legend: {
    //     orient: 'vertical',
    //     left: 'left',
    //     data: ['设备异常', '系统异常', '物料异常', '人员异常', '品质异常']
    // },
    series: [
        {
            name: '所有异常',
            type: 'pie',
            radius: '45%',
            center: ['50%', '50%'],
            data: [
                { value: 335, name: '设备异常' },
                { value: 310, name: '系统异常' },
                { value: 274, name: '物料异常' },
                { value: 235, name: '人员异常' },
                { value: 400, name: '品质异常' }
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

let ret_option = (tit, num, seriesData) => {
    return {
        backgroundColor: '#012140',
        color: ['#52c41a', '#13c2c2', '#87e8de', '#91d5ff', '#722ed1', '#eb2f96', '#f5222d', '#d4380d', '#fa8c16', '#faad14', '#ffec3d'],
        title: {
            text: tit + '（' + num + '）',
            left: 'center',
            top: 20,
            textStyle: {
                color: '#eee'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        // visualMap: {
        //     show: false,
        //     min: 20,
        //     max: 600,
        //     inRange: {
        //         colorLightness: [0, 1]
        //     }
        // },
        series: [
            {
                name: tit,
                type: 'pie',
                radius: '50%',
                center: ['50%', '50%'],
                data: seriesData,
                // [
                //     // { value: 335, name: '设备异常' },
                //     // { value: 310, name: '系统异常' },
                //     // { value: 274, name: '物料异常' },
                //     // { value: 235, name: '人员异常' },
                //     // { value: 400, name: '品质异常' }

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
        collapsed, loading, activeKey, 
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

    useMemo(() => {
        activeKey === 'tab1' && globalSearch.MFG && dispatch({  // tab,条件发生变化时 1.当前在tab1 2.全局条件必须有，再去拿数据
            type: 'AbnormalDecision/getGraph1'
        });
    }, [activeKey, globalSearch, quickSearch, advancedSearch]);

    useEffect(() => {
        isReady && activeKey === 'tab1' && setW(graph1.current.clientWidth);   // 未准备好就没有graph1.current.clientWidth, 会报错
    }, [isReady, collapsed, activeKey]);

    useEffect(() => {
        if (isReady && activeKey === 'tab1') {  // 未准备好会报错
            let chart1 = echarts.init(graph1.current);
            let chart2 = echarts.init(graph2.current);
            let chart3 = echarts.init(graph3.current);
            let option1 = ret_option('所有异常', left.sum, left.seriesData);
            let option2 = ret_option('未结案异常', center.sum, center.seriesData);
            let option3 = ret_option('待签核异常', right.sum, right.seriesData);
            chart1.resize({ width: w });
            chart2.resize({ width: w });
            chart3.resize({ width: w });
            chart1.setOption(option1);
            chart2.setOption(option2);
            chart3.setOption(option3);
        }
    }, [isReady, w, activeKey, props.graph1]);

    if (loading || !isReady) {   // 加载数据或没有得到关键数据时为loading状态
        return <PageLoading size="large" />
    }
    return <div className={styles.tab1}>
        <Row gutter={[16, 16]}>
            <Col span={8}>
                <div ref={graph1} className={styles.graph}></div>
            </Col>
            <Col span={8} style={{ position: 'relative' }}>
                <div className={styles['graph-status']} style={{ background: center.status }}></div>
                <div ref={graph2} className={styles.graph}></div>
            </Col>
            <Col span={8} style={{ position: 'relative' }}>
                <div className={styles['graph-status']} style={{ background: right.status }}></div>
                <div ref={graph3} className={styles.graph}></div>
            </Col>
        </Row>
    </div>
}
// collapsed
let mapStateToProps = state => ({
    collapsed: state.global.collapsed,
    loading: state.loading.AbnormalDecision,
    activeKey: state.AbnormalDecision.anomalousGraph.activeKey,
    globalSearch: state.AbnormalDecision.anomalousGraph.globalSearch,
    quickSearch: state.AbnormalDecision.anomalousGraph.quickSearch,
    advancedSearch: state.AbnormalDecision.anomalousGraph.advancedSearch,
    graph1: state.AbnormalDecision.anomalousGraph.graphData.graph1
})
export default connect(mapStateToProps)(Tab1);