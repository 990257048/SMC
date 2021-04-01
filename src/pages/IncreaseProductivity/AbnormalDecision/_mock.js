// import png1 from '../../../file/img/ycjc1.png';
// import png2 from '../../../file/img/ycjc2.png';
// import png3 from '../../../file/img/logo1.png';
// import png4 from '../../../file/img/login1.png';
// import png5 from '../../../file/img/login2.png';

// 等待處理 處理中 申請結案 已結案

let png1 = '/static/ycjc1.f43f02bd.png' 
let png2 = '/static/ycjc2.134feb66.png' 
let png3 = '/static/logo1.643717f9.png' 
let png4 = '/static/login1.2f7455d5.png' 
let png5 = '/static/login2.40691084.png'

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
        status: '已結案',
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
        status: '申請結案',
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
        status: '處理中',
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
        // console.log(req.query);
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
                    allAbnormalClass: ['白班', '晚班'],
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
                            allDesc: ['設備檔機', '保養超時', '低效生產', '安全隱患', '功能缺失', '帶病運行', '其它'],
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

    'POST /api/abnormalDecision/getAbnormalMaintenanceMsg': (req, res) => {
        console.log(req.body);
        res.send({
            Status: 'Pass',
            Message: '获取异常维护的附带信息成功！',
            Data: {  // 异常维护 状态
                // 等待處理 處理中 申請結案 已結案
                status: '申請結案',  // 当前状态 （等待處理 處理中 申請結案 已結案），不同状态操作不一样
                operationPermissions: 'Y', //用户操作权限 'Y' | 'N'
                type: '异常', // 通知单类型  异常 | 停线
                emergencyDegree: '正常', // 紧急程度  正常 | 紧急
                baseMsg: { //基本信息
                    allAbnormalClass: ['白班', '晚班'],
                    allBU: ['SRGBU', 'PCBU'],
                    allRegion: ['Kitting', 'SMT', 'ICT', 'Packing', '5DX', '壓合', 'PTH', 'RE', 'MCEBU', '分板', 'BST', '其它'],  //所有异常区域
                    allStage: ['量產', '試產', '外包'],
                    issuer: '劉龍飛(F1320854)', // 發文人員
                    units: 'IT', // 發文單位
                    date: '2020/11/11 08:34', // 發文日期
                    abnormalTime: '2020/11/11 08:34', // 异常时间
                    abnormalClass: '白班', // 异常班别
                    BU: 'SRGBU', // 异常BU
                    region: 'SMT', //异常区域
                    station: '', //异常工站
                    skuName: '', //机种名称
                    skuno: '', //机种料号
                    WO: '', //工單編號
                    stage: '量產' // 产品阶段
                },
                report: { //上报机制
                    allSectionManager: ['劉日紅(F1300825)', '張任(F1304859)', '張強(F1303904)', '任杏(F1306746)', '梁俏麗(F1313632)', '李濤(F1302833)'],
                    allMinister: ['洪永祥(F1300147)', '段杰君(F1301264)'],
                    allSectionChief: ['劉慶公(100056)'],
                    sectionManager: '劉日紅(F1300825)', //课级
                    minister: '洪永祥(F1300147)', //部级
                    sectionChief: '劉日紅(F1300825)' //处级
                },
                problem: { //問題描述
                    allHandler: ['劉日紅(F1300825)', '張任(F1304859)', '張強(F1303904)', '任杏(F1306746)', '梁俏麗(F1313632)', '李濤(F1302833)'],
                    handler: [],  //異常處理人
                    noticeTime: '2020/11/12 18:19', //異常通知時間
                    emailTitle: '', // 郵件標題
                    abnormalClassify: {   //按异常分类
                        currentClassify: 'equipment',  //当前分类
                        equipment: { //设备异常
                            allDesc: ['設備檔機', '保養超時', '低效生產', '安全隱患', '功能缺失', '帶病運行', '其它'],
                            allCategory: ['SMT設備', 'PTH設備', '測試設備', '流水線', 'SFC設備', '公務設備', '其它'],
                            desc: '',  //异常描述
                            category: '', //异常类别
                            name: '',  // 设备名称
                            equipmentNumber: '', // 设备编号
                            equipmentModel: '' // 設備型號
                        },
                        material: { //物料异常
                            allDesc: ['來料短缺', '物料Delay', '錯料', '混料', '物料包裝異常', '特采過期', '包裝信息與實物不符', '有帳無務', '其它'],
                            desc: '', //异常描述
                            partNo: '', //零件料号
                            rejectRatio: '', //不良率
                            supplier: '', //供应商
                            DC: '',
                            LC: ''
                        },
                        person: { //人员异常
                            allDesc: ['人力不足', '新人技能不足', '外借人力技能不足', '其它'],
                            desc: '' //异常描述
                        },
                        quality: { //品质异常
                            allProcess: ['SMT製程不良', 'PTH製程不良', '組裝製程不良', '測試製程不良', '維修製程不良', '壓合製程不良'], //所有制程段
                            allBadPhenomenon: ['批量損件', '燒機', '批量錯件', '批量少料', '批量反向', '不良率超標', '其它'], //所有不良现象
                            allScope: ['當前工站', '前置工站', '後續工站'], //所有影响范围
                            process: '', //制程段
                            badPhenomenon: '', //不良现象
                            station: '', //发生站位
                            scope: '', //影响范围
                            measures: '' //当前措施
                        },
                        tools: { //治工具异常
                            allDesc: ['治工具損壞', '治工具不足', '治工具功能不良', '治工具未點檢', '治工具要求不符', '其它'], //所有异常描述
                            desc: '',   //异常描述
                            skuno: '',  //涉及的产品料号
                            station: '' //使用站位
                        },
                        system: { //系统异常
                            allCategory: [
                                '測試系統異常', 'SFC系統異常', '氮氣供應系統異常', '電力系統異常', '壓縮空氣系統異常', '真空供氣系統異常', '冰水供應系統異常',
                                'ALL Parts系統異常', 'Beacon系統異常', 'Agile系統異常', 'Dom系統異常', 'SAP系統異常', '其它'
                            ], //所有异常类别
                            category: '', //异常类别
                            desc: '', //異常描述
                            startTime: '2020/11/13 09:20' //異常開始時間
                        }
                    }
                },
                countermeasures: { //临时对策
                    allManpowerArrangement: ['教育訓練', '5S整理', '下早班', 'Sortting', '支援'],
                    lostWorkTime: '', //损失工时
                    idleHuman: '', //闲置人力
                    manpowerArrangement: '支援', //闲置人力安排
                    lostOutput: '', //损失产出
                    lostYield: '', //良率損失
                    measures: '' //臨時解決措施
                },
                causeAnalysis: {  // 原因分析(只有填寫原因分析才能申請結案)                
                    parson: {
                        allChargePerson: ['5DX:李貽剛 (F1304158)', '5DX:羅志濤(F1301571)', '5DX:馮海平(F1219611)', '5DX:區劍(F1331116)', '5DX:陳飛鵬(F1319614)'], // 所有負責人
                        allSectionManager: ['SMT:劉日紅(F1300825)', 'ME:柳界明(F1313143)', 'PE:梁俏麗(F1313632)', 'PD:張強(F1303904)'], //所有負責人课级
                        allMinister: ['ME:熊豐(F1300296)', 'RE:洪永祥(F1300147)', 'ME:段杰君(F1301264)'], //所有負責人部级
                        allSectionChief: ['PIE:劉慶公(100056)'], //所有負責人处级
                        allNotifier: [
                            '5DX:李貽剛 (esd-5dx-d10@mail.foxconn.com)', '5DX:羅志濤(zhi-tao.luo@mail.foxconn.com)', '5DX:馮海平(hardy.hp.feng@mail.foxconn.com)',
                            '5DX:區劍(oden.j.ou@mail.foxconn.com)', '5DX:陳飛鵬(nick.fp.chen@mail.foxconn.com)', 'APP:劉照亮(eason.zl.liu@mail.foxconn.com)'
                        ], // 所有異常知會人
                        chargePerson: [], // 負責人
                        sectionManager: [], //負責人课级
                        minister: [], //負責人部级
                        sectionChief: [], //負責人处级
                        notifier: [], // 異常知會人
                    },
                    //异常维护里面特有的***原因分析模块**********************************************************************************************
                    cause: {
                        allCause: [], // ['parson', 'equipment', 'material', 'function', 'annulus', 'detection'],  //涉及的所有原因
                        currentClassify: 'parson',  //当前分类
                        parson: {   //人
                            allChargePerson: ['劉日紅(F1300825)', '張任(F1304859)', '張強(F1303904)', '任杏(F1306746)', '梁俏麗(F1313632)', '李濤(F1302833)'], //所有责任人
                            chargePerson: [], //责任人
                            decision: '', //处理决定
                            improve: ''   //改善方向
                        },
                        equipment: { //机
                            allChargePerson: ['劉日紅(F1300825)', '張任(F1304859)', '張強(F1303904)', '任杏(F1306746)', '梁俏麗(F1313632)', '李濤(F1302833)'], //所有负责人
                            chargePerson: [], //责任人
                            name: '',  // 机器名称
                            equipmentNumber: '', // 机器编号
                            cause: '', //具体原因
                            improve: '',   //改善方向
                            anImprove: '',  //橫向展開改善  Y | N
                            completionTime: '2020/12/08 14:16' //預計完成時間
                        },
                        material: {  //料
                            allChargePerson: ['劉日紅(F1300825)', '張任(F1304859)', '張強(F1303904)', '任杏(F1306746)', '梁俏麗(F1313632)', '李濤(F1302833)'], //所有负责人
                            chargePerson: [], // 負責人
                            skuno: '', // 料號
                            DC: '', // DC
                            LC: '', // LC
                            vendor: '', // 廠商
                            result: '', // 處理結果
                            improve: '', // 改善方向
                            completionTime: '2020/12/08 14:16' // 預計完成時間
                        },
                        function: {  //法
                            allChargePerson: ['劉日紅(F1300825)', '張任(F1304859)', '張強(F1303904)', '任杏(F1306746)', '梁俏麗(F1313632)', '李濤(F1302833)'],  //所有负责人
                            chargePerson: [], // 負責人
                            result: '', // 改善結果
                            anImprove: '',  // 橫向展開改善 Y | N
                            completionTime: '2020/12/08 14:16' // 預計完成時間
                        },
                        annulus: {  //环
                            allChargePerson: ['劉日紅(F1300825)', '張任(F1304859)', '張強(F1303904)', '任杏(F1306746)', '梁俏麗(F1313632)', '李濤(F1302833)'],  //所有负责人
                            chargePerson: [], // 負責人
                            cause: '', // 具體原因
                            result: '', // 處理結果
                            improve: '',  // 改善方向
                            completionTime: '2020/12/08 14:16' // 預計完成時間
                        },
                        detection: {  //量检测
                            allChargePerson: ['劉日紅(F1300825)', '張任(F1304859)', '張強(F1303904)', '任杏(F1306746)', '梁俏麗(F1313632)', '李濤(F1302833)'],  //所有负责人
                            chargePerson: [], // 負責人
                            content: '', // 測試內容
                            result: '' // 測試結果
                        }
                    }
                    
                    // ***********************************************************************************************************************
                },
                remarksAndAttachments: {  // 備註與附件
                    problemStatus: '等待处理', // 問題狀態   等待处理 | 处理中 | 申请结案
                    remarks: '', // 備註
                    // attachments: [] // 附件不用了
                },
                issueTracking: [ //问题跟踪
                    {
                        title: '吴勇标发起了问题...',
                        content: [
                            {
                                name: '问题描述', content: [
                                    { name: '異常種類-物料异常' },
                                    { name: 'DC', content: '' },
                                    { name: 'LC', content: '' },
                                    { name: '零件料號', content: '' },
                                    { name: '不良率', content: '' },
                                    { name: '供應商', content: '' },
                                ]
                            },
                            { name: '通知時間', content: '12/15/2020 7:01:00 AM' },
                            { name: '處理人員', content: 'PD:吳勇標(F4357722)' },
                            { name: '相關說明', content: 'MCEBU 組裝線在生產Fortitude（800-38531-07）機種時，目檢連續發現4pcs 連接器彈片翹起不良（如下圖），投入185pcs 不良4pcs 不良率2.1%，針對該異常請PQE（隗勉）上班后前來產線分析處理，謝謝！！！（實物在組裝線長電腦桌旁）' },
                            {
                                name: '相關附件', content: {
                                    img: [png1, png2, png4, png5],
                                    doc: [
                                        { name: 'doc1', src: png1 },
                                        { name: 'doc2', src: png2 },
                                        { name: 'doc3', src: png3 },
                                        { name: 'doc4', src: png4 },
                                        { name: 'doc5', src: png5 }
                                    ]
                                }
                            }
                        ]
                    },
                    {
                        title: '隗勉對問題進行了更新...',
                        content: [
                            {
                                name: '影响因素: 料', content: [
                                    { name: '原因分析-料' },
                                    { name: '負責人', content: 'PQE:黃健(F1334417)' },
                                    { name: '料號', content: 'C335.00021.005C' },
                                    { name: 'DC', content: 'D2002和D2011' },
                                    { name: 'LC', content: 'L01/09/2020 和 L2011' },
                                    { name: '廠商', content: 'Amphenol' },
                                    { name: '處理結果', content: 'QE WILSON聯繫SQE處理中' },
                                    { name: '改善方向', content: '供應商改善' },
                                    { name: '預計完成時間', content: '12/14/2020 10:44:08 AM' }
                                ]
                            },
                            { name: '通知時間', content: '12/15/2020 7:01:00 AM' },
                            { name: '處理人員', content: 'PD:吳勇標(F4357722)' },
                    
                            { name: '相關說明', content: '' },
                            { name: '相關附件', content: '' },
                            { name: '问题状态', content: '申请结案' }
                        ]
                    },
                    {
                        title: '劉慶公對問題進行了更新...',
                        content: [
                            { name: '影響因素:', content: '无' },
                            { name: '相關說明:', content: '无' },
                            { name: '同意結案:', content: '无' },
                            { name: '相關附件:', content: '无' },
                            { name: '問題狀態:', content: '已結案' }
                        ]
                    }
                ]
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
    'POST /api/abnormalDecision/newAbnormal': (req, res) => {
        res.send({
            Status: 'Pass',
            Message: '新增异常成功！',
            Data: {}
        });
    },

    'POST /api/abnormalDecision/abnormalMaintenanceSaveDraft': (req, res) => {
        res.send({
            Status: 'Pass',
            Message: '保存草稿成功！',
            Data: {}
        })
    },

    'POST /api/abnormalDecision/abnormalMaintenanceSubmit': (req, res) => {
        res.send({
            Status: 'Pass',
            Message: '提交成功！',
            Data: {}
        })
    },

    'GET /api/abnormalDecision/abnormalMaintenanceResolve': (req, res) => {
        res.send({
            Status: 'Pass',
            Message: '已通过结案申请！',
            Data: {}
        })
    },

    'GET /api/abnormalDecision/abnormalMaintenanceReject': (req, res) => {
        res.send({
            Status: 'Pass',
            Message: '已拒绝结案申请！',
            Data: {}
        })
    }

}
