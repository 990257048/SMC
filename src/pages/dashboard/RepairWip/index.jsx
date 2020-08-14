import React from 'react';
import { connect, FormattedMessage, formatMessage } from 'umi';
import {PageContainer} from '@ant-design/pro-layout';
import styles from './style.less';

let RepairWip = () => {
    return <div id={styles.p}>
        <PageContainer>
            <FormattedMessage id="repair-wip.name" />
            <p>
                { formatMessage({id: "repair-wip.name"}) }
            </p>
        </PageContainer>
    </div>;
}

export default RepairWip;