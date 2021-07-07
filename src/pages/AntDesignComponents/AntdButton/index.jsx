
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Button, Space } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import { getSMCApp } from './service';

// 常用组件 表单 图 表格 要经常更新

// 1.基于antd封装大型高复用性组件 2.高复用性HOOKS 3.高复用性高阶组件


// F = enhancer(x)(F)
// let [state, setState] = useF();
// let onXxx = () => {};
// <F ref={ref} {...state} onXxx={onXxx} />

// // HOOKS  
// 复用：生命周期 副作用 计算衍生状态 路由 全局状态

// // HOC
// 更灵活
// 增强组件 props代理 

// 弹出层 按钮 各种输入 栅格化

const AntdCmp = () => {
    let link = () => {
        getSMCApp().then(e => {
            console.log(e);
        });
    }
    return <div>
        <Button onClick={link}>click me</Button>
    </div>
}

export default AntdCmp;



