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
        top: '5%',
        textStyle: {
            fontSize: 16
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
        top: '20%',
        left: '5%',
        right: '6%',
        bottom: '5%',
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
            barWidth: '40%',
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

    let { dispatch, collapsed, loading, activeKey, graph2: {xAxisData, seriesData} } = props;

    let [w, setW] = useState(100);
    let chartWrap = useRef();

    let isReady = useMemo(() => {
        if(xAxisData.length > 0 && seriesData.length > 0){
            return true;
        }
        return false;
    }, [props.graph2]);

    useMemo(() => {
        dispatch({
            type: 'AbnormalDecision/getGraph2'
        });
    }, []);

    useEffect(() => {
        isReady && activeKey === 'tab2' && setW(chartWrap.current.clientWidth);
    }, [isReady, collapsed, activeKey]);

    useEffect(() => {
        if (isReady && activeKey === 'tab2') {
            let myChart = echarts.init(chartWrap.current);
            let option = ret_option(xAxisData, seriesData);
            myChart.resize({ width: w });
            myChart.setOption(option);
        }
    }, [isReady, w, activeKey, props.graph2]);

    if(loading || !isReady){
        return <PageLoading size='large' />
    }
    return <div className={styles.tab2}>
        <div className={styles['chart2-box']} ref={chartWrap}></div>
    </div>
}
let mapStateToProps = state => ({
    collapsed: state.global.collapsed,
    loading: state.loading.AbnormalDecision,
    activeKey: state.AbnormalDecision.anomalousGraph.activeKey,
    graph2: state.AbnormalDecision.anomalousGraph.graphData.graph2
})
export default connect(mapStateToProps)(Tab2);