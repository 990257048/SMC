// ExceptionList  异常列表
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Button, Table, Tooltip, Space, Input, Modal } from 'antd';
import { StarOutlined, EditOutlined, PlusOutlined, TableOutlined, DownloadOutlined, SearchOutlined, ToolOutlined, BarsOutlined } from '@ant-design/icons';
import { connect, FormattedMessage, formatMessage } from 'umi';
import { useDispatch, useSelector } from 'dva';
import downExcel from '../../../../utils/down-excel';
import { PageLoading } from '@ant-design/pro-layout';
import styles from '../style.less';

import NewAbnormal from './NewAbnormal';
import ModalWrap from './ModalWrap';

let TableToolBar = props => {
    let { collectFlag, like, current, setAnomalousTableData, filterTable } = props;

    let toggerCollectFlag = useCallback(() => {
        setAnomalousTableData({ collectFlag: !collectFlag });
    }, [collectFlag]);

    let setLike = useCallback((e) => {
        setAnomalousTableData({ like: e.target.value });
    }, []);

    let downLoadHandle = useCallback(() => {
        downExcel(current, '异常列表', 'downExcel')
    }, [current]);

    //防抖处理
    useEffect(() => {
        filterTable();
    }, [like, collectFlag]);


    return <div className={styles['table-toolbar']}>
        <Space size="middle">
            <h3> <TableOutlined /> 异常列表 </h3>
        </Space>

        <Space size="middle" style={{ float: 'right' }}>
            <Tooltip title="只显示已收藏">
                <Button type={collectFlag ? 'primary' : 'default'} shape='circle' icon={<StarOutlined />} onClick={toggerCollectFlag}></Button>
                <a id="downExcel" href="" download=""></a>
            </Tooltip>
            <Tooltip title="Download Excel">
                <Button type="primary" shape='circle' icon={<DownloadOutlined />} onClick={downLoadHandle}></Button>
            </Tooltip>
            {/* <Tooltip title="选择显示栏位">
                <Button type="primary" shape='circle' icon={<BarsOutlined />}></Button>
            </Tooltip> */}
            <Input type="primary" placeholder="快速筛选" prefix={<SearchOutlined />} value={like} onChange={setLike} style={{ width: '200px' }} />
        </Space>
    </div>
}
TableToolBar = connect(state => {
    return {
        collectFlag: state.AbnormalDecision.anomalousTable.collectFlag,
        like: state.AbnormalDecision.anomalousTable.like,
        current: state.AbnormalDecision.anomalousTable.current
    }
}, dispatch => {
    return {
        setAnomalousTableData: payload => {
            dispatch({
                type: 'AbnormalDecision/setAnomalousTableData', payload
            })
        },
        filterTable: () => {
            dispatch({
                type: 'AbnormalDecision/filterTable'
            });
        }
    }
})(TableToolBar);


// className  班别 banbie: "白班"
// BU BU名称 buName: "PCBU"
// collect 收藏 collect: "0"
// 收藏1 collect1: "0"
// region 发生区域 fashengquyu: "BST"
// person 发文人员 fawenrenyuan: "段李波(F1321607)"
// date 发文日期 fawenriqi: "2020-11-03 13:20"
// skuno 机种料号 jizhongliaohao: "74-104458-03"
//  markType: "MM202011030013"
// MFG 制造处 mfg: "MFGII"
//  ministerLevel: ",F1300825,F1303904,F1304859,F1306746,100056,F1300296"
//  minutesmeet: ""
//  recindexs: "2"
//  rectime: "2020-11-03 13:24"
// status 状态 status: "等待處理"
// timediff 时间差 timediff: "26"
// question 问题分类 wentifenlei: "設備異常"
// title 邮件标题 youjianbiaoti: "PCBU BST生產74-104458-03時DIAG-POE-TEST和DIAG-GE-TEST Fail影響良率異常通知單！"
// duty 责任人 zerenrendanwei: "TE:張天福(F1335343)"

// 所有的 {className, BU, collect, region, person, date, skuno, MFG, status, timediff, question, title, duty}
// 显示的 {date, className, skuno, region, question, title, 会议记录, person, duty, status, timediff, 操作}


let useTableConfig = (initTableData) => {
    let dispatch = useDispatch();
    let toggerCollect = row => {  // 切换收藏操作
        // console.log(row.id);
        dispatch({
            type: 'AbnormalDecision/toggerCollect',
            id: row.id
        });
    }

    let edit = row => {
        // console.log(row);
        // 打开对话框
        dispatch({
            type: 'AbnormalDecision/setAnomalousTableData',
            payload: { modalVisible: true }
        });
        // 獲取附带數據。。。（包含： 基础数据 当前状态 操作权限*****）
        dispatch({
            type: 'AbnormalDecision/getAbnormalMaintenanceMsg',
            id: row.id,
            status: row.status
        });
        // 设置異常ID
        dispatch({
            type: 'AbnormalDecision/setAbnormalMaintenanceByProp',
            prop: 'id', 
            value: row.id
        });
    }

    let initTableConfig = {
        size: 'small',
        scroll: { y: 380, x: 1450 },
        bordered: true,
        pagination: {
            size: 'small',
            defaultPageSize: 50
        },
        dataSource: initTableData,
        columns: [
            {
                title: '日期',
                dataIndex: 'date',
                width: 140,
                fixed: 'left'
            },
            {
                title: '邮件标题',
                dataIndex: 'title',
                width: 340
            },
            {
                title: '料号',
                dataIndex: 'skuno',
                width: 140,
            },
            {
                title: '班别',
                dataIndex: 'className'
            },
            {
                title: '发生区域',
                dataIndex: 'region'
            },
            {
                title: '问题分类',
                dataIndex: 'question'
            },
            {
                title: '发文人',
                dataIndex: 'person',
                width: 150,
            },
            {
                title: '责任人',
                dataIndex: 'duty',
                width: 160,
            },
            {
                title: '状态',
                dataIndex: 'status'
            },
            {
                title: '时间差',
                dataIndex: 'timediff'
            },
            {
                title: '操作',
                dataIndex: '',
                width: 100,//88,
                fixed: 'right',
                render: (d) => {
                    return <div>
                        <Tooltip title="修改">
                            <Button type="primary" shape="circle" size="small" icon={<EditOutlined />} style={{ marginRight: '10px' }}
                                onClick={() => { edit(d) }}
                            />
                        </Tooltip>
                        <Tooltip title="收藏">
                            <Button type={d.collect ? 'primary' : 'default'} shape="circle" size="small" icon={<StarOutlined />} style={{ marginRight: '10px' }}
                                onClick={() => { toggerCollect(d) }}
                            />
                        </Tooltip>
                    </div>
                }
            }
        ]
    };
    let [tableConfig, setTableConfig] = useState(initTableConfig);
    let setTableData = (dataSource) => {
        setTableConfig({ ...tableConfig, dataSource });
    }
    return [tableConfig, setTableData];
}


let TableWrap = props => {
    let { dispatch, current, activeKey, globalSearch, quickSearch, advancedSearch } = props;
    let [tableConfig, setTableData] = useTableConfig(null);

    useMemo(() => {   // tab切換時 所有統計圖的條件發生變化時 再去拿表數據
        dispatch({
            type: 'AbnormalDecision/getTableData'
        });
    }, [activeKey, globalSearch, quickSearch, advancedSearch]);

    useEffect(() => {
        setTableData(current);
    }, [current]);

    if (!tableConfig.dataSource) {
        return <PageLoading size='large' />
    }
    return <div className={styles['table-wrap']}>
        <Table {...tableConfig} />
    </div>
}

TableWrap = connect(state => {
    return {
        current: state.AbnormalDecision.anomalousTable.current,
        activeKey: state.AbnormalDecision.anomalousGraph.activeKey,
        globalSearch: state.AbnormalDecision.anomalousGraph.globalSearch,
        quickSearch: state.AbnormalDecision.anomalousGraph.quickSearch,
        advancedSearch: state.AbnormalDecision.anomalousGraph.advancedSearch,
    }
})(TableWrap);


let ExceptionList = props => {
    let { dispatch, width, height, newAbnormalVisible, modalVisible } = props;

    let size = useMemo(() => {
        return {
            w: width - 100,   // -260
            h: height - 180   // -220
        }
    }, [width, height]);


    let cancel1 = useCallback(() => {
        dispatch({   //关掉对话框
            type: 'AbnormalDecision/setNewAbnormalVisible',
            newAbnormalVisible: false
        });
        dispatch({   //清除新增异常信息
            type: 'AbnormalDecision/clearNewAbnormalData'
        })
    }, []);

    let cancel2 = useCallback(() => {
        dispatch({
            type: 'AbnormalDecision/setAnomalousTableData',
            payload: { modalVisible: false }
        })
        dispatch({
            type: 'AbnormalDecision/clearAbnormalMaintenanceData'
        })
        // 清空數據。。。
    }, []);

    return <div className={styles['exception-list']}>
        <TableToolBar />
        <TableWrap />
        <Modal
            title={<div> <PlusOutlined /> 新增异常</div>}
            centered
            visible={newAbnormalVisible}
            onOk={() => { console.log('ok') }}
            onCancel={cancel1}
            width={size.w}
            bodyStyle={{ padding: '0px 20px 0px 25px' }}
        >
            <div style={{ width: '100%', height: size.h }}>
                <NewAbnormal />
            </div>
        </Modal>
        <Modal
            title={<div> <EditOutlined /> 异常维护</div>}
            centered
            visible={modalVisible}
            onOk={() => { console.log('ok') }}
            onCancel={cancel2}
            width={size.w}
            bodyStyle={{ padding: '0px 20px 0px 25px' }}
        >
            <div style={{ width: '100%', height: size.h }}>
                <ModalWrap />
            </div>
        </Modal>
    </div>
}

ExceptionList = connect(state => {
    return {
        width: state.global.width,
        height: state.global.height,
        newAbnormalVisible: state.AbnormalDecision.anomalousGraph.newAbnormalVisible, //新增
        modalVisible: state.AbnormalDecision.anomalousTable.modalVisible  //修改
    }
})(ExceptionList);



export default ExceptionList;
