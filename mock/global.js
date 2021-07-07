// 全局API MOCK数据   20201006 add by gch

// 账号 登录
// import vcode from '@/assets/vcode/test.png'


export default {
    'GET /api/SMCAccount/GetValidCode': (req, res) => {
        res.send({
            Status: 'Pass',
            Message: 'OK',
            Data: 'data:image/png;base64,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'
        });
    },

    'GET /api/DownLoadFile/GetAPPList': (req, res) => {
        res.send({
            Status: 'Pass',
            Message: 'OK',
            Data: [{
                AppName: "SFCSMC.apk",
                FileSize: 3469510,
                LastTime: "2021/06/19 19:11:04"
            }]
        })
    },

    'POST /api/SMCAccount/batchAddUserInfoWeb': (req, res) => {
        res.send({
            Status: 'Pass',
            Message: '上传成功',
            Data: {}
        })
    },

    'GET /api/SMCAccount/CheckUserInfo': (req, res) => {
        // let {WORKID, KEY, LANGUAGE} = req.query;
        // console.log(WORKID, KEY, LANGUAGE);
        res.send({
            Status: 'Pass',
            Message: 'OK',
            Data: {
                Token: 'asdfghjkl'
            }
        });
    },

    'GET /api/SMCAccount/GetBUPrivillege': (req, res) => {
        let { Token } = req.query;
        // console.log(Token);
        if (Token == 'asdfghjkl') {
            res.send({
                Status: 'Pass',
                Message: '登录验证成功！',
                Data: [{ WORKID: "F1320854" }]
            });
        } else {
            res.send({
                Status: 'Fail',
                Message: '验证失败！',
                Data: []
            });
        }
    },

    // http://localhost:12807/api/abnormalDecision/GetAbnormalNoticeList

    'GET /api/abnormalDecision/GetAbnormalNoticeList': (req, res) => {
        res.send({
            Status: 'Pass',
            Message: '獲取全局消息成功',
            Data: [
                {
                    msg: '異常決策中心-未結案事項(3個)',
                    count: 3,
                    url: '/increase-productivity/abnormal-decision?description=open-case'
                },
                {
                    msg: 'SMT超5天未轉板（3個）',
                    count: 3,
                    url: '/increase-productivity/xxx?xxx=xxx'
                }
            ]
        });
    }
}
