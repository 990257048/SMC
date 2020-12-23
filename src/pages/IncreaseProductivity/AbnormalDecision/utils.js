// 局部辅助工具

let graph1SendData = { // 异常统计图组件
    globalSearch: {    // 全局条件搜索（当前制造处 分类标准）
        MFG: '', // 'ALL', //当前制造处
        classify: '', //当前查询类别
    },
    quickSearch: {     // 快速搜索（时间条件：年 季 月 周 时间段 -- 当前是否需要该条件， 当前选项卡位置，当前的值是多少）
        classify: '', //当前查询类别
        year: '', // 当前年份
        season: '', // 当前季
        month: '', //当前月份
        week: '', //当前周
        time: [] //时间段
    },
    advancedSearch: {   // 高级搜索（选项卡 位置 控件值 ）
        BU: [], //按BU
        region: [], //按发生区域
        abnormalClassify: {   //按异常分类
            equipment: { //设备异常
                desc: [],  //异常描述
                category: [], //機器類別
                name: '',  // 设备名称
                equipmentNumber: '' // 设备编号
            },
            material: { //物料异常
                desc: [], //异常描述
                partNo: '', //零件料号
                rejectRatio: '', //不良率
                supplier: '', //供应商
                DC: '',
                LC: ''
            },
            person: { //人员异常
                desc: [] //异常描述
            },
            quality: { //品质异常
                process: [], //制程段
                badPhenomenon: [], //不良现象
                scope: [], //影响范围
                station: '', //发生站位
                measures: '' //当前措施
            },
            tools: { //治工具异常
                desc: [],   //异常描述
                skuno: '',  //涉及的产品料号
                station: '' //使用站位
            },
            system: { //系统异常
                category: [], //异常类别
                station: '' //使用站位
            }
        },
        causeAnalysis: {   //按原因分析
            parson: {   //人
                chargePerson: '', //责任人
                decision: '', //处理决定
                improve: ''   //改善方向
            },
            equipment: { //机
                chargePerson: '', //责任人
                name: '',  // 机器名称
                equipmentNumber: '', // 机器编号
                cause: '', //具体原因
                improve: '',   //改善方向
                anImprove: [],  //橫向展開改善  Y | N
                completionTime: '' //預計完成時間
            },
            material: {  //料
                chargePerson: '', // 負責人
                skuno: '', // 料號
                DC: '', // DC
                LC: '', // LC
                vendor: '', // 廠商
                result: '', // 處理結果
                improve: '', // 改善方向
                completionTime: '' // 預計完成時間
            },
            function: {  //法
                chargePerson: '', // 負責人
                result: '', // 改善結果
                anImprove: [],  // 橫向展開改善 Y | N
                completionTime: '' // 預計完成時間
            },
            annulus: {  //环
                chargePerson: '', // 負責人
                cause: '', // 具體原因
                result: '', // 處理結果
                improve: '',  // 改善方向
                completionTime: '' // 預計完成時間
            },
            detection: {  //量检测
                chargePerson: '', // 負責人
                content: '', // 測試內容
                result: '' // 測試結果
            }
        }
    }
}

let graph23SendData = { // 异常统计图组件
    globalSearch: {    // 全局条件搜索（当前制造处 分类标准）
        MFG: '', // 'ALL', //当前制造处
    },
    quickSearch: {     // 快速搜索（时间条件：年 季 月 周 时间段 -- 当前是否需要该条件， 当前选项卡位置，当前的值是多少）
        classify: '', //当前查询类别（5选1）
        year: '', // 当前年份
        season: '', // 当前季
        month: '', //当前月份
        week: '', //当前周
        time: [] //时间段
    }
}

let graph4SendData = { // 异常统计图组件
    globalSearch: {    // 全局条件搜索（当前制造处 分类标准）
        MFG: '', // 'ALL', //当前制造处
    },
    quickSearch: {     // 快速搜索（时间条件：年 季 月 周 时间段 -- 当前是否需要该条件， 当前选项卡位置，当前的值是多少）
        year: '', // 当前年份
    }
}

let graph5SendData = { // 异常统计图组件
    globalSearch: {    // 全局条件搜索（当前制造处 分类标准）
        MFG: '', // 'ALL', //当前制造处
    },
    quickSearch: {     // 快速搜索（时间条件：年 季 月 周 时间段 -- 当前是否需要该条件， 当前选项卡位置，当前的值是多少）
        classify: '', //当前查询类别(2选1)
        year: '', // 当前年份
        season: '', // 当前季
    }
}

let newAbnormalSendData = {  // 新增异常 状态
    // abnormalId: '',   //异常ID
    type: '', // 通知单类型  异常 | 停线
    emergencyDegree: '一般', // 紧急程度  一般 | 紧急
    baseMsg: { //基本信息
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
        sectionManager: '劉日紅(F1300825)', //课级
        minister: '洪永祥(F1300147)', //部级
        sectionChief: '劉日紅(F1300825)' //处级
    },
    problem: { //問題描述
        handler: [],  //異常處理人
        noticeTime: '2020/11/12 18:19', //異常通知時間
        emailTitle: '', // 郵件標題
        abnormalClassify: {   //按异常分类
            currentClassify: 'equipment',  //当前分类
            equipment: { //设备异常
                desc: '',  //异常描述
                category: '', //异常类别
                name: '',  // 设备名称
                equipmentNumber: '', // 设备编号
                equipmentModel: '' // 設備型號
            },
            material: { //物料异常
                desc: '', //异常描述
                partNo: '', //零件料号
                rejectRatio: '', //不良率
                supplier: '', //供应商
                DC: '',
                LC: ''
            },
            person: { //人员异常
                desc: '' //异常描述
            },
            quality: { //品质异常
                process: '', //制程段
                badPhenomenon: '', //不良现象
                station: '', //发生站位
                scope: '', //影响范围
                measures: '' //当前措施
            },
            tools: { //治工具异常
                desc: '',   //异常描述
                skuno: '',  //涉及的产品料号
                station: '' //使用站位
            },
            system: { //系统异常
                category: '', //异常类别
                desc: '', //異常描述
                startTime: '2020/11/13 09:20' //異常開始時間
            }
        }
    },
    countermeasures: { //临时对策
        lostWorkTime: '', //损失工时
        idleHuman: '', //闲置人力
        manpowerArrangement: '支援', //闲置人力安排
        lostOutput: '', //损失产出
        lostYield: '', //良率損失
        measures: '' //臨時解決措施
    },
    causeAnalysis: {  // 原因分析(只有填寫原因分析才能申請結案)
        chargePerson: [], // 負責人
        sectionManager: [], //負責人课级
        minister: [], //負責人部级
        sectionChief: [], //負責人处级
        notifier: [] // 異常知會人
    },
    remarksAndAttachments: {  // 備註與附件
        problemStatus: '等待处理', // 問題狀態
        remarks: '', // 備註
    }
};

let abnormalMaintenanceSaveDraftSendData = {  // 异常维护 请求保存草稿的发送数据模型
    id: '',   // 異常ID
    type: '', // 通知单类型  异常 | 停线
    emergencyDegree: '', // 紧急程度  正常 | 紧急
    baseMsg: { //基本信息
        issuer: '', // 發文人員
        units: '', // 發文單位
        date: '', // 發文日期
        abnormalTime: '', // 异常时间
        abnormalClass: '', // 异常班别
        BU: '', // 异常BU
        region: '', //异常区域
        station: '', //异常工站
        skuName: '', //机种名称
        skuno: '', //机种料号
        WO: '', //工單編號
        stage: '' // 产品阶段
    },
    report: { //上报机制
        sectionManager: '', //课级
        minister: '', //部级
        sectionChief: '' //处级
    },
    problem: { //問題描述
        handler: [],  //異常處理人
        noticeTime: '', //異常通知時間
        emailTitle: '', // 郵件標題
        abnormalClassify: {   //按异常分类
            currentClassify: '',  //当前分类
            equipment: { //设备异常
                desc: '',  //异常描述
                category: '', //异常类别
                name: '',  // 设备名称
                equipmentNumber: '', // 设备编号
                equipmentModel: '' // 設備型號
            },
            material: { //物料异常
                desc: '', //异常描述
                partNo: '', //零件料号
                rejectRatio: '', //不良率
                supplier: '', //供应商
                DC: '',
                LC: ''
            },
            person: { //人员异常
                desc: '' //异常描述
            },
            quality: { //品质异常
                process: '', //制程段
                badPhenomenon: '', //不良现象
                station: '', //发生站位
                scope: '', //影响范围
                measures: '' //当前措施
            },
            tools: { //治工具异常
                desc: '',   //异常描述
                skuno: '',  //涉及的产品料号
                station: '' //使用站位
            },
            system: { //系统异常
                category: '', //异常类别
                desc: '', //異常描述
                startTime: '' //異常開始時間
            }
        }
    },
    countermeasures: { //临时对策
        lostWorkTime: '', //损失工时
        idleHuman: '', //闲置人力
        manpowerArrangement: '', //闲置人力安排
        lostOutput: '', //损失产出
        lostYield: '', //良率損失
        measures: '' //臨時解決措施
    },
    causeAnalysis: {  // 原因分析(只有填寫原因分析才能申請結案)                
        parson: {
            chargePerson: [], // 負責人
            sectionManager: [], //負責人课级
            minister: [], //負責人部级
            sectionChief: [], //負責人处级
            notifier: [], // 異常知會人
        },
        //异常维护里面特有的***原因分析模块**********************************************************************************************
        cause: {
            allCause: [], // ['parson', 'equipment', 'material', 'function', 'annulus', 'detection'],  //涉及的所有原因
            currentClassify: '',  //当前分类
            parson: {   //人
                chargePerson: [], //责任人
                decision: '', //处理决定
                improve: ''   //改善方向
            },
            equipment: { //机
                chargePerson: [], //责任人
                name: '',  // 机器名称
                equipmentNumber: '', // 机器编号
                cause: '', //具体原因
                improve: '',   //改善方向
                anImprove: '',  //橫向展開改善  Y | N
                completionTime: '' //預計完成時間
            },
            material: {  //料
                chargePerson: [], // 負責人
                skuno: '', // 料號
                DC: '', // DC
                LC: '', // LC
                vendor: '', // 廠商
                result: '', // 處理結果
                improve: '', // 改善方向
                completionTime: '' // 預計完成時間
            },
            function: {  //法
                chargePerson: [], // 負責人
                result: '', // 改善結果
                anImprove: '',  // 橫向展開改善 Y | N
                completionTime: '' // 預計完成時間
            },
            annulus: {  //环
                chargePerson: [], // 負責人
                cause: '', // 具體原因
                result: '', // 處理結果
                improve: '',  // 改善方向
                completionTime: '' // 預計完成時間
            },
            detection: {  //量检测
                chargePerson: [], // 負責人
                content: '', // 測試內容
                result: '' // 測試結果
            }
        }
        
        // ***********************************************************************************************************************
    },
    remarksAndAttachments: {  // 備註與附件 （不需要发送附件）
        problemStatus: '', // 問題狀態   等待处理 | 处理中 | 申请结案
        remarks: '', // 備註
    }
};

let abnormalMaintenanceSubmitSendData = {  // 异常维护 状态
    id: '',   // 異常ID
    type: '', // 通知单类型  异常 | 停线
    emergencyDegree: '', // 紧急程度  正常 | 紧急
    baseMsg: { //基本信息
        issuer: '', // 發文人員
        units: '', // 發文單位
        date: '', // 發文日期
        abnormalTime: '', // 异常时间
        abnormalClass: '', // 异常班别
        BU: '', // 异常BU
        region: '', //异常区域
        station: '', //异常工站
        skuName: '', //机种名称
        skuno: '', //机种料号
        WO: '', //工單編號
        stage: '' // 产品阶段
    },
    report: { //上报机制
        sectionManager: '', //课级
        minister: '', //部级
        sectionChief: '' //处级
    },
    problem: { //問題描述
        handler: [],  //異常處理人
        noticeTime: '', //異常通知時間
        emailTitle: '', // 郵件標題
        abnormalClassify: {   //按异常分类
            currentClassify: '',  //当前分类
            equipment: { //设备异常
                desc: '',  //异常描述
                category: '', //异常类别
                name: '',  // 设备名称
                equipmentNumber: '', // 设备编号
                equipmentModel: '' // 設備型號
            },
            material: { //物料异常
                desc: '', //异常描述
                partNo: '', //零件料号
                rejectRatio: '', //不良率
                supplier: '', //供应商
                DC: '',
                LC: ''
            },
            person: { //人员异常
                desc: '' //异常描述
            },
            quality: { //品质异常
                process: '', //制程段
                badPhenomenon: '', //不良现象
                station: '', //发生站位
                scope: '', //影响范围
                measures: '' //当前措施
            },
            tools: { //治工具异常
                desc: '',   //异常描述
                skuno: '',  //涉及的产品料号
                station: '' //使用站位
            },
            system: { //系统异常
                category: '', //异常类别
                desc: '', //異常描述
                startTime: '' //異常開始時間
            }
        }
    },
    countermeasures: { //临时对策
        lostWorkTime: '', //损失工时
        idleHuman: '', //闲置人力
        manpowerArrangement: '', //闲置人力安排
        lostOutput: '', //损失产出
        lostYield: '', //良率損失
        measures: '' //臨時解決措施
    },
    causeAnalysis: {  // 原因分析(只有填寫原因分析才能申請結案)                
        parson: {
            chargePerson: [], // 負責人
            sectionManager: [], //負責人课级
            minister: [], //負責人部级
            sectionChief: [], //負責人处级
            notifier: [], // 異常知會人
        },
        //异常维护里面特有的***原因分析模块**********************************************************************************************
        cause: {
            allCause: [], // ['parson', 'equipment', 'material', 'function', 'annulus', 'detection'],  //涉及的所有原因
            currentClassify: '',  //当前分类
            parson: {   //人
                chargePerson: [], //责任人
                decision: '', //处理决定
                improve: ''   //改善方向
            },
            equipment: { //机
                chargePerson: [], //责任人
                name: '',  // 机器名称
                equipmentNumber: '', // 机器编号
                cause: '', //具体原因
                improve: '',   //改善方向
                anImprove: '',  //橫向展開改善  Y | N
                completionTime: '' //預計完成時間
            },
            material: {  //料
                chargePerson: [], // 負責人
                skuno: '', // 料號
                DC: '', // DC
                LC: '', // LC
                vendor: '', // 廠商
                result: '', // 處理結果
                improve: '', // 改善方向
                completionTime: '' // 預計完成時間
            },
            function: {  //法
                chargePerson: [], // 負責人
                result: '', // 改善結果
                anImprove: '',  // 橫向展開改善 Y | N
                completionTime: '' // 預計完成時間
            },
            annulus: {  //环
                chargePerson: [], // 負責人
                cause: '', // 具體原因
                result: '', // 處理結果
                improve: '',  // 改善方向
                completionTime: '' // 預計完成時間
            },
            detection: {  //量检测
                chargePerson: [], // 負責人
                content: '', // 測試內容
                result: '' // 測試結果
            }
        }
        
        // ***********************************************************************************************************************
    },
    remarksAndAttachments: {  // 備註與附件
        problemStatus: '', // 問題狀態   等待处理 | 处理中 | 申请结案
        remarks: '', // 備註
        // attachments: [] // 附件 这里不需要发送附件，附件后面手动单独合成
    }
};





let newAbnormal_empty = {  // 清空后的新增异常的状态
    // abnormalId: '',   //异常ID
    type: '异常', // 通知单类型  异常 | 停线
    emergencyDegree: '一般', // 紧急程度  一般 | 紧急
    baseMsg: { //基本信息
        // issuer: '', // 發文人員
        // units: '', // 發文單位
        // date: '2020/11/11 08:34', // 發文日期
        abnormalTime: '2020/11/11 08:34', // 异常时间
        abnormalClass: '', // 异常班别
        BU: '', // 异常BU
        region: '', //异常区域
        station: '', //异常工站
        skuName: '', //机种名称
        skuno: '', //机种料号
        WO: '', //工單編號
        stage: '' // 产品阶段
    },
    report: { //上报机制
        sectionManager: '', //课级
        minister: '', //部级
        sectionChief: '' //处级
    },
    problem: { //問題描述
        handler: [],  //異常處理人
        // noticeTime: '', //異常通知時間
        emailTitle: '', // 郵件標題
        abnormalClassify: {   //按异常分类
            currentClassify: 'equipment',  //当前分类
            equipment: { //设备异常
                desc: '',  //异常描述
                category: '', //异常类别
                name: '',  // 设备名称
                equipmentNumber: '', // 设备编号
                equipmentModel: '' // 設備型號
            },
            material: { //物料异常
                desc: '', //异常描述
                partNo: '', //零件料号
                rejectRatio: '', //不良率
                supplier: '', //供应商
                DC: '',
                LC: ''
            },
            person: { //人员异常
                desc: '' //异常描述
            },
            quality: { //品质异常
                process: '', //制程段
                badPhenomenon: '', //不良现象
                station: '', //发生站位
                scope: '', //影响范围
                measures: '' //当前措施
            },
            tools: { //治工具异常
                desc: '',   //异常描述
                skuno: '',  //涉及的产品料号
                station: '' //使用站位
            },
            system: { //系统异常
                category: '', //异常类别
                desc: '', //異常描述
                startTime: '2020/11/13 09:20' //異常開始時間
            }
        }
    },
    countermeasures: { //临时对策
        lostWorkTime: '', //损失工时
        idleHuman: '', //闲置人力
        manpowerArrangement: '', //闲置人力安排
        lostOutput: '', //损失产出
        lostYield: '', //良率損失
        measures: '' //臨時解決措施
    },
    causeAnalysis: {  // 原因分析(只有填寫原因分析才能申請結案)
        chargePerson: [], // 負責人
        sectionManager: [], //負責人课级
        minister: [], //負責人部级
        sectionChief: [], //負責人处级
        notifier: [] // 異常知會人
    },
    remarksAndAttachments: {  // 備註與附件
        problemStatus: '等待处理', // 問題狀態
        remarks: '', // 備註
        attachments: [] // 附件
    }
}

//清空后的異常維護的狀態
let AbnormalMaintenance_empty = {  // 异常维护 状态
    id: '',
    status: '等待处理',
    operationPermissions: 'Y',
    type: '异常', // 通知单类型  异常 | 停线
    emergencyDegree: '正常', // 紧急程度  正常 | 紧急
    baseMsg: { //基本信息
        issuer: '', // 發文人員
        units: '', // 發文單位
        date: '2020/11/11 08:34', // 發文日期
        abnormalTime: '2020/11/11 08:34', // 异常时间
        abnormalClass: '', // 异常班别
        BU: '', // 异常BU
        region: '', //异常区域
        station: '', //异常工站
        skuName: '', //机种名称
        skuno: '', //机种料号
        WO: '', //工單編號
        stage: '' // 产品阶段
    },
    report: { //上报机制
        sectionManager: '', //课级
        minister: '', //部级
        sectionChief: '' //处级
    },
    problem: { //問題描述
        handler: [],  //異常處理人
        noticeTime: '2020/11/12 18:19', //異常通知時間
        emailTitle: '', // 郵件標題
        abnormalClassify: {   //按异常分类
            currentClassify: 'equipment',  //当前分类
            equipment: { //设备异常
                desc: '',  //异常描述
                category: '', //异常类别
                name: '',  // 设备名称
                equipmentNumber: '', // 设备编号
                equipmentModel: '' // 設備型號
            },
            material: { //物料异常
                desc: '', //异常描述
                partNo: '', //零件料号
                rejectRatio: '', //不良率
                supplier: '', //供应商
                DC: '',
                LC: ''
            },
            person: { //人员异常
                desc: '' //异常描述
            },
            quality: { //品质异常
                process: '', //制程段
                badPhenomenon: '', //不良现象
                station: '', //发生站位
                scope: '', //影响范围
                measures: '' //当前措施
            },
            tools: { //治工具异常
                desc: '',   //异常描述
                skuno: '',  //涉及的产品料号
                station: '' //使用站位
            },
            system: { //系统异常
                category: '', //异常类别
                desc: '', //異常描述
                startTime: '2020/11/13 09:20' //異常開始時間
            }
        }
    },
    countermeasures: { //临时对策
        lostWorkTime: '', //损失工时
        idleHuman: '', //闲置人力
        manpowerArrangement: '', //闲置人力安排
        lostOutput: '', //损失产出
        lostYield: '', //良率損失
        measures: '' //臨時解決措施
    },
    causeAnalysis: {  // 原因分析(只有填寫原因分析才能申請結案)                
        parson: {
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
                chargePerson: [], //责任人
                decision: '', //处理决定
                improve: ''   //改善方向
            },
            equipment: { //机
                chargePerson: [], //责任人
                name: '',  // 机器名称
                equipmentNumber: '', // 机器编号
                cause: '', //具体原因
                improve: '',   //改善方向
                anImprove: '',  //橫向展開改善  Y | N
                completionTime: '2020/12/08 14:16' //預計完成時間
            },
            material: {  //料
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
                chargePerson: [], // 負責人
                result: '', // 改善結果
                anImprove: '',  // 橫向展開改善 Y | N
                completionTime: '2020/12/08 14:16' // 預計完成時間
            },
            annulus: {  //环
                chargePerson: [], // 負責人
                cause: '', // 具體原因
                result: '', // 處理結果
                improve: '',  // 改善方向
                completionTime: '2020/12/08 14:16' // 預計完成時間
            },
            detection: {  //量检测
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
        attachments: [] // 附件
    },
    issueTracking: [] //问题跟踪
};

let filterData = (origin, target) => {   // target代表一种数据模型， 从origin筛选(按照target数据模型筛选)数据（用于整合请求参数）还需要改进
    if (target === null) return null;
    if (Object.prototype.toString.call(target) != '[object Object]') return origin; // 不是字面量对象时，直接赋值过去即可，不影响Model,因为后续不会对数据操作
    for (let key in target) {
        if (target.hasOwnProperty(key)) {
            target[key] = filterData(origin[key], target[key]);
        }
    }
    return target;
}

let combineData = (origin, data) => {    // 合并数据，把data合并到origin里面,会改变origin，注意先深度克隆origin!(用于方便设置状态)
    if (Object.prototype.toString.call(origin) != '[object Object]') return data;
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            origin[key] = combineData(origin[key], data[key]);
        }
    }
    return origin;
}

export { 
    graph1SendData, graph23SendData, graph4SendData, graph5SendData, newAbnormalSendData, 
    abnormalMaintenanceSaveDraftSendData, abnormalMaintenanceSubmitSendData,
    newAbnormal_empty, AbnormalMaintenance_empty, filterData, combineData
};

