
import React, { memo, createContext, useState, useEffect, useMemo, useCallback, useContext } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { useDispatch, useSelector } from 'dva';
import { connect, FormattedMessage, formatMessage } from 'umi';
import { Button, Space, Input, Tabs, Steps, Popover, Row, Col, Divider, Select, Radio, DatePicker, InputNumber, Tooltip } from 'antd';
import { SearchOutlined, PlusOutlined, ProfileOutlined, BarsOutlined, ZoomInOutlined, OrderedListOutlined, SaveOutlined, BorderBottomOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import moment from 'moment';
import styles from '../style.less';

const { TabPane } = Tabs;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Step } = Steps

let NewAbnormalContext = createContext();

let NewAbnormal = props => {  // 新增异常
    console.log('render NewAbnormal');
    let w = useSelector(state => state.global.width);
    let h = useSelector(state => state.global.height);

    // console.log(w, h)

    let [current, setCurrent] = useState(0);

    let size = useMemo(() => {
        // console.log(w, h);
        return {
            width: w - 355 + 'px',
            height: h - 245 + 'px',
            padding: '15px',
            overflow: 'auto'
            // border: '1px solid red'
        }
    }, [w, h]);

    let setpChange = useCallback((step) => {
        setCurrent(step);
    }, []);

    let prevStep = useCallback(() => {  // 上一步
        setCurrent(current - 1);
    }, [current]);

    let nextStep = useCallback(() => {  // 下一步
        setCurrent(current + 1);
    }, [current]);

    // 基本信息 上報機制 問題描述 臨時對策 原因分析 備註與附件

    return <div className={ styles['modal-wrap'] }>
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
            <NewAbnormalContext.Provider value={{ current, setCurrent, prevStep, nextStep }}>
                <StepContent current={current} />
            </NewAbnormalContext.Provider>
        </div>
    </div>
}

// export default connect(() => {
//     return {
//         w: state.global.width,
//         h: state.global.height
//     }
// })(NewAbnormal);

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

let Step1 = () => {

    let { nextStep } = useContext(NewAbnormalContext);

    return <div className={styles['step1']}>
        <div style={{ textAlign: 'center' }}>
            <p></p>
            <h3><b>NSDI 【通知单】</b></h3>
            <Space size="middle">
                <b>类型：</b>
                <Radio.Group defaultValue="异常">
                    <Radio value="异常"> 异常 </Radio>
                    <Radio value="停线"> 停线 </Radio>
                </Radio.Group>
                <span>  </span>
                <b>紧急程度：</b>
                <Radio.Group defaultValue="正常">
                    <Radio value="正常"> 正常 </Radio>
                    <Radio value="紧急"> 紧急 </Radio>
                </Radio.Group>
            </Space>
        </div>

        <Row gutter={[0, 24]} justify="center" style={{ marginTop: '20px' }}>
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>發文人員</Col>
                    <Col span={15}><Input /></Col>
                </Row>
            </Col>
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>發文單位</Col>
                    <Col span={15}><Input /></Col>
                </Row>
            </Col>
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>發文日期</Col>
                    <Col span={15}><Input /></Col>
                </Row>
            </Col>
        </Row>

        <Row gutter={[0, 24]} justify="center">
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>異常時間</Col>
                    <Col span={15}><Input /></Col>
                </Row>
            </Col>
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>異常班別</Col>
                    <Col span={15}><Input /></Col>
                </Row>
            </Col>
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>異常BU</Col>
                    <Col span={15}><Input /></Col>
                </Row>
            </Col>
        </Row>

        <Row gutter={[0, 24]} justify="center">
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>異常區域</Col>
                    <Col span={15}><Input /></Col>
                </Row>
            </Col>
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>異常工站</Col>
                    <Col span={15}><Input /></Col>
                </Row>
            </Col>
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>機種名稱</Col>
                    <Col span={15}><Input /></Col>
                </Row>
            </Col>
        </Row>

        <Row gutter={[0, 24]} justify="center">
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>機種料號</Col>
                    <Col span={15}><Input /></Col>
                </Row>
            </Col>
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>工單編號</Col>
                    <Col span={15}><Input /></Col>
                </Row>
            </Col>
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>產品階段</Col>
                    <Col span={15}><Input /></Col>
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

let Step2 = () => {

    let { prevStep, nextStep } = useContext(NewAbnormalContext);

    return <div className={styles['step2']}>
        <Row gutter={[0, 24]} justify="center" style={{ marginTop: '20px' }}>
            <Col span={8}>
                <Row>
                    <Col span={10} style={{ textAlign: 'center' }}>課級（>30m）</Col>
                    <Col span={14}><Input /></Col>
                </Row>
            </Col>
            <Col span={8}>
                <Row>
                    <Col span={10} style={{ textAlign: 'center' }}>部級（0.5~1h）</Col>
                    <Col span={14}><Input /></Col>
                </Row>
            </Col>
            <Col span={8}>
                <Row>
                    <Col span={10} style={{ textAlign: 'center' }}>處級（>1h）</Col>
                    <Col span={14}><Input /></Col>
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

let Step3 = () => {
    let { prevStep, nextStep } = useContext(NewAbnormalContext);
    return <div className={styles['step3']}>
        <Row gutter={[0, 16]} justify="center" style={{ marginTop: '20px' }}>
            <Col span={16}>
                <Row>
                    <Col span={6} style={{ textAlign: 'right', paddingRight: '15px' }}>異常處理人</Col>
                    <Col span={18}><TextArea /></Col>
                </Row>
            </Col>
            <Col span={8}>
                <Row>
                    <Col span={8} style={{ textAlign: 'center' }}>通知時間</Col>
                    <Col span={13}><Input /></Col>
                </Row>
            </Col>
        </Row>

        <Row gutter={[0, 16]} justify="center">
            <Col span={24}>
                <Row>
                    <Col span={4} style={{ textAlign: 'right', paddingRight: '15px' }}>郵件標題</Col>
                    <Col span={19}><TextArea /></Col>
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
                        <Tabs size="small" type='card' defaultActiveKey="1" style={{ width: '100%', border: '1px solid #ddd' }} >
                            <TabPane tab="設備異常" key="1">
                                <div style={{ width: '100%' }}>

                                    <Row gutter={[0, 12]} justify="center">
                                        <Col span={12}>
                                            <Row>
                                                <Col span={8} style={{ textAlign: 'center' }}>異常描述</Col>
                                                <Col span={15}><Input size="small" /></Col>
                                            </Row>
                                        </Col>
                                        <Col span={12}>
                                            <Row>
                                                <Col span={8} style={{ textAlign: 'center' }}>機器類別</Col>
                                                <Col span={15}><Input size="small" /></Col>
                                            </Row>
                                        </Col>
                                    </Row>

                                    <Row gutter={[0, 12]} justify="center">
                                        <Col span={12}>
                                            <Row>
                                                <Col span={8} style={{ textAlign: 'center' }}>設備名稱</Col>
                                                <Col span={15}><Input size="small" /></Col>
                                            </Row>
                                        </Col>
                                        <Col span={12}>
                                            <Row>
                                                <Col span={8} style={{ textAlign: 'center' }}>設備編號</Col>
                                                <Col span={15}><Input size="small" /></Col>
                                            </Row>
                                        </Col>
                                    </Row>

                                    <Row gutter={[0, 12]} justify="center">
                                        <Col span={12}>
                                            <Row>
                                                <Col span={8} style={{ textAlign: 'center' }}>設備型號</Col>
                                                <Col span={15}><Input size="small" /></Col>
                                            </Row>
                                        </Col>
                                        <Col span={12}></Col>
                                    </Row>

                                </div>
                            </TabPane>
                            <TabPane tab="物料異常" key="2">
                                <div style={{ width: '100%' }}>

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
                            </TabPane>
                            <TabPane tab="人員異常" key="3">
                                <div style={{ width: '100%' }}>

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
                            </TabPane>
                            <TabPane tab="品質異常" key="4">
                                <div style={{ width: '100%' }}>

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
                            </TabPane>
                            <TabPane tab="治工具異常" key="5">
                                <div style={{ width: '100%' }}>

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
                            </TabPane>
                            <TabPane tab="系統異常" key="6">
                                <div style={{ width: '100%' }}>

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
        <Row gutter={[0, 24]} justify="center" style={{marginTop: '20px'}}>
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



