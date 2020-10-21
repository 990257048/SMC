
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { connect, FormattedMessage, formatMessage } from 'umi';
import { Button, Space, Input, Tabs, Popover, Row, Col, Divider, Select, Radio, Checkbox, DatePicker, Tooltip, message } from 'antd';
import { SearchOutlined, PlusOutlined, ProfileOutlined, BarsOutlined, SaveOutlined, CheckOutlined, ZoomInOutlined } from '@ant-design/icons'
import moment from 'moment';

import styles from '../style.less';

const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

let AdvancedSearch = props => {  // 高级搜索
    return <div className={styles['advanced-search']}>
        <Tabs size="small" type='line' defaultActiveKey="1" className={styles['tabs-query']} >
            <TabPane tab="按BU" key="1">
                <Tab1 />
            </TabPane>
            <TabPane tab="按发生区域" key="2">
                <Tab2 />
            </TabPane>
            <TabPane tab="按异常分类" key="3">
                <Tab3 />
            </TabPane>
            <TabPane tab="按原因分析" key="4">
                <Tab4 />
            </TabPane>
        </Tabs>
        {/* <Row gutter={[16, 12]}>
            <Col span={24}>
                <div className={styles['col-con']}>
                    <Button type="primary" icon={<SearchOutlined />}>查询</Button>
                </div>
            </Col>
        </Row> */}
    </div>
}



let Tab1 = props => {
    let { dispatch, allBU, BU } = props;
    let BUChange = useCallback((BU) => {
        dispatch({
            type: 'AbnormalDecision/setAdvancedSearchOfBuAndRegion',
            payload: { BU }
        });
    }, []);
    return <div className={styles['tab-query']}>
        <Row gutter={[0, 24]} justify="center" style={{ marginTop: '20px' }}>
            <Col span={24}>
                <Row>
                    {/* <Col span={4} style={{ textAlign: 'center' }}>按BU:</Col> */}
                    <Col span={24}>
                        <Checkbox.Group value={BU} onChange={BUChange} >
                            {
                                allBU.map((BU, i) => {
                                    if (i == 0) {
                                        return <Checkbox key={BU} value={BU} style={{ marginLeft: '8px' }}>{BU}</Checkbox>
                                    }
                                    return <Checkbox key={BU} value={BU}>{BU}</Checkbox>
                                })
                            }
                        </Checkbox.Group>
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>
}

Tab1 = connect(({ AbnormalDecision }) => {
    return {
        allBU: AbnormalDecision.anomalousGraph.advancedSearch.allBU,
        BU: AbnormalDecision.anomalousGraph.advancedSearch.BU
    }
})(Tab1);

let Tab2 = props => {
    let { dispatch, allRegion, region } = props;
    let regionChange = useCallback((region) => {
        dispatch({
            type: 'AbnormalDecision/setAdvancedSearchOfBuAndRegion',
            payload: { region }
        });
    }, []);

    return <div className={styles['tab-query']}>
        <Row gutter={[0, 24]} justify="center" style={{ marginTop: '20px' }}>
            <Col span={24}>
                <Row>
                    {/* <Col span={4} style={{ textAlign: 'center' }}>按发生区域:</Col> */}
                    <Col span={24}>
                        <Checkbox.Group value={region} onChange={regionChange} >
                            {
                                allRegion.map((region, i) => {
                                    if (i == 0) {
                                        return <Checkbox key={region} value={region} style={{ marginLeft: '8px' }}>{region}</Checkbox>
                                    }
                                    return <Checkbox key={region} value={region}>{region}</Checkbox>
                                })
                            }
                        </Checkbox.Group>
                        {/* 'Kitting', 'SMT', 'ICT', 'Packing', '5DX', '壓合', 'PTH', 'RE', 'MCEBU', '分板', 'BST', '其它' */}
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>
}

Tab2 = connect(({ AbnormalDecision }) => {
    return {
        allRegion: AbnormalDecision.anomalousGraph.advancedSearch.allRegion,
        region: AbnormalDecision.anomalousGraph.advancedSearch.region
    }
})(Tab2);



//=======================================================================================================================================================



let Tab3 = props => {
    let { dispatch, currentClassify } = props;
    let tabChange = useCallback((classify) => {   //切換選項卡
        dispatch({
            type: 'AbnormalDecision/setAdvancedSearchOfAbnormalClassify',
            classify: 'currentClassify',
            payload: classify
        });
    }, []);
    return <div className={styles['tab-query']}>
        <Row gutter={[0, 16]} justify="center">
            <Col span={24}>
                <Row>
                    {/* <Col span={3} style={{ textAlign: 'right', paddingRight: '15px' }}>按异常分类:</Col> */}
                    <Col span={24}>
                        {/* 設備異常 物料異常 人員異常 品質異常 治工具異常 系統異常     */}
                        <Tabs size="small" type='card' activeKey={currentClassify} onChange={tabChange} style={{ width: '100%', border: '1px solid #ddd' }} >
                            <TabPane tab="設備異常" key="equipment">
                                <AbnormalClassifyOfEquipment />
                            </TabPane>
                            <TabPane tab="物料異常" key="material">
                                {/* 異常描述: 來料短缺 物料Delay 錯料 混料 物料包裝異常 特采過期 包裝信息與實物不符 有帳無務 其它 */}
                                <AbnormalClassifyOfMaterial />
                            </TabPane>
                            <TabPane tab="人員異常" key="person">
                                {/* 異常描述: 人力不足 新人技能不足 外借人力技能不足 其它 */}
                                <AbnormalClassifyOfPerson />
                            </TabPane>
                            <TabPane tab="品質異常" key="quality">
                                <AbnormalClassifyOfQuality />
                            </TabPane>
                            <TabPane tab="治工具異常" key="tools">
                                <AbnormalClassifyOfTools />
                            </TabPane>
                            <TabPane tab="系統異常" key="system">
                                <AbnormalClassifyOfSystem />
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>
}

Tab3 = connect(({ AbnormalDecision }) => {
    return {
        currentClassify: AbnormalDecision.anomalousGraph.advancedSearch.abnormalClassify.currentClassify
    }
})(Tab3);

let AbnormalClassifyOfEquipment = props => {  //設備異常
    let { dispatch, equipment } = props;
    let { allDesc, allCategory, desc, category, name, equipmentNumber } = equipment;

    let [nativeState, setNativeState] = useState({ desc, category, name, equipmentNumber });

    let setEquipment = useCallback((payload) => {  //设备异常（通过该方法修改状态）
        dispatch({
            type: 'AbnormalDecision/setAdvancedSearchOfAbnormalClassify',
            classify: 'equipment',
            payload: {
                ...equipment,
                ...payload
            }
        });
    }, [equipment]);

    // let descChange = useCallback((desc) => {  // 设备异常描述
    //     setNativeState({ ...nativeState, desc });
    // }, []);
    // let categoryChange = useCallback((category) => { //异常機器的類別
    //     setNativeState({ ...nativeState, category });
    // }, []);

    let descChange = (desc) => {  // 设备异常描述
        setNativeState({ ...nativeState, desc });
    }

    let categoryChange = (category) => { //异常機器的類別
        setNativeState({ ...nativeState, category });
    }

    let nameChange = (event) => {    //設備名稱
        setNativeState({ ...nativeState, name: event.target.value });
    }

    let equipmentNumberChange = (event) => {  // 設備編號
        setNativeState({ ...nativeState, equipmentNumber: event.target.value });
    }

    let confirmHandle = useCallback(() => {
        setEquipment(nativeState);
        message.success('OK');
    }, [nativeState]);

    return <div style={{ width: '100%' }}>
        <Row gutter={[0, 12]} justify="center">
            <Col span={24}>
                <Row>
                    <Col span={4} style={{ textAlign: 'center' }}>異常描述</Col>
                    <Col span={20}>
                        {/* 設備檔機 保養超時 低效生產 安全隱患 功能缺失 帶病運行 */}
                        <Checkbox.Group value={nativeState.desc} onChange={descChange} >
                            {
                                allDesc.map((desc, i) => {
                                    if (i == 0) {
                                        return <Checkbox key={desc} value={desc} style={{ marginLeft: '8px' }}>{desc}</Checkbox>
                                    }
                                    return <Checkbox key={desc} value={desc}>{desc}</Checkbox>
                                })
                            }
                        </Checkbox.Group>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={24}>
                <Row>
                    <Col span={4} style={{ textAlign: 'center' }}>機器類別</Col>
                    <Col span={20}>
                        {/* 機器類別:  SMT設備 PTH設備 測試設備 流水線   SFC設備 公務設備 */}
                        <Checkbox.Group value={nativeState.category} onChange={categoryChange} >
                            {
                                allCategory.map((category, i) => {
                                    if (i == 0) {
                                        return <Checkbox key={category} value={category} style={{ marginLeft: '8px' }}>{category}</Checkbox>
                                    }
                                    return <Checkbox key={category} value={category}>{category}</Checkbox>
                                })
                            }
                        </Checkbox.Group>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>設備名稱</Col>
                    <Col span={15}><Input size="small" value={nativeState.name} onChange={nameChange} /></Col>
                </Row>
            </Col>
            <Col span={12}></Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>設備編號</Col>
                    <Col span={15}><Input size="small" value={nativeState.equipmentNumber} onChange={equipmentNumberChange} /></Col>
                </Row>
            </Col>
            <Col span={12}></Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12} style={{ textAlign: 'center' }}>
                <Button type="primary" size="small" icon={<CheckOutlined />} onClick={confirmHandle}>确定</Button>
            </Col>
        </Row>
    </div>
}

AbnormalClassifyOfEquipment = connect(({ AbnormalDecision }) => {
    return {
        equipment: AbnormalDecision.anomalousGraph.advancedSearch.abnormalClassify.equipment
    }
})(AbnormalClassifyOfEquipment);

let AbnormalClassifyOfMaterial = props => {  //物料異常
    let { dispatch, material } = props;
    let { allDesc, desc, partNo, rejectRatio, supplier, DC, LC } = material;

    let [nativeState, setNativeState] = useState({ desc, partNo, rejectRatio, supplier, DC, LC });

    let setMaterial = useCallback((payload) => {
        dispatch({
            type: 'AbnormalDecision/setAdvancedSearchOfAbnormalClassify',
            classify: 'material',
            payload: {
                ...material,
                ...payload
            }
        });
    }, [material]);

    let descChange = (desc) => {
        setNativeState({ ...nativeState, desc });
    }

    let partNoChange = (e) => {
        setNativeState({ ...nativeState, partNo: e.target.value });
    }

    let rejectRatioChange = (e) => {
        setNativeState({ ...nativeState, rejectRatio: e.target.value });
    }

    let supplierChange = (e) => {
        setNativeState({ ...nativeState, supplier: e.target.value });
    }

    let DCChange = (e) => {
        setNativeState({ ...nativeState, DC: e.target.value });
    }

    let LCChange = (e) => {
        setNativeState({ ...nativeState, LC: e.target.value });
    }

    let confirmHandle = useCallback(() => {
        setMaterial(nativeState);
        message.success('OK');
    }, [nativeState]);

    return <div style={{ width: '100%' }}>
        <Row gutter={[0, 12]} justify="center">
            <Col span={24}>
                <Row>
                    <Col span={4} style={{ textAlign: 'center' }}>異常描述</Col>
                    <Col span={20}>
                        <Checkbox.Group value={nativeState.desc} onChange={descChange} >
                            {
                                allDesc.map((desc, i) => {
                                    if (i == 0) {
                                        return <Checkbox key={desc} value={desc} style={{ marginLeft: '8px' }}>{desc}</Checkbox>
                                    }
                                    return <Checkbox key={desc} value={desc}>{desc}</Checkbox>
                                })
                            }
                        </Checkbox.Group>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>零件料號</Col>
                    <Col span={15}><Input size="small" value={nativeState.partNo} onChange={partNoChange} /></Col>
                </Row>
            </Col>
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>不良率</Col>
                    <Col span={15}><Input size="small" value={nativeState.rejectRatio} onChange={rejectRatioChange} /></Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>供應商</Col>
                    <Col span={15}><Input size="small" value={nativeState.supplier} onChange={supplierChange} /></Col>
                </Row>
            </Col>
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>DC</Col>
                    <Col span={15}><Input size="small" value={nativeState.DC} onChange={DCChange} /></Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>LC</Col>
                    <Col span={15}><Input size="small" value={nativeState.LC} onChange={LCChange} /></Col>
                </Row>
            </Col>
            <Col span={12}></Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12} style={{ textAlign: 'center' }}>
                <Button type="primary" size="small" icon={<CheckOutlined />} onClick={confirmHandle}>确定</Button>
            </Col>
        </Row>
    </div>
}

AbnormalClassifyOfMaterial = connect(({ AbnormalDecision }) => {
    return {
        material: AbnormalDecision.anomalousGraph.advancedSearch.abnormalClassify.material
    }
})(AbnormalClassifyOfMaterial);


let AbnormalClassifyOfPerson = props => {  //人員異常

    let { dispatch, person } = props;
    let { allDesc, desc } = person;
    let [nativeState, setNativeState] = useState({ desc });

    let setPerson = useCallback((payload) => {
        dispatch({
            type: 'AbnormalDecision/setAdvancedSearchOfAbnormalClassify',
            classify: 'person',
            payload: {
                ...person,
                ...payload
            }
        });
    }, [person]);

    let descChange = (desc) => {
        setNativeState({ ...nativeState, desc });
    }

    let confirmHandle = useCallback(() => {
        setPerson(nativeState);
        message.success('OK');
    }, [nativeState]);

    return <div style={{ width: '100%' }}>
        <Row gutter={[0, 12]} justify="center">
            <Col span={24}>
                <Row>
                    <Col span={4} style={{ textAlign: 'center' }}>異常描述</Col>
                    <Col span={20}>
                        <Checkbox.Group value={nativeState.desc} onChange={descChange} >
                            {
                                allDesc.map((desc, i) => {
                                    if (i == 0) {
                                        return <Checkbox key={desc} value={desc} style={{ marginLeft: '8px' }}>{desc}</Checkbox>
                                    }
                                    return <Checkbox key={desc} value={desc}>{desc}</Checkbox>
                                })
                            }
                        </Checkbox.Group>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12} style={{ textAlign: 'center' }}>
                <Button type="primary" size="small" icon={<CheckOutlined />} onClick={confirmHandle}>确定</Button>
            </Col>
        </Row>
    </div>
}

AbnormalClassifyOfPerson = connect(({ AbnormalDecision }) => {
    return {
        person: AbnormalDecision.anomalousGraph.advancedSearch.abnormalClassify.person
    }
})(AbnormalClassifyOfPerson);



let AbnormalClassifyOfQuality = props => {  //品質異常
    let { dispatch, quality } = props;
    let { allProcess, allBadPhenomenon, allScope, process, badPhenomenon, scope, station, measures } = quality;
    let [nativeState, setNativeState] = useState({ process, badPhenomenon, scope, station, measures });

    let setQuality = useCallback((payload) => {
        dispatch({
            type: 'AbnormalDecision/setAdvancedSearchOfAbnormalClassify',
            classify: 'quality',
            payload: {
                ...quality,
                ...payload
            }
        });
    }, [quality]);

    let processChange = (process) => {
        setNativeState({ ...nativeState, process });
    }

    let badPhenomenonChange = (badPhenomenon) => {
        setNativeState({ ...nativeState, badPhenomenon });
    }

    let scopeChange = (scope) => {
        setNativeState({ ...nativeState, scope });
    }

    let stationChange = (e) => {
        setNativeState({ ...nativeState, station: e.target.value });
    }

    let measuresChange = (e) => {
        setNativeState({ ...nativeState, measures: e.target.value });
    }

    let confirmHandle = useCallback(() => {
        setQuality(nativeState);
        message.success('OK');
    }, [nativeState]);

    return <div style={{ width: '100%' }}>
        <Row gutter={[0, 12]} justify="center">
            {/* 製程段:  SMT製程不良 PTH製程不良 組裝製程不良 測試製程不良 維修製程不良 壓合製程不良  */}
            <Col span={24}>
                <Row>
                    <Col span={4} style={{ textAlign: 'center' }}>製程段</Col>
                    <Col span={20}>
                        <Checkbox.Group value={nativeState.process} onChange={processChange} >
                            {
                                allProcess.map((process, i) => {
                                    if (i == 0) {
                                        return <Checkbox key={process} value={process} style={{ marginLeft: '8px' }}>{process}</Checkbox>
                                    }
                                    return <Checkbox key={process} value={process}>{process}</Checkbox>
                                })
                            }
                        </Checkbox.Group>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            {/* 不良現象: 批量損件  燒機  批量錯件 批量少料  批量反向 不良率超標  其它 */}
            <Col span={24}>
                <Row>
                    <Col span={4} style={{ textAlign: 'center' }}>不良現象</Col>
                    <Col span={20}>
                        <Checkbox.Group value={nativeState.badPhenomenon} onChange={badPhenomenonChange} >
                            {
                                allBadPhenomenon.map((badPhenomenon, i) => {
                                    if (i == 0) {
                                        return <Checkbox key={badPhenomenon} value={badPhenomenon} style={{ marginLeft: '8px' }}>{badPhenomenon}</Checkbox>
                                    }
                                    return <Checkbox key={badPhenomenon} value={badPhenomenon}>{badPhenomenon}</Checkbox>
                                })
                            }
                        </Checkbox.Group>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            {/* 影響範圍: 當前工站 前置工站  後續工站 =*/}
            <Col span={24}>
                <Row>
                    <Col span={4} style={{ textAlign: 'center' }}>影響範圍</Col>
                    <Col span={20}>
                        <Checkbox.Group value={nativeState.scope} onChange={scopeChange} >
                            {
                                allScope.map((scope, i) => {
                                    if (i == 0) {
                                        return <Checkbox key={scope} value={scope} style={{ marginLeft: '8px' }}>{scope}</Checkbox>
                                    }
                                    return <Checkbox key={scope} value={scope}>{scope}</Checkbox>
                                })
                            }
                        </Checkbox.Group>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>發生站位</Col>
                    <Col span={15}><Input size="small" value={nativeState.station} onChange={stationChange} /></Col>
                </Row>
            </Col>
            <Col span={12}></Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>當前措施</Col>
                    <Col span={15}><Input size="small" value={nativeState.measures} onChange={measuresChange} /></Col>
                </Row>
            </Col>
            <Col span={12}></Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12} style={{ textAlign: 'center' }}>
                <Button type="primary" size="small" icon={<CheckOutlined />} onClick={confirmHandle}>确定</Button>
            </Col>
        </Row>
    </div>
}

AbnormalClassifyOfQuality = connect(({ AbnormalDecision }) => {
    return {
        quality: AbnormalDecision.anomalousGraph.advancedSearch.abnormalClassify.quality
    }
})(AbnormalClassifyOfQuality);


let AbnormalClassifyOfTools = props => {  //治工具異常
    let { dispatch, tools } = props;
    let { allDesc, desc, skuno, station } = tools;
    let [nativeState, setNativeState] = useState({ desc, skuno, station });

    let setTools = useCallback((payload) => {
        dispatch({
            type: 'AbnormalDecision/setAdvancedSearchOfAbnormalClassify',
            classify: 'tools',
            payload: {
                ...tools,
                ...payload
            }
        });
    }, [tools]);

    let descChange = (desc) => {
        setNativeState({ ...nativeState, desc });
    }

    let skunoChange = (e) => {
        setNativeState({ ...nativeState, skuno: e.target.value });
    }

    let stationChange = (e) => {
        setNativeState({ ...nativeState, station: e.target.value });
    }

    let confirmHandle = useCallback(() => {
        setTools(nativeState);
        message.success('OK');
    }, [nativeState]);

    return <div style={{ width: '100%' }}>
        <Row gutter={[0, 12]} justify="center">
            {/* 異常描述: 治工具損壞 治工具不足 治工具功能不良 治工具未點檢 治工具要求不符 其它 */}
            <Col span={24}>
                <Row>
                    <Col span={4} style={{ textAlign: 'center' }}>異常描述</Col>
                    <Col span={20}>
                        <Checkbox.Group value={nativeState.desc} onChange={descChange} >
                            {
                                allDesc.map((desc, i) => {
                                    if (i == 0) {
                                        return <Checkbox key={desc} value={desc} style={{ marginLeft: '8px' }}>{desc}</Checkbox>
                                    }
                                    return <Checkbox key={desc} value={desc}>{desc}</Checkbox>
                                })
                            }
                        </Checkbox.Group>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>涉及的產品料號</Col>
                    <Col span={15}><Input size="small" value={nativeState.skuno} onChange={skunoChange} /></Col>
                </Row>
            </Col>
            <Col span={12}></Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>使用站位</Col>
                    <Col span={15}><Input size="small" value={nativeState.station} onChange={stationChange} /></Col>
                </Row>
            </Col>
            <Col span={12}></Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12} style={{ textAlign: 'center' }}>
                <Button type="primary" size="small" icon={<CheckOutlined />} onClick={confirmHandle}>确定</Button>
            </Col>
        </Row>
    </div>
}

AbnormalClassifyOfTools = connect(({ AbnormalDecision }) => {
    return {
        tools: AbnormalDecision.anomalousGraph.advancedSearch.abnormalClassify.tools
    }
})(AbnormalClassifyOfTools);



let AbnormalClassifyOfSystem = props => {  //系統異常
    let { dispatch, system } = props;
    let { allCategory, category, station } = system;

    let [nativeState, setNativeState] = useState({ category, station });

    let setSystem = useCallback((payload) => {
        dispatch({
            type: 'AbnormalDecision/setAdvancedSearchOfAbnormalClassify',
            classify: 'system',
            payload: {
                ...system,
                ...payload
            }
        });
    }, [system]);

    let categoryChange = (category) => {
        setNativeState({ ...nativeState, category });
    }

    let stationChange = (e) => {
        setNativeState({ ...nativeState, station: e.target.value });
    }

    let confirmHandle = useCallback(() => {
        setSystem(nativeState);
        message.success('OK');
    }, [nativeState]);

    return <div style={{ width: '100%' }}>
        {/* 異常類別: 測試系統異常 SFC系統異常 氮氣供應系統異常 電力系統異常 壓縮空氣系統異常 真空供氣系統異常 冰水供應系統異常
        ALL Parts系統異常 Beacon系統異常 Agile系統異常 Dom系統異常 SAP系統異常 其它 */}
        <Row gutter={[0, 12]} justify="center">
            <Col span={24}>
                <Row>
                    <Col span={4} style={{ textAlign: 'center' }}>異常類別</Col>
                    <Col span={20}>
                        <Checkbox.Group value={nativeState.category} onChange={categoryChange} >
                            {
                                allCategory.map((category, i) => {
                                    if (i == 0) {
                                        return <Checkbox key={category} value={category} style={{ marginLeft: '8px' }}>{category}</Checkbox>
                                    }
                                    return <Checkbox key={category} value={category}>{category}</Checkbox>
                                })
                            }
                        </Checkbox.Group>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>使用站位</Col>
                    <Col span={15}><Input size="small" value={nativeState.station} onChange={stationChange} /></Col>
                </Row>
            </Col>
            <Col span={12}></Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12} style={{ textAlign: 'center' }}>
                <Button type="primary" size="small" icon={<CheckOutlined />} onClick={confirmHandle}>确定</Button>
            </Col>
        </Row>
    </div>
}

AbnormalClassifyOfSystem = connect(({ AbnormalDecision }) => {
    return {
        system: AbnormalDecision.anomalousGraph.advancedSearch.abnormalClassify.system
    }
})(AbnormalClassifyOfSystem);



//========================================================================================================================================================



let Tab4 = props => {
    let {dispatch, currentClassify} = props;

    let tabChange = useCallback((classify) => {
        dispatch({
            type: 'AbnormalDecision/setAdvancedSearchOfCauseAnalysis',
            classify: 'currentClassify',
            payload: classify
        });
    }, []);

    return <div className={styles['tab-query']}>
        <Row gutter={[0, 16]} justify="center">
            <Col span={24}>
                <Row>
                    <Col span={24}>
                        {/* ====================================================================================================================================== */}
                        {/* 人 機 料 法 環 量檢測     */}
                        <Tabs size="small" type='card' activeKey={ currentClassify } onChange={ tabChange } style={{ width: '100%', border: '1px solid #ddd' }} >
                            <TabPane tab="人" key="parson">
                                <CauseAnalysisOfParson />
                            </TabPane>
                            <TabPane tab="机" key="equipment">
                                <CauseAnalysisOfEquipment />
                            </TabPane>
                            <TabPane tab="料" key="material">
                                <CauseAnalysisOfMaterial />
                            </TabPane>
                            <TabPane tab="法" key="function">
                                <CauseAnalysisOfFunction />
                            </TabPane>
                            <TabPane tab="环" key="annulus">
                                <CauseAnalysisOfAnnulus />
                            </TabPane>
                            <TabPane tab="量检测" key="detection">
                                <CauseAnalysisOfDetection />
                            </TabPane>
                        </Tabs>
                        {/* ====================================================================================================================================== */}
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>
}

Tab4 = connect(({AbnormalDecision}) => {
    return {
        currentClassify: AbnormalDecision.anomalousGraph.advancedSearch.causeAnalysis.currentClassify
    }
})(Tab4);

let CauseAnalysisOfParson = props => {
    let {dispatch, parson} = props;
    //                     chargePerson: '', //责任人
    //                     decision: '', //处理决定
    //                     improve: ''   //改善方向
    let {chargePerson, decision, improve} = parson;
    let [nativeState, setNativeState ] = useState({ chargePerson, decision, improve });

    let setParson = useCallback((payload) => {
        dispatch({
            type: 'AbnormalDecision/setAdvancedSearchOfCauseAnalysis',
            classify: 'parson',
            payload: {
                ...parson,
                ...payload
            }
        })
    }, [parson]);

    let chargePersonChange = (e) => {
        setNativeState({ ...nativeState, chargePerson: e.target.value });
    }

    let decisionChange = (e) => {
        setNativeState({ ...nativeState, decision: e.target.value });
    }

    let improveChange = (e) => {
        setNativeState({ ...nativeState, improve: e.target.value });
    }

    let confirmHandle = useCallback(() => {
        setParson(nativeState);
        message.success('OK');
    }, [nativeState]);

    return <div style={{ width: '100%' }}>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>責任人</Col>
                    <Col span={15}><Input size="small" value={ nativeState.chargePerson } onChange={ chargePersonChange } /></Col>
                </Row>
            </Col>
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>處理決定</Col>
                    <Col span={15}><Input size="small" value={ nativeState.decision } onChange={ decisionChange } /></Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>改善方向</Col>
                    <Col span={15}><Input size="small" value={ nativeState.improve } onChange={ improveChange } /></Col>
                </Row>
            </Col>
            <Col span={12}></Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12} style={{ textAlign: 'center' }}>
                <Button type="primary" size="small" icon={<CheckOutlined />} onClick={ confirmHandle }>确定</Button>
            </Col>
        </Row>
    </div>
}

CauseAnalysisOfParson = connect(({AbnormalDecision}) => {
    return {
        parson: AbnormalDecision.anomalousGraph.advancedSearch.causeAnalysis.parson
    }
})(CauseAnalysisOfParson);


let CauseAnalysisOfEquipment = props => {
    let {dispatch, equipment} = props;
    // chargePerson: '', //责任人
    //                     name: '',  // 机器名称
    //                     equipmentNumber: '', // 机器编号
    //                     cause: '', //具体原因
    //                     improve: '',   //改善方向
    //                     anImprove: [],  //橫向展開改善  Y | N
    //                     completionTime: '' //預計完成時間
    let {chargePerson, name, equipmentNumber, cause, improve, anImprove, completionTime} = equipment;
    let [nativeState, setNativeState ] = useState({ chargePerson, name, equipmentNumber, cause, improve, anImprove, completionTime });
    let setEquipment = useCallback((payload) => {
        dispatch({
            type: 'AbnormalDecision/setAdvancedSearchOfCauseAnalysis',
            classify: 'equipment',
            payload: {
                ...equipment,
                ...payload
            }
        })
    }, [equipment]);

    let chargePersonChange = (e) => {
        setNativeState({ ...nativeState, chargePerson: e.target.value })
    }

    let nameChange = (e) => {
        setNativeState({ ...nativeState, name: e.target.value })
    }

    let equipmentNumberChange = (e) => {
        setNativeState({ ...nativeState, equipmentNumber: e.target.value })
    }

    let causeChange = (e) => {
        setNativeState({ ...nativeState, cause: e.target.value })
    }

    let improveChange = (e) => {
        setNativeState({ ...nativeState, improve: e.target.value })
    }

    let anImproveChange = (anImprove) => {
        setNativeState({ ...nativeState, anImprove})
    }

    let completionTimeChange = (e) => {
        setNativeState({ ...nativeState, completionTime: e.target.value })
    }

    let confirmHandle = useCallback(() => {
        setEquipment(nativeState);
        message.success('OK');
    }, [nativeState]);

    return <div style={{ width: '100%' }}>
        {/* 負責人 機器名稱 機器編號 具體原因 改善方向 橫向展開改善  預計完成時間 */}
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>負責人</Col>
                    <Col span={15}><Input size="small" value={ nativeState.chargePerson } onChange={ chargePersonChange } /></Col>
                </Row>
            </Col>
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>機器名稱</Col>
                    <Col span={15}><Input size="small" value={ nativeState.name } onChange={ nameChange } /></Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>機器編號</Col>
                    <Col span={15}><Input size="small" value={ nativeState.equipmentNumber } onChange={ equipmentNumberChange } /></Col>
                </Row>
            </Col>
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>具體原因</Col>
                    <Col span={15}><Input size="small" value={ nativeState.cause } onChange={ causeChange } /></Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>改善方向</Col>
                    <Col span={15}><Input size="small" value={ nativeState.improve } onChange={ improveChange } /></Col>
                </Row>
            </Col>
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>橫向展開改善</Col>
                    <Col span={15}>
                        <Checkbox.Group value={ nativeState.anImprove } onChange={ anImproveChange } >
                            <Checkbox value="Y">是</Checkbox>
                            <Checkbox value="N">否</Checkbox>
                        </Checkbox.Group>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>預計完成時間</Col>
                    <Col span={15}><Input size="small" value={ nativeState.completionTime } onChange={ completionTimeChange } /></Col>
                </Row>
            </Col>
            <Col span={12}></Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12} style={{ textAlign: 'center' }}>
                <Button type="primary" size="small" icon={<CheckOutlined />} onClick={ confirmHandle }>确定</Button>
            </Col>
        </Row>
    </div>
}

CauseAnalysisOfEquipment = connect(({AbnormalDecision}) => {
    return {
        equipment: AbnormalDecision.anomalousGraph.advancedSearch.causeAnalysis.equipment
    }
})(CauseAnalysisOfEquipment);


let CauseAnalysisOfMaterial = props => {
    // chargePerson: '', // 負責人
    // skuno: '', // 料號
    // DC: '', // DC
    // LC: '', // LC
    // vendor: '', // 廠商
    // result: '', // 處理結果
    // improve: '', // 改善方向
    // completionTime: '' // 預計完成時間
    let {dispatch, material} = props;
    let {chargePerson, skuno, DC, LC, vendor, result, improve, completionTime} = material;
    let [nativeState, setNativeState ] = useState({chargePerson, skuno, DC, LC, vendor, result, improve, completionTime});

    let setMaterial = useCallback((payload) => {
        dispatch({
            type: 'AbnormalDecision/setAdvancedSearchOfCauseAnalysis',
            classify: 'material',
            payload: {
                ...material,
                ...payload
            }
        })
    }, [material]);

    let inputValueChange = useCallback((e, key) => {
        setNativeState({...nativeState, [key]: e.target.value });
    }, [nativeState]);

    let confirmHandle = useCallback(() => {
        setMaterial(nativeState);
        message.success('OK');
    }, [nativeState]);

    return <div style={{ width: '100%' }}>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>負責人</Col>
                    <Col span={15}><Input size="small" value={ nativeState.chargePerson } onChange={ e => { inputValueChange(e, 'chargePerson') } } /></Col>
                </Row>
            </Col>
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>料號</Col>
                    <Col span={15}><Input size="small" value={ nativeState.skuno } onChange={ e => { inputValueChange(e, 'skuno') } } /></Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>DC</Col>
                    <Col span={15}><Input size="small" value={ nativeState.DC } onChange={ e => { inputValueChange(e, 'DC') } } /></Col>
                </Row>
            </Col>
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>LC</Col>
                    <Col span={15}><Input size="small" value={ nativeState.LC } onChange={ e => { inputValueChange(e, 'LC') } } /></Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>廠商</Col>
                    <Col span={15}><Input size="small" value={ nativeState.vendor } onChange={ e => { inputValueChange(e, 'vendor') } } /></Col>
                </Row>
            </Col>
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>處理結果</Col>
                    <Col span={15}><Input size="small" value={ nativeState.result } onChange={ e => { inputValueChange(e, 'result') } } /></Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>改善方向</Col>
                    <Col span={15}><Input size="small" value={ nativeState.improve } onChange={ e => { inputValueChange(e, 'improve') } } /></Col>
                </Row>
            </Col>
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>預計完成時間</Col>
                    <Col span={15}><Input size="small" value={ nativeState.completionTime } onChange={ e => { inputValueChange(e, 'completionTime') } } /></Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12} style={{ textAlign: 'center' }}>
                <Button type="primary" size="small" icon={<CheckOutlined />} onClick={ confirmHandle }>确定</Button>
            </Col>
        </Row>
    </div>
}

CauseAnalysisOfMaterial = connect(({AbnormalDecision}) => {
    return {
        material: AbnormalDecision.anomalousGraph.advancedSearch.causeAnalysis.material
    }
})(CauseAnalysisOfMaterial);


let CauseAnalysisOfFunction = props => {
    // chargePerson: '', // 負責人
    //                     result: '', // 改善結果
    //                     anImprove: [],  // 橫向展開改善 Y | N
    //                     completionTime: '' // 預計完成時間
    let {dispatch, func} = props;
    let {chargePerson, result, anImprove, completionTime} = func;

    let [nativeState, setNativeState ] = useState({chargePerson, result, anImprove, completionTime});

    let setFunction = useCallback((payload) => {
        dispatch({
            type: 'AbnormalDecision/setAdvancedSearchOfCauseAnalysis',
            classify: 'function',
            payload: {
                ...func,
                ...payload
            }
        })
    }, [func]);

    let inputValueChange = useCallback((e, key) => {
        setNativeState({...nativeState, [key]: e.target.value });
    }, [nativeState]);

    let checkboxValueChange = useCallback((val, key) => {
        setNativeState({...nativeState, [key]:val })
    }, [nativeState]);

    let confirmHandle = useCallback(() => {
        setFunction(nativeState);
        message.success('OK');
    }, [nativeState]);


    return <div style={{ width: '100%' }}>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>負責人</Col>
                    <Col span={15}><Input size="small" value={ nativeState.chargePerson } onChange={ e => { inputValueChange(e, 'chargePerson') } } /></Col>
                </Row>
            </Col>
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>改善結果</Col>
                    <Col span={14}><Input size="small" value={ nativeState.result } onChange={ e => { inputValueChange(e, 'result') } } /></Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>橫向展開改善</Col>
                    <Col span={15}>
                        <Checkbox.Group value={ nativeState.anImprove } onChange={ v => { checkboxValueChange(v, 'anImprove') } }>
                            <Checkbox value="Y">是</Checkbox>
                            <Checkbox value="N">否</Checkbox>
                        </Checkbox.Group>
                    </Col>
                </Row>
            </Col>
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>預計完成時間</Col>
                    <Col span={14}><Input size="small" value={ nativeState.completionTime } onChange={ e => { inputValueChange(e, 'completionTime') } } /></Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12} style={{ textAlign: 'center' }}>
                <Button type="primary" size="small" icon={<CheckOutlined />} onClick={ confirmHandle }>确定</Button>
            </Col>
        </Row>
    </div>
}

CauseAnalysisOfFunction = connect(({ AbnormalDecision }) => {
    return {
        func: AbnormalDecision.anomalousGraph.advancedSearch.causeAnalysis.function
    }
})(CauseAnalysisOfFunction);


let CauseAnalysisOfAnnulus = props => {
    // chargePerson: '', // 負責人
    //                     cause: '', // 具體原因
    //                     result: '', // 處理結果
    //                     improve: '',  // 改善方向
    //                     completionTime: '' // 預計完成時間
    let {dispatch, annulus} = props;
    let {chargePerson, cause, result, improve, completionTime} = annulus;

    let [nativeState, setNativeState ] = useState({chargePerson, cause, result, improve, completionTime});

    let setAnnulus = useCallback((payload) => {
        dispatch({
            type: 'AbnormalDecision/setAdvancedSearchOfCauseAnalysis',
            classify: 'annulus',
            payload: {
                ...annulus,
                ...payload
            }
        })
    }, [annulus]);

    let inputValueChange = useCallback((e, key) => {
        setNativeState({...nativeState, [key]: e.target.value });
    }, [nativeState]);

    let confirmHandle = useCallback(() => {
        setAnnulus(nativeState);
        message.success('OK');
    }, [nativeState]);

    return <div style={{ width: '100%' }}>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>負責人</Col>
                    <Col span={15}><Input size="small" value={ nativeState.chargePerson } onChange={ e => { inputValueChange(e, 'chargePerson') } } /></Col>
                </Row>
            </Col>
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>具體原因</Col>
                    <Col span={15}><Input size="small" value={ nativeState.cause } onChange={ e => { inputValueChange(e, 'cause') } } /></Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>處理結果</Col>
                    <Col span={15}><Input size="small" value={ nativeState.result } onChange={ e => { inputValueChange(e, 'result') } } /></Col>
                </Row>
            </Col>
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>改善方向</Col>
                    <Col span={15}><Input size="small" value={ nativeState.improve } onChange={ e => { inputValueChange(e, 'improve') } } /></Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>預計完成時間</Col>
                    <Col span={15}><Input size="small" value={ nativeState.completionTime } onChange={ e => { inputValueChange(e, 'completionTime') } } /></Col>
                </Row>
            </Col>
            <Col span={12}></Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12} style={{ textAlign: 'center' }}>
                <Button type="primary" size="small" icon={<CheckOutlined />} onClick={ confirmHandle }>确定</Button>
            </Col>
        </Row>
    </div>
}

CauseAnalysisOfAnnulus = connect(({ AbnormalDecision }) => {
    return {
        annulus: AbnormalDecision.anomalousGraph.advancedSearch.causeAnalysis.annulus
    }
})(CauseAnalysisOfAnnulus);


let CauseAnalysisOfDetection = props => {
    let {dispatch, detection} = props;
    let {chargePerson, content, result} = detection;

    let [nativeState, setNativeState ] = useState({chargePerson, content, result});

    let setDetection = useCallback((payload) => {
        dispatch({
            type: 'AbnormalDecision/setAdvancedSearchOfCauseAnalysis',
            classify: 'detection',
            payload: {
                ...detection,
                ...payload
            }
        })
    }, [detection]);

    let inputValueChange = useCallback((e, key) => {
        setNativeState({...nativeState, [key]: e.target.value });
    }, [nativeState]);

    let confirmHandle = useCallback(() => {
        setDetection(nativeState);
        message.success('OK');
    }, [nativeState]);

    return <div style={{ width: '100%' }}>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>負責人</Col>
                    <Col span={15}><Input size="small" value={ nativeState.chargePerson } onChange={ e => { inputValueChange(e, 'chargePerson') } } /></Col>
                </Row>
            </Col>
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>測試內容</Col>
                    <Col span={15}><Input size="small" value={ nativeState.content } onChange={ e => { inputValueChange(e, 'content') } } /></Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>測試結果</Col>
                    <Col span={15}><Input size="small" value={ nativeState.result } onChange={ e => { inputValueChange(e, 'result') } } /></Col>
                </Row>
            </Col>
            <Col span={12}></Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12} style={{ textAlign: 'center' }}>
                <Button type="primary" size="small" icon={<CheckOutlined />} onClick={ confirmHandle }>确定</Button>
            </Col>
        </Row>
    </div>
}

CauseAnalysisOfDetection = connect(({AbnormalDecision}) => {
    return {
        detection: AbnormalDecision.anomalousGraph.advancedSearch.causeAnalysis.detection
    }
})(CauseAnalysisOfDetection);


export default AdvancedSearch;
