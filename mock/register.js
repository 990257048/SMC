export default {
    'GET /api/SMCAccount/getAttachedMessage': (req, res) => {   // 获取附带信息
        res.send({
            Status: 'Pass',
            Message: '获取附带信息成功！',
            Data: {
                allDepartment: [
                    "AOI", "EHS", "ICT", "IE", "IPQC", "IT", "ME", "MPM", "PD", "PE", 
                    "PM", "PQE", "RD", "RE", "SE", "SMT", "TE", "經管", "企劃", "自動化", 
                    "Lean Team", "生產排配", "安全幹事", "安全專員", "技術副理", "APP", "資工", 
                    "教育訓練", "物料員", "BEACON", "大數據", "PC", "PIE", "QE", "SQE", "5DX", 
                    "WHS", "IQC", "Kitting", "交管", "工務", "倉庫", "環安", "CE", "ECE", "MCE", 
                    "NPIC", "電子倉"
                ],   // 部门
                allPosition: [
                    "總裁", "副總裁", "總經理", "副總經理", "資深經理", "經理", "資深協理", "協理", 
                    "資深處長", "處長", "資深專理", "專理", "課長", "副課長", "組長", "副組長", "工程師", 
                    "線長", "副線長", "作業員", "技術員", "助理", "物流", "工單", "財務", "專員", "副理", 
                    "IPQC"
                ],     // 职位
                allMFG: [
                    "MFGI", "MFGII", "MFGIII", "MFGV", "MFGVI", "MFGVII", "MFGVIII", "周邊"
                ],          // 所有制造处
            }
        });
    },
    'GET /api/SMCAccount/getBU': (req, res) => {
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
    'GET /api/SMCAccount/userRegister': (req, res) => {  //用户注册
        res.send({
            Status: 'Pass',
            Message: '注册成功！',
            Data: {}
        })
    }
}