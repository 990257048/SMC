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
        field10: 'xxxxxxxxxxxxxxxx xxxxxx xxxxxxxx',
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
// for (var i = 1; i <= 12; i++) {
//     let o = {};
//     for (var j = 1; j <= 10; j++) {
//         let f = 'field' + j;
//         o[f] = f + '_' + i;
//     }
//     o.key = "row" + i;
//     dataSource.push(o);
// }

let ret_table_config = h => ({
    size: 'small',
    scroll: { y: h },
    bordered: true,
    pagination: {
        size: 'small',
        defaultPageSize: 50,
        hideOnSinglePage: true
    },
    dataSource,
    
    columns: [
        {
            title: '时间段',
            align: 'center',
            dataIndex: 'field1',
            width: 120
        },
        {
            title: '机种',
            align: 'center',
            dataIndex: 'field2',
            width: 120,
            render: (text) => <> {
                text.split(' ').map(t => <p style={{ height: '16px', lineHeight: '16px', marginBottom: '0' }}>{t}</p>)
            } </>
        },
        {
            title: '料号',
            align: 'center',
            dataIndex: 'field3',
            width: 130,
            render: (text) => <> {
                text.split(' ').map(t => <p style={{ height: '16px', lineHeight: '16px', marginBottom: '0' }}>{t}</p>)
            } </>
        },
        {
            title: '有效工时',
            align: 'center',
            dataIndex: 'field4'
        },
        {
            title: '目标产能',
            align: 'center',
            dataIndex: 'field5',
            render: (text) => <> {
                text.split(' ').map(t => <p style={{ color: 'green', height: '16px', lineHeight: '16px', marginBottom: '0' }}>{t}</p>) 
            } </>
        },
        {
            title: '实际产出',
            align: 'center',
            dataIndex: 'field6',
            render: (text) => <> {
                text.split(' ').map(t => <p style={{ color: '#337ab7', height: '16px', lineHeight: '16px', marginBottom: '0' }}>{t}</p>) 
            } </>
        },
        {
            title: '差异',
            align: 'center',
            dataIndex: 'field7',
            render: (text) => <> {
                text.split(' ').map(t => <p style={{ color: /^-/.test(t) ? 'red' : 'green', height: '16px', lineHeight: '16px', marginBottom: '0' }}>{t}</p>) 
            } </>
        },
        {
            title: '累计产出',
            align: 'center',
            dataIndex: 'field8'
        },
        {
            title: '累计差异',
            align: 'center',
            dataIndex: 'field9'
        },
        {
            title: '备注',
            align: 'center',
            dataIndex: 'field10',
            width: 220
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