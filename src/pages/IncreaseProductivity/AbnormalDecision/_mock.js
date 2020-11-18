
let tableData = [
    {
        id: '00001',
        date: '2020-11-03 13:20',
        className: '白班',
        skuno: '74-104458-03',
        region: 'BST',
        question: '設備異常',
        title: 'PCBU BST生產74-104458-03時DIAG-POE-TEST和DIAG-GE-TEST Fail影響良率異常通知單！',
        person: '段李波(F1321607)',
        duty: 'TE:張天福(F1335343)',
        status: '等待處理',
        timediff: '26H',
        collect: true
    },
    {
        id: '00002',
        date: '2020-11-04 13:20',
        className: '白班',
        skuno: '74-104458-03',
        region: 'BST',
        question: '設備異常',
        title: 'PCBU BST生產74-104458-03時DIAG-POE-TEST和DIAG-GE-TEST Fail影響良率異常通知單！',
        person: '段李波(F1321607)',
        duty: 'TE:張天福(F1335343)',
        status: '等待處理',
        timediff: '26H',
        collect: true
    },
    {
        id: '00003',
        date: '2020-11-05 13:20',
        className: '白班',
        skuno: '74-104458-03',
        region: 'BST',
        question: '設備異常',
        title: 'PCBU BST生產74-104458-03時DIAG-POE-TEST和DIAG-GE-TEST Fail影響良率異常通知單！',
        person: '段李波(F1321607)',
        duty: 'TE:張天福(F1335343)',
        status: '等待處理',
        timediff: '26H',
        collect: true
    },
    {
        id: '00004',
        date: '2020-11-06 13:20',
        className: '白班',
        skuno: '74-104458-03',
        region: 'BST',
        question: '設備異常',
        title: 'PCBU BST生產74-104458-03時DIAG-POE-TEST和DIAG-GE-TEST Fail影響良率異常通知單！',
        person: '段李波(F1321607)',
        duty: 'TE:張天福(F1335343)',
        status: '等待處理',
        timediff: '26H',
        collect: true
    },
    {
        id: '00005',
        date: '2020-11-07 13:20',
        className: '白班',
        skuno: '74-104458-03',
        region: 'BST',
        question: '設備異常',
        title: 'PCBU BST生產74-104458-03時DIAG-POE-TEST和DIAG-GE-TEST Fail影響良率異常通知單！',
        person: '段李波(F1321607)',
        duty: 'TE:張天福(F1335343)',
        status: '等待處理',
        timediff: '26H',
        collect: true
    },
    {
        id: '00006',
        date: '2020-11-03 13:20',
        className: '白班',
        skuno: '74-104458-03',
        region: 'BST',
        question: '設備異常',
        title: 'PCBU BST生產74-104458-03時DIAG-POE-TEST和DIAG-GE-TEST Fail影響良率異常通知單！',
        person: '段李波(F1321607)',
        duty: 'TE:張天福(F1335343)',
        status: '等待處理',
        timediff: '26H',
        collect: true
    },
    {
        id: '00007',
        date: '2020-11-04 13:20',
        className: '白班',
        skuno: '74-104458-03',
        region: 'BST',
        question: '設備異常',
        title: 'PCBU BST生產74-104458-03時DIAG-POE-TEST和DIAG-GE-TEST Fail影響良率異常通知單！',
        person: '段李波(F1321607)',
        duty: 'TE:張天福(F1335343)',
        status: '等待處理',
        timediff: '26H',
        collect: true
    },
    {
        id: '00008',
        date: '2020-11-05 13:20',
        className: '白班',
        skuno: '74-104458-03',
        region: 'BST',
        question: '設備異常',
        title: 'PCBU BST生產74-104458-03時DIAG-POE-TEST和DIAG-GE-TEST Fail影響良率異常通知單！',
        person: '段李波(F1321607)',
        duty: 'TE:張天福(F1335343)',
        status: '等待處理',
        timediff: '26H',
        collect: false
    },
    {
        id: '00009',
        date: '2020-11-06 13:20',
        className: '白班',
        skuno: '74-104458-03',
        region: 'BST',
        question: '設備異常',
        title: 'PCBU BST生產74-104458-03時DIAG-POE-TEST和DIAG-GE-TEST Fail影響良率異常通知單！',
        person: '段李波(F1321607)',
        duty: 'TE:張天福(F1335343)',
        status: '等待處理',
        timediff: '26H',
        collect: false
    },
    {
        id: '00010',
        date: '2020-11-07 13:20',
        className: '白班',
        skuno: '74-104458-03',
        region: 'BST',
        question: '設備異常',
        title: 'PCBU BST生產74-104458-03時DIAG-POE-TEST和DIAG-GE-TEST Fail影響良率異常通知單！',
        person: '段李波(F1321607)',
        duty: 'TE:張天福(F1335343)',
        status: '等待處理',
        timediff: '26H',
        collect: false
    }
];


export default {
    'GET /api/abnormalDecision/getGraph1': (req, res) => {
        // console.log(req.query.mfg);
        res.send({
            Status: 'Pass',
            Message: 'OK！',
            Data: { // 异常状态统计（饼）
                left: {  // 所有异常
                    sum: 1075,
                    seriesData: [
                        // { value: 335, name: '设备异常' },
                        // { value: 310, name: '系统异常' },
                        // { value: 274, name: '物料异常' },
                        // { value: 235, name: '人员异常' },
                        // { value: 400, name: '品质异常' }
                        { value: 1000, name: '5DX' },
                        { value: 100, name: 'BST' },
                        { value: 300, name: 'ICT' },
                        { value: 500, name: 'KITTING' },
                        { value: 200, name: 'MCEBU' },
                        { value: 100, name: 'PACKING' },
                        { value: 100, name: 'PCBU' },
                        { value: 100, name: 'PTH' },
                        { value: 100, name: 'RE' },
                        { value: 100, name: 'SMT' },
                        { value: 100, name: '分板' },
                        { value: 100, name: '压合' }
                    ]
                },
                center: {  // 未结案异常
                    sum: 475,
                    status: '#52c41a', // red(#f5222d) yellow(#ffec3d) green(#52c41a)  
                    seriesData: [
                        { value: 200, name: '5DX' },
                        { value: 100, name: 'BST' },
                        { value: 300, name: 'ICT' },
                        { value: 500, name: 'KITTING' },
                    ]
                },
                right: {  // 未签核异常
                    sum: 675,
                    status: '#f5222d',
                    seriesData: [
                        { value: 200, name: '5DX' },
                        { value: 100, name: 'BST' },
                        { value: 300, name: 'ICT' },
                        { value: 500, name: 'KITTING' },
                        { value: 200, name: 'MCEBU' },
                        { value: 100, name: 'PACKING' },
                        { value: 100, name: 'PCBU' }
                    ]
                }
            }
        });
    },
    'GET /api/abnormalDecision/getGraph2': (req, res) => {
        res.send({
            Status: 'Pass',
            Message: 'OK!',
            Data: {
                xAxisData: ['设备异常', '品质异常', '物料异常', '系统异常', '治工具异常', '人员异常'],
                seriesData: [334, 1090, 700, 460, 560, 780]
            }
        });
    },
    'GET /api/abnormalDecision/getGraph3': (req, res) => {
        res.send({
            Status: 'Pass',
            Message: 'OK!',
            Data: {
                xAxisData: ['环', '机', '法', '料', '人', '量检测'],
                seriesData: [334, 1090, 700, 460, 560, 780]
            }
        });
    },
    'GET /api/abnormalDecision/getGraph4': (req, res) => {
        res.send({
            Status: 'Pass',
            Message: 'OK!',
            Data: {
                xAxisData: ['Jan', 'Feb', 'Mar', 'Apr', 'Mav', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                seriesData1: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 200.0, 6.4, 3.3],
                seriesData2: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
            }
        });
    },
    'GET /api/abnormalDecision/getGraph5': (req, res) => {
        res.send({
            Status: 'Pass',
            Message: 'OK!',
            Data: {
                xAxisData: ['WEEK01', 'WEEK02', 'WEEK03', 'WEEK04', 'WEEK05', 'WEEK06', 'WEEK07', 'WEEK08', 'WEEK09', 'WEEK10', 'WEEK11', 'WEEK12'],
                seriesData1: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                seriesData2: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                seriesData3: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
            }
        });
    },
    //=============================================================================================================================================
    'GET /api/getBU': (req, res) => {
        let d = {
            MFGI: ['MFGI_BU_TEST1', 'MFGI_BU_TEST2', 'MFGI_BU_TEST3'],
            MFGII: ['MFGII_BU_TEST1', 'MFGII_BU_TEST2', 'MFGII_BU_TEST3'],
            MFGIII: ['MFGIII_BU_TEST1', 'MFGIII_BU_TEST2', 'MFGIII_BU_TEST3'],
            MFGV: ['MFGV_BU_TEST1', 'MFGV_BU_TEST2', 'MFGV_BU_TEST3'],
            MFGVI: ['MFGVI_BU_TEST1', 'MFGVI_BU_TEST2', 'MFGVI_BU_TEST3'],
            MFGVII: ['MFGVII_BU_TEST1', 'MFGVII_BU_TEST2', 'MFGVII_BU_TEST3'],
            MFGVIII: ['MFGVIII_BU_TEST1', 'MFGVIII_BU_TEST2', 'MFGVIII_BU_TEST3']
        }
        res.send({
            Status: 'Pass',
            Message: 'OK!',
            Data: {
                BU: d[req.query.MFG]
            }
        });
    },
    //=============================================================================================================================================
    'GET /api/abnormalDecision/getTable': (req, res) => {
        res.send({
            Status: 'Pass',
            Message: '获取异常列表成功！',
            Data: tableData
        });
    },
    'GET /api/abnormalDecision/toggerCollect': (req, res) => {
        tableData = tableData.map(row => {
            return row.id == req.query.id ? { ...row, collect: !row.collect } : row;
        });
        res.send({
            Status: 'Pass',
            Message: '切换收藏状态成功!',
            Data: {}
        });
    },

    'GET /api/abnormalDecision/getNewAbnormalMsg': (req, res) => {
        res.send({
            Status: 'Pass',
            Message: '获取新增异常需要的附带信息成功！',
            Data: {
                baseMsg: { //基本信息
                    allAbnormalClass: ['xxxx', '白班', '晚班'],
                    allBU: ['SRGBU', 'PCBU'],
                    allRegion: ['Kitting', 'SMT', 'ICT', 'Packing', '5DX', '壓合', 'PTH', 'RE', 'MCEBU', '分板', 'BST', '其它'],  //所有异常区域
                    allStage: ['量產', '試產', '外包'],
                    issuer: '劉龍飛(F1320854)', // 發文人員
                    units: 'IT' // 發文單位
                },
                report: { //上报机制
                    allSectionManager: ['劉日紅(F1300825)', '張任(F1304859)', '張強(F1303904)', '任杏(F1306746)', '梁俏麗(F1313632)', '李濤(F1302833)'],
                    allMinister: ['洪永祥(F1300147)', '段杰君(F1301264)'],
                    allSectionChief: ['劉慶公(100056)']
                },
                problem: { //問題描述
                    allHandler: ['劉日紅(F1300825)', '張任(F1304859)', '張強(F1303904)', '任杏(F1306746)', '梁俏麗(F1313632)', '李濤(F1302833)'],
                    abnormalClassify: {   //按异常分类
                        equipment: { //设备异常
                            allDesc: ['xxxxx', '設備檔機', '保養超時', '低效生產', '安全隱患', '功能缺失', '帶病運行', '其它'],
                            allCategory: ['SMT設備', 'PTH設備', '測試設備', '流水線', 'SFC設備', '公務設備', '其它']
                        },
                        material: { //物料异常
                            allDesc: ['來料短缺', '物料Delay', '錯料', '混料', '物料包裝異常', '特采過期', '包裝信息與實物不符', '有帳無務', '其它']
                        },
                        person: { //人员异常
                            allDesc: ['人力不足', '新人技能不足', '外借人力技能不足', '其它']
                        },
                        quality: { //品质异常
                            allProcess: ['SMT製程不良', 'PTH製程不良', '組裝製程不良', '測試製程不良', '維修製程不良', '壓合製程不良'], //所有制程段
                            allBadPhenomenon: ['批量損件', '燒機', '批量錯件', '批量少料', '批量反向', '不良率超標', '其它'], //所有不良现象
                            allScope: ['當前工站', '前置工站', '後續工站'], //所有影响范围
                        },
                        tools: { //治工具异常
                            allDesc: ['治工具損壞', '治工具不足', '治工具功能不良', '治工具未點檢', '治工具要求不符', '其它'], //所有异常描述
                        },
                        system: { //系统异常
                            allCategory: [
                                '測試系統異常', 'SFC系統異常', '氮氣供應系統異常', '電力系統異常', '壓縮空氣系統異常', '真空供氣系統異常', '冰水供應系統異常',
                                'ALL Parts系統異常', 'Beacon系統異常', 'Agile系統異常', 'Dom系統異常', 'SAP系統異常', '其它'
                            ] //所有异常类别
                        }
                    }
                },
                countermeasures: { //临时对策
                    allManpowerArrangement: ['教育訓練', '5S整理', '下早班', 'Sortting', '支援']  //闲置人力安排
                },
                causeAnalysis: {  // 原因分析(只有填寫原因分析才能申請結案)
                    allChargePerson: ['5DX:李貽剛 (F1304158)', '5DX:羅志濤(F1301571)', '5DX:馮海平(F1219611)', '5DX:區劍(F1331116)', '5DX:陳飛鵬(F1319614)'], // 所有負責人
                    allSectionManager: ['SMT:劉日紅(F1300825)', 'ME:柳界明(F1313143)', 'PE:梁俏麗(F1313632)', 'PD:張強(F1303904)'], //所有負責人课级
                    allMinister: ['ME:熊豐(F1300296)', 'RE:洪永祥(F1300147)', 'ME:段杰君(F1301264)'], //所有負責人部级
                    allSectionChief: ['PIE:劉慶公(100056)'], //所有負責人处级
                    allNotifier: [
                        '5DX:李貽剛 (esd-5dx-d10@mail.foxconn.com)', '5DX:羅志濤(zhi-tao.luo@mail.foxconn.com)', '5DX:馮海平(hardy.hp.feng@mail.foxconn.com)',
                        '5DX:區劍(oden.j.ou@mail.foxconn.com)', '5DX:陳飛鵬(nick.fp.chen@mail.foxconn.com)', 'APP:劉照亮(eason.zl.liu@mail.foxconn.com)'
                    ] // 所有異常知會人
                }
            }
        });
    },

    'POST /api/abnormalDecision/uploadFile': (req, res) => {
        // console.log(req.body);
        res.send({
            Status: 'Pass',
            Message: '上传文件OK！',
            Data: {}
        });
    },
    'GET /api/abnormalDecision/newAbnormal': (req, res) => {
        res.send({
            Status: 'Pass',
            Message: '新增异常成功！',
            Data: {}
        });
    }
}
