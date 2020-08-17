import React, {useEffect, useMeno, useCallback} from 'react';
import { connect, FormattedMessage, formatMessage } from 'umi';
import {PageContainer} from '@ant-design/pro-layout';
import {Button, Space, Input} from 'antd';
import styles from './style.less';

let RepairWip = props => {
    // console.log(props);
    let {dispatch, history, val, loading} = props;
    // console.log(<FormattedMessage id="repair-wip.name" />);
    let change = useCallback((e) => {
        dispatch({
            type: 'repairWip/setVal',
            val: e.target.value
        });
    });
    let btnClick = useCallback(() => {
        dispatch({
            type: 'repairWip/timeOut',
            delay: 2000
        });
    }, []);
    return <div id={styles.p}>
        <PageContainer>
            <FormattedMessage id="repair-wip.name" />
        </PageContainer>
        <Input value={ val } onChange={ change } />
        <Button type="primary" loading={loading} onClick={btnClick}>time out 2s</Button>
    </div>;
}



export default connect(({ loading, repairWip }) => ({
    loading: loading.effects["repairWip/timeOut"],
    val: repairWip.val
}))(RepairWip);