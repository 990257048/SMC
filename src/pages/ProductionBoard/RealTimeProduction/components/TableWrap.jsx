import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { connect, FormattedMessage, formatMessage } from 'umi';
import { Space, Input, Button, Table } from 'antd';
import { ProfileOutlined, BarChartOutlined, RedoOutlined } from '@ant-design/icons';

import styles from '../style.less';

const dataSource = [];
for (var i = 1; i <= 12; i++) {
    let o = {};
    for (var j = 1; j <= 10; j++) {
        let f = 'field' + j;
        o[f] = f + '_' + i;
    }
    o.key = "row" + i;
    dataSource.push(o);
}

let ret_table_config = h => ({
    size: 'small',
    scroll: { y: h },
    pagination: {
        size: 'small',
        defaultPageSize: 50,
        hideOnSinglePage: true
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
            title: '时间段',
            dataIndex: 'field1'
        },
        {
            title: '机种',
            dataIndex: 'field2'
        },
        {
            title: '料号',
            dataIndex: 'field3'
        },
        {
            title: '有效工时',
            dataIndex: 'field4'
        },
        {
            title: '目标产能',
            dataIndex: 'field5'
        },
        {
            title: '实际产出',
            dataIndex: 'field6',
            render: (text) => <span style={{color: 'green'}}>{ text }</span>
        },
        {
            title: '差异',
            dataIndex: 'field7',
            render: (text) => <span style={{color: 'red'}}>{ text }</span>
        },
        {
            title: '累计产出',
            dataIndex: 'field8'
        },
        {
            title: '累计差异',
            dataIndex: 'field9'
        },
        {
            title: '备注',
            dataIndex: 'field10',
            // width: 1000
        }
    ],
    // onRow: (a, b, c) => {   //绑事件（行）
    //     console.log(a, b, c);
    // }
    rowClassName: styles._tab_row
})



let TableWrap = props => {
    let { height } = props;
    
    const tableConfig = useMemo(() => {
        let h = height - 405;
        return ret_table_config(h);
    }, [height]);
    
    return <div className={styles['table-wrap']}>
        <Table {...tableConfig} />
    </div>
}

export default connect(({global}) => ({
    height: global.height
}))(TableWrap);