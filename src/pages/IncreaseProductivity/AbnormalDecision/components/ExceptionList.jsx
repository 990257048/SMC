// ExceptionList  异常列表
import React, { useEffect, useMeno, useCallback } from 'react';
import { Button, Table, Tooltip, Space, Input } from 'antd';
import { StarOutlined, EditOutlined, PlusOutlined, TableOutlined, DownloadOutlined, SearchOutlined, BarsOutlined } from '@ant-design/icons';
import { connect, FormattedMessage, formatMessage } from 'umi';

import styles from '../style.less';

let TableToolBar = () => {
    return <div className={styles['table-toolbar']}>
        <Space size="middle">
            <h3> <TableOutlined /> 异常列表 </h3>
        </Space>

        <Space size="middle" style={{ float: 'right' }}>
            <Tooltip title="显示已收藏">
                <Button type="default" icon={<StarOutlined />}></Button>
            </Tooltip>
            <Tooltip title="Download Excel">
                <Button type="primary" icon={<DownloadOutlined />}></Button>
            </Tooltip>
            <Tooltip title="选择显示栏位">
                <Button type="primary" icon={<BarsOutlined />}></Button>
            </Tooltip>
            <Input type="primary" placeholder="快速筛选" prefix={<SearchOutlined />} style={{ width: '200px' }} />
        </Space>
    </div>
}

let TableWrap = () => {
    const dataSource = [];
    for (var i = 1; i < 120; i++) {
        let o = {};
        for (var j = 0; j <= 8; j++) {
            let f = 'field' + j;
            o[f] = f + '_' + i;
        }
        o.key = "row" + i;
        dataSource.push(o);
    }

    const tableConfig = {
        size: 'small',
        scroll: { y: 380 },
        pagination: {
            size: 'middle',
            defaultPageSize: 50
        },
        // rowSelection: {
        //     type: "checkbox", // "checkbox" "radio"
        //     onChange: (selectKey, selectData) => {
        //         store.dispatch(bindEvent.table.onChange(selectData));
        //     }
        // },
        dataSource,
        columns: [
            {
                title: '序号',
                dataIndex: 'field0',
            },
            {
                title: 'BU',
                dataIndex: 'field2'
            },
            {
                title: '版本',
                dataIndex: 'field3'
            },
            {
                title: '机种名称',
                dataIndex: 'field4'
            },
            {
                title: '机种类型',
                dataIndex: 'field5'
            },
            {
                title: '机种所属系列',
                dataIndex: 'field6'
            },
            {
                title: '客户料号',
                dataIndex: 'field7',
            },
            {
                title: '客户产品编码',
                dataIndex: 'field8'
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
                            <Button type="primary" shape="circle" size="small" icon={<StarOutlined />} style={{ marginRight: '10px' }}
                                onClick={() => { }}
                            />
                        </Tooltip>
                    </div>
                }
            }
        ]
    };
    return <div className={styles['table-wrap']}>
        <Table {...tableConfig} />
    </div>
}

let ExceptionList = props => {
    return <div className={styles['exception-list']}>
        <TableToolBar />
        <TableWrap />
    </div>
}

export default ExceptionList;