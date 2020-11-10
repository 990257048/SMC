import React, { useRef, useEffect, useMemo, useCallback, useState } from 'react';
import { connect, FormattedMessage, formatMessage } from 'umi';
import { Space, Input, Button, Table, Row, Col, Spin } from 'antd';
import { PageLoading } from '@ant-design/pro-layout';
import echarts from 'echarts';
import { ProfileOutlined, BarChartOutlined, RedoOutlined } from '@ant-design/icons';

import styles from '../style.less';


let option = {
    color: ['#3398DB'],
    title: {
        text: '異常類別統計（单位:個）',
        left: 'center',
        top: '3%',
        textStyle: {
            fontSize: 16
        }
    },
    toolbox: {
        feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        padding: 10,
        formatter: '异常类别: {b}<br>异常数量: {c}个'
    },
    grid: {
        top: '18%',
        left: '5%',
        right: '6%',
        bottom: '0%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            // data: ['74-104761-03', '74-104761-04', '74-104761-05', '74-104761-06', '74-104761-07'],
            data: ['设备异常', '品质异常', '物料异常', '系统异常', '治工具异常', '人员异常'],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            // axisLabel: {
            //     formatter: '{value} pcs'
            // }
        }
    ],
    series: [
        {
            name: '实时产出',
            type: 'bar',
            barWidth: '30%',
            label: {
                show: true,
                position: 'top',
                formatter: '{c} 個'
            },
            data: [334, 1090, 700, 460, 560, 780]
        }
    ]
};

let ret_option = (xAxisData, seriesData) => {
    return {
        ...option,
        xAxis: [
            {
                ...option.xAxis[0],
                data: xAxisData
            }
        ],
        series: [
            {
                ...option.series[0],
                data: seriesData
            }
        ]
    }
}

let Tab2 = props => {
    let {
        dispatch,
        collapsed, width, loading, activeKey,
        globalSearch, quickSearch,
        graph2: { xAxisData, seriesData }
    } = props;

    let [myCharts, setMyCharts] = useState(null);
    let [w, setW] = useState(100);
    let chartWrap = useRef();

    let isReady = useMemo(() => {
        if (xAxisData.length > 0 && seriesData.length > 0) {
            return true;
        }
        return false;
    }, [props.graph2]);

    useMemo(() => {   //拿数据
        activeKey == 'tab2' && dispatch({
            type: 'AbnormalDecision/getGraph2'
        });
    }, [activeKey, globalSearch, quickSearch]);

    useEffect(() => {  //设置宽度
        isReady && activeKey === 'tab2' && setW(chartWrap.current.clientWidth);
    }, [isReady, collapsed, width, activeKey]);

    useEffect(() => {  //设置实例
        if (activeKey == 'tab2') {
            setTimeout(() => {
                let chart = echarts.init(chartWrap.current);
                setMyCharts(chart);
            }, 600);
        }
    }, [activeKey]);

    useEffect(() => {  //渲染
        if (myCharts && isReady) {
            let option = ret_option(xAxisData, seriesData);
            myCharts.setOption(option);
        }
    }, [myCharts, isReady, props.graph2]);

    useEffect(() => {   //宽度调整
        myCharts && myCharts.resize({ width: w });
    }, [myCharts, w]);

    useEffect(() => {   //绑定事件
        if (myCharts) {
            let link = e => {
                dispatch({
                    type: 'AbnormalDecision/getTableData',
                    graphLink: { 
                        seriesName: e.seriesName, 
                        name: e.name 
                    }
                });
            }
            myCharts.on('click', link);
        }
        return () => {
            if (myCharts) {
                myCharts.off('click');
            }
        }
    }, [myCharts]);

    if (loading || !isReady) {
        return <PageLoading size='large' />
    }
    return <div className={styles.tab2}>
        <div className={styles['chart2-box']} ref={chartWrap}></div>
    </div>
}
let mapStateToProps = state => ({
    collapsed: state.global.collapsed,
    width: state.global.width,
    loading: state.loading.AbnormalDecision,
    activeKey: state.AbnormalDecision.anomalousGraph.activeKey,
    globalSearch: state.AbnormalDecision.anomalousGraph.globalSearch,
    quickSearch: state.AbnormalDecision.anomalousGraph.quickSearch,
    graph2: state.AbnormalDecision.anomalousGraph.graphData.graph2
})
export default connect(mapStateToProps)(Tab2);