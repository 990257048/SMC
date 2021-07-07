import React, { useEffect, useMemo, useCallback } from 'react';
import { connect, useIntl, formatMessage } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Space, Input, Tabs } from 'antd';
import { LineChartOutlined } from '@ant-design/icons'
import AnomalousGraph from './components/AnomalousGraph';
import ExceptionList from './components/ExceptionList';
import styles from './style.less';

// const { formatMessage } = useIntl();
let AbnormalDecision = props => {   // 异常决策中心
    console.log(props);
    return <div className={styles['abnormal-decision']}>
        {/* <PageContainer /> */}
        <h3>
            <LineChartOutlined />
            <b>{' ' + formatMessage({ id: 'abnormal-decision-center.titlt' })}</b>
        </h3>
        <AnomalousGraph />
        <ExceptionList />
    </div>
}

export default AbnormalDecision;