
let Model = {
    namespace: 'AbnormalDecision',
    state: {
        anomalousGraph: { // 异常统计图组件
            activeKey: 'tab1', // 当前活动的tab页： tab1 | tab2 | tab3 | tab4 | tab5
        }
    },
    reducers: {
        setActiveKey: (state, { activeKey }) => { // 设置当前活动的tab页：activeKey： tab1 | tab2 | tab3 | tab4 | tab5
            return { ...state, anomalousGraph: { ...state.anomalousGraph, activeKey } };
        }
    },
    effects: {}
}

export default Model;
