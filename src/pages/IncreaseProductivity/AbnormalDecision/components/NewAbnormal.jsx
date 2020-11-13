
import React, { memo, createContext, useState, useEffect, useMemo, useCallback, useContext } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { useDispatch, useSelector } from 'dva';
import { connect, FormattedMessage, formatMessage } from 'umi';
import { Button, Space, Input, Tabs, Steps, Popover, Row, Col, Divider, Select, Radio, DatePicker, InputNumber, Tooltip } from 'antd';
import { SearchOutlined, PlusOutlined, ProfileOutlined, BarsOutlined, ZoomInOutlined, OrderedListOutlined, SaveOutlined, BorderBottomOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import moment from 'moment';
import { findValueByProp } from '../../../../utils/custom'
import styles from '../style.less';

const { TabPane } = Tabs;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Step } = Steps

let NewAbnormalContext = createContext();

let NewAbnormal = () => {  // 新增异常
    console.log('render NewAbnormal');
    let dispatch = useDispatch();
    let [current, setCurrent] = useState(0);
    let setpChange = useCallback((step) => {
        setCurrent(step);
    }, []);
    let prevStep = useCallback(() => {  // 上一步(共享)
        setCurrent(current - 1);
    }, [current]);

    let nextStep = useCallback(() => {  // 下一步(共享)
        setCurrent(current + 1);
    }, [current]);

    let setNewAbnormal = useCallback((prop, value) => {  //設置本模塊數據
        dispatch({
            type: 'AbnormalDecision/setNewAbnormalByProp',
            prop, value
        });
    }, []);

    let retSetNewAbnormalByPlaneObj = (stateProp, eProp) => e => {   //平面Obj
        setNewAbnormal(stateProp, findValueByProp(e, eProp));
    }

    let retSetNewAbnormalByMoment = prop => moment => {
        setNewAbnormal(prop, moment.format('YYYY/MM/DD hh:mm'));
    }

    // 基本信息 上報機制 問題描述 臨時對策 原因分析 備註與附件

    return <div className={styles['modal-wrap']}>
        {/* direction="vertical" */}
        <div className={styles['new-abnormal-steps']}>
            {/* <div style={{ padding: '0 0 15px 15px' }}>
                <h4><b><OrderedListOutlined />  新增异常</b> </h4>
            </div> */}
            <p></p>
            <Steps size='small' current={current} direction="vertical" onChange={setpChange}>
                <Step title="基本信息"></Step>
                <Step title="上報機制"></Step>
                <Step title="問題描述"></Step>
                <Step title="臨時對策"></Step>
                <Step title="原因分析"></Step>
                <Step title="備註與附件"></Step>
            </Steps>
        </div>
        <div className={styles['new-abnormal-steps-right']}>
            <NewAbnormalContext.Provider value={{ current, setCurrent, prevStep, nextStep, retSetNewAbnormalByPlaneObj, retSetNewAbnormalByMoment }}>
                <StepContent current={current} />
            </NewAbnormalContext.Provider>
        </div>
    </div>
}

export default NewAbnormal;


//====================================================================================================================================

let StepContent = ({ current }) => {
    switch (current) {
        case 0:
            return <Step1 />
        case 1:
            return <Step2 />
        case 2:
            return <Step3 />
        case 3:
            return <Step4 />
        case 4:
            return <Step5 />
        case 5:
            return <Step6 />
        default:
            return <Step1 />
    }
}

// ==================================================================================================================================

let Step1 = props => {
    let { nextStep, retSetNewAbnormalByPlaneObj, retSetNewAbnormalByMoment } = useContext(NewAbnormalContext);
    let { type, emergencyDegree, baseMsg } = props;
    let {
        allAbnormalClass, allBU, allRegion, allStage,
        issuer, units, date, abnormalTime, abnormalClass, BU, region, station, skuName, skuno, WO, stage
    } = baseMsg;

    return <div className={styles['step1']}>
        <div style={{ textAlign: 'center' }}>
            <p></p>
            <h3><b>NSDI 【通知单】</b></h3>
            <Space size="middle">
                <b>类型：</b>
                <Radio.Group value={type} onChange={retSetNewAbnormalByPlaneObj('type', 'target.value')}>
                    <Radio value="异常"> 异常 </Radio>
                    <Radio value="停线"> 停线 </Radio>
                </Radio.Group>
                <span>  </span>
                <b>紧急程度：</b>
                <Radio.Group value={emergencyDegree} onChange={retSetNewAbnormalByPlaneObj('emergencyDegree', 'target.value')}>
                    <Radio value="正常"> 正常 </Radio>
                    <Radio value="紧急"> 紧急 </Radio>
                </Radio.Group>
            </Space>
        </div>

        <Row gutter={[0, 24]} justify="center" style={{ marginTop: '20px' }}>
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>發文人員</Col>
                    <Col span={15}><Input disabled={true} value={issuer} /></Col>
                </Row>
            </Col>
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>發文單位</Col>
                    <Col span={15}><Input disabled={true} value={units} /></Col>
                </Row>
            </Col>
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>發文日期</Col>
                    <Col span={15}><Input disabled={true} value={date} /></Col>
                </Row>
            </Col>
        </Row>

        <Row gutter={[0, 24]} justify="center">
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>異常時間</Col>
                    <Col span={15}>
                        <DatePicker className={styles.w100} onChange={retSetNewAbnormalByMoment('baseMsg.abnormalTime')}
                            value={moment(abnormalTime, 'YYYY/MM/DD hh:mm')} format='YYYY/MM/DD hh:mm' showTime
                        />
                    </Col>
                </Row>
            </Col>
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>異常班別</Col>
                    <Col span={15}>
                        <Select className={styles.w100} value={abnormalClass} onChange={retSetNewAbnormalByPlaneObj('baseMsg.abnormalClass', '')}>
                            {
                                allAbnormalClass.map(v => <Option key={v} value={v} >{v}</Option>)
                            }
                        </Select>
                    </Col>
                </Row>
            </Col>
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>異常BU</Col>
                    <Col span={15}>
                        <Select className={styles.w100} value={BU} onChange={retSetNewAbnormalByPlaneObj('baseMsg.BU', '')}>
                            {
                                allBU.map(v => <Option key={v} value={v} >{v}</Option>)
                            }
                        </Select>
                    </Col>
                </Row>
            </Col>
        </Row>

        <Row gutter={[0, 24]} justify="center">
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>異常區域</Col>
                    <Col span={15}>
                        <Select className={styles.w100} value={region} onChange={retSetNewAbnormalByPlaneObj('baseMsg.region', '')}>
                            {
                                allRegion.map(v => <Option key={v} value={v} >{v}</Option>)
                            }
                        </Select>
                    </Col>
                </Row>
            </Col>
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>異常工站</Col>
                    <Col span={15}><Input value={station} onChange={retSetNewAbnormalByPlaneObj('baseMsg.station', 'target.value')} /></Col>
                </Row>
            </Col>
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>機種名稱</Col>
                    <Col span={15}><Input value={skuName} onChange={retSetNewAbnormalByPlaneObj('baseMsg.skuName', 'target.value')} /></Col>
                </Row>
            </Col>
        </Row>

        <Row gutter={[0, 24]} justify="center">
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>機種料號</Col>
                    <Col span={15}><Input value={skuno} onChange={retSetNewAbnormalByPlaneObj('baseMsg.skuno', 'target.value')} /></Col>
                </Row>
            </Col>
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>工單編號</Col>
                    <Col span={15}><Input value={WO} onChange={retSetNewAbnormalByPlaneObj('baseMsg.WO', 'target.value')} /></Col>
                </Row>
            </Col>
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>產品階段</Col>
                    <Col span={15}>
                        <Select className={styles.w100} value={stage} onChange={retSetNewAbnormalByPlaneObj('baseMsg.stage', '')}>
                            {
                                allStage.map(v => <Option key={v} value={v} >{v}</Option>)
                            }
                        </Select>
                    </Col>
                </Row>
            </Col>
        </Row>

        <Row gutter={[0, 24]} justify="center">
            <Col span={8} style={{ textAlign: 'center' }}>
                <Space size="large">
                    <Button type="primary" size="small" icon={<ArrowDownOutlined />} onClick={nextStep}> 下一步 </Button>
                </Space>
            </Col>
        </Row>
    </div>
}

Step1 = connect(state => {
    return {
        type: state.AbnormalDecision.anomalousGraph.newAbnormal.type,
        emergencyDegree: state.AbnormalDecision.anomalousGraph.newAbnormal.emergencyDegree,
        baseMsg: state.AbnormalDecision.anomalousGraph.newAbnormal.baseMsg
    }
})(Step1)




let Step2 = props => {
    // allSectionManager: [],
    //                 allMinister: [],
    //                 sectionChief: [],
    //                 sectionManager: '', //课级
    //                 minister: '', //部级
    //                 sectionChief: '', //处级
    let { prevStep, nextStep, retSetNewAbnormalByPlaneObj } = useContext(NewAbnormalContext);

    let {
        allSectionManager, allMinister, allSectionChief,
        sectionManager, minister, sectionChief
    } = props.report;

    return <div className={styles['step2']}>
        <Row gutter={[0, 24]} justify="center" style={{ marginTop: '20px' }}>
            <Col span={8}>
                <Row>
                    <Col span={10} style={{ textAlign: 'center' }}>課級（>30m）</Col>
                    <Col span={14}>
                        <Select className={styles.w100} value={sectionManager} onChange={retSetNewAbnormalByPlaneObj('report.sectionManager', '')}>
                            {
                                allSectionManager.map(v => <Option key={v} value={v} >{v}</Option>)
                            }
                        </Select>
                    </Col>
                </Row>
            </Col>
            <Col span={8}>
                <Row>
                    <Col span={10} style={{ textAlign: 'center' }}>部級（0.5~1h）</Col>
                    <Col span={14}>
                        <Select className={styles.w100} value={minister} onChange={retSetNewAbnormalByPlaneObj('report.minister', '')}>
                            {
                                allMinister.map(v => <Option key={v} value={v} >{v}</Option>)
                            }
                        </Select>
                    </Col>
                </Row>
            </Col>
            <Col span={8}>
                <Row>
                    <Col span={10} style={{ textAlign: 'center' }}>處級（>1h）</Col>
                    <Col span={14}>
                        <Select className={styles.w100} value={sectionChief} onChange={retSetNewAbnormalByPlaneObj('report.sectionChief', '')}>
                            {
                                allSectionChief.map(v => <Option key={v} value={v} >{v}</Option>)
                            }
                        </Select>
                    </Col>
                </Row>
            </Col>
        </Row>

        <Row gutter={[0, 24]} justify="center">
            <Col span={8} style={{ textAlign: 'center' }}>
                <Space size="large">
                    <Button type="primary" size="small" icon={<ArrowUpOutlined />} onClick={prevStep}> 上一步 </Button>
                    <Button type="primary" size="small" icon={<ArrowDownOutlined />} onClick={nextStep}> 下一步 </Button>
                </Space>
            </Col>
        </Row>
    </div>
}

Step2 = connect(state => {
    return {
        report: state.AbnormalDecision.anomalousGraph.newAbnormal.report
    }
})(Step2);



let Step3 = props => {
    let { prevStep, nextStep, retSetNewAbnormalByPlaneObj, retSetNewAbnormalByMoment } = useContext(NewAbnormalContext);
    let { currentClassify, allHandler, handler, noticeTime, emailTitle } = props;

    return <div className={styles['step3']}>
        <Row gutter={[0, 16]} justify="center" style={{ marginTop: '20px' }}>
            <Col span={16}>
                <Row>
                    <Col span={6} style={{ textAlign: 'right', paddingRight: '15px' }}>異常處理人</Col>
                    <Col span={18}>
                        {/* 多选 */}
                        <Select mode="multiple" className={styles.w100} showArrow value={handler}
                            onChange={retSetNewAbnormalByPlaneObj('problem.handler', '')}
                            options={allHandler.map(v => ({ value: v }))}
                        />
                    </Col>
                </Row>
            </Col>
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>通知時間</Col>
                    <Col span={13}>
                        <DatePicker className={styles.w100} onChange={retSetNewAbnormalByMoment('problem.noticeTime')}
                            value={moment(noticeTime, 'YYYY/MM/DD hh:mm')} format='YYYY/MM/DD hh:mm' showTime
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 16]} justify="center">
            <Col span={24}>
                <Row>
                    <Col span={4} style={{ textAlign: 'right', paddingRight: '15px' }}>郵件標題</Col>
                    <Col span={19}>
                        <TextArea value={emailTitle} onChange={retSetNewAbnormalByPlaneObj('problem.emailTitle', 'target.value')} />
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 16]} justify="center">
            <Col span={24}>
                <Row>
                    <Col span={4} style={{ textAlign: 'right', paddingRight: '15px' }}>問題分類</Col>
                    <Col span={19}>

                        {/* ====================================================================================================================================== */}

                        {/* 設備異常 物料異常 人員異常 品質異常 治工具異常 系統異常     */}
                        <Tabs size="small" type='card' activeKey={currentClassify}
                            onChange={retSetNewAbnormalByPlaneObj('problem.abnormalClassify.currentClassify', '')}
                            style={{ width: '100%', border: '1px solid #ddd' }}
                        >
                            <TabPane tab="設備異常" key="equipment">
                                <ProblemEquipment />
                            </TabPane>
                            <TabPane tab="物料異常" key="material">
                                <ProblemMaterial />
                            </TabPane>
                            <TabPane tab="人員異常" key="person">
                                <ProblemPerson />
                            </TabPane>
                            <TabPane tab="品質異常" key="quality">
                                <ProblemQuality />
                            </TabPane>
                            <TabPane tab="治工具異常" key="tools">
                                <ProblemTools />
                            </TabPane>
                            <TabPane tab="系統異常" key="system">
                                <ProblemSystem />
                            </TabPane>
                        </Tabs>

                        {/* ====================================================================================================================================== */}

                    </Col>
                </Row>
            </Col>
        </Row>

        <Row gutter={[0, 24]} justify="center">
            <Col span={8} style={{ textAlign: 'center' }}>
                <Space size="large">
                    <Button type="primary" size="small" icon={<ArrowUpOutlined />} onClick={prevStep}> 上一步 </Button>
                    <Button type="primary" size="small" icon={<ArrowDownOutlined />} onClick={nextStep}> 下一步 </Button>
                </Space>
            </Col>
        </Row>
    </div>
}

Step3 = connect(state => {
    return {
        currentClassify: state.AbnormalDecision.anomalousGraph.newAbnormal.problem.abnormalClassify.currentClassify,
        allHandler: state.AbnormalDecision.anomalousGraph.newAbnormal.problem.allHandler,
        handler: state.AbnormalDecision.anomalousGraph.newAbnormal.problem.handler,
        noticeTime: state.AbnormalDecision.anomalousGraph.newAbnormal.problem.noticeTime,
        emailTitle: state.AbnormalDecision.anomalousGraph.newAbnormal.problem.emailTitle
    }
})(Step3);

//--------------------------------------------------------------------------------------------------------------------------------------------

let ProblemEquipment = props => {  //設備異常
    // equipment: { //设备异常
    //     allDesc: [],
    //     allCategory: [],
    //     desc: [],  //异常描述
    //     category: [], //异常类别
    //     name: '',  // 设备名称
    //     equipmentNumber: '', // 设备编号
    //     equipmentModel: '' // 設備型號
    // },
    let { retSetNewAbnormalByPlaneObj } = useContext(NewAbnormalContext);
    let {
        allDesc, allCategory,
        desc, category, name, equipmentNumber, equipmentModel
    } = props.equipment;

    return <div style={{ width: '100%' }}>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>異常描述</Col>
                    <Col span={15}>
                        <Select size='small' className={styles.w100} value={desc}
                            onChange={retSetNewAbnormalByPlaneObj('problem.abnormalClassify.equipment.desc', '')}
                        >
                            {
                                allDesc.map(v => <Option key={v} value={v} >{v}</Option>)
                            }
                        </Select>
                    </Col>
                </Row>
            </Col>
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>機器類別</Col>
                    <Col span={15}>
                        <Select size='small' className={styles.w100} value={category}
                            onChange={retSetNewAbnormalByPlaneObj('problem.abnormalClassify.equipment.category', '')}
                        >
                            {
                                allCategory.map(v => <Option key={v} value={v} >{v}</Option>)
                            }
                        </Select>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>設備名稱</Col>
                    <Col span={15}>
                        <Input size="small" value={ name } onChange={ retSetNewAbnormalByPlaneObj('problem.abnormalClassify.equipment.name', 'target.value') } />
                    </Col>
                </Row>
            </Col>
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>設備編號</Col>
                    <Col span={15}>
                        <Input size="small" value={ equipmentNumber } onChange={ retSetNewAbnormalByPlaneObj('problem.abnormalClassify.equipment.equipmentNumber', 'target.value') } />
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>設備型號</Col>
                    <Col span={15}>
                    <Input size="small" value={ equipmentModel } onChange={ retSetNewAbnormalByPlaneObj('problem.abnormalClassify.equipment.equipmentModel', 'target.value') } />
                    </Col>
                </Row>
            </Col>
            <Col span={12}></Col>
        </Row>
    </div>
}

ProblemEquipment = connect(state => {
    return {
        equipment: state.AbnormalDecision.anomalousGraph.newAbnormal.problem.abnormalClassify.equipment
    }
})(ProblemEquipment);




let ProblemMaterial = props => {  //物料異常
    return <div style={{ width: '100%' }}>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>異常描述</Col>
                    <Col span={15}><Input size="small" /></Col>
                </Row>
            </Col>
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>DC</Col>
                    <Col span={15}><Input size="small" /></Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>LC</Col>
                    <Col span={15}><Input size="small" /></Col>
                </Row>
            </Col>
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>零件料號</Col>
                    <Col span={15}><Input size="small" /></Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>不良率</Col>
                    <Col span={15}><Input size="small" /></Col>
                </Row>
            </Col>
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>供應商</Col>
                    <Col span={15}><Input size="small" /></Col>
                </Row>
            </Col>
        </Row>
    </div>
}

let ProblemPerson = props => {  //人員異常
    return <div style={{ width: '100%' }}>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>異常描述</Col>
                    <Col span={15}><Input size="small" /></Col>
                </Row>
            </Col>
            <Col span={12}></Col>
        </Row>
    </div>
}

let ProblemQuality = props => {  //品質異常
    return <div style={{ width: '100%' }}>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>制程段</Col>
                    <Col span={15}><Input size="small" /></Col>
                </Row>
            </Col>
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>不良現象</Col>
                    <Col span={14}><Input size="small" /></Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>發生站位</Col>
                    <Col span={15}><Input size="small" /></Col>
                </Row>
            </Col>
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>影響范圍</Col>
                    <Col span={14}><Input size="small" /></Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={24}>
                <Row>
                    <Col span={4} style={{ textAlign: 'center' }}>當前措施</Col>
                    <Col span={19}><TextArea size="small" /></Col>
                </Row>
            </Col>
        </Row>
    </div>
}

let ProblemTools = props => {  //治工具異常
    return <div style={{ width: '100%' }}>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>異常描述</Col>
                    <Col span={15}><Input size="small" /></Col>
                </Row>
            </Col>
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>涉及的產品料號</Col>
                    <Col span={15}><Input size="small" /></Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>使用站位</Col>
                    <Col span={15}><Input size="small" /></Col>
                </Row>
            </Col>
            <Col span={12}></Col>
        </Row>
    </div>
}

let ProblemSystem = props => {  //系統異常
    return <div style={{ width: '100%' }}>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>異常類別</Col>
                    <Col span={15}><Input size="small" /></Col>
                </Row>
            </Col>
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>異常描述</Col>
                    <Col span={15}><Input size="small" /></Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>異常開始時間</Col>
                    <Col span={15}><Input size="small" /></Col>
                </Row>
            </Col>
            <Col span={12}></Col>
        </Row>
    </div>
}


//--------------------------------------------------------------------------------------------------------------------------------------------



let Step4 = () => {
    let { prevStep, nextStep } = useContext(NewAbnormalContext);
    return <div className={styles['step4']}>
        <Row gutter={[0, 24]} justify="center" style={{ marginTop: '20px' }}>
            <Col span={9}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>異常損失工時</Col>
                    <Col span={16}>
                        {/* <InputNumber
                            style={{width: '100%'}}
                            defaultValue={0}
                            min={0}
                            formatter={value => `${value}min`}
                            parser={value => value.replace('min', '')}
                            // onChange={}
                        /> */}
                        <Input prefix="" suffix="min" />
                    </Col>
                </Row>
            </Col>
            <Col span={9}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>閒置人力</Col>
                    <Col span={16}><Input /></Col>
                </Row>
            </Col>
        </Row>

        <Row gutter={[0, 24]} justify="center">
            <Col span={9}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>閒置人力安排</Col>
                    <Col span={16}><Input /></Col>
                </Row>
            </Col>
            <Col span={9}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>損失產出</Col>
                    <Col span={16}>
                        <Input prefix="" suffix="pcs" />
                    </Col>
                </Row>
            </Col>
        </Row>

        <Row gutter={[0, 24]} justify="center">
            <Col span={9}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>良率損失</Col>
                    <Col span={16}>
                        <Input prefix="" suffix="%" />
                    </Col>
                </Row>
            </Col>
            <Col span={9}></Col>
        </Row>
        <Row gutter={[0, 24]} justify="center">
            <Col span={18}>
                <Row>
                    <Col span={4} style={{ textAlign: 'center' }}>臨時解決措施</Col>
                    <Col span={20}><TextArea /></Col>
                </Row>
            </Col>

        </Row>
        <Row gutter={[0, 24]} justify="center">
            <Col span={8} style={{ textAlign: 'center' }}>
                <Space size="large">
                    <Button type="primary" size="small" icon={<ArrowUpOutlined />} onClick={prevStep}> 上一步 </Button>
                    <Button type="primary" size="small" icon={<ArrowDownOutlined />} onClick={nextStep}> 下一步 </Button>
                </Space>
            </Col>
        </Row>
    </div>
}

let Step5 = () => {
    let { prevStep, nextStep } = useContext(NewAbnormalContext);
    return <div className={styles['step5']}>
        <Row gutter={[0, 24]} justify="center" style={{ marginTop: '20px' }}>
            <Col span={18}>
                <Row>
                    <Col span={4} style={{ textAlign: 'center' }}>責任人</Col>
                    <Col span={20}><Input /></Col>
                </Row>
            </Col>
        </Row>

        <Row gutter={[0, 12]} justify="center">
            <Col span={9}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>責任人課級(>3d)</Col>
                    <Col span={16}><Input /></Col>
                </Row>
            </Col>
            <Col span={9}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>責任人部級(>5d)</Col>
                    <Col span={16}>
                        <Input />
                    </Col>
                </Row>
            </Col>
        </Row>

        <Row gutter={[0, 12]} justify="center">
            <Col span={9}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>責任人處級(>10d)</Col>
                    <Col span={16}>
                        <Input />
                    </Col>
                </Row>
            </Col>
            <Col span={9}></Col>
        </Row>
        <Row gutter={[0, 24]} justify="center">
            <Col span={18}>
                <Row>
                    <Col span={4} style={{ textAlign: 'center' }}>異常知會人</Col>
                    <Col span={20}><TextArea /></Col>
                </Row>
            </Col>

        </Row>
        <Row gutter={[0, 24]} justify="center">
            <Col span={8} style={{ textAlign: 'center' }}>
                <Space size="large">
                    <Button type="primary" size="small" icon={<ArrowUpOutlined />} onClick={prevStep}> 上一步 </Button>
                    <Button type="primary" size="small" icon={<ArrowDownOutlined />} onClick={nextStep}> 下一步 </Button>
                </Space>
            </Col>
        </Row>
    </div>
}

let Step6 = () => {
    let { prevStep } = useContext(NewAbnormalContext);

    let submit = useCallback(() => {
        console.log("submit");
    }, []);

    return <div className={styles['step6']}>
        <Row gutter={[0, 24]} justify="center" style={{ marginTop: '20px' }}>
            <Col span={18}>
                <Row>
                    <Col span={4} style={{ textAlign: 'center' }}>問題狀態</Col>
                    <Col span={20}>
                        <Space>
                            <Radio.Group defaultValue="等待处理">
                                <Radio value="等待处理">等待处理</Radio>
                                <Radio value="处理中">处理中</Radio>
                            </Radio.Group>
                        </Space>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 24]} justify="center">
            <Col span={18}>
                <Row>
                    <Col span={4} style={{ textAlign: 'center' }}>備註</Col>
                    <Col span={20}><TextArea /></Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 24]} justify="center">
            <Col span={18}>
                <Row>
                    <Col span={4} style={{ textAlign: 'center' }}>附件</Col>
                    <Col span={20}><TextArea /></Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 24]} justify="center">
            <Col span={8} style={{ textAlign: 'center' }}>
                <Space size="large">
                    <Button type="primary" size="small" icon={<ArrowUpOutlined />} onClick={prevStep}> 上一步 </Button>
                    <Button type="primary" size="small" icon={<SaveOutlined />} onClick={submit}> 提交 </Button>
                </Space>
            </Col>
        </Row>
    </div>
}



