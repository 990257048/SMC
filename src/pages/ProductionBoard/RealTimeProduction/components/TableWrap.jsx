import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { connect, FormattedMessage, formatMessage } from 'umi';
import { Space, Input, Button, Table } from 'antd';
import { ProfileOutlined, BarChartOutlined, RedoOutlined } from '@ant-design/icons';

import styles from '../style.less';

const dataSource = [
    {
        field1: '08:00 - 09:00',
        field2: '74-123456-01',
        field3: '74-123456-01-A0',
        field4: '60',
        field5: '100',
        field6: '80',
        field7: '-20',
        field8: '80',
        field9: '-20',
        field10: '類型:開/收線/開/收線(20m)劉達\r\n:SMC:開/收線類型:開/收線/開/收線(20m)劉達:SMC:開/收線',
    },
    {
        field1: '09:00 - 10:00',
        field2: '74-123456-01',
        field3: '74-123456-01-A0',
        field4: '60',
        field5: '100',
        field6: '80',
        field7: '-20',
        field8: '80',
        field9: '-20',
        field10: 'xxxxxxxxxxxxxxxx xxxxxx xxxxxxxx',
    },
    {
        field1: '10:00 - 11:00',
        field2: '74-123456-01',
        field3: '74-123456-01-A0',
        field4: '60',
        field5: '100',
        field6: '110',
        field7: '10',
        field8: '80',
        field9: '-20',
        field10: 'xxxxxxxxxxxxxxxx xxxxxx xxxxxxxx',
    },
    {
        field1: '11:00 - 12:00',
        field2: '74-123456-01 74-123456-02 74-123456-03',
        field3: '74-123456-01-A0 74-123456-02-A0 74-123456-03-A0',
        field4: '60 60 60',
        field5: '100 100 100',
        field6: '80 80 80',
        field7: '-20 -20 -20',
        field8: '80',
        field9: '-20',
        field10: 'xxxxxxxxxxxxxxxx xxxxxx xxxxxxxx',
    },
    {
        field1: '11:00 - 12:00',
        field2: '74-123456-01',
        field3: '74-123456-01-A0 74-123456-01-A0 74-123456-01-A0',
        field4: '60',
        field5: '100 100 100',
        field6: '80 120 80',
        field7: '-20 20 -20',
        field8: '80',
        field9: '-20',
        field10: 'xxxxxxxxxxxxxxxx xxxxxx xxxxxxxx',
    },
    {
        field1: '13:00 - 14:00',
        field2: '74-123456-01',
        field3: '74-123456-01-A0',
        field4: '60',
        field5: '100',
        field6: '80',
        field7: '-20',
        field8: '80',
        field9: '-20',
        field10: 'xxxxxxxxxxxxxxxx xxxxxx xxxxxxxx',
    },
    {
        field1: '14:00 - 15:00',
        field2: '74-123456-01',
        field3: '74-123456-01-A0',
        field4: '60',
        field5: '100',
        field6: '80',
        field7: '-20',
        field8: '80',
        field9: '-20',
        field10: 'xxxxxxxxxxxxxxxx xxxxxx xxxxxxxx',
    },
    {
        field1: '15:00 - 16:00',
        field2: '74-123456-01',
        field3: '74-123456-01-A0',
        field4: '60',
        field5: '100',
        field6: '110',
        field7: '10',
        field8: '80',
        field9: '-20',
        field10: 'xxxxxxxxxxxxxxxx xxxxxx xxxxxxxx',
    },
    {
        field1: '16:00 - 17:00',
        field2: '74-123456-01',
        field3: '74-123456-01-A0 74-123456-01-A0 74-123456-01-A0',
        field4: '60',
        field5: '100 100 100',
        field6: '80 80 80',
        field7: '-20 -20 -20',
        field8: '80',
        field9: '-20',
        field10: 'xxxxxxxxxxxxxxxx xxxxxx xxxxxxxx',
    },
    {
        field1: '17:00 - 18:00',
        field2: '74-123456-01 74-123456-02 74-123456-03',
        field3: '74-123456-01-A0 74-123456-02-A0 74-123456-03-A0',
        field4: '60',
        field5: '100 100 100',
        field6: '80 120 80',
        field7: '-20 20 -20',
        field8: '80',
        field9: '-20',
        field10: 'xxxxxxxxxxxxxxxx xxxxxx xxxxxxxx',
    }
];


// PERIOD: "8:00~9:00"     时间段
// SKU_NAME: null          机种
// SKUNO: "74-120728-01(D)" 料号
// COST_TIME: "45"         有效工时
// UPH: "45"               目标产能
// REAL_OUT: "4"           实际产出
// DIFF: "-41"             差异
// TOTAL_OUT: "4"          总产出
// TOTAL_DIFF: "-41"       累计差异
// REMARK: ""              描述

let ret_table_config = (h, tableData) => ({
    size: 'small',
    scroll: { y: h },
    bordered: true,
    pagination: {
        size: 'small',
        defaultPageSize: 50,
        hideOnSinglePage: true
    },
    dataSource: tableData, // dataSource.map((row, i) => ({ key: 'row' + i, ...row })),
    columns: [
        {
            title: '时间段',
            align: 'center',
            dataIndex: 'PERIOD',
            width: 120
        },
        {
            title: '机种',
            align: 'center',
            dataIndex: 'SKU_NAME',
            width: 120,
            render: (text) => <> {
                text.split('\n').map((t, i) => <p key={text + '-' + t + i} style={{ height: '16px', lineHeight: '16px', marginBottom: '0' }}>{t}</p>)
            } </>
        },
        {
            title: '料号',
            align: 'center',
            dataIndex: 'SKUNO',
            width: 130,
            render: (text) => <> {
                text.split('\n').map((t, i) => <p key={text + '-' + t + i} style={{ height: '16px', lineHeight: '16px', marginBottom: '0' }}>{t}</p>)
            } </>
        },
        {
            title: '有效工时',
            align: 'center',
            dataIndex: 'COST_TIME',
            render: (text) => <> {
                text.split('\n').map((t, i) => <p key={text + '-' + t + i} style={{ height: '16px', lineHeight: '16px', marginBottom: '0' }}>{t}</p>)
            } </>
        },
        {
            title: '目标产能',
            align: 'center',
            dataIndex: 'UPH',
            render: (text) => <> {
                text.split('\n').map((t, i) => <p key={text + '-' + t + i} style={{ color: 'green', height: '16px', lineHeight: '16px', marginBottom: '0' }}>{t}</p>)
            } </>
        },
        {
            title: '实际产出',
            align: 'center',
            dataIndex: 'REAL_OUT',
            render: (text) => <> {
                text.split('\n').map((t, i) => <p key={text + '-' + t + i} style={{ color: '#337ab7', height: '16px', lineHeight: '16px', marginBottom: '0' }}>{t}</p>)
            } </>
        },
        {
            title: '差异',
            align: 'center',
            dataIndex: 'DIFF',
            render: (text) => <> {
                text.split('\n').map((t, i) => <p key={text + '-' + t + i} style={{ color: /^-/.test(t) ? 'red' : 'green', height: '16px', lineHeight: '16px', marginBottom: '0' }}>{t}</p>)
            } </>
        },
        {
            title: '累计产出',
            align: 'center',
            dataIndex: 'TOTAL_OUT'
        },
        {
            title: '累计差异',
            align: 'center',
            dataIndex: 'TOTAL_DIFF'
        },
        {
            title: '备注',
            align: 'center',
            dataIndex: 'REMARK',
            width: 320,
            // render: (text) => <> {
            //     text.split('\n').map((t, i) => <p key={text + '-' + t + i} style={{ height: '16px', lineHeight: '16px', textAlign: 'left', marginBottom: '0' }}>{t}</p>)
            // } </>
            render: (text) => <> {
                <p style={{ lineHeight: '16px', textAlign: 'left', marginBottom: '0' }}>{text}</p>
            } </>
        }
    ],
    // onRow: (a, b, c) => {   //绑事件（行）
    //     console.log(a, b, c);
    // }
    rowClassName: styles._tab_row
})



let TableWrap = props => {
    let { height, realTimeProduction: {AbnormalTable} } = props;


    const tableConfig = useMemo(() => {
        let h = height - 430;
        return ret_table_config(h, AbnormalTable);
    }, [height, AbnormalTable]);

    return <div className={styles['table-wrap']}>
        <Table {...tableConfig} />
    </div>
}

export default connect(({ global, realTimeProduction: { AbnormalTable } }) => ({
    height: global.height,
    realTimeProduction: {
        AbnormalTable
    }
}))(TableWrap);