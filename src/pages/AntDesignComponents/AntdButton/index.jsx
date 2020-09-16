
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Button, Space } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';

let AntdButton = () => {

    let [props, setProps] = useState({
        type: "primary",
        size: "small",
        loading: false
    });

    let handleClick = useCallback(e => {
        console.log(e, e.nativeEvent, e.target);    // 原生dom 原生事件
    }, []);

    return <div>
        <Space>
            
            <Button {...props} icon={ <AntDesignOutlined /> } onClick={ handleClick }> Button组件 </Button>
            
        </Space>
    </div>
}

export default AntdButton;
