import React, { useRef, useState, useEffect, useMeno, useCallback, useMemo } from 'react';
import { connect, FormattedMessage, formatMessage } from 'umi';
import echarts from 'echarts';
import { Button, Space, Input, Tabs, Popover, Row, Col, Divider, Select, Spin } from 'antd';
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

let ret_option = (tit, num) => {
    // console.log('width:',width);
    return {
        backgroundColor: '#2c343c',
        // color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
        color: ['#52c41a', '#13c2c2', '#87e8de', '#91d5ff', '#722ed1','#eb2f96',  '#f5222d', '#d4380d','#fa8c16', '#faad14', '#ffec3d'],
        title: {
            text: tit + '（'+ num +'）',
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

        visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
                colorLightness: [0, 1]
            }
        },
        series: [
            {
                name: tit,
                type: 'pie',
                radius: '50%',
                center: ['50%', '50%'],
                data: [
                    { value: 335, name: '设备异常' },
                    { value: 310, name: '系统异常' },
                    { value: 274, name: '物料异常' },
                    { value: 235, name: '人员异常' },
                    { value: 400, name: '品质异常' }
                ],  // .sort(function (a, b) { return a.value - b.value; }),
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
    let { collapsed, activeKey } = props;
    let graph1 = useRef();
    let graph2 = useRef();
    let graph3 = useRef();

    let [w, setW] = useState(100);

    useEffect(() => {
        activeKey === 'tab1' && setW(graph1.current.clientWidth);
    }, [collapsed, activeKey]);

    useEffect(() => {
        if(activeKey === 'tab1'){
            let chart1 = echarts.init(graph1.current);
            let chart2 = echarts.init(graph2.current);
            let chart3 = echarts.init(graph3.current);
            let option1 = ret_option('所有异常', 600);
            let option2 = ret_option('未结案异常', 100);
            let option3 = ret_option('待签核异常', 80);
            chart1.resize({ width: w });
            chart2.resize({ width: w });
            chart3.resize({ width: w });
            chart1.setOption(option1);
            chart2.setOption(option2);
            chart3.setOption(option3);
        }
    }, [w, activeKey]);

    return <div className={styles.tab1}>
        <Spin size="large" spinning={false}>
            <Row gutter={[16, 16]}>
                <Col span={8}>
                    <div ref={graph1} className={styles.graph}></div>
                </Col>
                <Col span={8}>
                    <div ref={graph2} className={styles.graph}></div>
                </Col>
                <Col span={8}>
                    <div ref={graph3} className={styles.graph}></div>
                </Col>
            </Row>
        </Spin>

    </div>
}
// collapsed
let mapStateToProps = state => ({
    collapsed: state.global.collapsed,
    activeKey: state.AbnormalDecision.anomalousGraph.activeKey
})
export default connect(mapStateToProps)(Tab1);