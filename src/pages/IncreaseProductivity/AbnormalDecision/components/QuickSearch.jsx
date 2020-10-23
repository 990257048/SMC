import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { connect, FormattedMessage, formatMessage } from 'umi';
import { Button, Space, Input, Tabs, Popover, Row, Col, Divider, Select, Radio, Checkbox, DatePicker, Tooltip, message } from 'antd';
import { SearchOutlined, PlusOutlined, ProfileOutlined, BarsOutlined, SaveOutlined, CheckOutlined, ZoomInOutlined } from '@ant-design/icons'
import moment from 'moment';

import styles from '../style.less';

const { TabPane } = Tabs;
const { Option } = Select;
const { RangePicker } = DatePicker;

let QuickSearch = props => {  // 快速搜索
    console.log('QuickSearch render');
    let { dispatch, quickSearch: { allYear, allCategories, classify, year, season, month, week, time } } = props;
    // console.log(allYear, allCategories, classify, year, season, month, week, time);
    // console.log(<div>1234</div>);
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
        <Tabs size="small" type='line' activeKey={classify} onChange={ changeClassify } className={styles['tabs-query']} >
            <TabPane tab="按年份" key="year" disabled={ !allCategories.includes('year') }>
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
            <TabPane tab="按季度" key="season" disabled={ !allCategories.includes('season') }>
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
            <TabPane tab="按月份" key="month" disabled={ !allCategories.includes('month') }>
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
            <TabPane tab="按周别" key="week" disabled={ !allCategories.includes('week') } >
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
            <TabPane tab="按时间段" key="time" disabled={ !allCategories.includes('time') }>
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
        {/* <Row gutter={[16, 12]}>
            <Col span={24}>
                <div className={styles['col-con']}>
                    <Button type="primary" icon={<SearchOutlined />}>查询</Button>
                </div>
            </Col>
        </Row> */}
    </div>
}

QuickSearch = connect(({ AbnormalDecision }) => {
    return {
        activeKey: AbnormalDecision.anomalousGraph.activeKey,
        quickSearch: AbnormalDecision.anomalousGraph.quickSearch
    }
})(QuickSearch);

export default QuickSearch;