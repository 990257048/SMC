

import React from 'react';
import { Row, Col, Input, Space, Slider, Spin } from 'antd';
// import {} from '@ant-design/icons';

let TestPage1 = props => {
    return <div style={{ width: '100%', height: '100%', border: '1px solid red' }}>
        <Slider range defaultValue={[20, 50]} />
        <Spin type="small" />
        <Spin type="default" />
        <Spin type="large" />
        app
    </div>
}

export default TestPage1;

// 1.redux工作流程及其原理 | MVVM工作流程及其原理
// 2.react優化策略(Hooks, HOC Immutable)
// 3.ant-design組件庫使用
// 4.網頁佈局技巧，IE兼容處理，移動端適配方案
// 5.umi框架使用 | webpack配置技巧
// 6.javascript | css/css3/less 基礎，使用技巧 
// 7.React HOOKS底層機制，redux | redux-saga底層機制
// 8.可視化方案（統計圖表 echarts antv，3d可視化 three，動畫 D3）

// typescript | less | node | css3 | dart | sql 
// ReactNative | Flutter | wechart | uni-app
// express | nest | koa | egg | mongodb
// git | github | vscode | npm | chrome | chrome-devtools

// 測試頁面1  (20201230 add by gch) 弹性布局 栅格布局 less