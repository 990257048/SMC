export default {
    'GET /api/UPHAndSKUSetting/getSMCLine': (req, res) => {
        res.send({
            Status: 'Pass',
            Message: 'OK',
            Data: ['D10-3F S1A', 'D10-3F S2A', 'D10-3F S3A', 'D10-3F S4A', 'D10-3F S5A']
        });
    },
    'GET /api/UPHAndSKUSetting/getSkuno': (req, res) => {
        res.send({
            Status: 'Pass',
            Message: 'OK',
            Data: ['68-101826-02', '68-101826-03', '68-101826-04', '68-101826-05', '68-101826-06']
        });
    },
    'GET /api/UPHAndSKUSetting/getUPHMsg': (req, res) => {
        res.send({
            Status: 'Pass',
            Message: 'OK',
            Data: {
                skuno: '68-101826-02',
                face: 'B',
                pcasUPH: '100',
                editTime: '2018/12/03 08:20:10',
                smcUPH: '10'
            }
        })
    },
    'GET /api/UPHAndSKUSetting/updateSMCUPH': (req, res) => {
        res.send({
            Status: 'Pass',
            Message: 'OK',
            Data: {}
        });
    },
    'GET /api/UPHAndSKUSetting/addUPHMsg': (req, res) => {
        res.send({
            Status: 'Pass',
            Message: 'OK',
            Data: {}
        });
    },
    
    'GET /api/UPHAndSKUSetting/skuSetting_getSkuno': (req, res) => {
        res.send({
            Status: 'Pass',
            Message: 'OK',
            Data: ['68-101826-02', '68-101826-03', '68-101826-04', '68-101826-05', '68-101826-06']
        });
    },

    'GET /api/UPHAndSKUSetting/getSkuName': (req, res) => {
        res.send({
            Status: 'Pass',
            Message: 'OK',
            Data: '68-101826-02'
        });
    },
    'GET /api/UPHAndSKUSetting/updateSkuName': (req, res) => {
        res.send({
            Status: 'Pass',
            Message: 'OK',
            Data: {}
        });
    }

}