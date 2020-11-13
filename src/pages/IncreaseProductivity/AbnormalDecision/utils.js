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

let filterData = (origin, target) => {   // 从Model筛选数据（用于整合请求参数）还需要改进
    if(target === null) return null;
    if(Object.prototype.toString.call(target) != '[object Object]') return origin; // 不是字面量对象时，直接赋值过去即可，不影响Model,因为后续不会对数据操作
    for(let key in target){
        if(target.hasOwnProperty(key)){
            target[key] = filterData(origin[key], target[key]);
        }
    }
    return target;
}

export { graph1SendData, graph23SendData, graph4SendData, graph5SendData, filterData };
