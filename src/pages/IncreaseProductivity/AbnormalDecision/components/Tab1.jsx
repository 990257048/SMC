import React, { useRef, useState, useEffect, useMeno, useCallback, useMemo } from 'react';
import { connect, FormattedMessage, formatMessage } from 'umi';
import echarts from 'echarts';
import { Button, Space, Input, Tabs, Popover, Row, Col, Divider, Select } from 'antd';
import { SearchOutlined, TagsOutlined, ProfileOutlined, BarsOutlined } from '@ant-design/icons'
import styles from '../style.less';



let ret_option = width => {
    // console.log('width:',width);
    return {
        backgroundColor: '#2c343c',

        title: {
            text: 'Customized Pie' + width,
            left: 'center',
            top: 20,
            textStyle: {
                color: '#ccc'
            }
        },

        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },

        // grid: {
        //     width,
        //     height: 200
        // },

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
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: [
                    { value: 335, name: '直接访问' },
                    { value: 310, name: '邮件营销' },
                    { value: 274, name: '联盟广告' },
                    { value: 235, name: '视频广告' },
                    { value: 400, name: '搜索引擎' }
                ].sort(function (a, b) { return a.value - b.value; }),
                roseType: 'radius',
                label: {
                    color: 'rgba(255, 255, 255, 0.3)'
                },
                labelLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                },
                itemStyle: {
                    color: '#c23531',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                },

                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }
        ]
    }
}

let option = {
    backgroundColor: '#2c343c',

    title: {
        text: 'Customized Pie1',
        left: 'center',
        top: 20,
        textStyle: {
            color: '#ccc'
        }
    },

    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },

    // grid: {
    //     width: 200,
    //     height: 200
    // },

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
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
                { value: 335, name: '直接访问' },
                { value: 310, name: '邮件营销' },
                { value: 274, name: '联盟广告' },
                { value: 235, name: '视频广告' },
                { value: 400, name: '搜索引擎' }
            ].sort(function (a, b) { return a.value - b.value; }),
            roseType: 'radius',
            label: {
                color: 'rgba(255, 255, 255, 0.3)'
            },
            labelLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
            },
            itemStyle: {
                color: '#c23531',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        }
    ]
}





let Tab1 = props => {   // 异常状态
    let { dispatch, collapsed } = props;
    let graph1 = useRef();
    let graph2 = useRef();
    let graph3 = useRef();

    let [w, setW] = useState(100);

    useEffect(() => {
        let width = graph1.current.clientWidth;
        setW(width);
    }, [collapsed]);

    useEffect(() => {
        let chart1 = echarts.init(graph1.current);
        let chart2 = echarts.init(graph2.current);
        let chart3 = echarts.init(graph3.current);
        let option = ret_option(w);
        chart1.resize({width: w});
        chart2.resize({width: w});
        chart3.resize({width: w});
        chart1.setOption(option);
        chart2.setOption(option);
        chart3.setOption(option);
    }, [w]);

    return <div className={styles.tab1}>
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
    </div>
}
// collapsed
let mapStateToProps = state => ({
    collapsed: state.global.collapsed
})
export default connect(mapStateToProps)(Tab1);