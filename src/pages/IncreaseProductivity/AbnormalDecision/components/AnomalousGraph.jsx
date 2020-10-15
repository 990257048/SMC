// AnomalousGraph 异常统计图（上面的部分 ： 一行控件 快速搜索 异常统计图（引）  高级搜索（引） 新增异常（引））
import React, { memo, useEffect, useCallback, useMemo } from 'react';
import { connect, FormattedMessage, formatMessage } from 'umi';
import { Button, Space, Input, Tabs, Popover, Row, Col, Divider, Select, Radio, DatePicker, Tooltip } from 'antd';
// import { useDispatch, useSelector } from 'react-redux'
import { useSelector, useDispatch } from 'dva'
import { SearchOutlined, PlusOutlined, ProfileOutlined, BarsOutlined, ZoomInOutlined } from '@ant-design/icons'
import { PageLoading } from '@ant-design/pro-layout';
import moment from 'moment';

import AdvancedSearch from './AdvancedSearch';
import NewAbnormal from './NewAbnormal';
import Tab1 from './Tab1';
import Tab2 from './Tab2';
import Tab3 from './Tab3';
import Tab4 from './Tab4';
import Tab5 from './Tab5';
import styles from '../style.less';

const { TabPane } = Tabs;
const { Option } = Select;
const { RangePicker } = DatePicker;

let TabControls = props => {   // 标签页控件
    // allMFG: [], //所有制造处
    // allCategories: ['', '', '', ''], //所有查询类别
    // MFG: '', //当前制造处
    // classify: '', //当前查询类别
    let {
        MFGChange, classifyChange,
        getAllBu,
        activeKey, globalSearch: { allMFG, allCategories, MFG, classify }
    } = props;

    let isReady = useMemo(() => {
        return allMFG.length == 0 || !MFG;
    }, [allMFG, MFG]);

    // 获取BU
    useMemo(() => {
        getAllBu();
    }, []);

    // if (allMFG.length == 0 || !MFG) {
    //     return <PageLoading />
    // }

    return <div className={styles['tab-controls']}>
        <Space size="middle" align="baseline">
            {/* <b>当前：MFGII · 按区域统计 · 2020年 · 异常</b> */}

            <Tooltip title="制造处">
                <Select loading={ !isReady } value={MFG} onChange={MFGChange} style={{ width: '100px' }}>
                    {
                        isReady ? allMFG.map(MFG => <Option key={MFG} value={MFG}>{MFG}</Option>) : null
                    }
                </Select>
            </Tooltip>
            {
                activeKey === 'tab1' ? (
                    <Tooltip title="查询分类">
                        <Select value={classify} onChange={classifyChange} style={{ width: '120px' }}>
                            {
                                allCategories.map(classify => <Option key={classify} value={classify}>{classify}</Option>)
                            }
                        </Select>
                    </Tooltip>
                ) : <></>
            }
            <Tooltip title="快速搜索">
                {/* QuickSearch */}
                <Popover placement="bottomRight" content={<QuickSearch />} trigger="click">
                    <Button type="primary" icon={<SearchOutlined />}></Button>
                </Popover>
            </Tooltip>
            {
                activeKey === 'tab1' ? (
                    <Tooltip title="高级搜索">
                        <Popover placement="bottomRight" content={<AdvancedSearch />} trigger="click">
                            <Button type="primary" icon={<ZoomInOutlined />}></Button>
                        </Popover>
                    </Tooltip>
                ) : <></>
            }
            <Tooltip title="新增异常">
                {/* NewAbnormal */}
                <Popover placement="bottomRight" content={<NewAbnormal />} trigger="click">
                    <Button type="primary" icon={<PlusOutlined />}></Button>
                </Popover>
            </Tooltip>
        </Space>
    </div>
}

TabControls = connect(({ AbnormalDecision }) => {
    return {
        activeKey: AbnormalDecision.anomalousGraph.activeKey,
        globalSearch: AbnormalDecision.anomalousGraph.globalSearch
    }
}, dispatch => {
    return {
        MFGChange: MFG => {
            dispatch({ type: 'AbnormalDecision/setGlobalSearch', payload: { MFG } })
        },
        classifyChange: classify => {
            dispatch({ type: 'AbnormalDecision/setGlobalSearch', payload: { classify } })
        },
        getAllBu: () => {
            dispatch({ type: 'AbnormalDecision/getAllBu' })
        }
    }
})(memo(TabControls));


//=================================================================================================================================================


let QuickSearch = props => {  // 快速搜索
    let { dispatch, quickSearch: { allYear, allCategories, classify, year, season, month, week, time } } = props;
    // console.log(allYear, allCategories, classify, year, season, month, week, time);
    console.log(<div>1234</div>);
    const v = <div>1234</div>
    useMemo(() => {
        dispatch({
            type: 'AbnormalDecision/initQuickSearch'
        });
    }, []);

    let changeClassify = useCallback((classify) => {
        // console.log(v);
        dispatch({
            type: 'AbnormalDecision/setQuickSearch',
            payload: { classify }
        });
    });

    let yearChange = useCallback((year) => {
        dispatch({
            type: 'AbnormalDecision/setQuickSearch',
            payload: { year }
        });
    }, []);

    let changeSeason = useCallback((season) => {
        dispatch({
            type: 'AbnormalDecision/setQuickSearch',
            payload: { season }
        })
    }, []);

    let changeMonth = useCallback((month) => {
        dispatch({
            type: 'AbnormalDecision/setQuickSearch',
            payload: { month }
        })
    }, []);

    let changeWeek = useCallback((week) => {
        dispatch({
            type: 'AbnormalDecision/setQuickSearch',
            payload: { week }
        })
    }, []);

    let changeTime = useCallback((time) => {
        dispatch({
            type: 'AbnormalDecision/setQuickSearch',
            payload: { time: [time[0].format('YYYY-MM-DD'), time[1].format('YYYY-MM-DD')] }
        })
    }, []);

    return <div className={styles['control-content']}>
        { v }
        <Tabs size="small" type='line' activeKey={classify} onChange={ changeClassify } className={styles['tabs-query']} >
            <TabPane tab="按年份" key="year">
                <div className={styles['tab-query']}>
                    <Row gutter={[16, 12]} style={{ marginTop: '10px' }}>
                        <Col span={6}>
                            <div className={styles['col-con']}>年份</div>
                        </Col>
                        <Col span={18}>
                            <div>
                                <Select value={year} onChange={ yearChange } className={styles.w100}>
                                    {
                                        allYear.map(year => <Option key={year} value={year}>{year + '年'}</Option>)
                                    }
                                </Select>
                            </div>
                        </Col>
                    </Row>
                </div>
            </TabPane>
            <TabPane tab="按季度" key="season">
                <div className={styles['tab-query']}>
                    <Row gutter={[16, 12]} style={{ marginTop: '10px' }}>
                        <Col span={6}>
                            <div className={styles['col-con']}>年份</div>
                        </Col>
                        <Col span={18}>
                            <div>
                                <Select value={year} onChange={ yearChange } className={styles.w100}>
                                    {
                                        allYear.map(year => <Option key={year} value={year}>{year + '年'}</Option>)
                                    }
                                </Select>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className={styles['col-con']}>季度</div>
                        </Col>
                        <Col span={18}>
                            <div>
                                <Select value={season} onChange={ changeSeason } className={styles.w100}>
                                    {
                                        ['第一季度', '第二季度', '第三季度', '第四季度'].map(season => <Option key={season} value={season}>{season}</Option>)
                                    }
                                </Select>
                            </div>
                        </Col>
                    </Row>
                </div>
            </TabPane>
            <TabPane tab="按月份" key="month">
                <div className={styles['tab-query']}>
                    <Row gutter={[16, 12]} style={{ marginTop: '10px' }}>
                        <Col span={6}>
                            <div className={styles['col-con']}>年份</div>
                        </Col>
                        <Col span={18}>
                            <div>
                                <Select value={year} onChange={ yearChange } className={styles.w100}>
                                    {
                                        allYear.map(year => <Option key={year} value={year}>{year + '年'}</Option>)
                                    }
                                </Select>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className={styles['col-con']}>月份</div>
                        </Col>
                        <Col span={18}>
                            <div>
                                <Select value={month} onChange={ changeMonth } className={styles.w100}>

                                    <Option value={1}>一月份</Option>
                                    <Option value={2}>二月份</Option>
                                    <Option value={3}>三月份</Option>
                                    <Option value={4}>四月份</Option>
                                    <Option value={5}>五月份</Option>
                                    <Option value={6}>六月份</Option>
                                    <Option value={7}>七月份</Option>
                                    <Option value={8}>八月份</Option>
                                    <Option value={9}>九月份</Option>
                                    <Option value={10}>十月份</Option>
                                    <Option value={11}>十一月份</Option>
                                    <Option value={12}>十二月份</Option>
                                </Select>
                            </div>
                        </Col>
                    </Row>
                </div>
            </TabPane>
            <TabPane tab="按周别" key="week">
                <div className={styles['tab-query']}>
                    <Row gutter={[16, 12]} style={{ marginTop: '10px' }}>
                        <Col span={6}>
                            <div className={styles['col-con']}>年份</div>
                        </Col>
                        <Col span={18}>
                            <div>
                                <Select value={year} onChange={ yearChange } className={styles.w100}>
                                    {
                                        allYear.map(year => <Option key={year} value={year}>{year + '年'}</Option>)
                                    }
                                </Select>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className={styles['col-con']}>周别</div>
                        </Col>
                        <Col span={18}>
                            <div>
                                <Select value={week} onChange={ changeWeek } className={styles.w100}>
                                    {
                                        [
                                            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
                                            28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53
                                        ].map(n => <Option key={'week' + n} value={ n }>{'第' + n + '周'}</Option>)
                                    }
                                </Select>
                            </div>
                        </Col>
                    </Row>
                </div>
            </TabPane>
            <TabPane tab="按时间段" key="time">
                <div className={styles['tab-query']}>
                    <Row gutter={[16, 12]} style={{ marginTop: '10px' }}>
                        <Col span={6}>
                            <div className={styles['col-con']}>时间段</div>
                        </Col>
                        <Col span={18}>
                            <div>
                                <RangePicker onChange={ changeTime } className={styles.w100}
                                    value={[moment(time[0], 'YYYY-MM-DD'), moment(time[1], 'YYYY-MM-DD')]} format='YYYY-MM-DD'
                                />
                            </div>
                        </Col>
                    </Row>
                </div>
            </TabPane>
        </Tabs>
        <Row gutter={[16, 12]}>
            <Col span={24}>
                <div className={styles['col-con']}>
                    <Button type="primary" icon={<SearchOutlined />}>查询</Button>
                </div>
            </Col>
        </Row>
    </div>
}

QuickSearch = connect(({ AbnormalDecision }) => {
    return {
        activeKey: AbnormalDecision.anomalousGraph.activeKey,
        quickSearch: AbnormalDecision.anomalousGraph.quickSearch
    }
})(QuickSearch);

//==============================================================================================================================================


let AnomalousGraph = props => {  // 异常统计图
    let { activeKey, setActiveKey } = props;
    return <div className={styles['anomalous-graph']}>
        <Tabs size="middle" type='line' activeKey={activeKey} onChange={key => setActiveKey(key)} className={styles.tabs} >
            <TabControls />
            <TabPane tab={<b>异常状态统计</b>} key="tab1">
                <div className={styles.tab}>
                    <Tab1 />
                </div>
            </TabPane>
            <TabPane tab={<b>异常类别统计</b>} key="tab2">
                <div className={styles.tab}>
                    <Tab2 />
                </div>
            </TabPane>
            <TabPane tab={<b>原因类别统计</b>} key="tab3">
                <div className={styles.tab}>
                    <Tab3 />
                </div>
            </TabPane>
            <TabPane tab={<b>异常工时統計</b>} key="tab4">
                <div className={styles.tab}>
                    <Tab4 />
                </div>
            </TabPane>
            <TabPane tab={<b>結案狀態統計</b>} key="tab5">
                <div className={styles.tab}>
                    <Tab5 />
                </div>
            </TabPane>
        </Tabs>
        <Space size="small" style={{ float: 'right', marginRight: '25px' }}>
            <b>当前数据：</b>
            <span>
                {
                    ['MFGII', '2020年', '第2季度', 'SRGBU', '(kITTING | SMT | ICT)', '设备异常（SMT設備 | PTH設備 | 保養超時）', '异常汇总'].map((text, i) => {
                        return i === 0 ? <span key={'span' + i}>{text}</span> : <span key={'span' + i}>{' · ' + text}</span>
                    })
                }
            </span>
            {/* <span>MFGII · 2020年 · 第2季度 · 异常汇总</span> */}
        </Space>
    </div>
}

let mapStateToProps = ({ AbnormalDecision }) => ({
    activeKey: AbnormalDecision.anomalousGraph.activeKey
});

let mapDispatchToProps = dispatch => ({
    setActiveKey: activeKey => {
        dispatch({ type: 'AbnormalDecision/setActiveKey', activeKey });
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AnomalousGraph);