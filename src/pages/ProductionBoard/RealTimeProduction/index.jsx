import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { connect, FormattedMessage, formatMessage } from 'umi';
import { Space, Input, Button, Table, Tooltip, Select, Switch, DatePicker } from 'antd';
import moment from 'moment';
import { PageLoading } from '@ant-design/pro-layout';
import { ProfileOutlined, BarChartOutlined, RedoOutlined, AimOutlined } from '@ant-design/icons';
import PageWrap from '../../../components/PageWrap';
import TableWrap from './components/TableWrap';
import Charts from './components/charts';


import styles from './style.less';

let { Option } = Select;

let RealTimeProduction = props => {
    let {
        dispatch,
        realTimeProduction: {
            currentClass, currentDate, allMFG, currentAllLine, currentMFG, currentLine
        },
        modelLoading
    } = props;
    let [isReady, setIsReady] = useState(false);

    // 渲染前： 1.获取当前时间，制造处 2.拿到制造处加载线体 3.拿到线体加载生产数据，4.拿到生产数据开始渲染
    // 1.任何全局数据发生变化 立即获取生产数据重新渲染 2.制造处发生变化重新获取线体，拿到线体（默认第一个）获取生产数据

    useMemo(() => {
        dispatch({
            type: 'realTimeProduction/init'   // 渲染前初始化
        });
        dispatch({    // 获取制造处
            type: 'realTimeProduction/getAllMfg'
        });
    }, []);

    useEffect(() => {
        // console.log("渲染前或制造处发生变化获取线体");
        dispatch({
            type: 'realTimeProduction/getLineData'
        });
    }, [currentMFG]);  // 制造处

    useEffect(() => {
        // console.log("渲染后或时间线体发生变化获取生产数据");
        dispatch({
            type: 'realTimeProduction/getProductionData'
        });
    }, [currentClass, currentDate, currentLine]);   // 时间 线体

    useEffect(() => {
        setIsReady(true);
    }, []);

    let classChange = useCallback(() => {
        let newCurrentClass = currentClass == 'D' ? 'N' : 'D';
        dispatch({
            type: 'realTimeProduction/setGlobalState',
            payload: {
                currentClass: newCurrentClass
            }
        });
    }, [currentClass]);

    let dateChange = useCallback((date) => {
        console.log(date);
        date && dispatch({
            type: 'realTimeProduction/setGlobalState',
            payload: {
                currentDate: date.format('YYYY-MM-DD')
            }
        });
    }, []);

    let MFGChange = useCallback((MFG) => {
        dispatch({
            type: 'realTimeProduction/setGlobalState',
            payload: {
                currentMFG: MFG
            }
        });
    }, []);

    let lineChange = useCallback((line) => {
        dispatch({
            type: 'realTimeProduction/setGlobalState',
            payload: {
                currentLine: line
            }
        });
    }, []);


    let jumpCurrent = useCallback(() => {
        dispatch({
            type: 'realTimeProduction/init'
        });
    }, []);

    let reload = useCallback(() => {
        location.reload();
    }, []);

    if (!isReady || modelLoading) {
        return <PageLoading />
    }
    return <PageWrap>
        <div className={styles['real-time-production']}>
            <h3>
                <BarChartOutlined />
                <b> 实时生产看板</b>
            </h3>
            <div className={styles['real-time-production-main']}>
                <div className={styles['real-time-production-main-top']}>
                    <Space size="middle" style={{ float: 'right' }}>
                        {/* <b>{currentDate}</b> */}
                        <Tooltip title="班别">
                            <Switch size="middle" checkedChildren="白班" unCheckedChildren="晚班" checked={ currentClass == 'D' ? true : false } onChange={ classChange } />
                        </Tooltip>

                        <Tooltip title="日期">
                            <DatePicker value={moment(currentDate, 'YYYY-MM-DD')} format='YYYY-MM-DD' onChange={ dateChange } />
                        </Tooltip>

                        <Tooltip title="制造处">
                            <Select onChange={MFGChange} value={currentMFG} style={{ width: '100px' }}>
                                {
                                    allMFG.map(MFG => <Option key={MFG} value={MFG}>{MFG}</Option>)
                                }
                            </Select>
                        </Tooltip>
                        <Tooltip title="线体">
                            <Select onChange={lineChange} value={currentLine} style={{ width: '200px' }}>
                                {
                                    currentAllLine.map(line => <Option key={line} value={line}>{line}</Option>)
                                }
                            </Select>
                        </Tooltip>

                        <Tooltip title="定位到当前时间（实时）">
                            <Button type="primary" icon={<AimOutlined />} onClick={ jumpCurrent } ></Button>
                        </Tooltip>

                        <Tooltip title="刷新">
                            <Button type="primary" icon={<RedoOutlined />} onClick={ reload } ></Button>
                        </Tooltip>
                    </Space>
                </div>
                <Charts />
                <TableWrap />
            </div>
        </div>
    </PageWrap>
}

export default connect(({ loading, realTimeProduction: { currentClass, currentDate, allMFG, currentAllLine, currentMFG, currentLine } }) => {
    // console.log(loading);
    return {
        realTimeProduction: { currentClass, currentDate, allMFG, currentAllLine, currentMFG, currentLine },
        modelLoading: loading.models.realTimeProduction
    }
})(RealTimeProduction);
