
import { getAllMfg, getBU, getGraph1, getGraph2, getGraph3, getGraph4, getGraph5, getTableData, toggerCollect, getNewAbnormalMsg, uploadFile, newAbnormal } from './service'
import { deepClone, retNewStateByProp } from '../../../utils/custom'
import { graph1SendData, graph23SendData, graph4SendData, graph5SendData, newAbnormalSendData, newAbnormal_empty, filterData, combineData } from './utils'
import { message } from 'antd'
import moment from 'moment'

let Model = {
    namespace: 'AbnormalDecision',
    state: {
        // 图（1 [1,2,3]，2，3，4，5，6）控件行状态　快速搜索　高级搜索　新增异常 表  
        anomalousGraph: { // 异常统计图组件
            activeKey: 'tab1', // 当前活动的tab页： tab1 | tab2 | tab3 | tab4 | tab5
            newAbnormalVisible: false,  // 新增异常对话框是否显示
            globalSearch: {    // 全局条件搜索（当前制造处 分类标准）
                allMFG: [], // ['ALL', 'MFGI', 'MFGII', 'MFGIII', 'MFGV'], //所有制造处
                allCategories: ['按發生區域', '按責任單位', '按責任人員', '按問題分類'], //所有查询类别
                MFG: '', // 'ALL', //当前制造处
                classify: '按發生區域', //当前查询类别
            },
            quickSearch: {     // 快速搜索（时间条件：年 季 月 周 时间段 -- 当前是否需要该条件， 当前选项卡位置，当前的值是多少）
                allYear: [],  //可选年份
                allCategories: ['year', 'season', 'month', 'week', 'time'], //所有查询类别
                classify: 'year', //当前查询类别
                year: '', // 当前年份
                season: '', // 当前季
                month: '', //当前月份
                week: '', //当前周
                time: [] //时间段
            },
            advancedSearch: {   // 高级搜索（选项卡 位置 控件值 ）
                allBU: [], // 所有BU
                BU: [], //按BU
                allRegion: ['Kitting', 'SMT', 'ICT', 'Packing', '5DX', '壓合', 'PTH', 'RE', 'MCEBU', '分板', 'BST', '其它'],  //所有发生区域
                region: [], //按发生区域
                abnormalClassify: {   //按异常分类
                    currentClassify: 'equipment',  //当前分类
                    equipment: { //设备异常
                        allDesc: ['設備檔機', '保養超時', '低效生產', '安全隱患', '功能缺失', '帶病運行'], //所有异常描述
                        allCategory: ['SMT設備', 'PTH設備', '測試設備', '流水線', 'SFC設備', '公務設備'], //所有機器類別
                        desc: [],  //异常描述
                        category: [], //機器類別
                        name: '',  // 设备名称
                        equipmentNumber: '' // 设备编号
                    },
                    material: { //物料异常
                        allDesc: ['來料短缺', '物料Delay', '錯料', '混料', '物料包裝異常', '特采過期', '包裝信息與實物不符', '有帳無務', '其它'],  //所有异常描述
                        desc: [], //异常描述
                        partNo: '', //零件料号
                        rejectRatio: '', //不良率
                        supplier: '', //供应商
                        DC: '',
                        LC: ''
                    },
                    person: { //人员异常
                        allDesc: ['人力不足', '新人技能不足', '外借人力技能不足', '其它'], //所有异常描述
                        desc: [] //异常描述
                    },
                    quality: { //品质异常
                        allProcess: ['SMT製程不良', 'PTH製程不良', '組裝製程不良', '測試製程不良', '維修製程不良', '壓合製程不良'], //所有制程段
                        allBadPhenomenon: ['批量損件', '燒機', '批量錯件', '批量少料', '批量反向', '不良率超標', '其它'], //所有不良现象
                        allScope: ['當前工站', '前置工站', '後續工站'], //所有影响范围
                        process: [], //制程段
                        badPhenomenon: [], //不良现象
                        scope: [], //影响范围
                        station: '', //发生站位
                        measures: '' //当前措施
                    },
                    tools: { //治工具异常
                        allDesc: ['治工具損壞', '治工具不足', '治工具功能不良', '治工具未點檢', '治工具要求不符', '其它'], //所有异常描述
                        desc: [],   //异常描述
                        skuno: '',  //涉及的产品料号
                        station: '' //使用站位
                    },
                    system: { //系统异常
                        allCategory: [
                            '測試系統異常', 'SFC系統異常', '氮氣供應系統異常', '電力系統異常', '壓縮空氣系統異常', '真空供氣系統異常', '冰水供應系統異常',
                            'ALL Parts系統異常', 'Beacon系統異常', 'Agile系統異常', 'Dom系統異常', 'SAP系統異常', '其它'
                        ], //所有异常类别
                        category: [], //异常类别
                        station: '' //使用站位
                    }
                },
                causeAnalysis: {   //按原因分析

                    currentClassify: 'parson',  //当前分类
                    // ['parson', 'equipment', 'material', 'function', 'annulus', 'detection']
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
            },
            newAbnormal: {  // 新增异常 状态
                // abnormalId: '',   //异常ID (可以不用了)
                type: '异常', // 通知单类型  异常 | 停线
                emergencyDegree: '一般', // 紧急程度  一般 | 紧急
                baseMsg: { //基本信息
                    allAbnormalClass: ['白班', '晚班'],
                    allBU: ['SRGBU', 'PCBU'],
                    allRegion: ['Kitting', 'SMT', 'ICT', 'Packing', '5DX', '壓合', 'PTH', 'RE', 'MCEBU', '分板', 'BST', '其它'],  //所有异常区域
                    allStage: ['量產', '試產', '外包'],
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
                    allSectionManager: ['劉日紅(F1300825)', '張任(F1304859)', '張強(F1303904)', '任杏(F1306746)', '梁俏麗(F1313632)', '李濤(F1302833)'],
                    allMinister: ['洪永祥(F1300147)', '段杰君(F1301264)'],
                    allSectionChief: ['劉慶公(100056)'],
                    sectionManager: '劉日紅(F1300825)', //课级
                    minister: '洪永祥(F1300147)', //部级
                    sectionChief: '劉日紅(F1300825)' //处级
                },
                problem: { //問題描述
                    allHandler: ['劉日紅(F1300825)', '張任(F1304859)', '張強(F1303904)', '任杏(F1306746)', '梁俏麗(F1313632)', '李濤(F1302833)'],
                    handler: [],  //異常處理人
                    noticeTime: '2020/11/12 18:19', //異常通知時間
                    emailTitle: '', // 郵件標題
                    abnormalClassify: {   //按异常分类
                        currentClassify: 'equipment',  //当前分类
                        equipment: { //设备异常
                            allDesc: ['設備檔機', '保養超時', '低效生產', '安全隱患', '功能缺失', '帶病運行', '其它'],
                            allCategory: ['SMT設備', 'PTH設備', '測試設備', '流水線', 'SFC設備', '公務設備', '其它'],
                            desc: '',  //异常描述
                            category: '', //异常类别
                            name: '',  // 设备名称
                            equipmentNumber: '', // 设备编号
                            equipmentModel: '' // 設備型號
                        },
                        material: { //物料异常
                            allDesc: ['來料短缺', '物料Delay', '錯料', '混料', '物料包裝異常', '特采過期', '包裝信息與實物不符', '有帳無務', '其它'],
                            desc: '', //异常描述
                            partNo: '', //零件料号
                            rejectRatio: '', //不良率
                            supplier: '', //供应商
                            DC: '',
                            LC: ''
                        },
                        person: { //人员异常
                            allDesc: ['人力不足', '新人技能不足', '外借人力技能不足', '其它'],
                            desc: '' //异常描述
                        },
                        quality: { //品质异常
                            allProcess: ['SMT製程不良', 'PTH製程不良', '組裝製程不良', '測試製程不良', '維修製程不良', '壓合製程不良'], //所有制程段
                            allBadPhenomenon: ['批量損件', '燒機', '批量錯件', '批量少料', '批量反向', '不良率超標', '其它'], //所有不良现象
                            allScope: ['當前工站', '前置工站', '後續工站'], //所有影响范围
                            process: '', //制程段
                            badPhenomenon: '', //不良现象
                            station: '', //发生站位
                            scope: '', //影响范围
                            measures: '' //当前措施
                        },
                        tools: { //治工具异常
                            allDesc: ['治工具損壞', '治工具不足', '治工具功能不良', '治工具未點檢', '治工具要求不符', '其它'], //所有异常描述
                            desc: '',   //异常描述
                            skuno: '',  //涉及的产品料号
                            station: '' //使用站位
                        },
                        system: { //系统异常
                            allCategory: [
                                '測試系統異常', 'SFC系統異常', '氮氣供應系統異常', '電力系統異常', '壓縮空氣系統異常', '真空供氣系統異常', '冰水供應系統異常',
                                'ALL Parts系統異常', 'Beacon系統異常', 'Agile系統異常', 'Dom系統異常', 'SAP系統異常', '其它'
                            ], //所有异常类别
                            category: '', //异常类别
                            desc: '', //異常描述
                            startTime: '2020/11/13 09:20' //異常開始時間
                        }
                    }
                },
                countermeasures: { //临时对策
                    allManpowerArrangement: ['教育訓練', '5S整理', '下早班', 'Sortting', '支援'],
                    lostWorkTime: '', //损失工时
                    idleHuman: '', //闲置人力
                    manpowerArrangement: '支援', //闲置人力安排
                    lostOutput: '', //损失产出
                    lostYield: '', //良率損失
                    measures: '' //臨時解決措施
                },
                causeAnalysis: {  // 原因分析(只有填寫原因分析才能申請結案)
                    allChargePerson: ['5DX:李貽剛 (F1304158)', '5DX:羅志濤(F1301571)', '5DX:馮海平(F1219611)', '5DX:區劍(F1331116)', '5DX:陳飛鵬(F1319614)'], // 所有負責人
                    allSectionManager: ['SMT:劉日紅(F1300825)', 'ME:柳界明(F1313143)', 'PE:梁俏麗(F1313632)', 'PD:張強(F1303904)'], //所有負責人课级
                    allMinister: ['ME:熊豐(F1300296)', 'RE:洪永祥(F1300147)', 'ME:段杰君(F1301264)'], //所有負責人部级
                    allSectionChief: ['PIE:劉慶公(100056)'], //所有負責人处级
                    allNotifier: [
                        '5DX:李貽剛 (esd-5dx-d10@mail.foxconn.com)', '5DX:羅志濤(zhi-tao.luo@mail.foxconn.com)', '5DX:馮海平(hardy.hp.feng@mail.foxconn.com)',
                        '5DX:區劍(oden.j.ou@mail.foxconn.com)', '5DX:陳飛鵬(nick.fp.chen@mail.foxconn.com)', 'APP:劉照亮(eason.zl.liu@mail.foxconn.com)'
                    ], // 所有異常知會人
                    chargePerson: [], // 負責人
                    sectionManager: [], //負責人课级
                    minister: [], //負責人部级
                    sectionChief: [], //負責人处级
                    notifier: [] // 異常知會人
                },
                remarksAndAttachments: {  // 備註與附件
                    problemStatus: '等待处理', // 問題狀態
                    remarks: '', // 備註
                    attachments: [],
                    // attachmentsName: [], //组件显示已选择的附件
                    // attachmentsFile: [], //文件内容（File对象）
                }
            },
            graphData: {
                graph1: { // 异常状态统计（饼）
                    left: {},
                    center: {},
                    right: {}
                    // left: {  // 所有异常
                    //     sum: 1075,
                    //     seriesData: [
                    //         { value: 335, name: '设备异常' },
                    //         { value: 310, name: '系统异常' },
                    //         ...
                    //     ]
                    // },
                    // center: { status: '', ...  },    // red(#f5222d) yellow(#ffec3d) green(#52c41a)
                    // right: { status: '', ... }
                },
                graph2: {  // 异常类别统计（条形）
                    xAxisData: [],
                    seriesData: []
                    // xAxisData: ['设备异常', '品质异常', '物料异常', '系统异常', '治工具异常', '人员异常'],
                    // seriesData: [334, 1090, 700, 460, 560, 780]
                },
                graph3: {  // 原因类别统计（条形）
                    xAxisData: [],
                    seriesData: []
                    // xAxisData: ['环', '机', '法', '料', '人', '量检测'],
                    // seriesData: [334, 1090, 700, 460, 560, 780]
                },
                graph4: {  // 异常工时统计（条形折线混合）
                    xAxisData: [],
                    seriesData1: [],
                    seriesData2: []
                    // xAxisData: ['Jan', 'Feb', 'Mar', 'Apr', 'Mav', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    // seriesData1: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                    // seriesData2: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
                },
                graph5: {  // 结案状态统计（条形折线混合）
                    xAxisData: [],
                    seriesData1: [],
                    seriesData2: [],
                    seriesData3: []
                    // xAxisData: ['WEEK01', 'WEEK02', 'WEEK03', 'WEEK04', 'WEEK05', 'WEEK06', 'WEEK07', 'WEEK08', 'WEEK09', 'WEEK10', 'WEEK11', 'WEEK12'],
                    // seriesData1: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                    // seriesData2: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                    // seriesData3: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
                }
            }
        },
        anomalousTable: {  // 异常列表
            all: [],   //所有表数据
            current: [],  //当前显示的表数据
            collectFlag: false, //是否显示已经收藏的数据
            like: "",  //模糊搜索条件
            modalVisible: false
        },
        // ---------------------------------------------------------------------------------------------------------------------------------------------
        
        abnormalMaintenance: {  // 异常维护 状态
            type: '异常', // 通知单类型  异常 | 停线
            emergencyDegree: '一般', // 紧急程度  一般 | 紧急
            baseMsg: { //基本信息
                allAbnormalClass: ['白班', '晚班'],
                allBU: ['SRGBU', 'PCBU'],
                allRegion: ['Kitting', 'SMT', 'ICT', 'Packing', '5DX', '壓合', 'PTH', 'RE', 'MCEBU', '分板', 'BST', '其它'],  //所有异常区域
                allStage: ['量產', '試產', '外包'],
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
                allSectionManager: ['劉日紅(F1300825)', '張任(F1304859)', '張強(F1303904)', '任杏(F1306746)', '梁俏麗(F1313632)', '李濤(F1302833)'],
                allMinister: ['洪永祥(F1300147)', '段杰君(F1301264)'],
                allSectionChief: ['劉慶公(100056)'],
                sectionManager: '劉日紅(F1300825)', //课级
                minister: '洪永祥(F1300147)', //部级
                sectionChief: '劉日紅(F1300825)' //处级
            },
            problem: { //問題描述
                allHandler: ['劉日紅(F1300825)', '張任(F1304859)', '張強(F1303904)', '任杏(F1306746)', '梁俏麗(F1313632)', '李濤(F1302833)'],
                handler: [],  //異常處理人
                noticeTime: '2020/11/12 18:19', //異常通知時間
                emailTitle: '', // 郵件標題
                abnormalClassify: {   //按异常分类
                    currentClassify: 'equipment',  //当前分类
                    equipment: { //设备异常
                        allDesc: ['設備檔機', '保養超時', '低效生產', '安全隱患', '功能缺失', '帶病運行', '其它'],
                        allCategory: ['SMT設備', 'PTH設備', '測試設備', '流水線', 'SFC設備', '公務設備', '其它'],
                        desc: '',  //异常描述
                        category: '', //异常类别
                        name: '',  // 设备名称
                        equipmentNumber: '', // 设备编号
                        equipmentModel: '' // 設備型號
                    },
                    material: { //物料异常
                        allDesc: ['來料短缺', '物料Delay', '錯料', '混料', '物料包裝異常', '特采過期', '包裝信息與實物不符', '有帳無務', '其它'],
                        desc: '', //异常描述
                        partNo: '', //零件料号
                        rejectRatio: '', //不良率
                        supplier: '', //供应商
                        DC: '',
                        LC: ''
                    },
                    person: { //人员异常
                        allDesc: ['人力不足', '新人技能不足', '外借人力技能不足', '其它'],
                        desc: '' //异常描述
                    },
                    quality: { //品质异常
                        allProcess: ['SMT製程不良', 'PTH製程不良', '組裝製程不良', '測試製程不良', '維修製程不良', '壓合製程不良'], //所有制程段
                        allBadPhenomenon: ['批量損件', '燒機', '批量錯件', '批量少料', '批量反向', '不良率超標', '其它'], //所有不良现象
                        allScope: ['當前工站', '前置工站', '後續工站'], //所有影响范围
                        process: '', //制程段
                        badPhenomenon: '', //不良现象
                        station: '', //发生站位
                        scope: '', //影响范围
                        measures: '' //当前措施
                    },
                    tools: { //治工具异常
                        allDesc: ['治工具損壞', '治工具不足', '治工具功能不良', '治工具未點檢', '治工具要求不符', '其它'], //所有异常描述
                        desc: '',   //异常描述
                        skuno: '',  //涉及的产品料号
                        station: '' //使用站位
                    },
                    system: { //系统异常
                        allCategory: [
                            '測試系統異常', 'SFC系統異常', '氮氣供應系統異常', '電力系統異常', '壓縮空氣系統異常', '真空供氣系統異常', '冰水供應系統異常',
                            'ALL Parts系統異常', 'Beacon系統異常', 'Agile系統異常', 'Dom系統異常', 'SAP系統異常', '其它'
                        ], //所有异常类别
                        category: '', //异常类别
                        desc: '', //異常描述
                        startTime: '2020/11/13 09:20' //異常開始時間
                    }
                }
            },
            countermeasures: { //临时对策
                allManpowerArrangement: ['教育訓練', '5S整理', '下早班', 'Sortting', '支援'],
                lostWorkTime: '', //损失工时
                idleHuman: '', //闲置人力
                manpowerArrangement: '支援', //闲置人力安排
                lostOutput: '', //损失产出
                lostYield: '', //良率損失
                measures: '' //臨時解決措施
            },
            causeAnalysis: {  // 原因分析(只有填寫原因分析才能申請結案)
                allChargePerson: ['5DX:李貽剛 (F1304158)', '5DX:羅志濤(F1301571)', '5DX:馮海平(F1219611)', '5DX:區劍(F1331116)', '5DX:陳飛鵬(F1319614)'], // 所有負責人
                allSectionManager: ['SMT:劉日紅(F1300825)', 'ME:柳界明(F1313143)', 'PE:梁俏麗(F1313632)', 'PD:張強(F1303904)'], //所有負責人课级
                allMinister: ['ME:熊豐(F1300296)', 'RE:洪永祥(F1300147)', 'ME:段杰君(F1301264)'], //所有負責人部级
                allSectionChief: ['PIE:劉慶公(100056)'], //所有負責人处级
                allNotifier: [
                    '5DX:李貽剛 (esd-5dx-d10@mail.foxconn.com)', '5DX:羅志濤(zhi-tao.luo@mail.foxconn.com)', '5DX:馮海平(hardy.hp.feng@mail.foxconn.com)',
                    '5DX:區劍(oden.j.ou@mail.foxconn.com)', '5DX:陳飛鵬(nick.fp.chen@mail.foxconn.com)', 'APP:劉照亮(eason.zl.liu@mail.foxconn.com)'
                ], // 所有異常知會人
                chargePerson: [], // 負責人
                sectionManager: [], //負責人课级
                minister: [], //負責人部级
                sectionChief: [], //負責人处级
                notifier: [], // 異常知會人
                

                //异常维护里面特有的***原因分析模块**********************************************************************************************
                cause: {
                    allCause: ['parson', 'equipment', 'material', 'function', 'annulus', 'detection'],  //涉及的所有原因
                    currentClassify: 'parson',  //当前分类
                    parson: {   //人
                        allChargePerson: ['劉日紅(F1300825)', '張任(F1304859)', '張強(F1303904)', '任杏(F1306746)', '梁俏麗(F1313632)', '李濤(F1302833)'], //所有责任人
                        chargePerson: [], //责任人
                        decision: '', //处理决定
                        improve: ''   //改善方向
                    },
                    equipment: { //机
                        allChargePerson: ['劉日紅(F1300825)', '張任(F1304859)', '張強(F1303904)', '任杏(F1306746)', '梁俏麗(F1313632)', '李濤(F1302833)'], //所有负责人
                        chargePerson: [], //责任人
                        name: '',  // 机器名称
                        equipmentNumber: '', // 机器编号
                        cause: '', //具体原因
                        improve: '',   //改善方向
                        anImprove: '',  //橫向展開改善  Y | N
                        completionTime: '2020/12/08 14:16' //預計完成時間
                    },
                    material: {  //料
                        allChargePerson: ['劉日紅(F1300825)', '張任(F1304859)', '張強(F1303904)', '任杏(F1306746)', '梁俏麗(F1313632)', '李濤(F1302833)'], //所有负责人
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
                        allChargePerson: ['劉日紅(F1300825)', '張任(F1304859)', '張強(F1303904)', '任杏(F1306746)', '梁俏麗(F1313632)', '李濤(F1302833)'],  //所有负责人
                        chargePerson: [], // 負責人
                        result: '', // 改善結果
                        anImprove: '',  // 橫向展開改善 Y | N
                        completionTime: '' // 預計完成時間
                    },
                    annulus: {  //环
                        allChargePerson: ['劉日紅(F1300825)', '張任(F1304859)', '張強(F1303904)', '任杏(F1306746)', '梁俏麗(F1313632)', '李濤(F1302833)'],  //所有负责人
                        chargePerson: [], // 負責人
                        cause: '', // 具體原因
                        result: '', // 處理結果
                        improve: '',  // 改善方向
                        completionTime: '' // 預計完成時間
                    },
                    detection: {  //量检测
                        allChargePerson: ['劉日紅(F1300825)', '張任(F1304859)', '張強(F1303904)', '任杏(F1306746)', '梁俏麗(F1313632)', '李濤(F1302833)'],  //所有负责人
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
            issueTracking: {   // //问题跟踪

            }
        },
    },
    reducers: {
        setActiveKey: (state, { activeKey }) => { // 设置当前活动的tab页：activeKey： tab1 | tab2 | tab3 | tab4 | tab5
            return { ...state, anomalousGraph: { ...state.anomalousGraph, activeKey } };
        },
        setNewAbnormalVisible: (state, { newAbnormalVisible }) => { // 设置新增异常对话框是否显示
            return { ...state, anomalousGraph: { ...state.anomalousGraph, newAbnormalVisible } };
        },
        setGlobalSearch: (state, { payload }) => { // 设置全局搜索条件
            return { ...state, anomalousGraph: { ...state.anomalousGraph, globalSearch: { ...state.anomalousGraph.globalSearch, ...payload } } };
        },
        setQuickSearch: (state, { payload }) => { // 设置快速搜索的条件
            return { ...state, anomalousGraph: { ...state.anomalousGraph, quickSearch: { ...state.anomalousGraph.quickSearch, ...payload } } };
        },

        setAdvancedSearchOfBuAndRegion: (state, { payload }) => { // 设置高级搜索中前两个tab内容（按BU 和 按发生区域查询）
            return { ...state, anomalousGraph: { ...state.anomalousGraph, advancedSearch: { ...state.anomalousGraph.advancedSearch, ...payload } } };
        },
        setAdvancedSearchOfAbnormalClassify: (state, { classify, payload }) => { // classify:当前异常分类 （设置高级搜索中第三个tab内容（按异常分类查询）） 
            let newState = deepClone(state);
            newState.anomalousGraph.advancedSearch.abnormalClassify[classify] = payload;
            return newState;
        },
        setAdvancedSearchOfCauseAnalysis: (state, { classify, payload }) => { // 设置高级搜索中第四个tab内容（按原因分析查询）
            let newState = deepClone(state);
            newState.anomalousGraph.advancedSearch.causeAnalysis[classify] = payload;
            return newState;
        },
        setGraphData: (state, { graphName, data }) => {   // 设置统计图数据 (graph1, graph2, graph3, graph4, graph5)
            let graphData = { ...state.anomalousGraph.graphData };
            graphData[graphName] = data;
            return {
                ...state,
                anomalousGraph: {
                    ...state.anomalousGraph,
                    graphData
                }
            }
        },
        setAnomalousTableData: (state, { payload }) => {  //设置异常列表数据
            return {
                ...state,
                anomalousTable: {
                    ...state.anomalousTable,
                    ...payload
                }
            }
        },
        //-----------------------------------------------------------------------------------------------------------------------------------------
        // 新增异常 维护异常 (尝试用新的方式改变状态，不用传统办法, 太麻烦) retNewState：fn, 用于返回新的状态，返回的状态直接作为改变后的状态来更新状态，重要！*****
        setNewAbnormalByFn: (state, { retNewState }) => { //设置新增异常的状态
            let newAbnormal = deepClone(state.anomalousGraph.newAbnormal);
            newAbnormal = retNewState(newAbnormal);
            return {
                ...state, anomalousGraph: {...state.anomalousGraph, newAbnormal}
            };
        },
        setNewAbnormalByProp: (state, { prop, value }) => {  //设置新增异常的状态, 更簡單好用（適合修改超級複雜（多層級）的狀態）
            let newAbnormal = deepClone(state.anomalousGraph.newAbnormal);
            newAbnormal = retNewStateByProp(newAbnormal, prop, value); 
            return {
                ...state, anomalousGraph: {...state.anomalousGraph, newAbnormal}
            };
        },
        // 异常维护（修改）
        setAbnormalMaintenanceByFn: (state, {retNewState}) => {  //设置异常维护的状态, 用回调函数改变状态
            let abnormalMaintenance = deepClone(state.abnormalMaintenance);
            abnormalMaintenance = retNewState(abnormalMaintenance);
            return { ...state, abnormalMaintenance }
        },
        setAbnormalMaintenanceByProp: (state, {prop, value}) => {  //设置异常维护的状态，用prop字符串
            let abnormalMaintenance = deepClone(state.abnormalMaintenance);
            abnormalMaintenance = retNewStateByProp(abnormalMaintenance, prop, value);
            return { ...state, abnormalMaintenance}
        }
    },
    effects: {
        *getAllMfg(_, { call, put, select }) {
            let { Status, Message, Data } = yield call(getAllMfg);
            // console.log(Status, Message, Data);
            if (Status == 'Pass') {
                yield put({
                    type: 'setGlobalSearch',
                    payload: { allMFG: Data.Mfg, MFG: Data.Mfg[0] }
                })
            } else {
                message.error(Message);
            }
        },

        *getBU({ MFG }, { call, put }) {
            let { Status, Message, Data } = yield call(getBU, MFG);
            if (Status == 'Pass') {
                yield put({
                    type: 'setAdvancedSearchOfBuAndRegion',
                    payload: { allBU: Data.BU, BU: [] } //得到新的BU 之前的BU要置空
                })
            } else {
                message.error(Message);
            }
        },

        *initQuickSearch(_, { call, put, select }) {  //初始化快速搜索条件
            let currentDate = moment();
            let year = currentDate.year(), month = currentDate.month() + 1, week = currentDate.week(), time, allYear = [], season;
            for (var i = 2017; i <= year; i++) allYear.push(i);
            season = month <= 3 ? '第一季度' : month <= 6 ? '第二季度' : month <= 9 ? '第三季度' : '第四季度';
            time = [currentDate.subtract(1, 'days').format('YYYY-MM-DD'), currentDate.add(1, 'days').format('YYYY-MM-DD')];
            // console.log(allYear, year, season, month, week, time);
            yield put({
                type: 'setQuickSearch',
                payload: {
                    allYear, year, season, month, week, time
                }
            })
        },

        // getGraph1: [
        //     function* renderGraph1(_, { call, put, select }) {
        //         let anomalousGraph = yield select(state => state.AbnormalDecision.anomalousGraph);
        //         let sendData = filterData(anomalousGraph, graph1SendData);
        //         // select...
        //         let { Status, Message, Data } = yield call(getGraph1, sendData);
        //         if (Status == 'Pass') {
        //             yield put({
        //                 type: 'setGraphData',
        //                 graphName: 'graph1',
        //                 data: Data
        //             });
        //         } else {
        //             message.error(Message);
        //         }
        //     },
        //     { type: 'throttle', ms: 1500 }
        // ],

        *getGraph1(_, { call, put, select }) {
            let anomalousGraph = yield select(state => state.AbnormalDecision.anomalousGraph);
            let sendData = filterData(anomalousGraph, graph1SendData);
            // select...
            let { Status, Message, Data } = yield call(getGraph1, sendData);
            if (Status == 'Pass') {
                yield put({
                    type: 'setGraphData',
                    graphName: 'graph1',
                    data: Data
                });
                message.success('getGraph1' + Message);
            } else {
                message.error(Message);
            }
        },
        *getGraph2(_, { call, put, select }) {
            let anomalousGraph = yield select(state => state.AbnormalDecision.anomalousGraph);
            let sendData = filterData(anomalousGraph, graph23SendData);
            // select...
            let { Status, Message, Data } = yield call(getGraph2, sendData);
            // console.log(Status, Message, Data);
            if (Status == 'Pass') {
                yield put({
                    type: 'setGraphData',
                    graphName: 'graph2',
                    data: Data
                });
                message.success('getGraph2' + Message);
            } else {
                message.error(Message);
            }
        },
        *getGraph3(_, { call, put, select }) {
            let anomalousGraph = yield select(state => state.AbnormalDecision.anomalousGraph);
            let sendData = filterData(anomalousGraph, graph23SendData);
            // select...
            let { Status, Message, Data } = yield call(getGraph3, sendData);
            if (Status == 'Pass') {
                yield put({
                    type: 'setGraphData',
                    graphName: 'graph3',
                    data: Data
                });
                message.success('getGraph3' + Message);
            } else {
                message.error(Message);
            }
        },
        *getGraph4(_, { call, put, select }) {
            let anomalousGraph = yield select(state => state.AbnormalDecision.anomalousGraph);
            let sendData = filterData(anomalousGraph, graph4SendData);
            // select...
            let { Status, Message, Data } = yield call(getGraph4, sendData);
            if (Status == 'Pass') {
                yield put({
                    type: 'setGraphData',
                    graphName: 'graph4',
                    data: Data
                });
                message.success('getGraph4' + Message);
            } else {
                message.error(Message);
            }
        },
        *getGraph5(_, { call, put, select }) {
            let anomalousGraph = yield select(state => state.AbnormalDecision.anomalousGraph);
            let sendData = filterData(anomalousGraph, graph5SendData);
            // select...
            let { Status, Message, Data } = yield call(getGraph5, sendData);
            if (Status == 'Pass') {
                yield put({
                    type: 'setGraphData',
                    graphName: 'graph5',
                    data: Data
                });
                message.success('getGraph5' + Message);
            } else {
                message.error(Message);
            }
        },


        // =========================================================================================================================

        *getTableData({ graphLink }, { call, put, select }) {

            // yield select(...)  整合發送數據，適應所有情況（①切換tab時 ②改變收藏狀態時 ③統計圖點擊時） 重点********
            let anomalousGraph = yield select(state => state.AbnormalDecision.anomalousGraph);
            let { activeKey } = anomalousGraph;
            let sendData;
            switch (activeKey) {
                case 'tab1':
                    sendData = filterData(anomalousGraph, graph1SendData);
                    sendData = { ...sendData, graphLink: { ...graphLink, tab: '異常狀態統計' } }
                    break;
                case 'tab2':
                    sendData = filterData(anomalousGraph, graph23SendData);
                    sendData = { ...sendData, graphLink: { ...graphLink, tab: '異常類別統計' } }
                    break;
                case 'tab3':
                    sendData = filterData(anomalousGraph, graph23SendData);
                    sendData = { ...sendData, graphLink: { ...graphLink, tab: '原因類別統計' } }
                    break;
                case 'tab4':
                    sendData = filterData(anomalousGraph, graph4SendData);
                    sendData = { ...sendData, graphLink: { ...graphLink, tab: '異常工時統計' } }
                    break;
                case 'tab5':
                    sendData = filterData(anomalousGraph, graph5SendData);
                    sendData = { ...sendData, graphLink: { ...graphLink, tab: '結案狀態統計' } }
                    break;
            }

            let { Status, Message, Data } = yield call(getTableData, sendData);  //請求表數據
            if (Status == 'Pass') {
                // let d = Data.map((row, i) => ({...row, key: 'row' + i}));
                let d = Data.map((row) => ({ ...row, key: row.id }));     // 加上key
                yield put({    // 設置 all
                    type: 'setAnomalousTableData',
                    payload: { all: d } // { all: d, current: d}
                });
                yield put({    // 设置筛选后的 current
                    type: 'filterTable'
                })
                message.success('getTableData' + Message);
            } else {
                message.error(Message);
            }
        },

        filterTable: [
            function* (_, { select, put }) {
                let { all, like, collectFlag } = yield select(state => state.AbnormalDecision.anomalousTable);
                let d = [];
                if (like != '') {
                    d = collectFlag ? all.filter(row => row.collect) : all;
                    d = d.filter(row => {
                        let flag = false;
                        for (var prop in row) {
                            if (typeof row[prop] == 'string' && row[prop].includes(like)) {  // 符合条件的筛出，同时退出当前循环，提高性能
                                flag = true;
                                break;
                            }
                        }
                        return flag;
                    });
                } else {
                    d = collectFlag ? all.filter(row => row.collect) : all;
                }
                yield put({
                    type: 'setAnomalousTableData',
                    payload: { current: deepClone(d) }
                })
            },
            { type: 'throttle', ms: 800 }
        ],

        *toggerCollect({ id }, { select, put, call }) {
            let { Status, Message } = yield call(toggerCollect, id);
            if (Status == 'Pass') {
                // message.success(Message);
                yield put({
                    type: 'getTableData'
                })
            } else {
                message.error(Mesage)
            }
        },
        *getNewAbnormalMsg(_, {select, call, put}) {    //获取新增异常需要的附带信息
            // select...
            // let newAbnormal = yield select(state => state.AbnormalDecision.anomalousGraph.newAbnormal);
            let {Status, Message, Data} = yield call(getNewAbnormalMsg);   //后台需要的数据未定
            if(Status == 'Pass'){
                yield put({
                    type: 'setNewAbnormalByFn',
                    retNewState: state => combineData(state, Data)
                });
                message.success(Message);
            }
        },

        // *uploadFile({ file }, {select, put, call}) {   // 上传文件操作--不好用
        //     let {abnormalId, remarksAndAttachments: {attachments}} = yield select(state => state.AbnormalDecision.anomalousGraph.newAbnormal);
        //     let formData = new FormData();
        //     formData.append('file', file);
        //     formData.append('abnormalId', abnormalId);
        //     let {Status, Message} = yield call(uploadFile, formData);
        //     if(Status == 'Pass'){
        //         // console.log(attachments, file, formData);
        //         yield put({
        //             type: 'setNewAbnormalByFn',
        //             retNewState: state => {
        //                 state.remarksAndAttachments.attachments.forEach(f => {
        //                     if(f.uid == file.uid){
        //                         f.status = 'done'
        //                     }
        //                 })
        //                 return state;
        //             }
        //         })
        //         message.success(Message);
        //     }
        // },
        *newAbnormal(_, {select, put, call}) {    //新增异常操作
            // select ....
            let newAbnormalState = yield select(state => state.AbnormalDecision.anomalousGraph.newAbnormal);
            // let sendData = filterData(newAbnormalState, newAbnormalSendData);
            // // 加上文件
            // sendData.remarksAndAttachments.attachments = newAbnormalState.remarksAndAttachments.attachments.map(file => {
            //     let formData = new FormData();
            //     formData.append('file', file);
            //     return formData;
            // });
            let data = filterData(newAbnormalState, newAbnormalSendData);
            let sendData = new FormData();
            newAbnormalState.remarksAndAttachments.attachments.forEach(file => {
                sendData.append(file.name, file);
            });
            sendData.append('data', JSON.stringify(data));

            let {Status, Message, Data} = yield call(newAbnormal, sendData);
            if(Status == 'Pass'){
                yield put({   //关掉对话框
                    type: 'setNewAbnormalVisible',
                    newAbnormalVisible: false
                });
                yield put({   //清除新增异常信息
                    type: 'clearNewAbnormalData'
                })
                yield put({   //重新获取异常列表
                    type: 'getTableData'
                });
                message.success(Message);
            }
        },
        *clearNewAbnormalData(_, {select, put, call}) {   //清空新增异常的状态(关闭弹出框时; 提交数据后;)
            yield put({
                type: 'setNewAbnormalByFn',
                retNewState: state => combineData(state, newAbnormal_empty)
            })
        }
    }
}

export default Model;
