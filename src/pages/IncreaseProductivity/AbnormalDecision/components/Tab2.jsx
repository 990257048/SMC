import React, { useRef, useEffect, useMemo, useCallback, useState } from 'react';
import { connect, FormattedMessage, formatMessage } from 'umi';
import { Space, Input, Button, Table, Row, Col, Spin } from 'antd';
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
            data: [334, 1090, 700, 460, 560, 780]
        }
    ]
};


let Tab2 = props => {

    let { collapsed, activeKey } = props;
    let [w, setW] = useState(100);
    let chartWrap = useRef();

    useEffect(() => {
        activeKey === 'tab2' && setW(chartWrap.current.clientWidth);
    }, [collapsed, activeKey]);

    useEffect(() => {
        if(activeKey === 'tab2'){
            let myChart = echarts.init(chartWrap.current);
            myChart.resize({ width: w });
            myChart.setOption(option);
        }
    }, [w, activeKey]);

    return <div className={styles.tab2}>
        <Spin size="large" spinning={false}>
            <div className={styles['chart2-box']} ref={chartWrap}>

            </div>
        </Spin>
    </div>
}
let mapStateToProps = state => ({
    collapsed: state.global.collapsed,
    activeKey: state.AbnormalDecision.anomalousGraph.activeKey
})
export default connect(mapStateToProps)(Tab2);