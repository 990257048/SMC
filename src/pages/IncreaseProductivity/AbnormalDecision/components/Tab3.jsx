import React, { useRef, useEffect, useMeno, useCallback, useState } from 'react';
import { connect, FormattedMessage, formatMessage } from 'umi';
import { Space, Input, Button, Table, Row, Col, Spin } from 'antd';
import echarts from 'echarts';
import { ProfileOutlined, BarChartOutlined, RedoOutlined } from '@ant-design/icons';

import styles from '../style.less';


let option = {
    color: ['#3398DB'],
    title: {
        text: '原因類別統計（单位:個）',
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
        formatter: '原因类别: {b}<br>异常数量: {c}个'
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
            barWidth: '40%',
            data: [334, 1090, 700, 460, 560, 780]
        }
    ]
};


let Tab3 = props => {

    let { collapsed } = props;
    let chartWrap = useRef();
    let [w, setW] = useState(100);

    useEffect(() => {
        let width = chartWrap.current.clientWidth;
        setW(width);
    }, [collapsed]);

    useEffect(() => {
        console.log("componwntDidMount111");
        let mychart = echarts.init(chartWrap.current);
        mychart.resize({ width: w });
        mychart.setOption(option);
    }, [w]);


    return <div className={styles.tab3}>
        <Spin size="large" spinning={false}>
            <div className={styles['chart3-box']} ref={chartWrap}>

            </div>
        </Spin>
    </div>
}
let mapStateToProps = state => ({
    collapsed: state.global.collapsed
})
export default connect(mapStateToProps)(Tab3);