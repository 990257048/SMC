

let Model = {
    namespace: 'LineMsg',
    state: {
        disabled: false,  // 是否不可操作？
        SFC_AP_sys_name: '',   // SFC/AP系统名 
        PCAS_sys_name: '', // PCAS系统名
        scan_point: '', // 掃描點
        IME: '', // 產線|ME等相關
        section: '', // 段別
        breakPeriodList: [],  // 休息时间列表
        breakPeriod: '',  // 休息時間段
        remark: '', // 备注
        sectionManager: '劉日紅(F1300825)', //课级 
        minister: '洪永祥(F1300147)', //部级
        sectionChief: '劉日紅(F1300825)', //处级
        lineLeader: '',  //线体管理员
        lastTime: ''  //最后修改时间
    },
    reducers: {

    },
    effects: {

    }
}

export default Model;