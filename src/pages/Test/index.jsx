import React from 'react';
import { PageContainer, PageLoading } from '@ant-design/pro-layout';
import styles from './index.less';

let Test = props => {
    console.log(props);

    return <PageContainer>
        <div className={styles.test}>
            test
        </div>
    </PageContainer>
    // return <div className={styles.test}>
    //     test
    // </div>
}

export default Test;