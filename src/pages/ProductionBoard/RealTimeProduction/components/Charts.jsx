import React, { useRef, useEffect, useMeno, useCallback, useState } from 'react';
import { connect, FormattedMessage, formatMessage } from 'umi';
import { Space, Input, Button, Table, Row, Col, Spin } from 'antd';
import echarts from 'echarts';
import { ProfileOutlined, BarChartOutlined, RedoOutlined } from '@ant-design/icons';

import styles from '../style.less';



let option = {
    // color: ['#3398DB'],
    title: {
        text: '分机种实时产出（单位:pcs）',
        left: 'center',
        top: '8%',
        textStyle: {
            fontSize: 14
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        padding: 10,
        formatter: '{a}:<br>机种: {b}<br>数量: {c}pcs'
    },
    grid: {
        top: '20%',
        left: '7%',
        right: '14%',
        bottom: '10%',
        // show: false,
        containLabel: true
    },
    xAxis: [
        {
            // type: 'category',
            type: 'value',
            axisTick: {
                alignWithLabel: true
            },
            splitLine: {
                show: false
            }
        }
    ],
    yAxis: [
        {
            // type: 'value',
            type: 'category',
            data: ['74-104761-03', '74-104761-04', '74-104761-05'],
            // data: ['74-104761-03', '74-104761-04', '74-104761-05', '74-104761-06', '74-104761-07', '74-104761-08', '74-104761-09', '74-104761-10'],
            // interval: 600,
            splitLine: {
                show: false
            }
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
            data: [1000, 800, 700],
            // data: [1090, 460, 333, 222, 111, 80, 70, 60],
            label: {
                show: true,
                position: 'right',
                formatter: '{c} pcs'
            },
            itemStyle: {
                color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                        {offset: 0, color: '#83bff6'},
                        {offset: 0.5, color: '#188df0'},
                        {offset: 1, color: '#188df0'}
                    ]
                )
            }
        }
    ]
};

let ret_option = (yAxisData, seriesData) => {
    return {
        ...option,
        yAxis: {
            ...option.yAxis,
            data: yAxisData
        },
        series: [
            {
                ...option.series[0],
                data: seriesData
            }
        ]
    }
}


let Charts = props => {
    // Abnormal_NoOK_Count: "4",  // 待维护异常
    // Abnormal_Count: "4",    // 异常数量
    // Abnormal_Time: "0",     // 异常工时
    // Capacity_achievement_rate: "100%"  // 目标达成率
    let {
        dispatch,
        collapsed,
        realTimeProduction: {
            Abnormal: {Abnormal_NoOK_Count, Abnormal_Count, Abnormal_Time, Capacity_achievement_rate},
            AbnormalChart: {yAxis, series}
        }
    } = props;
    let chartWrap = useRef();
    let [w, setW] = useState(100);

    useEffect(() => {
        let width = chartWrap.current.clientWidth;
        setW(width);
    }, [collapsed]);

    useEffect(() => {
        // console.log("componwntDidMount");
        let mychart = echarts.init(chartWrap.current);
        let option = ret_option(yAxis, series);
        mychart.resize({width: w});
        mychart.setOption(option);
    }, [w, yAxis, series]);


    return <div className={styles.charts}>
        <Row gutter={[24, 12]}>
            <Col span={3}>
                <div className={styles.box}>
                    <h3> <b>待维护异常</b> </h3>
                    <h2 style={{ color: 'red' }}> <b>{ Abnormal_NoOK_Count }个</b> </h2>
                </div>
            </Col>
            <Col span={3}>
                <div className={styles.box}>
                    <h3> <b>全部异常</b> </h3>
                    <h2 style={{ color: 'red' }}> <b>{ Abnormal_Count }个</b> </h2>
                </div>
            </Col>
            <Col span={3}>
                <div className={styles.box}>
                    <h3> <b>异常时间</b> </h3>
                    <h2 style={ Abnormal_Time == '0' ? { color: 'green' } : { color: 'red' }}> <b>{ Abnormal_Time }小时</b> </h2>
                </div>
            </Col>
            <Col span={3}>
                <div className={styles.box}>
                    <h3> <b>目标达成率</b> </h3>
                    <h2 style={{ color: 'green' }}> <b>{ Capacity_achievement_rate }</b> </h2>
                </div>
            </Col>
            <Col span={12}>
                <Spin size="large" spinning={false}>
                    <div className={styles['chart-box']} ref={chartWrap}>

                    </div>
                </Spin>

            </Col>
        </Row>
    </div>
}

let mapStateToProps = ({global, realTimeProduction: {Abnormal, AbnormalChart}}) => ({
    collapsed: global.collapsed,
    realTimeProduction: {Abnormal, AbnormalChart}
})

export default connect(mapStateToProps)(Charts);
