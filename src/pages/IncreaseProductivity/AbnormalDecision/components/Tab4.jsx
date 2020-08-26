import React, { useRef, useEffect, useMemo, useCallback, useState } from 'react';
import { connect, FormattedMessage, formatMessage } from 'umi';
import { Space, Input, Button, Table, Row, Col, Spin } from 'antd';
import echarts from 'echarts';
import { ProfileOutlined, BarChartOutlined, RedoOutlined } from '@ant-design/icons';

import styles from '../style.less';


let option = {
    color: ['#67e0e3', '#722ed1', '#fa8c16', '#ffec3d'],
    title: {
        text: '异常工时统计',
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
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    legend: {
        top: '8%',
        left: '5%',
        data: ['平均每周异常次数', '平均每周异常工时']
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
                formatter: '{value} 个'
            }
        }
    ],
    series: [
        {
            name: '平均每周异常次数',
            type: 'bar',
            barWidth: '50%',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        },
        {
            name: '平均每周异常工时',
            type: 'line',
            yAxisIndex: 1,
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        }
    ]
};


let Tab4 = props => {

    let { collapsed, activeKey } = props;
    let [w, setW] = useState(100);
    let chartWrap = useRef();

    useEffect(() => {
        activeKey === 'tab4' && setW(chartWrap.current.clientWidth);
    }, [collapsed, activeKey]);

    useEffect(() => {
        if(activeKey === 'tab4'){
            let myChart = echarts.init(chartWrap.current);
            myChart.resize({ width: w });
            myChart.setOption(option);
        }
    }, [w, activeKey]);

    return <div className={styles.tab4}>
        <Spin size="large" spinning={false}>
            <div className={styles['chart4-box']} ref={chartWrap}>

            </div>
        </Spin>
    </div>
}

let mapStateToProps = state => ({
    collapsed: state.global.collapsed,
    activeKey: state.AbnormalDecision.anomalousGraph.activeKey
})

export default connect(mapStateToProps)(Tab4);