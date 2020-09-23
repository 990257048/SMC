import React, { useEffect, useMeno, useCallback } from 'react';
import { connect, FormattedMessage, formatMessage } from 'umi';
import { Space, Input, Button, Table, Tooltip, Select } from 'antd';

import { ProfileOutlined, BarChartOutlined, RedoOutlined } from '@ant-design/icons';
import PageWrap from '../../../components/PageWrap';
import TableWrap from './components/TableWrap';
import Charts from './components/charts';


import styles from './style.less';

let { Option } = Select;

let RealTimeProduction = props => {
    return <PageWrap>
        <div className={styles['real-time-production']}>
            <h3>
                <BarChartOutlined />
                <b> 实时生产看板</b>
            </h3>
            <div className={styles['real-time-production-main']}>
                <div className={styles['real-time-production-main-top']}>
                    <Space size="middle" style={{ float: 'right' }}>
                        <b>2020/08/24 16:11</b>
                        <Tooltip title="制造处">
                            <Select defaultValue="MFGI" style={{ width: '100px' }}>
                                <Option value="MFGI">MFGI</Option>
                                <Option value="MFGII">MFGII</Option>
                                <Option value="MFGIII">MFGIII</Option>
                                <Option value="MFGV">MFGV</Option>
                                <Option value="MFGVI">MFGVI</Option>
                                <Option value="MFGVII">MFGVII</Option>
                                <Option value="MFGVIII">MFGVIII</Option>
                            </Select>
                        </Tooltip>
                        <Tooltip title="线体">
                            <Select defaultValue="SMT|A10-3F S1" style={{ width: '140px' }}>
                                <Option value="SMT|A10-3F S1">SMT|A10-3F S1</Option>
                                <Option value="SMT|A10-3F S2">SMT|A10-3F S2</Option>
                                <Option value="SMT|A10-3F S3">SMT|A10-3F S3</Option>
                                <Option value="SMT|A10-3F S4">SMT|A10-3F S4</Option>
                            </Select>
                        </Tooltip>
                        <Tooltip title="刷新">
                            <Button type="primary" icon={<RedoOutlined />}></Button>
                        </Tooltip>

                    </Space>
                </div>

                <Charts />
                <TableWrap />
            </div>
        </div>
    </PageWrap>
}

export default RealTimeProduction;