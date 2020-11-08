// ExceptionList  异常列表
import React, {useState, useEffect, useMemo, useCallback } from 'react';
import { Button, Table, Tooltip, Space, Input } from 'antd';
import { StarOutlined, EditOutlined, PlusOutlined, TableOutlined, DownloadOutlined, SearchOutlined, BarsOutlined } from '@ant-design/icons';
import { connect, FormattedMessage, formatMessage } from 'umi';
import { PageLoading } from '@ant-design/pro-layout';
import styles from '../style.less';


let TableToolBar = props => {
    let {collectFlag, like, setAnomalousTableData, filterTable} = props;

    let toggerCollectFlag = useCallback(() => {
        setAnomalousTableData({ collectFlag: !collectFlag });
    }, [collectFlag]);

    let setLike = useCallback((e) => {
        setAnomalousTableData({ like: e.target.value });
    }, []);

    //防抖处理
    useEffect(() => {
        filterTable();
    }, [like, collectFlag]);


    return <div className={styles['table-toolbar']}>
        <Space size="middle">
            <h3> <TableOutlined /> 异常列表 </h3>
        </Space>

        <Space size="middle" style={{ float: 'right' }}>
            <Tooltip title="显示已收藏">
                <Button type={ collectFlag ? 'primary' : 'default' } shape='circle' icon={<StarOutlined />} onClick={ toggerCollectFlag }></Button>
            </Tooltip>
            <Tooltip title="Download Excel">
                <Button type="primary" shape='circle' icon={<DownloadOutlined />}></Button>
            </Tooltip>
            {/* <Tooltip title="选择显示栏位">
                <Button type="primary" shape='circle' icon={<BarsOutlined />}></Button>
            </Tooltip> */}
            <Input type="primary" placeholder="快速筛选" prefix={<SearchOutlined />} value={ like } onChange={ setLike } style={{ width: '200px' }} />
        </Space>
    </div>
}
TableToolBar = connect(state => {
    return {
        collectFlag: state.AbnormalDecision.anomalousTable.collectFlag,
        like: state.AbnormalDecision.anomalousTable.like
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







let tableData = [
    {
        key: '001',
        date: '2020-11-03 13:20',
        className: '白班',
        skuno: '74-104458-03',
        region: 'BST',
        question: '設備異常',
        title: 'PCBU BST生產74-104458-03時DIAG-POE-TEST和DIAG-GE-TEST Fail影響良率異常通知單！',
        person: '段李波(F1321607)',
        duty: 'TE:張天福(F1335343)',
        status: '等待處理',
        timediff: '26H'
    },
    {
        key: '002',
        date: '2020-11-04 13:20',
        className: '白班',
        skuno: '74-104458-03',
        region: 'BST',
        question: '設備異常',
        title: 'PCBU BST生產74-104458-03時DIAG-POE-TEST和DIAG-GE-TEST Fail影響良率異常通知單！',
        person: '段李波(F1321607)',
        duty: 'TE:張天福(F1335343)',
        status: '等待處理',
        timediff: '26H'
    },
    {
        key: '003',
        date: '2020-11-05 13:20',
        className: '白班',
        skuno: '74-104458-03',
        region: 'BST',
        question: '設備異常',
        title: 'PCBU BST生產74-104458-03時DIAG-POE-TEST和DIAG-GE-TEST Fail影響良率異常通知單！',
        person: '段李波(F1321607)',
        duty: 'TE:張天福(F1335343)',
        status: '等待處理',
        timediff: '26H'
    },
    {
        key: '004',
        date: '2020-11-06 13:20',
        className: '白班',
        skuno: '74-104458-03',
        region: 'BST',
        question: '設備異常',
        title: 'PCBU BST生產74-104458-03時DIAG-POE-TEST和DIAG-GE-TEST Fail影響良率異常通知單！',
        person: '段李波(F1321607)',
        duty: 'TE:張天福(F1335343)',
        status: '等待處理',
        timediff: '26H'
    },
    {
        key: '005',
        date: '2020-11-07 13:20',
        className: '白班',
        skuno: '74-104458-03',
        region: 'BST',
        question: '設備異常',
        title: 'PCBU BST生產74-104458-03時DIAG-POE-TEST和DIAG-GE-TEST Fail影響良率異常通知單！',
        person: '段李波(F1321607)',
        duty: 'TE:張天福(F1335343)',
        status: '等待處理',
        timediff: '26H'
    },
    {
        key: '006',
        date: '2020-11-03 13:20',
        className: '白班',
        skuno: '74-104458-03',
        region: 'BST',
        question: '設備異常',
        title: 'PCBU BST生產74-104458-03時DIAG-POE-TEST和DIAG-GE-TEST Fail影響良率異常通知單！',
        person: '段李波(F1321607)',
        duty: 'TE:張天福(F1335343)',
        status: '等待處理',
        timediff: '26H'
    },
    {
        key: '007',
        date: '2020-11-04 13:20',
        className: '白班',
        skuno: '74-104458-03',
        region: 'BST',
        question: '設備異常',
        title: 'PCBU BST生產74-104458-03時DIAG-POE-TEST和DIAG-GE-TEST Fail影響良率異常通知單！',
        person: '段李波(F1321607)',
        duty: 'TE:張天福(F1335343)',
        status: '等待處理',
        timediff: '26H'
    },
    {
        key: '008',
        date: '2020-11-05 13:20',
        className: '白班',
        skuno: '74-104458-03',
        region: 'BST',
        question: '設備異常',
        title: 'PCBU BST生產74-104458-03時DIAG-POE-TEST和DIAG-GE-TEST Fail影響良率異常通知單！',
        person: '段李波(F1321607)',
        duty: 'TE:張天福(F1335343)',
        status: '等待處理',
        timediff: '26H'
    },
    {
        key: '009',
        date: '2020-11-06 13:20',
        className: '白班',
        skuno: '74-104458-03',
        region: 'BST',
        question: '設備異常',
        title: 'PCBU BST生產74-104458-03時DIAG-POE-TEST和DIAG-GE-TEST Fail影響良率異常通知單！',
        person: '段李波(F1321607)',
        duty: 'TE:張天福(F1335343)',
        status: '等待處理',
        timediff: '26H'
    },
    {
        key: '010',
        date: '2020-11-07 13:20',
        className: '白班',
        skuno: '74-104458-03',
        region: 'BST',
        question: '設備異常',
        title: 'PCBU BST生產74-104458-03時DIAG-POE-TEST和DIAG-GE-TEST Fail影響良率異常通知單！',
        person: '段李波(F1321607)',
        duty: 'TE:張天福(F1335343)',
        status: '等待處理',
        timediff: '26H'
    }
];



let retTableConfig = (tableData) => {
    return {
        size: 'small',
        scroll: { y: 380, x: 1450 },
        bordered: true,
        pagination: {
            size: 'small',
            defaultPageSize: 50
        },
        // rowSelection: {
        //     type: "checkbox", // "checkbox" "radio"
        //     onChange: (selectKey, selectData) => {
        //         store.dispatch(bindEvent.table.onChange(selectData));
        //     }
        // },
        dataSource: tableData,
        // 显示的 {date, className, skuno, region, question, title, 会议记录, person, duty, status, timediff, 操作}
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
                render: (d1, d2, no) => {
                    return <div>
                        <Tooltip title="修改">
                            <Button type="primary" shape="circle" size="small" icon={<EditOutlined />} style={{ marginRight: '10px' }}
                                onClick={() => { }}
                            />
                        </Tooltip>
                        <Tooltip title="收藏">
                            <Button type="default" shape="circle" size="small" icon={<StarOutlined />} style={{ marginRight: '10px' }}
                                onClick={() => { }}
                            />
                        </Tooltip>
                    </div>
                }
            }
        ]
    };
}


let useTableConfig = (initTableData) => {
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
                                onClick={() => { }}
                            />
                        </Tooltip>
                        <Tooltip title="收藏">
                            <Button type={ d.collect ? 'primary' : 'default' } shape="circle" size="small" icon={<StarOutlined />} style={{ marginRight: '10px' }}
                                onClick={() => { }}
                            />
                        </Tooltip>
                    </div>
                }
            }
        ]
    };
    let [tableConfig, setTableConfig] = useState(initTableConfig);
    let setTableData = (dataSource) => {
        setTableConfig({...tableConfig, dataSource});
    }
    return [tableConfig, setTableData];
}


let TableWrap = props => {
    let {dispatch, current} = props;
    let [tableConfig, setTableData] = useTableConfig(null);
    
    useMemo(() => {
        dispatch({
            type: 'AbnormalDecision/getTableData'
        });
    }, []);

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
    }
})(TableWrap);


let ExceptionList = props => {
    return <div className={styles['exception-list']}>
        <TableToolBar />
        <TableWrap />
    </div>
}

export default ExceptionList;
