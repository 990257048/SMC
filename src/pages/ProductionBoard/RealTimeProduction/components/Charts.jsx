import React, { useEffect, useMeno, useCallback } from 'react';
import { connect, FormattedMessage, formatMessage } from 'umi';
import { Space, Input, Button, Table, Row, Col } from 'antd';
import { ProfileOutlined, BarChartOutlined, RedoOutlined } from '@ant-design/icons';

import styles from '../style.less';

let Charts = props => {
    return <div className={styles.charts}>
        <Row gutter={[12, 12]}>
            <Col span={3}>
                <div className={styles.box}>
                    <h3> <b>待维护异常</b> </h3>
                    <h2 style={{ color: 'red' }}> <b>10次</b> </h2>
                </div>
            </Col>
            <Col span={3}>
                <div className={styles.box}>
                    <h3> <b>实际异常</b> </h3>
                    <h2 style={{ color: 'red' }}> <b>10次</b> </h2>
                </div>
            </Col>
            <Col span={3}>
                <div className={styles.box}>
                    <h3> <b>异常时间</b> </h3>
                    <h2 style={{ color: 'red' }}> <b>100min</b> </h2>
                </div>
            </Col>
            <Col span={3}>
                <div className={styles.box}>
                    <h3> <b>目标达成率</b> </h3>
                    <h2 style={{ color: 'red' }}> <b>90%</b> </h2>
                </div>
            </Col>
            <Col span={12}>
                <div className={styles['chart-box']}></div>
            </Col>
        </Row>
    </div>
}

export default Charts;