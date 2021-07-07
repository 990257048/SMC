export default {
    'GET  /api/SMCAccount/GetMfg': (req, res) => {    // 获取制造处
        //let { Token } = req.query;
        res.send({
            Status: 'Pass',
            Message: 'OK',
            Data: {
                Mfg: [
                    'MFGI', 'MFGII', 'MFGIII', 'MFGV', 'MFGVI', 'MFGVII', 'MFGVIII'
                ]
            }
        });
    },
    'GET /api/SMCKanBan/GetLineByMfg': (req, res) => {  //获取线体
        let { Mfg } = req.query;
        let line = [
            Mfg + ' - LINE1',
            Mfg + ' - LINE2',
            Mfg + ' - LINE3',
            Mfg + ' - LINE4'
        ]
        res.send({
            Status: 'Pass',
            Message: 'OK',
            Data: {
                LineName: line
            }
        });
    },
    'GET /api/SMCKanBan/GetKanbanInfo': (req, res) => {  //获取看板信息
        let { ClassName, LineName, Mfg, Date } = req.query;
        res.send({
            Status: 'Pass',
            Message: 'OK',
            Data: {
                Abnormal: {
                    Abnormal_NoOK_Count: '4', Abnormal_Count: '10', Abnormal_Time: '0.5', Capacity_achievement_rate: '90%'
                },
                Chart: [
                    { SKUNO: '74-11000000-01', TOTAL_REALOUT: '234' },
                    { SKUNO: '74-11000000-02', TOTAL_REALOUT: '124' },
                    { SKUNO: '74-11000000-03', TOTAL_REALOUT: '435' },
                    { SKUNO: '74-11000000-04', TOTAL_REALOUT: '535' }
                ],
                KanBan: [
                    {
                        PERIOD: "8:00~9:00",
                        SKU_NAME: '74-120728-01',
                        SKUNO: "74-120728-01(D)",
                        COST_TIME: "45",
                        UPH: "45",
                        REAL_OUT: "4",
                        DIFF: "-41",
                        TOTAL_OUT: "4",
                        TOTAL_DIFF: "-41",
                        REMARK: "xxxxxxxxxxxxxxxxxx\ndfe3gytdefdytefdytewdf",
                    },
                    {
                        PERIOD: "8:00~9:00",
                        SKU_NAME: '74-120728-01',
                        SKUNO: "74-120728-01(D)",
                        COST_TIME: "45",
                        UPH: "45",
                        REAL_OUT: "4",
                        DIFF: "-41",
                        TOTAL_OUT: "4",
                        TOTAL_DIFF: "-41",
                        REMARK: "xxxxxxxxxxxxxxxxxx\ndfe3gytdefdytefdytewdf",
                    },
                    {
                        PERIOD: "8:00~9:00",
                        SKU_NAME: '74-120728-01',
                        SKUNO: "74-120728-01(B)\n74-120728-01(C)\n74-120728-01(D)",
                        COST_TIME: "45\n44\n43",
                        UPH: "45\n44\n43",
                        REAL_OUT: "4",
                        DIFF: "-41\n-10\n10",
                        TOTAL_OUT: "4",
                        TOTAL_DIFF: "-41",
                        REMARK: "xxxxxxxxxxxxxxxxxx\ndfe3gytdefdytefdytewdf",
                    }
                ]
            }
        });
    },
    'GET /api/SMCKanBan/GetDefaultDate': (req, res) => {
        res.send({
            Status: 'Pass',
            Message: 'OK',
            Data: {
                classList: [
                    {
                        classtype: '早班',
                        classcode: 'D'
                    },
                    {
                        classtype: '中班',
                        classcode: 'M'
                    },
                    {
                        classtype: '晚班',
                        classcode: 'N'
                    }
                ],
                currentClass: 'D'
            }
        })
    }


};