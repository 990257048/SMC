import { Tooltip, Tag, Badge, Popover } from 'antd';
import { QuestionCircleOutlined, NotificationOutlined, UnorderedListOutlined, TagsOutlined } from '@ant-design/icons';
import React, { useCallback, useMemo, useEffect } from 'react';
import { connect, history, SelectLang } from 'umi';
import styles from './index.less';

let Notification = props => {
    let { notices, dispatch } = props;
    console.log(props);
    let count = useMemo(() => {
        return notices.reduce((prev, next) => prev + next.count, 0);
    }, [notices]);
    useEffect(() => {
        dispatch({
            type: 'global/getNotices'
        })
    }, [])
    return <div className={styles.notification}>
        <Popover placement="bottom" title={<Title />} content={<Content />} trigger="click">
            <Badge size='small' count={count} showZero>
                <span style={{ paddingRight: '12px' }}>
                    <NotificationOutlined />
                </span>
            </Badge>
        </Popover>
    </div>
}
Notification = connect(({ global }) => ({
    notices: global.notices
}))(Notification);

let Title = () => {
    return <div style={{ lineHeight: '40px', fontSize: '15px' }}>
        <TagsOutlined style={{ color: '#1890ff', fontSize: '18px' }} />
        {' '}
        我的未結案事項
    </div>
}

let Content = props => {
    // let notices = [
    //     {
    //         msg: '異常決策中心-0個未結案事項',
    //         url: '/increase-productivity/abnormal-decision?description=open-case'
    //     }
    //     //...
    // ];
    return <div className={styles.notificationContent}>
        {
            props.notices.map(item => <NotificationItem key={item.url} {...item} />)
        }
    </div>
}
Content = connect(({ global }) => ({
    notices: global.notices
}))(Content);

let NotificationItem = props => {
    let clickHandle = useCallback(
        () => {
            history.push(props.url, { test: 'test' });
        },
        [props.url],
    )
    return <div className={styles['notification-item']} >
        <span onClick={clickHandle}>
            <UnorderedListOutlined style={{ color: '#1890ff' }} />
            {' '}
            {props.msg}
        </span>
    </div>
}

export default Notification;