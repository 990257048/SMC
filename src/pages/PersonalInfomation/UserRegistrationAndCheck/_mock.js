export default {
    'GET /api/SMCAccount/getUserRegistrationMsg': (req, res) => {
        const data = [];

        for (let i = 0; i < 46; i++) {
            data.push({
                // key: i,
                id: i,
                name: `高超輝`,
                workNO: 'F1335257',
                Email: `nsdii-brocade-sfc@mail.foxconn.com`,
                MFG: 'MFGII',
                position: 'IT'
            });
        }
        res.send({
            Status: 'Pass',
            Message: '获取注册待签核信息成功！',
            Data: data
        });
    },


    'GET /api/SMCAccount/userRegistrationSign': (req, res) => {
        let type = req.query.type;
        res.send({
            Status: 'Pass',
            Message: type == 'resolve' ? '已通过申请！' : '已拒绝申请！',
            Data: {}
        });
    },

    // 'GET /api/userRegistrationAndCheck/userRegistrationResolve': (req, res) => {
    //     console.log(req.query);
    //     res.send({
    //         Status: 'Pass',
    //         Message: '已通过申请！',
    //         Data: {}
    //     });
    // },

    // 'GET /api/userRegistrationAndCheck/userRegistrationReject': (req, res) => {
    //     res.send({
    //         Status: 'Pass',
    //         Message: '已拒绝申请！',
    //     });
    // }
}