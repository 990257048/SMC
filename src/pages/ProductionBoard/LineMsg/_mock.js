
export default {

    'GET /api/LineMsg/getLineAdditionalInformation': (req, res) => { //查询线别附带信息 （包括  所有【產線|ME等相關】【课级】【部级】【处级】【线体管理员】信息）
        res.send({
            Status: 'Pass',
            Message: 'OK',
            Data: {
                allIME: ['aaaa', 'bbbb', 'cccc', 'dddd'],   // 所有IME
                allSectionManager: ['劉日紅(F1300825)', 'xxxxxxxxxxxx', 'yyyyyyyyyyyyyy'], //所有课级
                allMinister: ['洪永祥(F1300147)', 'xxxxxxxxxxxx', 'yyyyyyyyyyyyyy'], //所有部级
                allSectionChief: ['劉日紅(F1300825)', 'xxxxxxxxxxxxxxxxx', 'yyyyyyyyyyyyy'], //所有处级
                allLineLeader: ['xxxxxxxx', 'yyyyyyyyy', 'zzzzzzzzzzzzzz', 'aaaaaaaaaaaa'],   //所有线体管理员
            }
        });
    },

    'GET /api/LineMsg/getLineBaseMsg': (req, res) => { //查询线别基本信息 (包含操作权限)
        res.send({
            Status: 'Pass',
            Messgae: 'OK',
            Data: {
                disabled: req.query.MFG == 'MFGII' && req.query.line == 'MFGII - LINE2' ? false : true,  // 是否不可操作？
                SFC_AP_SYS_name: 'DA3P3A',   // SFC/AP系统名 
                PCAS_SYS_name: 'DA3P3A', // PCAS系统名
                scanPoint: 'DA3S2CT1', // 掃描點
                IME: ['aaaa', 'bbbb'], // 產線|ME等相關
                section: 'SMT', // 段別
                allSection: ['SMT', 'PTH', 'SI', '5DX', 'ICT', 'TEST'], //所有段别
                breakPeriodList: ['08:00-11:40 工作', '12:00-13:30 休息', '13:30-17:00 工作', '17:00-19:00 加班'],  // 休息时间列表
                sectionManager: '劉日紅(F1300825)', //课级 
                minister: '洪永祥(F1300147)', //部级
                sectionChief: '劉日紅(F1300825)', //处级
                lineLeader: ['xxxxxxxx'],  //线体管理员
                lastTime: '2021-01-25'  //最后修改时间
            }
        });
    },

    'GET /api/LineMsg/updateLineName': (req, res) => { //修改线体名称
        res.send({
            Status: 'Pass',
            Message: '已修改线体名称！',
            Data: {}
        });
    },

    'GET /api/LineMsg/getLineCode': () => {}
}