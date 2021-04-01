import React, { useRef, useEffect, useMemo, useCallback, useState } from 'react';
import { connect, FormattedMessage, formatMessage } from 'umi';
import { Space, Input, Button, Table, Row, Col, Spin } from 'antd';
import { PageLoading } from '@ant-design/pro-layout';
import echarts from 'echarts';
import { ProfileOutlined, BarChartOutlined, RedoOutlined } from '@ant-design/icons';

import styles from '../style.less';



let ret_option = (xAxisData, seriesData1, seriesData2) => {
    let option = {
        color: ['#67e0e3', '#722ed1', '#fa8c16', '#ffec3d'],
        title: {
            text: '异常工时统计',
            left: 'center',
            top: '3%',
            textStyle: {
                fontSize: 16
            }
        },
        grid: {
            top: '18%',
            left: '5%',
            right: '6%',
            bottom: '0%',
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
            data: ['平均每周异常次数', '平均每周异常工时']
        },
        xAxis: [
            {
                type: 'category',
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'Mav', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
                    formatter: '{value} min'
                }
            }
        ],
        series: [
            {
                name: '平均每周异常次数',
                type: 'bar',
                barWidth: '50%',
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{c} 次'
                },
                data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
            },
            {
                name: '平均每周异常工时',
                type: 'line',
                yAxisIndex: 1,
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{c} min'
                },
                data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
            }
        ]
    };
    
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
            }
        ]
    }
}

let Tab4 = props => {
    let { dispatch, collapsed, width, loading, activeKey, globalSearch, quickSearch, graph4: { xAxisData, seriesData1, seriesData2 } } = props;
    let [myCharts, setMyCharts] = useState(null);
    let [w, setW] = useState(100);
    let chartWrap = useRef();

    let isReady = useMemo(() => {
        if (xAxisData.length > 0 && seriesData1.length > 0 && seriesData2.length > 0) {
            return true;
        }
        return false;
    }, [props.graph4]);

    //拿数据
    useMemo(() => {
        activeKey == 'tab4' && dispatch({
            type: 'AbnormalDecision/getGraph4'
        });
    }, [activeKey, globalSearch, quickSearch]);

    //设置宽度
    useEffect(() => {
        isReady && activeKey === 'tab4' && setW(chartWrap.current.clientWidth);
    }, [isReady, collapsed, width, activeKey]);

    //================================================================================================================

    //创建实例
    useEffect(() => {
        if (activeKey == 'tab4' && isReady) {
            let chart = echarts.init(chartWrap.current);
            setMyCharts(chart);
        }
    }, [activeKey, isReady]);

    //渲染
    useEffect(() => {
        if (isReady && myCharts) {
            let option = ret_option(xAxisData, seriesData1, seriesData2);
            myCharts.setOption(option);
        }
    }, [isReady, myCharts, props.graph4]);

    //宽度响应
    useEffect(() => {
        myCharts && myCharts.resize({ width: w });
    }, [myCharts, w]);

    //绑定事件
    useEffect(() => {
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


    // useEffect(() => {
    //     if (isReady && activeKey === 'tab4') {
    //         let myChart = echarts.init(chartWrap.current);
    //         let option = ret_option(xAxisData, seriesData1, seriesData2);
    //         myChart.resize({ width: w });
    //         myChart.setOption(option);
    //     }
    // }, [isReady, w, activeKey, props.graph4]);

    //================================================================================================================

    if (loading || !isReady) {
        return <PageLoading size='large' />
    }

    return <div className={styles.tab4}>
        <div className={styles['chart4-box']} ref={chartWrap}></div>
    </div>
}

let mapStateToProps = state => ({
    collapsed: state.global.collapsed,
    width: state.global.width,
    loading: state.loading.AbnormalDecision,
    activeKey: state.AbnormalDecision.anomalousGraph.activeKey,
    globalSearch: state.AbnormalDecision.anomalousGraph.globalSearch,
    quickSearch: state.AbnormalDecision.anomalousGraph.quickSearch,
    graph4: state.AbnormalDecision.anomalousGraph.graphData.graph4
})

export default connect(mapStateToProps)(Tab4);