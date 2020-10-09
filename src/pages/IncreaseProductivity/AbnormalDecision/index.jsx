import React, {useEffect, useMeno, useCallback} from 'react';
import { connect, FormattedMessage, formatMessage } from 'umi';
import {PageContainer} from '@ant-design/pro-layout';
import {Button, Space, Input, Tabs} from 'antd';
import {LineChartOutlined, SearchOutlined, TagsOutlined, ProfileOutlined } from '@ant-design/icons'
import AnomalousGraph from './components/AnomalousGraph';
import ExceptionList from './components/ExceptionList';
import styles from './style.less';

const { TabPane } = Tabs;

let AbnormalDecision = props => {   // 异常决策中心
    // console.log(props);
    return <div className={ styles['abnormal-decision'] }>
        {/* <PageContainer /> */}
        <h3> 
            <LineChartOutlined /> 
            <b> 异常决策中心</b>
        </h3>
        <AnomalousGraph />
        <ExceptionList />
    </div>   
    
}

export default AbnormalDecision;