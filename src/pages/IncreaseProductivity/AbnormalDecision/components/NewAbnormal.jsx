
import React, { memo, createContext, useState, useEffect, useMemo, useCallback, useContext } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { useDispatch, useSelector } from 'dva';
import { connect, FormattedMessage, formatMessage } from 'umi';
import { Button, Space, Input, Tabs, Steps, message, Popover, Row, Col, Divider, Select, Radio, DatePicker, InputNumber, Tooltip, Upload } from 'antd';
import { SearchOutlined, PlusOutlined, ProfileOutlined, BarsOutlined, ZoomInOutlined, OrderedListOutlined, UploadOutlined, SaveOutlined, BorderBottomOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import moment from 'moment';
import { findValueByProp, getBase64 } from '../../../../utils/custom'
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
    // let newAbnormalVisible = useSelector(state => state.AbnormalDecision.anomalousGraph.newAbnormalVisible);
    // let abnormalId = useSelector(state => state.AbnormalDecision.anomalousGraph.newAbnormal.abnormalId);

    // let MFG = useSelector(state => state.AbnormalDecision.anomalousGraph.globalSearch.MFG);
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

    let retSetNewAbnormalByPlaneObj = (stateProp, eProp) => e => {   //純Obj
        setNewAbnormal(stateProp, findValueByProp(e, eProp));
    }

    let retSetNewAbnormalByMoment = prop => moment => {
        setNewAbnormal(prop, moment.format('YYYY/MM/DD HH:mm'));
    }




    //生成ID（可以不用了，批量上传文件问题已经解决！）
    // useEffect(() => {
    //     if (abnormalId == '' && newAbnormalVisible) {
    //         let timeStamp = moment().format('YYYYMMDDhhmmssms');
    //         console.log(timeStamp);
    //         setNewAbnormal('abnormalId', timeStamp);
    //     }
    // }, [abnormalId, newAbnormalVisible]);

    // 基本信息 上報機制 問題描述 臨時對策 原因分析 備註與附件

    return <div className={styles['modal-wrap']}>
        {/* direction="vertical" */}
        <div className={styles['new-abnormal-steps']}>
            {/* <div style={{ padding: '0 0 15px 15px' }}>
                <h4><b><OrderedListOutlined />  新增异常</b> </h4>
            </div> */}
            <p></p>
            {/* <Steps size='small' current={current} direction="vertical" onChange={setpChange}>
                <Step title="基本信息">
                    {formatMessage({ id: 'abnormal-decision-center.add-case.base-msg' })}
                </Step>
                <Step title="上報機制">
                    {formatMessage({ id: 'abnormal-decision-center.add-case.report' })}
                </Step>
                <Step title="問題描述">
                    {formatMessage({ id: 'abnormal-decision-center.add-case.problem' })}
                </Step>
                <Step title="臨時對策">
                    {formatMessage({ id: 'abnormal-decision-center.add-case.countermeasures' })}
                </Step>
                <Step title="原因分析">
                    {formatMessage({ id: 'abnormal-decision-center.add-case.cause-analysis' })}
                </Step>
                <Step title="備註與附件">
                    {formatMessage({ id: 'abnormal-decision-center.add-case.remarks-and-attachments' })}
                </Step>
            </Steps> */}
            <Steps size='small' current={current} direction="vertical" onChange={setpChange}>
                <Step title={formatMessage({ id: 'abnormal-decision-center.add-case.base-msg' })}>
                    {formatMessage({ id: 'abnormal-decision-center.add-case.base-msg' })}
                </Step>
                <Step title={formatMessage({ id: 'abnormal-decision-center.add-case.report' })}>
                    {formatMessage({ id: 'abnormal-decision-center.add-case.report' })}
                </Step>
                <Step title={formatMessage({ id: 'abnormal-decision-center.add-case.problem' })}>
                    {formatMessage({ id: 'abnormal-decision-center.add-case.problem' })}
                </Step>
                <Step title={formatMessage({ id: 'abnormal-decision-center.add-case.countermeasures' })}>
                    {formatMessage({ id: 'abnormal-decision-center.add-case.countermeasures' })}
                </Step>
                <Step title={formatMessage({ id: 'abnormal-decision-center.add-case.cause-analysis' })}>
                    {formatMessage({ id: 'abnormal-decision-center.add-case.cause-analysis' })}
                </Step>
                <Step title={formatMessage({ id: 'abnormal-decision-center.add-case.remarks-and-attachments' })}>
                    {formatMessage({ id: 'abnormal-decision-center.add-case.remarks-and-attachments' })}
                </Step>
            </Steps>
        </div>
        <div className={styles['new-abnormal-steps-right']}>
            <NewAbnormalContext.Provider value={{ current, setCurrent, prevStep, nextStep, setNewAbnormal, retSetNewAbnormalByPlaneObj, retSetNewAbnormalByMoment }}>
                {/* <StepContent current={current} /> */}
                <>
                    <Step1 />
                    <Step2 />
                    <Step3 />
                    <Step4 />
                    <Step5 />
                    <Step6 />
                </>
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
    let { current, nextStep, retSetNewAbnormalByPlaneObj, retSetNewAbnormalByMoment } = useContext(NewAbnormalContext);
    let { dispatch, type, emergencyDegree, globalSearch, baseMsg } = props;
    let {
        allMFG, allAbnormalClass, allBU, allRegion, allStage,
        MFG, issuer, units, date, abnormalTime, abnormalClass, BU, region, station, skuName, skuno, WO, stage
    } = baseMsg;

    // 设置当前制造处信息
    useMemo(() => {  // 初始化操作
        // 设置当前制造处信息 發文日期 異常時間（設置為當前時間）以及问题描述-通知时间
        let currentDate = moment().format('YYYY/MM/DD HH:mm');
        dispatch({
            type: 'AbnormalDecision/setNewAbnormalByFn',
            retNewState: _ => {
                _.baseMsg.allMFG = globalSearch.allMFG;
                _.baseMsg.MFG = globalSearch.MFG;  //制造处以第一次渲染该组件前的全局条件的制造处为标准，后面不受全局条件中的制造处所影响。
                _.baseMsg.date = currentDate;
                _.baseMsg.abnormalTime = currentDate;
                _.problem.noticeTime = currentDate;  // 问题描述-通知时间 20210512 add
                return _;
            }
        });
    }, []);   //制造处以第一次渲染该组件前的全局条件的制造处为标准，后继不受全局条件中的制造处所影响。

    // 获取新增异常需要的附带信息 getNewAbnormalMsg
    useEffect(() => {
        MFG && dispatch({
            type: 'AbnormalDecision/getNewAbnormalMsg',
            MFG
        });
    }, [MFG]);

    // BU发生变化时获取主管信息
    useEffect(() => {
        MFG && BU && dispatch({
            type: 'AbnormalDecision/getMasterByBu',
            MFG, BU
        });
    }, [MFG, BU]);

    return <div className={styles['step1']} style={{ display: current == 0 ? 'block' : 'none' }}>
        <div style={{ textAlign: 'center' }}>
            <p></p>
            <h3><b>{
                formatMessage({ id: 'abnormal-decision-center.add-case.title' })
            }</b></h3>
            <Space size="middle">
                <b>{
                    formatMessage({ id: 'abnormal-decision-center.add-case.type' })
                }</b>
                <Radio.Group value={type} onChange={retSetNewAbnormalByPlaneObj('type', 'target.value')}>
                    <Radio value="異常">{
                        formatMessage({ id: 'abnormal-decision-center.add-case.type.abnormal' })
                    }</Radio>
                    <Radio value="停線"> {
                        formatMessage({ id: 'abnormal-decision-center.add-case.type.stop-line' })
                    } </Radio>
                </Radio.Group>
                <span>  </span>
                <b>{
                    formatMessage({ id: 'abnormal-decision-center.add-case.emergencyDegree' })
                }</b>
                <Radio.Group value={emergencyDegree} onChange={retSetNewAbnormalByPlaneObj('emergencyDegree', 'target.value')}>
                    <Radio value="正常"> {
                        formatMessage({ id: 'abnormal-decision-center.add-case.emergencyDegree.normal' })
                    } </Radio>
                    <Radio value="緊急"> {
                        formatMessage({ id: 'abnormal-decision-center.add-case.emergencyDegree.urgent' })
                    } </Radio>
                </Radio.Group>
            </Space>
        </div>

        <Row gutter={[0, 24]} justify="left" style={{ marginTop: '20px' }}>
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.base-msg.MFG' })
                    }</Col>
                    <Col span={15}>
                        <Select className={styles.w100} value={MFG} onChange={retSetNewAbnormalByPlaneObj('baseMsg.MFG', '')}>
                            {
                                allMFG.map(v => <Option key={v} value={v} >{v}</Option>)
                            }
                        </Select>
                    </Col>
                </Row>
            </Col>
        </Row>

        <Row gutter={[0, 24]} justify="center">
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.base-msg.issuer' })
                    }</Col>
                    <Col span={15}><Input disabled={true} value={issuer} /></Col>
                </Row>
            </Col>
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.base-msg.units' })
                    }</Col>
                    <Col span={15}><Input disabled={true} value={units} /></Col>
                </Row>
            </Col>
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.base-msg.date' })
                    }</Col>
                    <Col span={15}><Input disabled={true} value={date} /></Col>
                </Row>
            </Col>
        </Row>

        <Row gutter={[0, 24]} justify="center">
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.base-msg.abnormalTime' })
                    }</Col>
                    <Col span={15}>
                        <DatePicker className={styles.w100} onChange={retSetNewAbnormalByMoment('baseMsg.abnormalTime')}
                            value={moment(abnormalTime, 'YYYY/MM/DD HH:mm')} format='YYYY/MM/DD HH:mm' showTime
                        />
                    </Col>
                </Row>
            </Col>
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.base-msg.abnormalClass' })
                    }</Col>
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
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.base-msg.BU' })
                    }</Col>
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
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.base-msg.region' })
                    }</Col>
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
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.base-msg.station' })
                    }</Col>
                    <Col span={15}><Input value={station} onChange={retSetNewAbnormalByPlaneObj('baseMsg.station', 'target.value')} /></Col>
                </Row>
            </Col>
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.base-msg.skuName' })
                    }</Col>
                    <Col span={15}><Input value={skuName} onChange={retSetNewAbnormalByPlaneObj('baseMsg.skuName', 'target.value')} /></Col>
                </Row>
            </Col>
        </Row>

        <Row gutter={[0, 24]} justify="center">
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.base-msg.skuno' })
                    }</Col>
                    <Col span={15}><Input value={skuno} onChange={retSetNewAbnormalByPlaneObj('baseMsg.skuno', 'target.value')} /></Col>
                </Row>
            </Col>
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.base-msg.WO' })
                    }</Col>
                    <Col span={15}><Input value={WO} onChange={retSetNewAbnormalByPlaneObj('baseMsg.WO', 'target.value')} /></Col>
                </Row>
            </Col>
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.base-msg.stage' })
                    }</Col>
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
                    <Button type="primary" size="small" icon={<ArrowDownOutlined />} onClick={nextStep}> {
                        formatMessage({ id: 'abnormal-decision-center.add-case.handle.next-step' })
                    } </Button>
                </Space>
            </Col>
        </Row>
    </div>
}

Step1 = connect(state => {
    return {
        type: state.AbnormalDecision.anomalousGraph.newAbnormal.type,
        emergencyDegree: state.AbnormalDecision.anomalousGraph.newAbnormal.emergencyDegree,
        globalSearch: state.AbnormalDecision.anomalousGraph.globalSearch,
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
    let { current, prevStep, nextStep, retSetNewAbnormalByPlaneObj } = useContext(NewAbnormalContext);

    let {
        allSectionManager, allMinister, allSectionChief,
        sectionManager, minister, sectionChief
    } = props.report;

    return <div className={styles['step2']} style={{ display: current == 1 ? 'block' : 'none' }}>
        <Row gutter={[0, 24]} justify="center" style={{ marginTop: '20px' }}>
            <Col span={24}>
                <Row>
                    <Col span={4}></Col>
                    <Col span={4} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.report.sectionManager' })
                    }</Col>
                    <Col span={10}>
                        <Select className={styles.w100} value={sectionManager} onChange={retSetNewAbnormalByPlaneObj('report.sectionManager', '')}>
                            {
                                allSectionManager.map(v => <Option key={v} value={v} >{v}</Option>)
                            }
                        </Select>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={4}></Col>
                    <Col span={4} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.report.minister' })
                    }</Col>
                    <Col span={10}>
                        <Select className={styles.w100} value={minister} onChange={retSetNewAbnormalByPlaneObj('report.minister', '')}>
                            {
                                allMinister.map(v => <Option key={v} value={v} >{v}</Option>)
                            }
                        </Select>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={4}></Col>
                    <Col span={4} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.report.sectionChief' })
                    }</Col>
                    <Col span={10}>
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
    let { current, prevStep, nextStep, retSetNewAbnormalByPlaneObj, retSetNewAbnormalByMoment } = useContext(NewAbnormalContext);
    let { currentClassify, allHandler, handler, noticeTime, emailTitle } = props;

    return <div className={styles['step3']} style={{ display: current == 2 ? 'block' : 'none' }}>
        <Row gutter={[0, 24]} justify="center" style={{ marginTop: '20px' }}>
            <Col span={16}>
                <Row>
                    <Col span={6} style={{ textAlign: 'right', paddingRight: '15px' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.problem.handler' })
                    }</Col>
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
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.problem.noticeTime' })
                    }</Col>
                    <Col span={13}>
                        <DatePicker className={styles.w100} onChange={retSetNewAbnormalByMoment('problem.noticeTime')}
                            value={moment(noticeTime, 'YYYY/MM/DD HH:mm')} format='YYYY/MM/DD HH:mm' showTime
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 24]} justify="center">
            <Col span={24}>
                <Row>
                    <Col span={4} style={{ textAlign: 'right', paddingRight: '15px' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.problem.emailTitle' })
                    }</Col>
                    <Col span={19}>
                        <TextArea value={emailTitle} onChange={retSetNewAbnormalByPlaneObj('problem.emailTitle', 'target.value')} />
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 24]} justify="center">
            <Col span={24}>
                <Row>
                    <Col span={4} style={{ textAlign: 'right', paddingRight: '15px' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.problem.classification' })
                    }</Col>
                    <Col span={19}>

                        {/* ====================================================================================================================================== */}

                        {/* 設備異常 物料異常 人員異常 品質異常 治工具異常 系統異常     */}
                        <Tabs size="small" type='card' activeKey={currentClassify}
                            onChange={retSetNewAbnormalByPlaneObj('problem.abnormalClassify.currentClassify', '')}
                            style={{ width: '100%', border: '1px solid #ddd' }}
                        >
                            <TabPane tab={
                                formatMessage({ id: 'abnormal-decision-center.add-case.problem.classification.tab.equipment' })
                            } key="equipment">
                                <ProblemEquipment />
                            </TabPane>
                            <TabPane tab={
                                formatMessage({ id: 'abnormal-decision-center.add-case.problem.classification.tab.material' })
                            } key="material">
                                <ProblemMaterial />
                            </TabPane>
                            <TabPane tab={
                                formatMessage({ id: 'abnormal-decision-center.add-case.problem.classification.tab.person' })
                            } key="person">
                                <ProblemPerson />
                            </TabPane>
                            <TabPane tab={
                                formatMessage({ id: 'abnormal-decision-center.add-case.problem.classification.tab.quality' })
                            } key="quality">
                                <ProblemQuality />
                            </TabPane>
                            <TabPane tab={
                                formatMessage({ id: 'abnormal-decision-center.add-case.problem.classification.tab.tools' })
                            } key="tools">
                                <ProblemTools />
                            </TabPane>
                            <TabPane tab={
                                formatMessage({ id: 'abnormal-decision-center.add-case.problem.classification.tab.system' })
                            } key="system">
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
                    <Button type="primary" size="small" icon={<ArrowUpOutlined />} onClick={prevStep}> {
                        formatMessage({ id: 'abnormal-decision-center.add-case.handle.previous-step' })
                    } </Button>
                    <Button type="primary" size="small" icon={<ArrowDownOutlined />} onClick={nextStep}> {
                        formatMessage({ id: 'abnormal-decision-center.add-case.handle.next-step' })
                    } </Button>
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

    let [newDesc, setNewDesc] = useState('');   // 新的异常描述
    let [newCategory, setNewCategory] = useState(''); // 新的异常类别

    let addDesc = useCallback(() => {
        props.dispatch({
            type: 'AbnormalDecision/setNewAbnormalByFn',
            retNewState: _ => {
                _.problem.abnormalClassify.equipment.allDesc.push('其它：' + newDesc);
                _.problem.abnormalClassify.equipment.desc = '其它：' + newDesc;
                return _;
            }
        });
        setNewDesc('');
    }, [newDesc]);

    let addCategory = useCallback(() => {
        props.dispatch({
            type: 'AbnormalDecision/setNewAbnormalByFn',
            retNewState: _ => {
                _.problem.abnormalClassify.equipment.allCategory.push('其它：' + newCategory);
                _.problem.abnormalClassify.equipment.category = '其它：' + newCategory;
                return _;
            }
        });
        setNewCategory('');
    }, [newCategory]);


    return <div style={{ width: '100%' }}>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.problem.classification.lable.desc' })
                    }</Col>
                    <Col span={15}>
                        {/* <Select size='small' className={styles.w100} value={desc}
                            onChange={retSetNewAbnormalByPlaneObj('problem.abnormalClassify.equipment.desc', '')}
                        >
                            {
                                allDesc.map(v => <Option key={v} value={v} >{v}</Option>)
                            }
                        </Select> */}
                        <Select
                            size='small'
                            className={styles.w100}
                            placeholder="可展开添加新的异常描述"
                            value={desc}
                            onChange={retSetNewAbnormalByPlaneObj('problem.abnormalClassify.equipment.desc', '')}
                            dropdownRender={menu => (
                                <div>
                                    {menu}
                                    <Divider style={{ margin: '4px 0' }} />
                                    <div style={{ display: 'flex', flexWrap: 'nowrap', padding: '2px 8px' }}>
                                        <Input size='small' style={{ flex: 'auto' }} value={newDesc} onChange={e => { setNewDesc(e.target.value) }} />
                                        <a
                                            style={{ flex: 'none', padding: '2px 8px', display: 'block', cursor: 'pointer' }}
                                            onClick={addDesc}
                                        >
                                            <PlusOutlined /> 新增
                                        </a>
                                    </div>
                                </div>
                            )}
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
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.problem.classification.lable.category' })
                    }</Col>
                    <Col span={15}>
                        {/* <Select size='small' className={styles.w100} value={category}
                            onChange={retSetNewAbnormalByPlaneObj('problem.abnormalClassify.equipment.category', '')}
                        >
                            {
                                allCategory.map(v => <Option key={v} value={v} >{v}</Option>)
                            }
                        </Select> */}
                        <Select
                            size='small'
                            className={styles.w100}
                            placeholder="可展开添加新的异常类别"
                            value={category}
                            onChange={retSetNewAbnormalByPlaneObj('problem.abnormalClassify.equipment.category', '')}
                            dropdownRender={menu => (
                                <div>
                                    {menu}
                                    <Divider style={{ margin: '4px 0' }} />
                                    <div style={{ display: 'flex', flexWrap: 'nowrap', padding: '2px 8px' }}>
                                        <Input size='small' style={{ flex: 'auto' }} value={newCategory} onChange={e => { setNewCategory(e.target.value) }} />
                                        <a
                                            style={{ flex: 'none', padding: '2px 8px', display: 'block', cursor: 'pointer' }}
                                            onClick={addCategory}
                                        >
                                            <PlusOutlined /> 新增
                                        </a>
                                    </div>
                                </div>
                            )}
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
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.problem.classification.lable.name' })
                    }</Col>
                    <Col span={15}>
                        <Input size="small" value={name} onChange={retSetNewAbnormalByPlaneObj('problem.abnormalClassify.equipment.name', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.problem.classification.lable.equipmentNumber' })
                    }</Col>
                    <Col span={15}>
                        <Input size="small" value={equipmentNumber} onChange={retSetNewAbnormalByPlaneObj('problem.abnormalClassify.equipment.equipmentNumber', 'target.value')} />
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.problem.classification.lable.equipmentModel' })
                    }</Col>
                    <Col span={15}>
                        <Input size="small" value={equipmentModel} onChange={retSetNewAbnormalByPlaneObj('problem.abnormalClassify.equipment.equipmentModel', 'target.value')} />
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
    let { retSetNewAbnormalByPlaneObj } = useContext(NewAbnormalContext);
    // allDesc: ['來料短缺', '物料Delay', '錯料', '混料', '物料包裝異常', '特采過期', '包裝信息與實物不符', '有帳無務', '其它'],
    // desc: '來料短缺', //异常描述
    // partNo: '', //零件料号
    // rejectRatio: '', //不良率
    // supplier: '', //供应商
    // DC: '',
    // LC: ''
    let { allDesc, desc, DC, LC, partNo, rejectRatio, supplier } = props.material;

    let [newDesc, setNewDesc] = useState('');   // 新的异常描述

    let addDesc = useCallback(() => {
        props.dispatch({
            type: 'AbnormalDecision/setNewAbnormalByFn',
            retNewState: _ => {
                _.problem.abnormalClassify.material.allDesc.push('其它：' + newDesc);
                _.problem.abnormalClassify.material.desc = '其它：' + newDesc;
                return _;
            }
        });
        setNewDesc('');
    }, [newDesc]);

    return <div style={{ width: '100%' }}>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.problem.classification.lable.desc' })
                    }</Col>
                    <Col span={15}>
                        {/* <Select size='small' className={styles.w100} value={desc}
                            onChange={retSetNewAbnormalByPlaneObj('problem.abnormalClassify.material.desc', '')}
                        >
                            {
                                allDesc.map(v => <Option key={v} value={v} >{v}</Option>)
                            }
                        </Select> */}
                        <Select
                            size='small'
                            className={styles.w100}
                            placeholder="可展开添加新的异常描述"
                            value={desc}
                            onChange={retSetNewAbnormalByPlaneObj('problem.abnormalClassify.material.desc', '')}
                            dropdownRender={menu => (
                                <div>
                                    {menu}
                                    <Divider style={{ margin: '4px 0' }} />
                                    <div style={{ display: 'flex', flexWrap: 'nowrap', padding: '2px 8px' }}>
                                        <Input size='small' style={{ flex: 'auto' }} value={newDesc} onChange={e => { setNewDesc(e.target.value) }} />
                                        <a
                                            style={{ flex: 'none', padding: '2px 8px', display: 'block', cursor: 'pointer' }}
                                            onClick={addDesc}
                                        >
                                            <PlusOutlined /> 新增
                                        </a>
                                    </div>
                                </div>
                            )}
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
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.problem.classification.lable.DC' })
                    }</Col>
                    <Col span={15}>
                        <Input size="small" value={DC} onChange={retSetNewAbnormalByPlaneObj('problem.abnormalClassify.material.DC', 'target.value')} />
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.problem.classification.lable.LC' })
                    }</Col>
                    <Col span={15}>
                        <Input size="small" value={LC} onChange={retSetNewAbnormalByPlaneObj('problem.abnormalClassify.material.LC', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.problem.classification.lable.partNo' })
                    }</Col>
                    <Col span={15}>
                        <Input size="small" value={partNo} onChange={retSetNewAbnormalByPlaneObj('problem.abnormalClassify.material.partNo', 'target.value')} />
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.problem.classification.lable.rejectRatio' })
                    }</Col>
                    <Col span={15}>
                        <Input size="small" value={rejectRatio} onChange={retSetNewAbnormalByPlaneObj('problem.abnormalClassify.material.rejectRatio', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.problem.classification.lable.supplier' })
                    }</Col>
                    <Col span={15}>
                        <Input size="small" value={supplier} onChange={retSetNewAbnormalByPlaneObj('problem.abnormalClassify.material.supplier', 'target.value')} />
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>
}

ProblemMaterial = connect(state => {
    return {
        material: state.AbnormalDecision.anomalousGraph.newAbnormal.problem.abnormalClassify.material
    }
})(ProblemMaterial);


let ProblemPerson = props => {  //人員異常
    let { retSetNewAbnormalByPlaneObj } = useContext(NewAbnormalContext);
    let { allDesc, desc } = props.person;

    let [newDesc, setNewDesc] = useState('');   // 新的异常描述

    let addDesc = useCallback(() => {
        props.dispatch({
            type: 'AbnormalDecision/setNewAbnormalByFn',
            retNewState: _ => {
                _.problem.abnormalClassify.person.allDesc.push('其它：' + newDesc);
                _.problem.abnormalClassify.person.desc = '其它：' + newDesc;
                return _;
            }
        });
        setNewDesc('');
    }, [newDesc]);

    return <div style={{ width: '100%' }}>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.problem.classification.lable.desc' })
                    }</Col>
                    <Col span={15}>
                        {/* <Select size='small' className={styles.w100} value={desc}
                            onChange={retSetNewAbnormalByPlaneObj('problem.abnormalClassify.person.desc', '')}
                        >
                            {
                                allDesc.map(v => <Option key={v} value={v} >{v}</Option>)
                            }
                        </Select> */}
                        <Select
                            size='small'
                            className={styles.w100}
                            placeholder="可展开添加新的异常描述"
                            value={desc}
                            onChange={retSetNewAbnormalByPlaneObj('problem.abnormalClassify.person.desc', '')}
                            dropdownRender={menu => (
                                <div>
                                    {menu}
                                    <Divider style={{ margin: '4px 0' }} />
                                    <div style={{ display: 'flex', flexWrap: 'nowrap', padding: '2px 8px' }}>
                                        <Input size='small' style={{ flex: 'auto' }} value={newDesc} onChange={e => { setNewDesc(e.target.value) }} />
                                        <a
                                            style={{ flex: 'none', padding: '2px 8px', display: 'block', cursor: 'pointer' }}
                                            onClick={addDesc}
                                        >
                                            <PlusOutlined /> 新增
                                        </a>
                                    </div>
                                </div>
                            )}
                        >
                            {
                                allDesc.map(v => <Option key={v} value={v} >{v}</Option>)
                            }
                        </Select>
                    </Col>
                </Row>
            </Col>
            <Col span={12}></Col>
        </Row>
    </div>
}

ProblemPerson = connect(state => {
    return {
        person: state.AbnormalDecision.anomalousGraph.newAbnormal.problem.abnormalClassify.person
    }
})(ProblemPerson);


let ProblemQuality = props => {  //品質異常
    let { retSetNewAbnormalByPlaneObj } = useContext(NewAbnormalContext);
    //                         allProcess: [],
    //                         allBadPhenomenon: [],
    //                         allStation: [],
    //                         process: '', //制程段
    //                         badPhenomenon: '', //不良现象
    //                         scope: '', //影响范围
    //                         station: '', //发生站位
    //                         measures: '' //当前措施
    let {
        allProcess, allBadPhenomenon, allScope,
        process, badPhenomenon, scope, station, measures
    } = props.quality;

    let [newProcess, setNewProcess] = useState('');   // 新的异常描述
    let [newBadPhenomenon, setNewBadPhenomenon] = useState('');   // 新的异常描述

    let addProcess = useCallback(() => {
        props.dispatch({
            type: 'AbnormalDecision/setNewAbnormalByFn',
            retNewState: _ => {
                _.problem.abnormalClassify.quality.allProcess.push('其它：' + newProcess);
                _.problem.abnormalClassify.quality.process = '其它：' + newProcess;
                return _;
            }
        });
        setNewProcess('');
    }, [newProcess]);

    let addBadPhenomenon = useCallback(() => {
        props.dispatch({
            type: 'AbnormalDecision/setNewAbnormalByFn',
            retNewState: _ => {
                _.problem.abnormalClassify.quality.allBadPhenomenon.push('其它：' + newBadPhenomenon);
                _.problem.abnormalClassify.quality.badPhenomenon = '其它：' + newBadPhenomenon;
                return _;
            }
        });
        setNewBadPhenomenon('');
    }, [newBadPhenomenon]);

    return <div style={{ width: '100%' }}>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.problem.classification.lable.process' })
                    }</Col>
                    <Col span={15}>
                        {/* <Select size='small' className={styles.w100} value={process}
                            onChange={retSetNewAbnormalByPlaneObj('problem.abnormalClassify.quality.process', '')}
                        >
                            {
                                allProcess.map(v => <Option key={v} value={v} >{v}</Option>)
                            }
                        </Select> */}
                        <Select
                            size='small'
                            className={styles.w100}
                            placeholder="可展开添加新的异常描述"
                            value={process}
                            onChange={retSetNewAbnormalByPlaneObj('problem.abnormalClassify.quality.process', '')}
                            dropdownRender={menu => (
                                <div>
                                    {menu}
                                    <Divider style={{ margin: '4px 0' }} />
                                    <div style={{ display: 'flex', flexWrap: 'nowrap', padding: '2px 8px' }}>
                                        <Input size='small' style={{ flex: 'auto' }} value={newProcess} onChange={e => { setNewProcess(e.target.value) }} />
                                        <a
                                            style={{ flex: 'none', padding: '2px 8px', display: 'block', cursor: 'pointer' }}
                                            onClick={addProcess}
                                        >
                                            <PlusOutlined /> 新增
                                        </a>
                                    </div>
                                </div>
                            )}
                        >
                            {
                                allProcess.map(v => <Option key={v} value={v} >{v}</Option>)
                            }
                        </Select>
                    </Col>
                </Row>
            </Col>
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.problem.classification.lable.badPhenomenon' })
                    }</Col>
                    <Col span={14}>
                        {/* <Select size='small' className={styles.w100} value={badPhenomenon}
                            onChange={retSetNewAbnormalByPlaneObj('problem.abnormalClassify.quality.badPhenomenon', '')}
                        >
                            {
                                allBadPhenomenon.map(v => <Option key={v} value={v} >{v}</Option>)
                            }
                        </Select> */}
                        <Select
                            size='small'
                            className={styles.w100}
                            placeholder="可展开添加新的异常描述"
                            value={badPhenomenon}
                            onChange={retSetNewAbnormalByPlaneObj('problem.abnormalClassify.quality.badPhenomenon', '')}
                            dropdownRender={menu => (
                                <div>
                                    {menu}
                                    <Divider style={{ margin: '4px 0' }} />
                                    <div style={{ display: 'flex', flexWrap: 'nowrap', padding: '2px 8px' }}>
                                        <Input size='small' style={{ flex: 'auto' }} value={newBadPhenomenon} onChange={e => { setNewBadPhenomenon(e.target.value) }} />
                                        <a
                                            style={{ flex: 'none', padding: '2px 8px', display: 'block', cursor: 'pointer' }}
                                            onClick={addBadPhenomenon}
                                        >
                                            <PlusOutlined /> 新增
                                        </a>
                                    </div>
                                </div>
                            )}
                        >
                            {
                                allBadPhenomenon.map(v => <Option key={v} value={v} >{v}</Option>)
                            }
                        </Select>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.problem.classification.lable.station' })
                    }</Col>
                    <Col span={15}>
                        <Input size="small" value={station} onChange={retSetNewAbnormalByPlaneObj('problem.abnormalClassify.quality.station', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.problem.classification.lable.scope' })
                    }</Col>
                    <Col span={14}>
                        <Select size='small' className={styles.w100} value={scope}
                            onChange={retSetNewAbnormalByPlaneObj('problem.abnormalClassify.quality.scope', '')}
                        >
                            {
                                allScope.map(v => <Option key={v} value={v} >{v}</Option>)
                            }
                        </Select>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={24}>
                <Row>
                    <Col span={4} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.problem.classification.lable.measures' })
                    }</Col>
                    <Col span={19}>
                        <TextArea size="small" value={measures} onChange={retSetNewAbnormalByPlaneObj('problem.abnormalClassify.quality.measures', 'target.value')} />
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>
}

ProblemQuality = connect(state => {
    return {
        quality: state.AbnormalDecision.anomalousGraph.newAbnormal.problem.abnormalClassify.quality
    }
})(ProblemQuality);


let ProblemTools = props => {  //治工具異常
    // allDesc: [],
    // desc: '',   //异常描述
    // skuno: '',  //涉及的产品料号
    // station: '' //使用站位
    let { retSetNewAbnormalByPlaneObj } = useContext(NewAbnormalContext);
    let { allDesc, desc, skuno, station } = props.tools;

    let [newDesc, setNewDesc] = useState('');   // 新的异常描述

    let addDesc = useCallback(() => {
        props.dispatch({
            type: 'AbnormalDecision/setNewAbnormalByFn',
            retNewState: _ => {
                _.problem.abnormalClassify.tools.allDesc.push('其它：' + newDesc);
                _.problem.abnormalClassify.tools.desc = '其它：' + newDesc;
                return _;
            }
        });
        setNewDesc('');
    }, [newDesc]);

    return <div style={{ width: '100%' }}>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.problem.classification.lable.desc' })
                    }</Col>
                    <Col span={15}>
                        {/* <Select size='small' className={styles.w100} value={desc}
                            onChange={retSetNewAbnormalByPlaneObj('problem.abnormalClassify.tools.desc', '')}
                        >
                            {
                                allDesc.map(v => <Option key={v} value={v} >{v}</Option>)
                            }
                        </Select> */}
                        <Select
                            size='small'
                            className={styles.w100}
                            placeholder="可展开添加新的异常描述"
                            value={desc}
                            onChange={retSetNewAbnormalByPlaneObj('problem.abnormalClassify.tools.desc', '')}
                            dropdownRender={menu => (
                                <div>
                                    {menu}
                                    <Divider style={{ margin: '4px 0' }} />
                                    <div style={{ display: 'flex', flexWrap: 'nowrap', padding: '2px 8px' }}>
                                        <Input size='small' style={{ flex: 'auto' }} value={newDesc} onChange={e => { setNewDesc(e.target.value) }} />
                                        <a
                                            style={{ flex: 'none', padding: '2px 8px', display: 'block', cursor: 'pointer' }}
                                            onClick={addDesc}
                                        >
                                            <PlusOutlined /> 新增
                                        </a>
                                    </div>
                                </div>
                            )}
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
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.problem.classification.lable.skuno' })
                    }</Col>
                    <Col span={15}>
                        <Input size="small" value={skuno} onChange={retSetNewAbnormalByPlaneObj('problem.abnormalClassify.tools.skuno', 'target.value')} />
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.problem.classification.lable.station' })
                    }</Col>
                    <Col span={15}>
                        <Input size="small" value={station} onChange={retSetNewAbnormalByPlaneObj('problem.abnormalClassify.tools.station', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={12}></Col>
        </Row>
    </div>
}

ProblemTools = connect(state => {
    return {
        tools: state.AbnormalDecision.anomalousGraph.newAbnormal.problem.abnormalClassify.tools
    }
})(ProblemTools);

let ProblemSystem = props => {  //系統異常
    // allCategory: [],
    // category: '', //异常类别
    // desc: '', //異常描述
    // startTime: '' //異常開始時間
    let { retSetNewAbnormalByPlaneObj, retSetNewAbnormalByMoment } = useContext(NewAbnormalContext);
    let { allCategory, category, desc, startTime } = props.system;

    let [newCategory, setNewCategory] = useState('');   // 新的异常描述
    let addCategory = useCallback(() => {
        props.dispatch({
            type: 'AbnormalDecision/setNewAbnormalByFn',
            retNewState: _ => {
                _.problem.abnormalClassify.system.allCategory.push('其它：' + newCategory);
                _.problem.abnormalClassify.system.category = '其它：' + newCategory;
                return _;
            }
        });
        setNewCategory('');
    }, [newCategory]);

    return <div style={{ width: '100%' }}>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.problem.classification.lable.case-category' })
                    }</Col>
                    <Col span={15}>
                        {/* <Select size='small' className={styles.w100} value={category}
                            onChange={retSetNewAbnormalByPlaneObj('problem.abnormalClassify.system.category', '')}
                        >
                            {
                                allCategory.map(v => <Option key={v} value={v} >{v}</Option>)
                            }
                        </Select> */}
                        <Select
                            size='small'
                            className={styles.w100}
                            placeholder="可展开添加新的异常描述"
                            value={category}
                            onChange={retSetNewAbnormalByPlaneObj('problem.abnormalClassify.system.category', '')}
                            dropdownRender={menu => (
                                <div>
                                    {menu}
                                    <Divider style={{ margin: '4px 0' }} />
                                    <div style={{ display: 'flex', flexWrap: 'nowrap', padding: '2px 8px' }}>
                                        <Input size='small' style={{ flex: 'auto' }} value={newCategory} onChange={e => { setNewCategory(e.target.value) }} />
                                        <a
                                            style={{ flex: 'none', padding: '2px 8px', display: 'block', cursor: 'pointer' }}
                                            onClick={addCategory}
                                        >
                                            <PlusOutlined /> 新增
                                        </a>
                                    </div>
                                </div>
                            )}
                        >
                            {
                                allCategory.map(v => <Option key={v} value={v} >{v}</Option>)
                            }
                        </Select>
                    </Col>
                </Row>
            </Col>
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.problem.classification.lable.desc' })
                    }</Col>
                    <Col span={15}>
                        <Input size="small" value={desc} onChange={retSetNewAbnormalByPlaneObj('problem.abnormalClassify.system.desc', 'target.value')} />
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.problem.classification.lable.startTime' })
                    }</Col>
                    <Col span={15}>
                        <DatePicker className={styles.w100} onChange={retSetNewAbnormalByMoment('problem.abnormalClassify.system.startTime')}
                            value={moment(startTime, 'YYYY/MM/DD HH:mm')} format='YYYY/MM/DD HH:mm' showTime
                        />
                    </Col>
                </Row>
            </Col>
            <Col span={12}></Col>
        </Row>
    </div>
}

ProblemSystem = connect(state => {
    return {
        system: state.AbnormalDecision.anomalousGraph.newAbnormal.problem.abnormalClassify.system
    }
})(ProblemSystem);

//--------------------------------------------------------------------------------------------------------------------------------------------



let Step4 = props => {
    // countermeasures: { //临时对策
    //     allManpowerArrangement: [],
    //     lostWorkTime: '', //损失工时
    //     idleHuman: '', //闲置人力
    //     manpowerArrangement: '', //闲置人力安排
    //     lostOutput: '', //损失产出
    //     lostYield: '', //良率損失
    //     measures: '' //臨時解決措施
    // },
    let { current, prevStep, nextStep, retSetNewAbnormalByPlaneObj } = useContext(NewAbnormalContext);
    let {
        allManpowerArrangement,
        lostWorkTime, idleHuman, manpowerArrangement, lostOutput, lostYield, measures
    } = props.countermeasures;

    return <div className={styles['step4']} style={{ display: current == 3 ? 'block' : 'none' }}>
        <Row gutter={[0, 24]} justify="center" style={{ marginTop: '20px' }}>
            <Col span={9}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.countermeasures.lostWorkTime' })
                    }</Col>
                    <Col span={16}>
                        {/* <InputNumber
                            style={{width: '100%'}}
                            defaultValue={0}
                            min={0}
                            formatter={value => `${value}min`}
                            parser={value => value.replace('min', '')}
                            // onChange={}
                        /> */}
                        <Input prefix="" suffix="min" value={lostWorkTime} onChange={retSetNewAbnormalByPlaneObj('countermeasures.lostWorkTime', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={9}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.countermeasures.idleHuman' })
                    }</Col>
                    <Col span={16}>
                        <Input value={idleHuman} onChange={retSetNewAbnormalByPlaneObj('countermeasures.idleHuman', 'target.value')} />
                    </Col>
                </Row>
            </Col>
        </Row>

        <Row gutter={[0, 24]} justify="center">
            <Col span={9}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.countermeasures.manpowerArrangement' })
                    }</Col>
                    <Col span={16}>
                        <Select className={styles.w100} value={manpowerArrangement}
                            onChange={retSetNewAbnormalByPlaneObj('countermeasures.manpowerArrangement', '')}
                        >
                            {
                                allManpowerArrangement.map(v => <Option key={v} value={v} >{v}</Option>)
                            }
                        </Select>
                    </Col>
                </Row>
            </Col>
            <Col span={9}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.countermeasures.lostOutput' })
                    }</Col>
                    <Col span={16}>
                        <Input prefix="" suffix="pcs" value={lostOutput} onChange={retSetNewAbnormalByPlaneObj('countermeasures.lostOutput', 'target.value')} />
                    </Col>
                </Row>
            </Col>
        </Row>

        <Row gutter={[0, 24]} justify="center">
            <Col span={9}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.countermeasures.lostYield' })
                    }</Col>
                    <Col span={16}>
                        <Input prefix="" suffix="%" value={lostYield} onChange={retSetNewAbnormalByPlaneObj('countermeasures.lostYield', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={9}></Col>
        </Row>
        <Row gutter={[0, 24]} justify="center">
            <Col span={18}>
                <Row>
                    <Col span={4} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.countermeasures.measures' })
                    }</Col>
                    <Col span={20}>
                        <TextArea value={measures} onChange={retSetNewAbnormalByPlaneObj('countermeasures.measures', 'target.value')} />
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 24]} justify="center">
            <Col span={8} style={{ textAlign: 'center' }}>
                <Space size="large">
                    <Button type="primary" size="small" icon={<ArrowUpOutlined />} onClick={prevStep}> {
                        formatMessage({ id: 'abnormal-decision-center.add-case.handle.previous-step' })
                    } </Button>
                    <Button type="primary" size="small" icon={<ArrowDownOutlined />} onClick={nextStep}> {
                        formatMessage({ id: 'abnormal-decision-center.add-case.handle.next-step' })
                    } </Button>
                </Space>
            </Col>
        </Row>
    </div>
}

Step4 = connect(state => {
    return {
        countermeasures: state.AbnormalDecision.anomalousGraph.newAbnormal.countermeasures
    }
})(Step4);


let Step5 = props => {
    //                 allChargePerson: [], // 所有負責人
    //                 allSectionManager: [], //所有負責人课级
    //                 allMinister: [], //所有負責人部级
    //                 allSectionChief: [], //所有負責人处级
    //                 allNotifier: [], // 所有異常知會人
    //                 chargePerson: [], // 負責人
    //                 sectionManager: [], //負責人课级
    //                 minister: [], //負責人部级
    //                 sectionChief: [], //負責人处级
    //                 notifier: [] // 異常知會人
    let { current, prevStep, nextStep, retSetNewAbnormalByPlaneObj } = useContext(NewAbnormalContext);
    let {
        allChargePerson, allSectionManager, allMinister, allSectionChief, allNotifier,
        chargePerson, sectionManager, minister, sectionChief, notifier
    } = props.causeAnalysis;

    return <div className={styles['step5']} style={{ display: current == 4 ? 'block' : 'none' }}>
        <Row gutter={[0, 24]} justify="center" style={{ marginTop: '20px' }}>
            <Col span={24}>
                <Row>
                    <Col span={4} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.cause-analysis.chargePerson' })
                    }</Col>
                    <Col span={10}>
                        <Select mode="multiple" className={styles.w100} showArrow value={chargePerson}
                            options={allChargePerson.map(v => ({ value: v }))}
                            onChange={retSetNewAbnormalByPlaneObj('causeAnalysis.chargePerson', '')}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>

        <Row gutter={[0, 24]} justify="center">
            <Col span={24}>
                <Row>
                    <Col span={4} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.cause-analysis.sectionManager' })
                    }</Col>
                    <Col span={10}>
                        <Select mode="multiple" className={styles.w100} showArrow value={sectionManager}
                            options={allSectionManager.map(v => ({ value: v }))}
                            onChange={retSetNewAbnormalByPlaneObj('causeAnalysis.sectionManager', '')}
                        />
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={4} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.cause-analysis.minister' })
                    }</Col>
                    <Col span={10}>
                        <Select mode="multiple" className={styles.w100} showArrow value={minister}
                            options={allMinister.map(v => ({ value: v }))}
                            onChange={retSetNewAbnormalByPlaneObj('causeAnalysis.minister', '')}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>

        <Row gutter={[0, 24]} justify="center">
            <Col span={24}>
                <Row>
                    <Col span={4} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.cause-analysis.sectionChief' })
                    }</Col>
                    <Col span={10}>
                        <Select mode="multiple" className={styles.w100} showArrow value={sectionChief}
                            options={allSectionChief.map(v => ({ value: v }))}
                            onChange={retSetNewAbnormalByPlaneObj('causeAnalysis.sectionChief', '')}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 24]} justify="center">
            <Col span={24}>
                <Row>
                    <Col span={4} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.cause-analysis.notifier' })
                    }</Col>
                    <Col span={19}>
                        <Select mode="multiple" className={styles.w100} showArrow value={notifier}
                            options={allNotifier.map(v => ({ value: v }))}
                            onChange={retSetNewAbnormalByPlaneObj('causeAnalysis.notifier', '')}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 24]} justify="center">
            <Col span={8} style={{ textAlign: 'center' }}>
                <Space size="large">
                    <Button type="primary" size="small" icon={<ArrowUpOutlined />} onClick={prevStep}> {
                        formatMessage({ id: 'abnormal-decision-center.add-case.handle.previous-step' })
                    } </Button>
                    <Button type="primary" size="small" icon={<ArrowDownOutlined />} onClick={nextStep}> {
                        formatMessage({ id: 'abnormal-decision-center.add-case.handle.next-step' })
                    } </Button>
                </Space>
            </Col>
        </Row>
    </div>
}

Step5 = connect(state => {
    return {
        causeAnalysis: state.AbnormalDecision.anomalousGraph.newAbnormal.causeAnalysis
    }
})(Step5);

let Step6 = props => {
    // remarksAndAttachments: {  // 備註與附件
    //     problemStatus: '', // 問題狀態
    //     remarks: '', // 備註
    //     attachments: [] // 附件
    // }
    let { current, prevStep, setNewAbnormal, retSetNewAbnormalByPlaneObj } = useContext(NewAbnormalContext);
    let dispatch = props.dispatch;
    let { problemStatus, remarks, attachments } = props.remarksAndAttachments;
    // console.log(attachments);
    let prop = {
        fileList: attachments.length > 0 ? attachments : null,
        // action: '/api/xxxx',
        multiple: true,
        progress: {
            strokeColor: {
                '0%': '#108ee9',
                '100%': '#87d068',
            },
            strokeWidth: 3,
            format: percent => `${parseFloat(percent.toFixed(2))}%`,
        },
        onChange: info => {  //status变化时执行 fileList内容不是Blob对象，被代理了
            // console.log(info);  // file: {status}, fileList
            if (info.file.status == "removed") {  //已删除
                dispatch({
                    type: 'AbnormalDecision/setNewAbnormalByFn',
                    retNewState: state => {
                        state.remarksAndAttachments.attachments = state.remarksAndAttachments.attachments.filter(_f => _f.uid != info.file.uid);
                        return state;
                    }
                });
            } else { //新增
                attachments.filter(_f => _f.name == info.file.name).length == 0 && dispatch({
                    type: 'AbnormalDecision/setNewAbnormalByFn',
                    retNewState: state => {
                        state.remarksAndAttachments.attachments.push(info.file);
                        return state;
                    }
                });
            }
        },
        beforeUpload: (file, fileList) => {  //上传前执行
            return false;  //阻止上传
        },
        // customRequest: (e) => {
        //     // console.log(e);
        //     dispatch({
        //         type: 'AbnormalDecision/uploadFile',
        //         file: e.file
        //     });
        // }  //覆盖默认上传操作
    }

    let submit = useCallback(() => {
        dispatch({
            type: 'AbnormalDecision/newAbnormal'
        });
    }, []);

    return <div className={styles['step6']} style={{ display: current == 5 ? 'block' : 'none' }}>
        <Row gutter={[0, 24]} justify="center" style={{ marginTop: '20px' }}>
            <Col span={18}>
                <Row>
                    <Col span={4} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.remarks-and-attachments.problemStatus' })
                    }</Col>
                    <Col span={20}>
                        <Space>
                            <Radio.Group value={problemStatus} onChange={retSetNewAbnormalByPlaneObj('remarksAndAttachments.problemStatus', 'target.value')}>
                                <Radio value="等待處理">{
                                    formatMessage({ id: 'abnormal-decision-center.add-case.remarks-and-attachments.problemStatus.waiting' })
                                }</Radio>
                                <Radio value="處理中">{
                                    formatMessage({ id: 'abnormal-decision-center.add-case.remarks-and-attachments.problemStatus.doing' })
                                }</Radio>
                            </Radio.Group>
                        </Space>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 24]} justify="center">
            <Col span={18}>
                <Row>
                    <Col span={4} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.remarks-and-attachments.remarks' })
                    }</Col>
                    <Col span={20}>
                        <TextArea value={remarks} onChange={retSetNewAbnormalByPlaneObj('remarksAndAttachments.remarks', 'target.value')} />
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 24]} justify="center">
            <Col span={18}>
                <Row>
                    <Col span={4} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.add-case.remarks-and-attachments.attachments' })
                    }</Col>
                    <Col span={20}>
                        <Upload {...prop}>
                            <Button size='small' icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 24]} justify="center">
            <Col span={8} style={{ textAlign: 'center' }}>
                <Space size="large">
                    <Button type="primary" size="small" icon={<ArrowUpOutlined />} onClick={prevStep}> {
                        formatMessage({ id: 'abnormal-decision-center.add-case.handle.previous-step' })
                    } </Button>
                    <Button type="primary" size="small" icon={<SaveOutlined />} onClick={submit}> {
                        formatMessage({ id: 'abnormal-decision-center.add-case.handle.submit' })
                    } </Button>
                </Space>
            </Col>
        </Row>
    </div>
}

Step6 = connect(state => {
    return {
        remarksAndAttachments: state.AbnormalDecision.anomalousGraph.newAbnormal.remarksAndAttachments
    }
})(Step6);

