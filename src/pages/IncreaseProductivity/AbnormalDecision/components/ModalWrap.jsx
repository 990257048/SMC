
import React, { memo, createContext, useState, useEffect, useMemo, useCallback, useContext } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { useDispatch, useSelector } from 'dva';
import { connect, FormattedMessage, formatMessage } from 'umi';
import { Button, Space, Input, Tabs, Steps, message, Checkbox, Popover, Row, Col, Divider, Select, Radio, DatePicker, InputNumber, Tooltip, Upload } from 'antd';
import { SearchOutlined, PlusOutlined, ProfileOutlined, BarsOutlined, ZoomInOutlined, OrderedListOutlined, CheckOutlined, UploadOutlined, SaveOutlined, BorderBottomOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import moment from 'moment';
import { findValueByProp, getBase64 } from '../../../../utils/custom'
import styles from '../style.less';

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
                <Step title="基本信息"></Step>
                <Step title="上報機制"></Step>
                <Step title="問題描述"></Step>
                <Step title="臨時對策"></Step>
                <Step title="原因分析"></Step>
                <Step title="備註與附件"></Step>
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

    return <div className={styles['step1']}>
        <div style={{ textAlign: 'center' }}>
            <p></p>
            <h3><b>NSDI 【通知单】</b></h3>
            <Space size="middle">
                <b>类型：</b>
                <Radio.Group value={type} onChange={retSetEditAbnormalByPlaneObj('type', 'target.value')}>
                    <Radio value="异常"> 异常 </Radio>
                    <Radio value="停线"> 停线 </Radio>
                </Radio.Group>
                <span>  </span>
                <b>紧急程度：</b>
                <Radio.Group value={emergencyDegree} onChange={retSetEditAbnormalByPlaneObj('emergencyDegree', 'target.value')}>
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
                        <DatePicker className={styles.w100} onChange={retSetEditAbnormalByMoment('baseMsg.abnormalTime')}
                            value={moment(abnormalTime, 'YYYY/MM/DD hh:mm')} format='YYYY/MM/DD hh:mm' showTime
                        />
                    </Col>
                </Row>
            </Col>
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>異常班別</Col>
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
                    <Col span={8} style={{ textAlign: 'center' }}>異常BU</Col>
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
                    <Col span={8} style={{ textAlign: 'center' }}>異常區域</Col>
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
                    <Col span={8} style={{ textAlign: 'center' }}>異常工站</Col>
                    <Col span={15}><Input value={station} onChange={retSetEditAbnormalByPlaneObj('baseMsg.station', 'target.value')} /></Col>
                </Row>
            </Col>
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>機種名稱</Col>
                    <Col span={15}><Input value={skuName} onChange={retSetEditAbnormalByPlaneObj('baseMsg.skuName', 'target.value')} /></Col>
                </Row>
            </Col>
        </Row>

        <Row gutter={[0, 24]} justify="center">
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>機種料號</Col>
                    <Col span={15}><Input value={skuno} onChange={retSetEditAbnormalByPlaneObj('baseMsg.skuno', 'target.value')} /></Col>
                </Row>
            </Col>
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>工單編號</Col>
                    <Col span={15}><Input value={WO} onChange={retSetEditAbnormalByPlaneObj('baseMsg.WO', 'target.value')} /></Col>
                </Row>
            </Col>
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>產品階段</Col>
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
                    <Col span={4} style={{ textAlign: 'center' }}>課級（>30m）</Col>
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
                    <Col span={4} style={{ textAlign: 'center' }}>部級（0.5~1h）</Col>
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
                    <Col span={4} style={{ textAlign: 'center' }}>處級（>1h）</Col>
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
                    <Col span={6} style={{ textAlign: 'right', paddingRight: '15px' }}>異常處理人</Col>
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
                    <Col span={8} style={{ textAlign: 'center' }}>通知時間</Col>
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
                    <Col span={4} style={{ textAlign: 'right', paddingRight: '15px' }}>郵件標題</Col>
                    <Col span={19}>
                        <TextArea value={emailTitle} onChange={retSetEditAbnormalByPlaneObj('problem.emailTitle', 'target.value')} />
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 24]} justify="center">
            <Col span={24}>
                <Row>
                    <Col span={4} style={{ textAlign: 'right', paddingRight: '15px' }}>問題分類</Col>
                    <Col span={19}>

                        {/* ====================================================================================================================================== */}

                        {/* 設備異常 物料異常 人員異常 品質異常 治工具異常 系統異常     */}
                        <Tabs size="small" type='card' activeKey={currentClassify}
                            onChange={retSetEditAbnormalByPlaneObj('problem.abnormalClassify.currentClassify', '')}
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
                    <Col span={8} style={{ textAlign: 'center' }}>異常描述</Col>
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
                    <Col span={8} style={{ textAlign: 'center' }}>機器類別</Col>
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
                    <Col span={8} style={{ textAlign: 'center' }}>設備名稱</Col>
                    <Col span={15}>
                        <Input size="small" value={name} onChange={retSetEditAbnormalByPlaneObj('problem.abnormalClassify.equipment.name', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>設備編號</Col>
                    <Col span={15}>
                        <Input size="small" value={equipmentNumber} onChange={retSetEditAbnormalByPlaneObj('problem.abnormalClassify.equipment.equipmentNumber', 'target.value')} />
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>設備型號</Col>
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
                    <Col span={8} style={{ textAlign: 'center' }}>異常描述</Col>
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
                    <Col span={8} style={{ textAlign: 'center' }}>DC</Col>
                    <Col span={15}>
                        <Input size="small" value={DC} onChange={retSetEditAbnormalByPlaneObj('problem.abnormalClassify.material.DC', 'target.value')} />
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>LC</Col>
                    <Col span={15}>
                        <Input size="small" value={LC} onChange={retSetEditAbnormalByPlaneObj('problem.abnormalClassify.material.LC', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>零件料號</Col>
                    <Col span={15}>
                        <Input size="small" value={partNo} onChange={retSetEditAbnormalByPlaneObj('problem.abnormalClassify.material.partNo', 'target.value')} />
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>不良率</Col>
                    <Col span={15}>
                        <Input size="small" value={rejectRatio} onChange={retSetEditAbnormalByPlaneObj('problem.abnormalClassify.material.rejectRatio', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>供應商</Col>
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
                    <Col span={8} style={{ textAlign: 'center' }}>異常描述</Col>
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
                    <Col span={8} style={{ textAlign: 'center' }}>制程段</Col>
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
                    <Col span={8} style={{ textAlign: 'center' }}>不良現象</Col>
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
                    <Col span={8} style={{ textAlign: 'center' }}>發生站位</Col>
                    <Col span={15}>
                        <Input size="small" value={station} onChange={retSetEditAbnormalByPlaneObj('problem.abnormalClassify.quality.station', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>影響范圍</Col>
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
                    <Col span={4} style={{ textAlign: 'center' }}>當前措施</Col>
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
                    <Col span={8} style={{ textAlign: 'center' }}>異常描述</Col>
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
                    <Col span={8} style={{ textAlign: 'center' }}>涉及的產品料號</Col>
                    <Col span={15}>
                        <Input size="small" value={skuno} onChange={retSetEditAbnormalByPlaneObj('problem.abnormalClassify.tools.skuno', 'target.value')} />
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>使用站位</Col>
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
                    <Col span={8} style={{ textAlign: 'center' }}>異常類別</Col>
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
                    <Col span={8} style={{ textAlign: 'center' }}>異常描述</Col>
                    <Col span={15}>
                        <Input size="small" value={desc} onChange={retSetEditAbnormalByPlaneObj('problem.abnormalClassify.system.desc', 'target.value')} />
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 12]} justify="center">
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>異常開始時間</Col>
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
                        <Input prefix="" suffix="min" value={lostWorkTime} onChange={retSetEditAbnormalByPlaneObj('countermeasures.lostWorkTime', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={9}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>閒置人力</Col>
                    <Col span={16}>
                        <Input value={idleHuman} onChange={retSetEditAbnormalByPlaneObj('countermeasures.idleHuman', 'target.value')} />
                    </Col>
                </Row>
            </Col>
        </Row>

        <Row gutter={[0, 24]} justify="center">
            <Col span={9}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>閒置人力安排</Col>
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
                    <Col span={8} style={{ textAlign: 'center' }}>損失產出</Col>
                    <Col span={16}>
                        <Input prefix="" suffix="pcs" value={lostOutput} onChange={retSetEditAbnormalByPlaneObj('countermeasures.lostOutput', 'target.value')} />
                    </Col>
                </Row>
            </Col>
        </Row>

        <Row gutter={[0, 24]} justify="center">
            <Col span={9}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>良率損失</Col>
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
                    <Col span={4} style={{ textAlign: 'center' }}>臨時解決措施</Col>
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
    let { parson, allCause, currentClassify} = props;
    let {
        allChargePerson, allSectionManager, allMinister, allSectionChief, allNotifier,
        chargePerson, sectionManager, minister, sectionChief, notifier
    } = parson;

    useEffect(() => {
        // console.log(allCause, currentClassify);
        if(allCause.length > 0 && !allCause.includes(currentClassify)){
            setEditAbnormal('causeAnalysis.cause.currentClassify', allCause.slice(-1)[0])
        }
    }, [allCause, currentClassify]);

    return <div className={styles['step5']}>
        <Row gutter={[0, 24]} justify="center" style={{ marginTop: '20px' }}>
            <Col span={23}>
                <Row>
                    <Col span={4} style={{ textAlign: 'center' }}>責任人</Col>
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
                    <Col span={4} style={{ textAlign: 'center' }}>責任人課級(>3d)</Col>
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
                    <Col span={4} style={{ textAlign: 'center' }}>責任人部級(>5d)</Col>
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
                    <Col span={4} style={{ textAlign: 'center' }}>責任人處級(>10d)</Col>
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
                    <Col span={4} style={{ textAlign: 'center' }}>異常知會人</Col>
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
                            <Checkbox value="parson">人</Checkbox>
                            <Checkbox value="equipment">机</Checkbox>
                            <Checkbox value="material">料</Checkbox>
                            <Checkbox value="function">法</Checkbox>
                            <Checkbox value="annulus">环</Checkbox>
                            <Checkbox value="detection">量检测</Checkbox>
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
        if(action == 'remove'){
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
                    <Col span={5} style={{ textAlign: 'center' }}>責任人</Col>
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
                    <Col span={5} style={{ textAlign: 'center' }}>處理決定</Col>
                    <Col span={18}>
                        <TextArea value={decision} onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.cause.parson.decision', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>改善方向</Col>
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
                    <Col span={5} style={{ textAlign: 'center' }}>負責人</Col>
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
                    <Col span={5} style={{ textAlign: 'center' }}>機器名稱</Col>
                    <Col span={18}>
                        <Input size="middle" value={name} onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.cause.equipment.name', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>機器編號</Col>
                    <Col span={18}>
                        <Input size="middle" value={equipmentNumber} onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.cause.equipment.equipmentNumber', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>具體原因</Col>
                    <Col span={18}>
                        <TextArea value={cause} onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.cause.equipment.cause', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>改善方向</Col>
                    <Col span={18}>
                        <TextArea value={improve} onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.cause.equipment.improve', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>橫向展開改善</Col>
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
                    <Col span={5} style={{ textAlign: 'center' }}>預計完成時間</Col>
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
                    <Col span={5} style={{ textAlign: 'center' }}>負責人</Col>
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
                    <Col span={5} style={{ textAlign: 'center' }}>料號</Col>
                    <Col span={18}>
                        <Input size="middle" value={skuno} onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.cause.material.skuno', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>DC</Col>
                    <Col span={18}>
                        <Input size="middle" value={DC} onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.cause.material.DC', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>LC</Col>
                    <Col span={18}>
                        <Input size="middle" value={LC} onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.cause.material.LC', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>廠商</Col>
                    <Col span={18}>
                        <Input size="middle" value={vendor} onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.cause.material.vendor', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>處理結果</Col>
                    <Col span={18}>
                        <TextArea value={result} onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.cause.material.result', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>改善方向</Col>
                    <Col span={18}>
                        <TextArea value={improve} onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.cause.material.improve', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>預計完成時間</Col>
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
                    <Col span={5} style={{ textAlign: 'center' }}>負責人</Col>
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
                    <Col span={5} style={{ textAlign: 'center' }}>改善結果</Col>
                    <Col span={18}>
                        <TextArea value={result} onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.cause.function.result', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>橫向展開改善</Col>
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
                    <Col span={5} style={{ textAlign: 'center' }}>預計完成時間</Col>
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
                    <Col span={5} style={{ textAlign: 'center' }}>負責人</Col>
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
                    <Col span={5} style={{ textAlign: 'center' }}>具體原因</Col>
                    <Col span={18}>
                        <TextArea value={cause} onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.cause.annulus.cause', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>處理結果</Col>
                    <Col span={18}>
                        <TextArea value={result} onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.cause.annulus.result', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>改善方向</Col>
                    <Col span={18}>
                        <TextArea value={improve} onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.cause.annulus.improve', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>預計完成時間</Col>
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
                    <Col span={5} style={{ textAlign: 'center' }}>負責人</Col>
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
                    <Col span={5} style={{ textAlign: 'center' }}>測試內容</Col>
                    <Col span={18}>
                        <TextArea value={content} onChange={retSetEditAbnormalByPlaneObj('causeAnalysis.cause.detection.content', 'target.value')} />
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={5} style={{ textAlign: 'center' }}>測試結果</Col>
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

    let submit = useCallback(() => {
        // dispatch({
        //     type: 'AbnormalDecision/newAbnormal'
        // });
    }, []);

    return <div className={styles['step6']}>
        <Row gutter={[0, 24]} justify="center" style={{ marginTop: '20px' }}>
            <Col span={18}>
                <Row>
                    <Col span={4} style={{ textAlign: 'center' }}>問題狀態</Col>
                    <Col span={20}>
                        <Space>
                            <Radio.Group value={problemStatus} onChange={retSetEditAbnormalByPlaneObj('remarksAndAttachments.problemStatus', 'target.value')}>
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
                    <Col span={20}>
                        <TextArea value={remarks} onChange={retSetEditAbnormalByPlaneObj('remarksAndAttachments.remarks', 'target.value')} />
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[0, 24]} justify="center">
            <Col span={18}>
                <Row>
                    <Col span={4} style={{ textAlign: 'center' }}>附件</Col>
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
                    <Button type="primary" size="small" icon={<ArrowUpOutlined />} onClick={prevStep}> 上一步 </Button>
                    <Button type="primary" size="small" icon={<SaveOutlined />} onClick={submit}> 提交 </Button>
                </Space>
            </Col>
        </Row>
    </div>
}

Step6 = connect(state => {
    return {
        remarksAndAttachments: state.AbnormalDecision.abnormalMaintenance.remarksAndAttachments
    }
})(Step6);

