// 全局API MOCK数据   20201006 add by gch

// 账号 登录

export default {
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
        let {Token} = req.query;
        // console.log(Token);
        if( Token == 'asdfghjkl' ){
            res.send({
                Status: 'Pass',
                Message: '登录验证成功！',
                Data: [{WORKID: "F1320854"}]
            });
        }else{
            res.send({
                Status: 'Fail',
                Message: '验证失败！',
                Data: []
            });
        }
    },

}
