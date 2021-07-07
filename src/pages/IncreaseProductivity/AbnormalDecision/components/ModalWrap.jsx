
import React, { memo, createContext, useState, useEffect, useMemo, useCallback, useContext } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { useDispatch, useSelector } from 'dva';
import { connect, FormattedMessage, formatMessage } from 'umi';
import { Button, Space, Input, Tabs, Steps, message, Checkbox, Popover, Row, Col, Divider, Select, Radio, DatePicker, InputNumber, Tooltip, Upload } from 'antd';
import { SearchOutlined, PlusOutlined, ProfileOutlined, BarsOutlined, ZoomInOutlined, OrderedListOutlined, CheckOutlined, CloseOutlined, UploadOutlined, SaveOutlined, BorderBottomOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import moment from 'moment';
import { findValueByProp, getBase64 } from '../../../../utils/custom'
import styles from '../style.less';

import png1 from '../../../../file/img/ycjc1.png';
import png2 from '../../../../file/img/ycjc2.png';
import png3 from '../../../../file/img/logo1.png';
import png4 from '../../../../file/img/login1.png';
import png5 from '../../../../file/img/login2.png';

const { TabPane } = Tabs;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Step } = Steps;

let EditAbnormalContext = createContext();

let EditAbnormal = () => {  // 修改异常
    console.log('render EditAbnormal');
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

    let setEditAbnormal = useCallback((prop, value) => {  //設置本模塊數據
        dispatch({
            type: 'AbnormalDecision/setAbnormalMaintenanceByProp',
            prop, value
        });
    }, []);

    let retSetEditAbnormalByPlaneObj = (stateProp, eProp) => e => {   //平面Obj
        setEditAbnormal(stateProp, findValueByProp(e, eProp));
    }

    let retSetEditAbnormalByMoment = prop => moment => {
        setEditAbnormal(prop, moment.format('YYYY/MM/DD hh:mm'));
    }

    //获取新增异常需要的附带信息 getNewAbnormalMsg
    // useMemo(() => {
    //     dispatch({
    //         type: 'AbnormalDecision/getNewAbnormalMsg'
    //     });
    // }, []);
    // 基本信息 上報機制 問題描述 臨時對策 原因分析 備註與附件

    return <div className={styles['modal-wrap']}>
        <div className={styles['new-abnormal-steps']}>
            <p></p>
            <Steps size='small' current={current} direction="vertical" onChange={setpChange}>
                <Step title={
                    formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.base-msg' })
                }></Step>
                <Step title={
                    formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.report' })
                }></Step>
                <Step title={
                    formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.problem' })
                }></Step>
                <Step title={
                    formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.countermeasures' })
                }></Step>
                <Step title={
                    formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.cause-analysis' })
                }></Step>
                <Step title={
                    formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.remarks-and-attachments' })
                }></Step>
                <Step title={
                    formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.issue-tracking' })
                }></Step>
            </Steps>
        </div>
        <div className={styles['new-abnormal-steps-right']}>
            <EditAbnormalContext.Provider value={{ current, setCurrent, prevStep, nextStep, setEditAbnormal, retSetEditAbnormalByPlaneObj, retSetEditAbnormalByMoment }}>
                <StepContent current={current} />
            </EditAbnormalContext.Provider>
        </div>
    </div>
}

export default EditAbnormal;


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
        case 6:
            return <Step7 />
        default:
            return <Step1 />
    }
}

// ==================================================================================================================================

let Step1 = props => {
    let { nextStep, retSetEditAbnormalByPlaneObj, retSetEditAbnormalByMoment } = useContext(EditAbnormalContext);
    let { type, emergencyDegree, baseMsg } = props;
    let {
        allAbnormalClass, allBU, allRegion, allStage,
        issuer, units, date, abnormalTime, abnormalClass, BU, region, station, skuName, skuno, WO, stage
    } = baseMsg;

    // console.log(allBU);
    return <div className={styles['step1']}>
        <div style={{ textAlign: 'center' }}>
            <p></p>
            <h3><b>{
                formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.title' })
            }</b></h3>
            <Space size="middle">
                <b>{
                    formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.type' })
                }</b>
                <Radio.Group value={type} onChange={retSetEditAbnormalByPlaneObj('type', 'target.value')}>
                    <Radio value="異常"> {
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.type.abnormal' })
                    } </Radio>
                    <Radio value="停線"> {
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.type.stop-line' })
                    } </Radio>
                </Radio.Group>
                <span>  </span>
                <b>{
                    formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.emergencyDegree' })
                }</b>
                <Radio.Group value={emergencyDegree} onChange={retSetEditAbnormalByPlaneObj('emergencyDegree', 'target.value')}>
                    <Radio value="正常"> {
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.emergencyDegree.normal' })
                    } </Radio>
                    <Radio value="緊急"> {
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.emergencyDegree.urgent' })
                    } </Radio>
                </Radio.Group>
            </Space>
        </div>

        <Row gutter={[0, 24]} justify="center" style={{ marginTop: '20px' }}>
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.base-msg.issuer' })
                    }</Col>
                    <Col span={15}><Input disabled={true} value={issuer} /></Col>
                </Row>
            </Col>
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.base-msg.units' })
                    }</Col>
                    <Col span={15}><Input disabled={true} value={units} /></Col>
                </Row>
            </Col>
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.base-msg.date' })
                    }</Col>
                    <Col span={15}><Input disabled={true} value={date} /></Col>
                </Row>
            </Col>
        </Row>

        <Row gutter={[0, 24]} justify="center">
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.base-msg.abnormalTime' })
                    }</Col>
                    <Col span={15}>
                        <DatePicker className={styles.w100} onChange={retSetEditAbnormalByMoment('baseMsg.abnormalTime')}
                            value={moment(abnormalTime, 'YYYY/MM/DD hh:mm')} format='YYYY/MM/DD hh:mm' showTime
                        />
                    </Col>
                </Row>
            </Col>
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.base-msg.abnormalClass' })
                    }</Col>
                    <Col span={15}>
                        <Select className={styles.w100} value={abnormalClass} onChange={retSetEditAbnormalByPlaneObj('baseMsg.abnormalClass', '')}>
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
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.base-msg.BU' })
                    }</Col>
                    <Col span={15}>
                        <Select className={styles.w100} value={BU} onChange={retSetEditAbnormalByPlaneObj('baseMsg.BU', '')}>
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
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.base-msg.region' })
                    }</Col>
                    <Col span={15}>
                        <Select className={styles.w100} value={region} onChange={retSetEditAbnormalByPlaneObj('baseMsg.region', '')}>
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
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.base-msg.station' })
                    }</Col>
                    <Col span={15}><Input value={station} onChange={retSetEditAbnormalByPlaneObj('baseMsg.station', 'target.value')} /></Col>
                </Row>
            </Col>
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.base-msg.skuName' })
                    }</Col>
                    <Col span={15}><Input value={skuName} onChange={retSetEditAbnormalByPlaneObj('baseMsg.skuName', 'target.value')} /></Col>
                </Row>
            </Col>
        </Row>

        <Row gutter={[0, 24]} justify="center">
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.base-msg.skuno' })
                    }</Col>
                    <Col span={15}><Input value={skuno} onChange={retSetEditAbnormalByPlaneObj('baseMsg.skuno', 'target.value')} /></Col>
                </Row>
            </Col>
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.base-msg.WO' })
                    }</Col>
                    <Col span={15}><Input value={WO} onChange={retSetEditAbnormalByPlaneObj('baseMsg.WO', 'target.value')} /></Col>
                </Row>
            </Col>
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.base-msg.stage' })
                    }</Col>
                    <Col span={15}>
                        <Select className={styles.w100} value={stage} onChange={retSetEditAbnormalByPlaneObj('baseMsg.stage', '')}>
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
        type: state.AbnormalDecision.abnormalMaintenance.type,
        emergencyDegree: state.AbnormalDecision.abnormalMaintenance.emergencyDegree,
        baseMsg: state.AbnormalDecision.abnormalMaintenance.baseMsg
    }
})(Step1)




let Step2 = props => {
    // allSectionManager: [],
    //                 allMinister: [],
    //                 sectionChief: [],
    //                 sectionManager: '', //课级
    //                 minister: '', //部级
    //                 sectionChief: '', //处级
    let { prevStep, nextStep, retSetEditAbnormalByPlaneObj } = useContext(EditAbnormalContext);

    let {
        allSectionManager, allMinister, allSectionChief,
        sectionManager, minister, sectionChief
    } = props.report;

    return <div className={styles['step2']}>
        <Row gutter={[0, 24]} justify="center" style={{ marginTop: '20px' }}>
            <Col span={24}>
                <Row>
                    <Col span={4}></Col>
                    <Col span={4} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.report.sectionManager' })
                    }</Col>
                    <Col span={10}>
                        <Select className={styles.w100} value={sectionManager} onChange={retSetEditAbnormalByPlaneObj('report.sectionManager', '')}>
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
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.report.minister' })
                    }</Col>
                    <Col span={10}>
                        <Select className={styles.w100} value={minister} onChange={retSetEditAbnormalByPlaneObj('report.minister', '')}>
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
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.report.sectionChief' })
                    }</Col>
                    <Col span={10}>
                        <Select className={styles.w100} value={sectionChief} onChange={retSetEditAbnormalByPlaneObj('report.sectionChief', '')}>
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
        report: state.AbnormalDecision.abnormalMaintenance.report
    }
})(Step2);



let Step3 = props => {
    let { prevStep, nextStep, retSetEditAbnormalByPlaneObj, retSetEditAbnormalByMoment } = useContext(EditAbnormalContext);
    let { currentClassify, allHandler, handler, noticeTime, emailTitle } = props;

    return <div className={styles['step3']}>
        <Row gutter={[0, 24]} justify="center" style={{ marginTop: '20px' }}>
            <Col span={16}>
                <Row>
                    <Col span={6} style={{ textAlign: 'right', paddingRight: '15px' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.problem.handler' })
                    }</Col>
                    <Col span={18}>
                        {/* 多选 */}
                        <Select mode="multiple" className={styles.w100} showArrow value={handler}
                            onChange={retSetEditAbnormalByPlaneObj('problem.handler', '')}
                            options={allHandler.map(v => ({ value: v }))}
                        />
                    </Col>
                </Row>
            </Col>
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.problem.noticeTime' })
                    }</Col>
                    <Col span={13}>
                        <DatePicker className={styles.w100} onChange={retSetEditAbnormalByMoment('problem.noticeTime')}
                            value={moment(noticeTime, 'YYYY/MM/DD hh:mm')} format='YYYY/MM/DD hh:mm' showTime
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 24]} justify="center">
            <Col span={24}>
                <Row>
                    <Col span={4} style={{ textAlign: 'right', paddingRight: '15px' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.problem.emailTitle' })
                    }</Col>
                    <Col span={19}>
                        <TextArea value={emailTitle} onChange={retSetEditAbnormalByPlaneObj('problem.emailTitle', 'target.value')} />
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 24]} justify="center">
            <Col span={24}>
                <Row>
                    <Col span={4} style={{ textAlign: 'right', paddingRight: '15px' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.problem.classification' })
                    }</Col>
                    <Col span={19}>

                        {/* ====================================================================================================================================== */}

                        {/* 設備異常 物料異常 人員異常 品質異常 治工具異常 系統異常     */}
                        <Tabs size="small" type='card' activeKey={currentClassify}
                            onChange={retSetEditAbnormalByPlaneObj('problem.abnormalClassify.currentClassify', '')}
                            style={{ width: '100%', border: '1px solid #ddd' }}
                        >
                            <TabPane tab={
                                formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.problem.classification.tab.equipment' })
                            } key="equipment">
                                <ProblemEquipment />
                            </TabPane>
                            <TabPane tab={
                                formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.problem.classification.tab.material' })
                            } key="material">
                                <ProblemMaterial />
                            </TabPane>
                            <TabPane tab={
                                formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.problem.classification.tab.person' })
                            } key="person">
                                <ProblemPerson />
                            </TabPane>
                            <TabPane tab={
                                formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.problem.classification.tab.quality' })
                            } key="quality">
                                <ProblemQuality />
                            </TabPane>
                            <TabPane tab={
                                formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.problem.classification.tab.tools' })
                            } key="tools">
                                <ProblemTools />
                            </TabPane>
                            <TabPane tab={
                                formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.problem.classification.tab.system' })
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
                    <Button type="primary" size="small" icon={<ArrowUpOutlined />} onClick={prevStep}> 上一步 </Button>
                    <Button type="primary" size="small" icon={<ArrowDownOutlined />} onClick={nextStep}> 下一步 </Button>
                </Space>
            </Col>
        </Row>
    </div>
}

Step3 = connect(state => {
    return {
        currentClassify: state.AbnormalDecision.abnormalMaintenance.problem.abnormalClassify.currentClassify,
        allHandler: state.AbnormalDecision.abnormalMaintenance.problem.allHandler,
        handler: state.AbnormalDecision.abnormalMaintenance.problem.handler,
        noticeTime: state.AbnormalDecision.abnormalMaintenance.problem.noticeTime,
        emailTitle: state.AbnormalDecision.abnormalMaintenance.problem.emailTitle
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
    let { retSetEditAbnormalByPlaneObj } = useContext(EditAbnormalContext);
    let {
        allDesc, allCategory,
        desc, category, name, equipmentNumber, equipmentModel
    } = props.equipment;

    return <div style={{ width: '100%' }}>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.problem.classification.lable.desc' })
                    }</Col>
                    <Col span={15}>
                        <Select size='small' className={styles.w100} value={desc}
                            onChange={retSetEditAbnormalByPlaneObj('problem.abnormalClassify.equipment.desc', '')}
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
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.problem.classification.lable.category' })
                    }</Col>
                    <Col span={15}>
                        <Select size='small' className={styles.w100} value={category}
                            onChange={retSetEditAbnormalByPlaneObj('problem.abnormalClassify.equipment.category', '')}
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
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.problem.classification.lable.name' })
                    }</Col>
                    <Col span={15}>
                        <Input size="small" value={name} onChange={retSetEditAbnormalByPlaneObj('problem.abnormalClassify.equipment.name', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.problem.classification.lable.equipmentNumber' })
                    }</Col>
                    <Col span={15}>
                        <Input size="small" value={equipmentNumber} onChange={retSetEditAbnormalByPlaneObj('problem.abnormalClassify.equipment.equipmentNumber', 'target.value')} />
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.problem.classification.lable.equipmentModel' })
                    }</Col>
                    <Col span={15}>
                        <Input size="small" value={equipmentModel} onChange={retSetEditAbnormalByPlaneObj('problem.abnormalClassify.equipment.equipmentModel', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={12}></Col>
        </Row>
    </div>
}

ProblemEquipment = connect(state => {
    return {
        equipment: state.AbnormalDecision.abnormalMaintenance.problem.abnormalClassify.equipment
    }
})(ProblemEquipment);

let ProblemMaterial = props => {  //物料異常
    let { retSetEditAbnormalByPlaneObj } = useContext(EditAbnormalContext);
    // allDesc: ['來料短缺', '物料Delay', '錯料', '混料', '物料包裝異常', '特采過期', '包裝信息與實物不符', '有帳無務', '其它'],
    // desc: '來料短缺', //异常描述
    // partNo: '', //零件料号
    // rejectRatio: '', //不良率
    // supplier: '', //供应商
    // DC: '',
    // LC: ''
    let { allDesc, desc, DC, LC, partNo, rejectRatio, supplier } = props.material;

    return <div style={{ width: '100%' }}>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.problem.classification.lable.desc' })
                    }</Col>
                    <Col span={15}>
                        <Select size='small' className={styles.w100} value={desc}
                            onChange={retSetEditAbnormalByPlaneObj('problem.abnormalClassify.material.desc', '')}
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
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.problem.classification.lable.DC' })
                    }</Col>
                    <Col span={15}>
                        <Input size="small" value={DC} onChange={retSetEditAbnormalByPlaneObj('problem.abnormalClassify.material.DC', 'target.value')} />
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.problem.classification.lable.LC' })
                    }</Col>
                    <Col span={15}>
                        <Input size="small" value={LC} onChange={retSetEditAbnormalByPlaneObj('problem.abnormalClassify.material.LC', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.problem.classification.lable.partNo' })
                    }</Col>
                    <Col span={15}>
                        <Input size="small" value={partNo} onChange={retSetEditAbnormalByPlaneObj('problem.abnormalClassify.material.partNo', 'target.value')} />
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.problem.classification.lable.rejectRatio' })
                    }</Col>
                    <Col span={15}>
                        <Input size="small" value={rejectRatio} onChange={retSetEditAbnormalByPlaneObj('problem.abnormalClassify.material.rejectRatio', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.problem.classification.lable.supplier' })
                    }</Col>
                    <Col span={15}>
                        <Input size="small" value={supplier} onChange={retSetEditAbnormalByPlaneObj('problem.abnormalClassify.material.supplier', 'target.value')} />
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>
}

ProblemMaterial = connect(state => {
    return {
        material: state.AbnormalDecision.abnormalMaintenance.problem.abnormalClassify.material
    }
})(ProblemMaterial);


let ProblemPerson = props => {  //人員異常
    let { retSetEditAbnormalByPlaneObj } = useContext(EditAbnormalContext);
    let { allDesc, desc } = props.person;
    return <div style={{ width: '100%' }}>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.problem.classification.lable.desc' })
                    }</Col>
                    <Col span={15}>
                        <Select size='small' className={styles.w100} value={desc}
                            onChange={retSetEditAbnormalByPlaneObj('problem.abnormalClassify.person.desc', '')}
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
        person: state.AbnormalDecision.abnormalMaintenance.problem.abnormalClassify.person
    }
})(ProblemPerson);


let ProblemQuality = props => {  //品質異常
    let { retSetEditAbnormalByPlaneObj } = useContext(EditAbnormalContext);
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
    return <div style={{ width: '100%' }}>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.problem.classification.lable.process' })
                    }</Col>
                    <Col span={15}>
                        <Select size='small' className={styles.w100} value={process}
                            onChange={retSetEditAbnormalByPlaneObj('problem.abnormalClassify.quality.process', '')}
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
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.problem.classification.lable.badPhenomenon' })
                    }</Col>
                    <Col span={14}>
                        <Select size='small' className={styles.w100} value={badPhenomenon}
                            onChange={retSetEditAbnormalByPlaneObj('problem.abnormalClassify.quality.badPhenomenon', '')}
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
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.problem.classification.lable.station' })
                    }</Col>
                    <Col span={15}>
                        <Input size="small" value={station} onChange={retSetEditAbnormalByPlaneObj('problem.abnormalClassify.quality.station', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.problem.classification.lable.scope' })
                    }</Col>
                    <Col span={14}>
                        <Select size='small' className={styles.w100} value={scope}
                            onChange={retSetEditAbnormalByPlaneObj('problem.abnormalClassify.quality.scope', '')}
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
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.problem.classification.lable.measures' })
                    }</Col>
                    <Col span={19}>
                        <TextArea size="small" value={measures} onChange={retSetEditAbnormalByPlaneObj('problem.abnormalClassify.quality.measures', 'target.value')} />
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>
}

ProblemQuality = connect(state => {
    return {
        quality: state.AbnormalDecision.abnormalMaintenance.problem.abnormalClassify.quality
    }
})(ProblemQuality);


let ProblemTools = props => {  //治工具異常
    // allDesc: [],
    // desc: '',   //异常描述
    // skuno: '',  //涉及的产品料号
    // station: '' //使用站位
    let { retSetEditAbnormalByPlaneObj } = useContext(EditAbnormalContext);
    let { allDesc, desc, skuno, station } = props.tools;

    return <div style={{ width: '100%' }}>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.problem.classification.lable.desc' })
                    }</Col>
                    <Col span={15}>
                        <Select size='small' className={styles.w100} value={desc}
                            onChange={retSetEditAbnormalByPlaneObj('problem.abnormalClassify.tools.desc', '')}
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
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.problem.classification.lable.skuno' })
                    }</Col>
                    <Col span={15}>
                        <Input size="small" value={skuno} onChange={retSetEditAbnormalByPlaneObj('problem.abnormalClassify.tools.skuno', 'target.value')} />
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.problem.classification.lable.station' })
                    }</Col>
                    <Col span={15}>
                        <Input size="small" value={station} onChange={retSetEditAbnormalByPlaneObj('problem.abnormalClassify.tools.station', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={12}></Col>
        </Row>
    </div>
}

ProblemTools = connect(state => {
    return {
        tools: state.AbnormalDecision.abnormalMaintenance.problem.abnormalClassify.tools
    }
})(ProblemTools);

let ProblemSystem = props => {  //系統異常
    // allCategory: [],
    // category: '', //异常类别
    // desc: '', //異常描述
    // startTime: '' //異常開始時間
    let { retSetEditAbnormalByPlaneObj, retSetEditAbnormalByMoment } = useContext(EditAbnormalContext);
    let { allCategory, category, desc, startTime } = props.system;

    return <div style={{ width: '100%' }}>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.problem.classification.lable.category' })
                    }</Col>
                    <Col span={15}>
                        <Select size='small' className={styles.w100} value={category}
                            onChange={retSetEditAbnormalByPlaneObj('problem.abnormalClassify.system.category', '')}
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
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.problem.classification.lable.desc' })
                    }</Col>
                    <Col span={15}>
                        <Input size="small" value={desc} onChange={retSetEditAbnormalByPlaneObj('problem.abnormalClassify.system.desc', 'target.value')} />
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.problem.classification.lable.startTime' })
                    }</Col>
                    <Col span={15}>
                        <DatePicker className={styles.w100} onChange={retSetEditAbnormalByMoment('problem.abnormalClassify.system.startTime')}
                            value={moment(startTime, 'YYYY/MM/DD hh:mm')} format='YYYY/MM/DD hh:mm' showTime
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
        system: state.AbnormalDecision.abnormalMaintenance.problem.abnormalClassify.system
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
    let { prevStep, nextStep, retSetEditAbnormalByPlaneObj } = useContext(EditAbnormalContext);
    let {
        allManpowerArrangement,
        lostWorkTime, idleHuman, manpowerArrangement, lostOutput, lostYield, measures
    } = props.countermeasures;
    return <div className={styles['step4']}>
        <Row gutter={[0, 24]} justify="center" style={{ marginTop: '20px' }}>
            <Col span={9}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.countermeasures.lostWorkTime' })
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
                        <Input prefix="" suffix="min" value={lostWorkTime} onChange={retSetEditAbnormalByPlaneObj('countermeasures.lostWorkTime', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={9}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.countermeasures.idleHuman' })
                    }</Col>
                    <Col span={16}>
                        <Input value={idleHuman} onChange={retSetEditAbnormalByPlaneObj('countermeasures.idleHuman', 'target.value')} />
                    </Col>
                </Row>
            </Col>
        </Row>

        <Row gutter={[0, 24]} justify="center">
            <Col span={9}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.countermeasures.manpowerArrangement' })
                    }</Col>
                    <Col span={16}>
                        <Select className={styles.w100} value={manpowerArrangement}
                            onChange={retSetEditAbnormalByPlaneObj('countermeasures.manpowerArrangement', '')}
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
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.countermeasures.lostOutput' })
                    }</Col>
                    <Col span={16}>
                        <Input prefix="" suffix="pcs" value={lostOutput} onChange={retSetEditAbnormalByPlaneObj('countermeasures.lostOutput', 'target.value')} />
                    </Col>
                </Row>
            </Col>
        </Row>

        <Row gutter={[0, 24]} justify="center">
            <Col span={9}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.countermeasures.lostYield' })
                    }</Col>
                    <Col span={16}>
                        <Input prefix="" suffix="%" value={lostYield} onChange={retSetEditAbnormalByPlaneObj('countermeasures.lostYield', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={9}></Col>
        </Row>
        <Row gutter={[0, 24]} justify="center">
            <Col span={18}>
                <Row>
                    <Col span={4} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.countermeasures.measures' })
                    }</Col>
                    <Col span={20}>
                        <TextArea value={measures} onChange={retSetEditAbnormalByPlaneObj('countermeasures.measures', 'target.value')} />
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

Step4 = connect(state => {
    return {
        countermeasures: state.AbnormalDecision.abnormalMaintenance.countermeasures
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
    let { prevStep, nextStep, setEditAbnormal, retSetEditAbnormalByPlaneObj } = useContext(EditAbnormalContext);
    let { parson, allCause, currentClassify } = props;
    let {
        allChargePerson, allSectionManager, allMinister, allSectionChief, allNotifier,
        chargePerson, sectionManager, minister, sectionChief, notifier
    } = parson;

    useEffect(() => {
        // console.log(allCause, currentClassify);
        if (allCause.length > 0 && !allCause.includes(currentClassify)) {
            setEditAbnormal('causeAnalysis.cause.currentClassify', allCause.slice(-1)[0])
        }
    }, [allCause, currentClassify]);

    return <div className={styles['step5']}>
        <Row gutter={[0, 24]} justify="center" style={{ marginTop: '20px' }}>
            <Col span={23}>
                <Row>
                    <Col span={4} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.cause-analysis.chargePerson' })
                    }</Col>
                    <Col span={9}>
                        <Select mode="multiple" className={styles.w100} showArrow value={chargePerson}
                            options={allChargePerson.map(v => ({ value: v }))}
                            onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.parson.chargePerson', '')}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>

        <Row gutter={[0, 24]} justify="center">
            <Col span={23}>
                <Row>
                    <Col span={4} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.cause-analysis.sectionManager' })
                    }</Col>
                    <Col span={9}>
                        <Select mode="multiple" className={styles.w100} showArrow value={sectionManager}
                            options={allSectionManager.map(v => ({ value: v }))}
                            onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.parson.sectionManager', '')}
                        />
                    </Col>
                </Row>
            </Col>
            <Col span={23}>
                <Row>
                    <Col span={4} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.cause-analysis.minister' })
                    }</Col>
                    <Col span={9}>
                        <Select mode="multiple" className={styles.w100} showArrow value={minister}
                            options={allMinister.map(v => ({ value: v }))}
                            onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.parson.minister', '')}
                        />
                    </Col>
                </Row>
            </Col>
            <Col span={23}>
                <Row>
                    <Col span={4} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.cause-analysis.sectionChief' })
                    }</Col>
                    <Col span={9}>
                        <Select mode="multiple" className={styles.w100} showArrow value={sectionChief}
                            options={allSectionChief.map(v => ({ value: v }))}
                            onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.parson.sectionChief', '')}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 24]} justify="center">
            <Col span={23}>
                <Row>
                    <Col span={4} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.cause-analysis.notifier' })
                    }</Col>
                    <Col span={18}>
                        <Select mode="multiple" className={styles.w100} showArrow value={notifier}
                            options={allNotifier.map(v => ({ value: v }))}
                            onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.parson.notifier', '')}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>

        {/* ************************************************************************************************************************** */}

        <Row gutter={[0, 24]} justify="center">
            <Col span={23}>
                <Row>
                    <Col span={4} style={{ textAlign: 'center' }}>原因</Col>
                    <Col span={18}>
                        {/* ['parson', 'equipment', 'material', 'function', 'annulus', 'detection'] */}
                        <Checkbox.Group value={allCause} onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.cause.allCause', '')}>
                            <Checkbox value="parson">{
                                formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.cause-analysis.cause.parson' })
                            }</Checkbox>
                            <Checkbox value="equipment">{
                                formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.cause-analysis.cause.equipment' })
                            }</Checkbox>
                            <Checkbox value="material">{
                                formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.cause-analysis.cause.material' })
                            }</Checkbox>
                            <Checkbox value="function">{
                                formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.cause-analysis.cause.function' })
                            }</Checkbox>
                            <Checkbox value="annulus">{
                                formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.cause-analysis.cause.annulus' })
                            }</Checkbox>
                            <Checkbox value="detection">{
                                formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.cause-analysis.cause.detection' })
                            }</Checkbox>
                        </Checkbox.Group>
                    </Col>
                </Row>
            </Col>
        </Row>

        <Row gutter={[0, 24]} justify="center">
            <Col span={23}>
                <Row>
                    <Col span={4} style={{ textAlign: 'center' }}></Col>
                    <Col span={18}>
                        <Cause />
                    </Col>
                </Row>
            </Col>
        </Row>
        {/* ************************************************************************************************************************** */}

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

Step5 = connect(state => {
    return {
        parson: state.AbnormalDecision.abnormalMaintenance.causeAnalysis.parson,
        allCause: state.AbnormalDecision.abnormalMaintenance.causeAnalysis.cause.allCause,
        currentClassify: state.AbnormalDecision.abnormalMaintenance.causeAnalysis.cause.currentClassify
    }
})(Step5);


//==========================================================================================================================================


let Cause = props => {
    let { currentClassify, allCause } = props;
    let { setEditAbnormal, retSetEditAbnormalByPlaneObj, retSetEditAbnormalByMoment } = useContext(EditAbnormalContext);

    let onEdit = (targetKey, action) => {
        if (action == 'remove') {
            setEditAbnormal('causeAnalysis.cause.allCause', allCause.filter(cause => cause != targetKey))
        }
    }

    if (allCause.length == 0) {
        return <></>;
    }
    return <div className={styles['tab-query']}>
        <Row gutter={[0, 16]} justify="center">
            <Col span={24}>
                {/* 人 機 料 法 環 量檢測     */}
                <Tabs size="small" type='editable-card' activeKey={currentClassify}
                    onEdit={onEdit}
                    onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.cause.currentClassify', '')}
                    style={{ width: '100%', border: '1px solid #ddd' }}
                >
                    {
                        allCause.map(cause => {
                            let config = {};
                            let Children = <></>;
                            switch (cause) {
                                case 'parson':
                                    config = { tab: '人', key: 'parson' };
                                    Children = CauseAnalysisOfParson;
                                    break;
                                case 'equipment':
                                    config = { tab: '机', key: 'equipment' };
                                    Children = CauseAnalysisOfEquipment;
                                    break;
                                case 'material':
                                    config = { tab: '料', key: 'material' };
                                    Children = CauseAnalysisOfMaterial;
                                    break;
                                case 'function':
                                    config = { tab: '法', key: 'function' };
                                    Children = CauseAnalysisOfFunction;
                                    break;
                                case 'annulus':
                                    config = { tab: '环', key: 'annulus' };
                                    Children = CauseAnalysisOfAnnulus;
                                    break;
                                case 'detection':
                                    config = { tab: '量检测', key: 'detection' };
                                    Children = CauseAnalysisOfDetection;
                                    break;
                            }
                            return <TabPane {...config} >
                                <Children />
                            </TabPane>
                        })
                    }
                </Tabs>
            </Col>
        </Row>
    </div>
}

Cause = connect(({ AbnormalDecision }) => {
    return {
        currentClassify: AbnormalDecision.abnormalMaintenance.causeAnalysis.cause.currentClassify,
        allCause: AbnormalDecision.abnormalMaintenance.causeAnalysis.cause.allCause
        // AbnormalDecision.anomalousGraph.advancedSearch.causeAnalysis.currentClassify
    }
})(Cause);

let CauseAnalysisOfParson = props => {
    let { parson } = props;
    let { retSetEditAbnormalByPlaneObj, retSetEditAbnormalByMoment } = useContext(EditAbnormalContext);
    let { allChargePerson, chargePerson, decision, improve } = parson;
    return <div style={{ width: '100%' }}>
        <Row gutter={[0, 16]} justify="center">
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.cause-analysis.cause.lable.chargePerson' })
                    }</Col>
                    <Col span={18}>
                        <Select mode="multiple" className={styles.w100} showArrow value={chargePerson}
                            onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.cause.parson.chargePerson', '')}
                            options={allChargePerson.map(v => ({ value: v }))}
                        />
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.cause-analysis.cause.lable.decision' })
                    }</Col>
                    <Col span={18}>
                        <TextArea value={decision} onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.cause.parson.decision', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.cause-analysis.cause.lable.improve' })
                    }</Col>
                    <Col span={18}>
                        <TextArea value={improve} onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.cause.parson.improve', 'target.value')} />
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>
}

CauseAnalysisOfParson = connect(({ AbnormalDecision }) => {
    return {
        parson: AbnormalDecision.abnormalMaintenance.causeAnalysis.cause.parson
    }
})(CauseAnalysisOfParson);


let CauseAnalysisOfEquipment = props => {
    let { dispatch, equipment } = props;
    let { retSetEditAbnormalByPlaneObj, retSetEditAbnormalByMoment } = useContext(EditAbnormalContext);
    // chargePerson: '', //责任人
    //                     name: '',  // 机器名称
    //                     equipmentNumber: '', // 机器编号
    //                     cause: '', //具体原因
    //                     improve: '',   //改善方向
    //                     anImprove: [],  //橫向展開改善  Y | N
    //                     completionTime: '' //預計完成時間
    let { allChargePerson, chargePerson, name, equipmentNumber, cause, improve, anImprove, completionTime } = equipment;

    return <div style={{ width: '100%' }}>
        {/* 負責人 機器名稱 機器編號 具體原因 改善方向 橫向展開改善  預計完成時間 */}
        <Row gutter={[0, 16]} justify="center">
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.cause-analysis.cause.lable.chargePerson' })
                    }</Col>
                    <Col span={18}>
                        <Select mode="multiple" className={styles.w100} showArrow value={chargePerson}
                            onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.cause.equipment.chargePerson', '')}
                            options={allChargePerson.map(v => ({ value: v }))}
                        />
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.cause-analysis.cause.lable.machine-name' })
                    }</Col>
                    <Col span={18}>
                        <Input size="middle" value={name} onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.cause.equipment.name', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.cause-analysis.cause.lable.machine-equipmentNumber' })
                    }</Col>
                    <Col span={18}>
                        <Input size="middle" value={equipmentNumber} onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.cause.equipment.equipmentNumber', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.cause-analysis.cause.lable.cause' })
                    }</Col>
                    <Col span={18}>
                        <TextArea value={cause} onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.cause.equipment.cause', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.cause-analysis.cause.lable.improve' })
                    }</Col>
                    <Col span={18}>
                        <TextArea value={improve} onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.cause.equipment.improve', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.cause-analysis.cause.lable.anImprove' })
                    }</Col>
                    <Col span={18}>
                        {/* <Checkbox.Group value={anImprove} onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.cause.equipment.anImprove', '')} >
                            <Checkbox value="Y">是</Checkbox>
                            <Checkbox value="N">否</Checkbox>
                        </Checkbox.Group> */}
                        <Radio.Group value={anImprove} onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.cause.equipment.anImprove', 'target.value')}>
                            <Radio value="Y">是</Radio>
                            <Radio value="N">否</Radio>
                        </Radio.Group>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.cause-analysis.cause.lable.completionTime' })
                    }</Col>
                    <Col span={18}>
                        <DatePicker className={styles.w100} onChange={retSetEditAbnormalByMoment('causeAnalysis.cause.equipment.completionTime')}
                            value={moment(completionTime, 'YYYY/MM/DD hh:mm')} format='YYYY/MM/DD hh:mm' showTime
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>
}

CauseAnalysisOfEquipment = connect(({ AbnormalDecision }) => {
    return {
        equipment: AbnormalDecision.abnormalMaintenance.causeAnalysis.cause.equipment
    }
})(CauseAnalysisOfEquipment);

let CauseAnalysisOfMaterial = props => {
    let { dispatch, material } = props;
    let { retSetEditAbnormalByPlaneObj, retSetEditAbnormalByMoment } = useContext(EditAbnormalContext);
    let { allChargePerson, chargePerson, skuno, DC, LC, vendor, result, improve, completionTime } = material;

    return <div style={{ width: '100%' }}>
        <Row gutter={[0, 16]} justify="center">
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.cause-analysis.cause.lable.chargePerson' })
                    }</Col>
                    <Col span={18}>
                        <Select mode="multiple" className={styles.w100} showArrow value={chargePerson}
                            onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.cause.material.chargePerson', '')}
                            options={allChargePerson.map(v => ({ value: v }))}
                        />
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.cause-analysis.cause.lable.SKUNO' })
                    }</Col>
                    <Col span={18}>
                        <Input size="middle" value={skuno} onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.cause.material.skuno', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.cause-analysis.cause.lable.DC' })
                    }</Col>
                    <Col span={18}>
                        <Input size="middle" value={DC} onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.cause.material.DC', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.cause-analysis.cause.lable.LC' })
                    }</Col>
                    <Col span={18}>
                        <Input size="middle" value={LC} onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.cause.material.LC', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.cause-analysis.cause.lable.vendor' })
                    }</Col>
                    <Col span={18}>
                        <Input size="middle" value={vendor} onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.cause.material.vendor', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.cause-analysis.cause.lable.result' })
                    }</Col>
                    <Col span={18}>
                        <TextArea value={result} onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.cause.material.result', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.cause-analysis.cause.lable.improve' })
                    }</Col>
                    <Col span={18}>
                        <TextArea value={improve} onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.cause.material.improve', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.cause-analysis.cause.lable.completionTime' })
                    }</Col>
                    <Col span={18}>
                        <DatePicker className={styles.w100} onChange={retSetEditAbnormalByMoment('causeAnalysis.cause.material.completionTime')}
                            value={moment(completionTime, 'YYYY/MM/DD hh:mm')} format='YYYY/MM/DD hh:mm' showTime
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>
}

CauseAnalysisOfMaterial = connect(({ AbnormalDecision }) => {
    return {
        material: AbnormalDecision.abnormalMaintenance.causeAnalysis.cause.material
    }
})(CauseAnalysisOfMaterial);


let CauseAnalysisOfFunction = props => {
    let { func } = props;
    let { retSetEditAbnormalByPlaneObj, retSetEditAbnormalByMoment } = useContext(EditAbnormalContext);
    let { allChargePerson, chargePerson, result, anImprove, completionTime } = func;

    return <div style={{ width: '100%' }}>
        <Row gutter={[0, 16]} justify="center">
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.cause-analysis.cause.lable.chargePerson' })
                    }</Col>
                    <Col span={18}>
                        <Select mode="multiple" className={styles.w100} showArrow value={chargePerson}
                            onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.cause.function.chargePerson', '')}
                            options={allChargePerson.map(v => ({ value: v }))}
                        />
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.cause-analysis.cause.lable.result' })
                    }</Col>
                    <Col span={18}>
                        <TextArea value={result} onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.cause.function.result', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.cause-analysis.cause.lable.anImprove' })
                    }</Col>
                    <Col span={18}>
                        <Radio.Group value={anImprove} onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.cause.function.anImprove', 'target.value')}>
                            <Radio value="Y">是</Radio>
                            <Radio value="N">否</Radio>
                        </Radio.Group>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.cause-analysis.cause.lable.completionTime' })
                    }</Col>
                    <Col span={18}>
                        <DatePicker className={styles.w100} onChange={retSetEditAbnormalByMoment('causeAnalysis.cause.function.completionTime')}
                            value={moment(completionTime, 'YYYY/MM/DD hh:mm')} format='YYYY/MM/DD hh:mm' showTime
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>
}

CauseAnalysisOfFunction = connect(({ AbnormalDecision }) => {
    return {
        func: AbnormalDecision.abnormalMaintenance.causeAnalysis.cause.function
    }
})(CauseAnalysisOfFunction);


let CauseAnalysisOfAnnulus = props => {
    let { annulus } = props;
    let { retSetEditAbnormalByPlaneObj, retSetEditAbnormalByMoment } = useContext(EditAbnormalContext);
    let { allChargePerson, chargePerson, cause, result, improve, completionTime } = annulus;

    return <div style={{ width: '100%' }}>
        <Row gutter={[0, 16]} justify="center">
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.cause-analysis.cause.lable.chargePerson' })
                    }</Col>
                    <Col span={18}>
                        <Select mode="multiple" className={styles.w100} showArrow value={chargePerson}
                            onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.cause.annulus.chargePerson', '')}
                            options={allChargePerson.map(v => ({ value: v }))}
                        />
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.cause-analysis.cause.lable.cause' })
                    }</Col>
                    <Col span={18}>
                        <TextArea value={cause} onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.cause.annulus.cause', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.cause-analysis.cause.lable.result' })
                    }</Col>
                    <Col span={18}>
                        <TextArea value={result} onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.cause.annulus.result', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.cause-analysis.cause.lable.improve' })
                    }</Col>
                    <Col span={18}>
                        <TextArea value={improve} onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.cause.annulus.improve', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.cause-analysis.cause.lable.completionTime' })
                    }</Col>
                    <Col span={18}>
                        <DatePicker className={styles.w100} onChange={retSetEditAbnormalByMoment('causeAnalysis.cause.annulus.completionTime')}
                            value={moment(completionTime, 'YYYY/MM/DD hh:mm')} format='YYYY/MM/DD hh:mm' showTime
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>
}

CauseAnalysisOfAnnulus = connect(({ AbnormalDecision }) => {
    return {
        annulus: AbnormalDecision.abnormalMaintenance.causeAnalysis.cause.annulus
    }
})(CauseAnalysisOfAnnulus);


let CauseAnalysisOfDetection = props => {
    let { dispatch, detection } = props;
    let { retSetEditAbnormalByPlaneObj, retSetEditAbnormalByMoment } = useContext(EditAbnormalContext);
    let { allChargePerson, chargePerson, content, result } = detection;

    return <div style={{ width: '100%' }}>
        <Row gutter={[0, 16]} justify="center">
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.cause-analysis.cause.lable.chargePerson' })
                    }</Col>
                    <Col span={18}>
                        <Select mode="multiple" className={styles.w100} showArrow value={chargePerson}
                            onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.cause.detection.chargePerson', '')}
                            options={allChargePerson.map(v => ({ value: v }))}
                        />
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.cause-analysis.cause.lable.test-content' })
                    }</Col>
                    <Col span={18}>
                        <TextArea value={content} onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.cause.detection.content', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.cause-analysis.cause.lable.test-result' })
                    }</Col>
                    <Col span={18}>
                        <TextArea value={result} onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.cause.detection.result', 'target.value')} />
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>
}

CauseAnalysisOfDetection = connect(({ AbnormalDecision }) => {
    return {
        detection: AbnormalDecision.abnormalMaintenance.causeAnalysis.cause.detection
    }
})(CauseAnalysisOfDetection);




//==========================================================================================================================================





let Step6 = props => {
    // remarksAndAttachments: {  // 備註與附件
    //     problemStatus: '', // 問題狀態
    //     remarks: '', // 備註
    //     attachments: [] // 附件
    // }
    let { prevStep, retSetEditAbnormalByPlaneObj } = useContext(EditAbnormalContext);
    let dispatch = props.dispatch;
    let { problemStatus, remarks, attachments } = props.remarksAndAttachments;
    let allCause = props.allCause;
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
                    type: 'AbnormalDecision/setAbnormalMaintenanceByFn',
                    retNewState: state => {
                        state.remarksAndAttachments.attachments = state.remarksAndAttachments.attachments.filter(_f => _f.uid != info.file.uid);
                        return state;
                    }
                });
            } else { //新增
                attachments.filter(_f => _f.name == info.file.name).length == 0 && dispatch({
                    type: 'AbnormalDecision/setAbnormalMaintenanceByFn',
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


    return <div className={styles['step6']}>
        <Row gutter={[0, 24]} justify="center" style={{ marginTop: '20px' }}>
            <Col span={18}>
                <Row>
                    <Col span={4} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.remarks-and-attachments.problemStatus' })
                    }</Col>
                    <Col span={20}>
                        <Space>
                            <Radio.Group value={problemStatus} onChange={retSetEditAbnormalByPlaneObj('remarksAndAttachments.problemStatus', 'target.value')}>
                                <Radio value="等待處理">{
                                    formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.remarks-and-attachments.problemStatus.waiting' })
                                }</Radio>
                                <Radio value="處理中">{
                                    formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.remarks-and-attachments.problemStatus.doing' })
                                }</Radio>
                                <Radio value="申請結案" disabled={allCause.length > 0 ? false : true}>{
                                    formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.remarks-and-attachments.problemStatus.application-for-closure' })
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
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.remarks-and-attachments.remarks' })
                    }</Col>
                    <Col span={20}>
                        <TextArea value={remarks} onChange={retSetEditAbnormalByPlaneObj('remarksAndAttachments.remarks', 'target.value')} />
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 24]} justify="center">
            <Col span={18}>
                <Row>
                    <Col span={4} style={{ textAlign: 'center' }}>{
                        formatMessage({ id: 'abnormal-decision-center.abnormal-maintenance.remarks-and-attachments.problemStatus' })
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
            <Col span={10} style={{ textAlign: 'center' }}>
                {/* <Space size="large">
                    <Button type="primary" size="small" icon={<ArrowUpOutlined />} onClick={prevStep}> 上一步 </Button>
                    <Button type="danger" size="small" icon={<SaveOutlined />} onClick={saveDraft}> 存入草稿 </Button>
                    <Button type="primary" size="small" icon={<SaveOutlined />} onClick={submit}> 提交 </Button>
                </Space> */}
                <Operation />
            </Col>
        </Row>
    </div>
}

Step6 = connect(state => {
    return {
        remarksAndAttachments: state.AbnormalDecision.abnormalMaintenance.remarksAndAttachments,
        allCause: state.AbnormalDecision.abnormalMaintenance.causeAnalysis.cause.allCause
    }
})(Step6);


let Operation = props => {
    let { dispatch, status, operationPermissions } = props;
    let { prevStep } = useContext(EditAbnormalContext);
    //status: 等待處理，處理中，申請結案，已結案
    let saveDraft = () => {
        // console.log('存入草稿');  // 不傳附件
        dispatch({
            type: 'AbnormalDecision/abnormalMaintenanceSaveDraft'
        })
    }
    let submit = () => {
        // console.log('提交');  // 全傳
        dispatch({
            type: 'AbnormalDecision/abnormalMaintenanceSubmit'
        })
    }
    let resolve = () => {
        // console.log('通過')
        dispatch({
            type: 'AbnormalDecision/abnormalMaintenanceResolve'
        })
    }
    let reject = () => {
        // console.log('駁回')
        dispatch({
            type: 'AbnormalDecision/abnormalMaintenanceReject'
        })
    }
    // if (status == '已結案' || operationPermissions == 'N') {   //已結案或無權限操作，不顯示操作按鈕
    //     return <Space size="large">
    //         <Button type="primary" size="small" icon={<ArrowUpOutlined />} onClick={prevStep}> 上一步 </Button>
    //     </Space>
    // } else {
    //     switch (status) {
    //         case '申請結案':    // 申請結案時顯示通過和駁回按鈕
    //             return <Space size="large">
    //                 <Button type="primary" size="small" icon={<ArrowUpOutlined />} onClick={prevStep}> 上一步 </Button>
    //                 <Button type="primary" size="small" icon={<CheckOutlined />} onClick={resolve}> 通過 </Button>
    //                 <Button type="danger" size="small" icon={<CloseOutlined />} onClick={reject}> 駁回 </Button>
    //             </Space>
    //         case '等待處理':
    //         case '處理中':
    //             return <Space size="large">
    //                 <Button type="primary" size="small" icon={<ArrowUpOutlined />} onClick={prevStep}> 上一步 </Button>
    //                 <Button type="danger" size="small" icon={<SaveOutlined />} onClick={saveDraft}> 存入草稿 </Button>
    //                 <Button type="primary" size="small" icon={<SaveOutlined />} onClick={submit}> 提交 </Button>
    //             </Space>
    //         default:
    //             return <Space size="large">
    //                 <Button type="primary" size="small" icon={<ArrowUpOutlined />} onClick={prevStep}> 上一步 </Button>
    //             </Space>
    //     }
    // }

    if (status == '已結案' || (operationPermissions == 'N' && status == '申請結案')) {   //无操作    已結案或無權限操作，不顯示操作按鈕
        return <Space size="large">
            <Button type="primary" size="small" icon={<ArrowUpOutlined />} onClick={prevStep}> 上一步 </Button>
        </Space>
    } else {
        switch (status) {
            case '申請結案':    // 申請結案時顯示通過和駁回按鈕
                return <Space size="large">
                    <Button type="primary" size="small" icon={<ArrowUpOutlined />} onClick={prevStep}> 上一步 </Button>
                    <Button type="primary" size="small" icon={<CheckOutlined />} onClick={resolve}> 通過 </Button>
                    <Button type="danger" size="small" icon={<CloseOutlined />} onClick={reject}> 駁回 </Button>
                </Space>
            case '等待處理':
            case '處理中':
                return <Space size="large">
                    <Button type="primary" size="small" icon={<ArrowUpOutlined />} onClick={prevStep}> 上一步 </Button>
                    <Button type="danger" size="small" icon={<SaveOutlined />} onClick={saveDraft}> 存入草稿 </Button>
                    <Button type="primary" size="small" icon={<SaveOutlined />} onClick={submit}> 提交 </Button>
                </Space>
            default:
                return <Space size="large">
                    <Button type="primary" size="small" icon={<ArrowUpOutlined />} onClick={prevStep}> 上一步 </Button>
                </Space>
        }
    }
}

Operation = connect(state => {
    return {
        status: state.AbnormalDecision.abnormalMaintenance.status,
        operationPermissions: state.AbnormalDecision.abnormalMaintenance.operationPermissions
    }
})(Operation);


let Step7 = props => {
    let issueTracking = props.issueTracking;

    if (issueTracking.length == 0) {
        return <div className={styles['step7']}>
            無記錄
        </div>
    }
    return <div className={styles['step7']}>
        <Steps progressDot current={issueTracking.length - 1} direction="vertical" style={{ marginTop: '20px', marginLeft: '20px' }}>
            {
                issueTracking.map(step => <Step key={step.title} title={step.title} description={<Issue content={step.content} />} />)
            }
            {/* <Step title="吴勇标发起了问题" description={<Issue1 />} />
            <Step title="隗勉對問題進行了更新...." description={<Issue2 />} />
            <Step title="劉慶公對問題進行了更新...." description={<Issue3 />} />
            <Step title="高超辉對問題進行了更新...." description={<Issue4 />} /> */}
        </Steps>
    </div>
}

Step7 = connect(state => {
    return {
        issueTracking: state.AbnormalDecision.abnormalMaintenance.issueTracking
    }
})(Step7);


let Issue = props => {
    return <div style={{ paddingTop: '10px', paddingRight: '40px' }}>
        {
            props.content.map(row => <Twain key={row.name} {...row} />)
        }
    </div>
}


// let Issue1 = props => {
//     return <div style={{ paddingTop: '10px', paddingRight: '40px' }}>
//         <b>问题描述:</b>
//         <div style={{ boxSizing: 'border-box', paddingLeft: '20px' }}>
//             <b>異常種類-物料异常</b> <br />
//             <b>DC</b>{' '}<span>无</span> <br />
//             <b>LC</b>{' '}<span>无</span> <br />
//             <b>零件料號</b>{' '}<span>无</span> <br />
//             <b>不良率</b>{' '}<span>无</span> <br />
//             <b>供應商</b>{' '}<span>无</span>
//         </div>
//         <b>通知時間:</b> <span>12/15/2020 7:01:00 AM</span> <br />
//         <b>處理人員:</b> <span>PD:吳勇標(F4357722)</span> <br />
//         <b>相關說明:</b>
//         <p>MCEBU 組裝線在生產Fortitude（800-38531-07）機種時，目檢連續發現4pcs 連接器彈片翹起不良（如下圖），投入185pcs 不良4pcs 不良率2.1%，針對該異常請PQE（隗勉）上班后前來產線分析處理，謝謝！！！（實物在組裝線長電腦桌旁）</p>
//         <b>相關附件:</b>
//         <div style={{ width: '100%', display: 'flex', justifyContent: 'space-start', alignItems: 'space-start', padding: '10px', border: '1px solid #ddd', overflow: 'auto' }}>
//             <div style={{ paddingRight: '15px' }}>
//                 <a href={png1} target="_blank">
//                     <div style={{ border: '1px solid #ddd' }}>
//                         <img width="260" src={png1} alt="" />
//                     </div>
//                 </a>
//             </div>
//             <div style={{ paddingRight: '15px' }}>
//                 <a href={png2} target="_blank">
//                     <div style={{ border: '1px solid #ddd' }}>
//                         <img width="260" src={png2} alt="" />
//                     </div>
//                 </a>
//             </div>
//             <div style={{ paddingRight: '15px' }}>
//                 <a href={png4} target="_blank">
//                     <div style={{ border: '1px solid #ddd' }}>
//                         <img width="260" src={png4} alt="" />
//                     </div>
//                 </a>
//             </div>
//             <div style={{ paddingRight: '15px' }}>
//                 <a href={png5} target="_blank">
//                     <div style={{ border: '1px solid #ddd' }}>
//                         <img width="260" src={png5} alt="" />
//                     </div>
//                 </a>
//             </div>
//         </div>
//         <div style={{ marginTop: '8px' }}>
//             <Space>
//                 <b>文档链接：</b>
//                 <a target="_blank" href={png1}>doc1</a> |
//                 <a target="_blank" href={png2}>doc2</a> |
//                 <a target="_blank" href={png3}>doc3</a> |
//                 <a target="_blank" href={png4}>doc4</a> |
//                 <a target="_blank" href={png5}>doc5</a>
//             </Space>
//         </div>
//     </div>
// }

let Twain = props => {   // 一对
    // {name: '', content: ''}  {name: ''}  {name: '', content: [{}, ...]}
    let { name, content } = props;
    switch (typeof content) {
        case 'undefined':
            return <div> <b>{name}</b> </div>
        case 'string':
            if (content.length < 50) {
                if (content.length == 0) {
                    return <div> <b>{name}</b> <span>空</span> </div>
                }
                return <div> <b>{name}</b> <span>{content}</span> </div>
            }
            return <div> <b>{name}</b> <p>{content}</p> </div>
        case 'object':
            if (Object.prototype.toString.call(content) == '[object Array]') {  // 子集
                return <div>
                    <b>{name}</b>
                    <div style={{ paddingLeft: '20px' }}>
                        {
                            content.map(row => <Twain key={row.name} {...row} />)
                        }
                    </div>
                </div>
            }
            if (Object.prototype.toString.call(content) == '[object Object]') {   // 附件
                return <div>
                    <b>{name}</b>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-start', alignItems: 'space-start', padding: '10px', border: '1px solid #ddd', overflow: 'auto' }}>
                        {
                            content.img.map(src => (<div key={src} style={{ paddingRight: '15px' }}>
                                <a href={src} target="_blank">
                                    <div style={{ border: '1px solid #ddd' }}>
                                        <img width="260" src={src} alt="" />
                                    </div>
                                </a>
                            </div>))
                        }
                    </div>
                    <div style={{ marginTop: '8px' }}>
                        <Space>
                            <b>文档链接：</b>
                            {
                                content.doc.map((row, i) => {
                                    if (i != content.doc.length - 1) {
                                        return <span key={row.name}><a target="_blank" href={row.src}>{row.name}</a> | </span>
                                    } else {
                                        return <a key={row.name} target="_blank" href={row.src}>{row.name}</a>
                                    }
                                })
                            }
                        </Space>
                    </div>
                </div>
            }
            return <></>
        default:
            return <></>
    }
}

