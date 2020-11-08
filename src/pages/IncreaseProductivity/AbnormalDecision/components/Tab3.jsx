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
        text: '原因類別統計（单位:個）',
        left: 'center',
        top: '3%',
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
        formatter: '原因类别: {b}<br>异常数量: {c}个'
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
            data: ['环', '机', '法', '料', '人', '量检测'],
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

let Tab3 = props => {
    let { dispatch, collapsed, width, loading, activeKey, globalSearch, quickSearch, graph3: {xAxisData, seriesData} } = props;
    
    let [myCharts, setMyCharts] = useState(null);
    let [w, setW] = useState(100);
    let chartWrap = useRef();

    let isReady = useMemo(() => {
        if(xAxisData.length > 0 && seriesData.length > 0){
            return true;
        }
        return false;
    }, [props.graph3]);

    useMemo(() => {
        activeKey == 'tab3' && dispatch({
            type: 'AbnormalDecision/getGraph3'
        });
    }, [activeKey, globalSearch, quickSearch]);

    useEffect(() => {
        isReady && activeKey === 'tab3' && setW(chartWrap.current.clientWidth);
    }, [isReady, collapsed, width, activeKey]);

    //================================================================================================================

    useEffect(() => { //设置实例
        if(activeKey == 'tab3'){
            setTimeout(() => {
                let chart = echarts.init(chartWrap.current);
                setMyCharts(chart);
            }, 600);
        }
    }, [activeKey]);

    useEffect(() => {  //渲染
        if(myCharts && isReady){
            let option = ret_option(xAxisData, seriesData);
            myCharts.setOption(option);
        }
    }, [myCharts, isReady , props.graph3]);

    useEffect(() => {  //宽度响应
        myCharts && myCharts.resize({ width: w });
    }, [myCharts, w]);

    useEffect(() => {   //绑定事件
        if(myCharts){
            myCharts.on('click', e => {
                console.log(e);
            });
        }
        return () => {
            if(myCharts){
                myCharts.off('click');
            }
        }
    }, [myCharts]);

    //================================================================================================================

    if(loading || !isReady){
        return <PageLoading size='large' />
    }

    return <div className={styles.tab3}>
        <Spin size="large" spinning={false}>
            <div className={styles['chart3-box']} ref={chartWrap}>

            </div>
        </Spin>
    </div>
}

let mapStateToProps = state => ({
    collapsed: state.global.collapsed,
    width: state.global.width,
    loading: state.loading.AbnormalDecision,
    activeKey: state.AbnormalDecision.anomalousGraph.activeKey,
    globalSearch: state.AbnormalDecision.anomalousGraph.globalSearch,
    quickSearch: state.AbnormalDecision.anomalousGraph.quickSearch,
    graph3: state.AbnormalDecision.anomalousGraph.graphData.graph3
})

export default connect(mapStateToProps)(Tab3);
