import React, { useRef, useEffect, useMemo, useCallback, useState } from 'react';
import { connect, FormattedMessage, formatMessage } from 'umi';
import { Space, Input, Button, Table, Row, Col, Spin } from 'antd';
import { PageLoading } from '@ant-design/pro-layout';
import echarts from 'echarts';
import { ProfileOutlined, BarChartOutlined, RedoOutlined } from '@ant-design/icons';

import styles from '../style.less';


let option = {
    color: ['#37a2da', '#67e0e3', '#722ed1', '#fa8c16', '#ffec3d'],
    title: {
        text: '结案状态统计',
        left: 'center',
        top: '5%',
        textStyle: {
            fontSize: 16
        }
    },
    grid: {
        top: '20%',
        left: '5%',
        right: '6%',
        bottom: '5%',
        containLabel: true
    },
    tooltip: {
        trigger: 'axis',
        padding: 10,
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
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
    legend: {
        top: '8%',
        left: '5%',
        data: ['新增异常次数', '结案异常次数', '待结案异常次数']
    },
    xAxis: [
        {
            type: 'category',
            data: ['WEEK01', 'WEEK02', 'WEEK03', 'WEEK04', 'WEEK05', 'WEEK06', 'WEEK07', 'WEEK08', 'WEEK09', 'WEEK10', 'WEEK11', 'WEEK12'],
            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            // name: '次数',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
                formatter: '{value} 次'
            }
        },
        {
            type: 'value',
            // name: '工时数',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
                formatter: '{value} 次'
            }
        }
    ],
    series: [
        {
            name: '新增异常次数',
            type: 'bar',
            barWidth: '30%',
            label: {
                show: true,
                position: 'top',
                formatter: '{c}'
            },
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        },
        {
            name: '结案异常次数',
            type: 'bar',
            barWidth: '30%',
            label: {
                show: true,
                position: 'top',
                formatter: '{c}'
            },
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        },
        {
            name: '待结案异常次数',
            type: 'line',
            yAxisIndex: 1,
            label: {
                show: true,
                position: 'top',
                formatter: '{c}次'
            },
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        }
    ]
};

let ret_option = (xAxisData, seriesData1, seriesData2, seriesData3) => {
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
                data: seriesData1
            },
            {
                ...option.series[1],
                data: seriesData2
            },
            {
                ...option.series[2],
                data: seriesData3
            },
        ]
    }
}

let Tab5 = props => {

    let { dispatch, collapsed, loading, activeKey, globalSearch, quickSearch, graph5: { xAxisData, seriesData1, seriesData2, seriesData3 } } = props;
    let [w, setW] = useState(100);
    let chartWrap = useRef();

    let isReady = useMemo(() => {
        if (xAxisData.length > 0 && seriesData1.length > 0 && seriesData2.length > 0 && seriesData3.length > 0) {
            return true;
        }
        return false;
    }, [props.graph5]);

    useMemo(() => {
        activeKey == 'tab5' && dispatch({
            type: 'AbnormalDecision/getGraph5'
        });
    }, [activeKey, globalSearch, quickSearch]);

    useEffect(() => {
        isReady && activeKey === 'tab5' && setW(chartWrap.current.clientWidth);
    }, [isReady, collapsed, activeKey]);

    useEffect(() => {
        if (isReady && activeKey === 'tab5') {
            let myChart = echarts.init(chartWrap.current);
            let option = ret_option(xAxisData, seriesData1, seriesData2, seriesData3);
            myChart.resize({ width: w });
            myChart.setOption(option);
        }
    }, [isReady, w, activeKey, props.graph5]);

    if (loading || !isReady) {
        return <PageLoading size='large' />
    }

    return <div className={styles.tab5}>
        <div className={styles['chart5-box']} ref={chartWrap}></div>
    </div>
}

let mapStateToProps = state => ({
    collapsed: state.global.collapsed,
    loading: state.loading.AbnormalDecision,
    activeKey: state.AbnormalDecision.anomalousGraph.activeKey,
    globalSearch: state.AbnormalDecision.anomalousGraph.globalSearch,
    quickSearch: state.AbnormalDecision.anomalousGraph.quickSearch,
    graph5: state.AbnormalDecision.anomalousGraph.graphData.graph5
})

export default connect(mapStateToProps)(Tab5);