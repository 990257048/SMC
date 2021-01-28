

let Model = {
    namespace: 'LineMsg',
    state: {
        // currentMFG: 'MFGI',
        // currentLine: 'Line1',  //当前操作的线体
        // disabled: true,  // 是否不可操作？
        // SFC_AP_SYS_name: 'DA3P3A',   // SFC/AP系统名 
        // PCAS_SYS_name: 'DA3P3A', // PCAS系统名
        // scanPoint: 'DA3S2CT1', // 掃描點
        // IME: ['aaaa', 'bbbb'], // 產線|ME等相關
        // allIME: ['aaaa', 'bbbb', 'cccc', 'dddd'],   // 所有IME
        // section: 'SMT', // 段別
        // allSection: ['SMT', 'PTH', 'SI', '5DX', 'ICT', 'TEST'], //所有段别
        // breakPeriodList: ['08:00-11:40 工作', '12:00-13:30 休息', '13:30-17:00 工作', '17:00-19:00 加班'],  // 休息时间列表
        // sectionManager: '劉日紅(F1300825)', //课级 
        // allSectionManager: ['劉日紅(F1300825)', 'xxxxxxxxxxxx', 'yyyyyyyyyyyyyy'], //所有课级
        // minister: '洪永祥(F1300147)', //部级
        // allMinister: ['洪永祥(F1300147)', 'xxxxxxxxxxxx', 'yyyyyyyyyyyyyy'], //所有部级
        // sectionChief: '劉日紅(F1300825)', //处级
        // allSectionChief: ['劉日紅(F1300825)', 'xxxxxxxxxxxxxxxxx', 'yyyyyyyyyyyyy'], //所有处级
        // lineLeader: ['xxxxxxxx'],  //线体管理员
        // allLineLeader: ['xxxxxxxx', 'yyyyyyyyy', 'zzzzzzzzzzzzzz', 'aaaaaaaaaaaa'],   //所有线体管理员
        // lastTime: '2021-01-25'  //最后修改时间
        currentMFG: '',
        currentLine: '',  //当前操作的线体
        disabled: true,  // 是否不可操作？
        SFC_AP_SYS_name: '',   // SFC/AP系统名 
        PCAS_SYS_name: '', // PCAS系统名
        scanPoint: '', // 掃描點
        IME: [''], // 產線|ME等相關
        allIME: [''],   // 所有IME
        section: '', // 段別
        allSection: [''], //所有段别
        breakPeriodList: [''],  // 休息时间列表
        sectionManager: '', //课级 
        allSectionManager: [''], //所有课级
        minister: '', //部级
        allMinister: [''], //所有部级
        sectionChief: '', //处级
        allSectionChief: [''], //所有处级
        lineLeader: [''],  //线体管理员
        allLineLeader: [''],   //所有线体管理员
        lastTime: ''  //最后修改时间
    },
    reducers: { 
        setLineMsg(_, {payload}){
            // console.log(payload);
            return {..._, ...payload}
        }
    },
    effects: {

    }
}

export default Model;

// 常微分方程（一元）：
// 可分离变量的微分方程 | 齐次微分方程 | 一阶线性微分方程 | 可降阶的高阶微分方程 | 常系数线性齐次微分方程