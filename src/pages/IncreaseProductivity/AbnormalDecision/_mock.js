
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
        let tableData = [
            {
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
        res.send({
            Status: 'Pass',
            Message: 'OK!',
            Data: tableData
        });
    }

}
