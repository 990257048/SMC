// AnomalousGraph 异常统计图（上面的部分 ： 一行控件 快速搜索 异常统计图（引）  高级搜索（引） 新增异常（引））
import React, { memo, useEffect, useCallback, useMemo } from 'react'
import { connect, FormattedMessage, formatMessage } from 'umi'
import { Button, Space, Input, Tabs, Popover, Row, Col, Divider, Select, Radio, DatePicker, Tooltip } from 'antd'
import { useSelector, useDispatch } from 'dva'
import { SearchOutlined, PlusOutlined, ProfileOutlined, BarsOutlined, ZoomInOutlined } from '@ant-design/icons'
import { PageLoading } from '@ant-design/pro-layout';
import moment from 'moment';

import QuickSearch from './QuickSearch';
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
        getAllMfg, getBU,
        initQuickSearch,
        activeKey, globalSearch: { allMFG, allCategories, MFG, classify }
    } = props;

    let isReady = useMemo(() => {
        return allMFG.length > 0 && MFG;
    }, [allMFG, MFG]);

    // 获取制造处
    useMemo(() => {
        getAllMfg();  // 获取所有制造处
        initQuickSearch(); //初始化快速搜索条件（时间条件）
    }, []);

    // 获取BU
    useEffect(() => {
        // console.log('mfg change');
        MFG && getBU(MFG);
    }, [MFG]);
    
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
                    <Button type="primary" shape='circle' icon={<SearchOutlined />}></Button>
                </Popover>
            </Tooltip>
            {
                activeKey === 'tab1' ? (
                    <Tooltip title="高级搜索">
                        <Popover placement="bottomRight" content={<AdvancedSearch />} trigger="click">
                            <Button type="primary" shape='circle' icon={<ZoomInOutlined />}></Button>
                        </Popover>
                    </Tooltip>
                ) : <></>
            }
            <Tooltip title="新增异常">
                {/* NewAbnormal */}
                <Popover placement="bottomRight" content={<NewAbnormal />} trigger="click">
                    <Button type="primary" shape='circle' icon={<PlusOutlined />}></Button>
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
        getAllMfg: () => {
            dispatch({ type: 'AbnormalDecision/getAllMfg' })
        },
        getBU: MFG => {
            dispatch({ type: 'AbnormalDecision/getBU', MFG })
        },
        initQuickSearch: () => {
            dispatch({ type: 'AbnormalDecision/initQuickSearch' })
        }
    }
})(memo(TabControls));



let AnomalousGraph = props => {  // 异常统计图
    let { dispatch, activeKey, globalSearch, quickSearch } = props;
    let { classify } = quickSearch;
    let tabChange = useCallback((activeKey) => {
        dispatch({
            type: 'AbnormalDecision/setActiveKey', activeKey
        });
        let allCategories, newClassify;
        //不同的选项卡对应不同的快速搜索的条件，选项卡切换时可能需要改变当前的条件
        switch(activeKey){
            case 'tab4':
                allCategories = ['year'];
                newClassify = allCategories.includes(classify) ? classify : 'year';
                break;
            case 'tab5':
                allCategories = ['year', 'season'];
                newClassify = allCategories.includes(classify) ? classify : 'season';
                break;
            default:
                allCategories = ['year', 'season', 'month', 'week', 'time'];
                newClassify = classify;
                break;
        }
        dispatch({
            type: 'AbnormalDecision/setQuickSearch',
            payload: { allCategories, classify: newClassify }
        });
    }, [classify]);

    let desc = useMemo(() => {   // 拼接条件（实时）
        let {MFG} = globalSearch;
        let {classify, year, season, month, week, time} = quickSearch;

        let desc = [MFG];   // 制造处 
        if( activeKey == 'tab1' ){
            desc.push(globalSearch.classify + '分类'); // 当前查询类别
        }
        switch(classify){
            case 'year':
                desc.push(year + '年');
                break;
            case 'season':
                desc.push(year + '年', season);
                break;
            case 'month':
                desc.push(year + '年', month + '月份');
                break;
            case 'week':
                desc.push(year + '年', '第' + week + '周');
                break;
            case 'time':
                desc.push('时间段：' + time[0] + ' 到 ' + time[1]);
                break;
        }
        desc.push('含细分条件（高级条件）', '异常汇总');
        return desc;
    }, [activeKey, globalSearch, quickSearch]);

    return <div className={styles['anomalous-graph']}>
        <Tabs size="middle" type='line' activeKey={activeKey} onChange={ tabChange } className={styles.tabs} >
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
                {/* {
                    ['MFGII', '按发生区域汇总', '2020年', '第2季度', '含细分条件（高级条件）', '异常汇总'].map((text, i) => {
                        return i === 0 ? <span key={'span' + i}>{text}</span> : <span key={'span' + i}>{' · ' + text}</span>
                    })
                } */}
                {
                    desc.map((text, i) => {
                        return i === 0 ? <span key={'span' + i}>{text}</span> : <span key={'span' + i}>{' · ' + text}</span>
                    })
                }
            </span>
            {/* <span>MFGII · 2020年 · 第2季度 · 异常汇总</span> */}
        </Space>
    </div>
}

let mapStateToProps = ({ AbnormalDecision }) => ({
    activeKey: AbnormalDecision.anomalousGraph.activeKey,
    // classify: AbnormalDecision.anomalousGraph.quickSearch.classify,
    globalSearch: AbnormalDecision.anomalousGraph.globalSearch,
    quickSearch: AbnormalDecision.anomalousGraph.quickSearch,
});

export default connect(mapStateToProps)(AnomalousGraph);
