// 线体信息配置 20201228 add by gch

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { connect } from 'umi';
import { Card, Row, Col, Input, Select, Modal, Button, message, List, DatePicker, Popconfirm, Space, Typography, Divider } from 'antd';
import { SettingOutlined, EditOutlined, DeleteOutlined, SelectOutlined, FormOutlined, PlusOutlined, PlusSquareOutlined, SearchOutlined, EyeOutlined } from '@ant-design/icons';
import styles from './style.less';

let { TextArea } = Input;
let { Option } = Select;
let { RangePicker } = DatePicker;

let Card1Tit = () => {
    return <div className={styles['card-tit']}><SelectOutlined /> 選擇線體</div>
}

let Card2Tit = () => {
    return <div className={styles['card-tit']}>
        <FormOutlined /> 配置(
        <span style={{ color: 'red' }}>
            如要更改線體產線&ME等相關人員和線體管理員請向現有線體管理員或課部處級主管提出更改
        </span>
        )
    </div>
}

let Card3Tit = () => {
    return <div className={styles['card-tit']}><PlusSquareOutlined /> 新增線體</div>
}

let LineMsg = props => {
    return <div className="line-msg">
        <h3>
            <SettingOutlined />
            <b> 線體信息配置</b>
        </h3>
        <Cart1 />
        <Cart2 />
        <Cart3 />

    </div>
}


//===============================================================================================================================
// 页面通用组件（5个） 输入框 下拉框 模糊搜下拉框 模糊搜多选下拉框 弹出层//===============================================================================================================================


let Test = props => {
    function onChange(value) {
        console.log(`selected ${value}`);
    }

    function onBlur() {
        console.log('blur');
    }

    function onFocus() {
        console.log('focus');
    }

    function onSearch(val) {
        console.log('search:', val);
    }

    let Test = <Select
        showSearch
        style={{ width: '100%' }}
        placeholder="Select a person"
        optionFilterProp="children"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option) => {
            console.log(input, option, option.children);
            return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }}
    >
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="tom">Tom</Option>
    </Select>
    return Test;
}


let Test2 = () => {
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [modalText, setModalText] = React.useState('Content of the modal');

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Open Modal with async logic
            </Button>
            <Modal
                title="Title"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>{modalText}</p>
            </Modal>
        </>
    );
};

let Test3 = props => {
    const data = [
        'Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
        'Los Angeles battles huge wildfires.',
    ];
    return <>
        {/* <Divider orientation="left">Default Size</Divider>
        <List
            header={<div>Header</div>}
            footer={<div>Footer</div>}
            bordered
            dataSource={data}
            renderItem={item => (
                <List.Item>
                    <Typography.Text mark>[ITEM]</Typography.Text> {item}
                </List.Item>
            )}
        /> */}
        {/* <Divider orientation="left">Small Size</Divider> */}
        <List
            size="small"
            header={<div>LICODE</div>}
            // footer={<div>Footer</div>}
            bordered
            dataSource={data}
            renderItem={item => <List.Item>{item}</List.Item>}
        />
        {/* <Divider orientation="left">Large Size</Divider>
        <List
            size="large"
            header={<div>Header</div>}
            footer={<div>Footer</div>}
            bordered
            dataSource={data}
            renderItem={item => <List.Item>{item}</List.Item>}
        /> */}
    </>
}

let Test4 = porps => {
    return <div></div>
}

let Test5 = props => {
    const children = [];
    for (let i = 10; i < 36; i++) {
        children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }

    function handleChange(value) {
        console.log(`selected ${value}`);
    }
    return <>
        <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Please select"
            defaultValue={['a10', 'c12']}
            onChange={handleChange}
        >
            {children}
        </Select>
    </>
}

let Test6 = props => {
    return <RangePicker
        showTime={{ format: 'HH:mm' }}
        format="HH:mm"
        style={{ width: '100%' }}
        dateRender={current => {
            const style = {};
            if (current.date() === 1) {
                style.border = '1px solid #1890ff';
                style.borderRadius = '50%';
            }
            return (
                <div className="ant-picker-cell-inner" style={style}>
                    {current.date()}
                </div>
            );
        }}
    />
}

let Test7 = props => {
    function confirm(e) {
        console.log(e);
        message.success('Click on Yes');
    }

    function cancel(e) {
        console.log(e);
        message.error('Click on No');
    }

    ReactDOM.render(
        <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
        >
            <a href="#">Delete</a>
        </Popconfirm>,
        mountNode,
    );
}



//==================================================================================================================

// 通用（定义筛选逻辑）
let filterOption = (input, option) => option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0

let createArr = length => {
    let arr = [];
    for (var i = 0; i < length; i++) {
        i < 10 ? arr.push('0' + i) : arr.push('' + i);
    }
    return arr;
}

let Cart1 = (props) => {
    let { dispatch, disabled } = props;
    // console.log(props);
    let [selectLine, setSelectLine] = useState({
        MFG: 'MFGI',
        line: 'LINE2',
        allMFG: ['MFGI', 'MFGII', 'MFGV'],
        allLine: ['LINE1', 'LINE2', 'LINE3'],
        // btnShow: true
    });
    let [visible, setVisible] = useState(false);
    let ipt_line = useRef();
    let { MFG, line, allMFG, allLine } = selectLine;

    let MFGChange = (v) => {    // 选择制造处
        setSelectLine({ ...selectLine, MFG: v });
    }

    let lineChange = (v) => {    // 选择线体
        setSelectLine({ ...selectLine, line: v });
    }

    let HandleClick = () => {     // 点击【修改線體名稱】
        console.log(MFG, line);
        setVisible(true);
    }

    let handleOk = () => {        // 对话框 确认
        console.log(MFG, line, ipt_line.current.state.value);
        setVisible(false);
        message.success('已修改线体名称');
    }

    let handleCancel = () => {    // 对话框 取消
        setVisible(false);
    }

    useEffect(() => {
        if (MFG == 'MFGII' && line == 'LINE2') {
            // setSelectLine({ ...selectLine, btnShow: true })
            dispatch({ type: 'LineMsg/setLineMsg', payload: { disabled: false } });
        } else {
            // setSelectLine({ ...selectLine, btnShow: false })
            dispatch({ type: 'LineMsg/setLineMsg', payload: { disabled: true } });
        }
    }, [MFG, line])
    return <Card size='small' title={<Card1Tit />}>
        <div style={{ padding: '15px 25px 0px 25px' }}>
            <Row gutter={[16, 16]} justify='center'>
                <Col span={8}>
                    <Row gutter={16}>
                        <Col span={8} className={styles['col-label']}>制造处</Col>
                        <Col span={16}>
                            <Select showSearch value={MFG} onChange={MFGChange} filterOption={filterOption} style={{ width: '100%' }} >
                                {
                                    allMFG.map(v => <Option key={v} value={v}>{v}</Option>)
                                }
                            </Select>
                        </Col>
                    </Row>
                </Col>
                <Col span={8}>
                    <Row gutter={16}>
                        <Col span={8} className={styles['col-label']}>
                            SMC線別
                    </Col>
                        <Col span={16}>
                            <Select showSearch value={line} onChange={lineChange} filterOption={filterOption} style={{ width: '100%' }} >
                                {
                                    allLine.map(v => <Option key={v} value={v}>{v}</Option>)
                                }
                            </Select>
                        </Col>
                    </Row>
                </Col>
                <Col span={8}>
                    <Row gutter={16} justify='center'>
                        <Col span={8}>
                            <Button type="primary" disabled={disabled} icon={<EditOutlined />} onClick={HandleClick}>修改線體名稱</Button>
                            <Modal title={<div><EditOutlined />修改線體名稱</div>} visible={visible} onOk={handleOk} onCancel={handleCancel}>
                                <Row gutter={24}>
                                    <Col span={4} className={styles['col-label']}>
                                        SMC線別
                                    </Col>
                                    <Col span={20}>
                                        <Input defaultValue={line} ref={ipt_line} />
                                    </Col>
                                </Row>
                            </Modal>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    </Card>
}

Cart1 = connect(state => ({
    disabled: state.LineMsg.disabled
}))(Cart1);

//-----------------------------------------------------------------------------------------------------------------------


let Cart2 = props => {
    let {
        // currentLine: 'Line1',  //当前操作的线体
        // disabled: false,  // 是否不可操作？
        // SFC_AP_SYS_name: 'DA3P3A',   // SFC/AP系统名 
        // PCAS_SYS_name: 'DA3P3A', // PCAS系统名
        // scan_point: 'DA3S2CT1', // 掃描點
        // IME: ['aaaa', 'bbbb'], // 產線|ME等相關
        // allIME: ['aaaa', 'bbbb', 'cccc', 'dddd'],   // 所有IME
        // section: 'SMT', // 段別
        // allSection: ['SMT', 'PTH', 'SI', '5DX', 'ICT', 'TEST'], //所有段别
        // breakPeriodList: ['02:00-02:40 休息', '02:40-5:00 工作'],  // 休息时间列表
        // // breakPeriod: '',  // 時間段(local)
        // // remark: 'hhhuuuhuhuhu', // 备注(local)
        // sectionManager: '劉日紅(F1300825)', //课级 
        // allSectionManager: ['劉日紅(F1300825)', 'xxxxxxxxxxxx', 'yyyyyyyyyyyyyy'], //所有课级
        // minister: '洪永祥(F1300147)', //部级
        // allMinister: ['洪永祥(F1300147)', 'xxxxxxxxxxxx', 'yyyyyyyyyyyyyy'], //所有部级
        // sectionChief: '劉日紅(F1300825)', //处级
        // allSectionChief: ['劉日紅(F1300825)', 'xxxxxxxxxxxxxxxxx', 'yyyyyyyyyyyyy'], //所有处级
        // lineLeader: 'xxxxxxx',  //线体管理员
        // lastTime: '2021-01-25'  //最后修改时间
        dispatch,
        disabled,
        SFC_AP_SYS_name, PCAS_SYS_name, scanPoint,
        IME, allIME, section, allSection, breakPeriodList,
        sectionManager, allSectionManager, minister, allMinister, sectionChief, allSectionChief,
        lineLeader, allLineLeader, lastTime
    } = props;

    let setLineMsg = (payload) => {
        dispatch({
            type: 'LineMsg/setLineMsg',
            payload
        });
    }

    let [modal_PCAS_SYS, setModal_PCAS_SYS] = useState({  //修改PCAS系统对应線體名稱
        visible: false,
        LICODE: []
    });

    let handleCollectios_PCAS_SYS = useMemo(() => {    // 修改PCAS系统对应線體名稱的操作集合
        let setLocalState = (payload) => {
            setModal_PCAS_SYS({ ...modal_PCAS_SYS, ...payload });
        }
        return {
            searchLICODE() {
                console.log(PCAS_SYS_name);
                setLocalState({
                    visible: true,
                    LICODE: [
                        'Racing car sprays burning fuel into crowd.',
                        'Japanese princess to wed commoner.',
                        'Australian walks 100km after outback crash.',
                        'Man charged over missing wedding girl.',
                        'Los Angeles battles huge wildfires.'
                    ]
                })
            },
            closeModal() {
                setLocalState({ visible: false })
            },
            // handleFocus() {  // 聚焦PCAS系统名
            //     setLocalState({ visible: true, PCAS_SYS_name });
            // },
            // handleInput(e) {   // 输入线体名
            //     setLocalState({ PCAS_SYS_name: e.target.value });
            // },
            // handleOk() {   // 对话框点击确定
            //     console.log(PCAS_SYS_name, modal_PCAS_SYS.PCAS_SYS_name);
            //     setLocalState({ visible: false });
            // },
            // handleCancel() {    // 对话框点击取消
            //     setLocalState({ visible: false });
            // }
        }
    }, [modal_PCAS_SYS, PCAS_SYS_name]);


    let [addBreakPeriod, setAddBreakPeriod] = useState({ // 新增时间段
        visible: false,
        breakPeriod: ['00', '00', '00'],   // 时 起始分 结束分
        remark: ''
    });

    let handleCollectios_addBreakPeriod = useMemo(() => {    // 新增休息时间段的操作集合
        let setLocalState = (payload) => {
            setAddBreakPeriod({ ...addBreakPeriod, ...payload });
        }
        return {
            setLocalState,
            handleClick() {  // 点击【新增休息时间段】按钮
                setLocalState({ visible: true, breakPeriod: ['00', '00', '00'], remark: '' });   //初始化
            },
            remarkChange(breakPeriod) {  // 输入休息时间段
                setLocalState({ breakPeriod });
            },
            remarkChange(e) {  // 输入备注
                setLocalState({ remark: e.target.value });
            },
            handleOk() {   // 对话框点击确定
                setLocalState({ visible: false });
            },
            handleCancel() {    // 对话框点击取消
                setLocalState({ visible: false });
            }
        }
    }, [addBreakPeriod]);

    return <Card size='small' style={{ marginTop: '15px' }} title={<Card2Tit />} >
        <div style={{ padding: '10px 25px 0px 25px' }}>
            <Row gutter={[16, 16]} justify='center'>
                <Col span={8}>
                    <Row gutter={16}>
                        <Col span={8} className={styles['col-label']}>SFC/AP系统名</Col>
                        <Col span={16}>
                            <Input disabled={disabled} value={SFC_AP_SYS_name} onChange={e => { setLineMsg({ SFC_AP_SYS_name: e.target.value }) }} />
                        </Col>
                    </Row>
                </Col>
                <Col span={8}>
                    <Row gutter={16}>
                        <Col span={8} className={styles['col-label']}>PCAS系统名</Col>
                        <Col span={12}>
                            <Input disabled={disabled} value={PCAS_SYS_name} onChange={e => { setLineMsg({ PCAS_SYS_name: e.target.value }) }} />
                            {/* <Modal title={<div><EditOutlined />修改PCAS系统对应線體名稱</div>} visible={modal_PCAS_SYS.visible} onOk={handleCollectios_PCAS_SYS.handleOk} onCancel={handleCollectios_PCAS_SYS.handleCancel}>
                                <Row gutter={[24, 16]}>
                                    <Col span={4} className={styles['col-label']}>
                                        线体名称
                                    </Col>
                                    <Col span={17}>
                                        <Input value={modal_PCAS_SYS.PCAS_SYS_name} onChange={handleCollectios_PCAS_SYS.handleInput} />
                                    </Col>
                                    <Col span={3}>
                                        <Button type='primary' icon={<SearchOutlined />}></Button>
                                    </Col>
                                    <Col span={24}>
                                        <List
                                            size="small" header={<div style={{ textAlign: 'center' }}>LICODE</div>} dataSource={modal_PCAS_SYS.LICODE}
                                            renderItem={item => <List.Item>{item}</List.Item>}
                                        />
                                    </Col>
                                </Row>
                            </Modal> */}
                        </Col>
                        <Col span={4}>
                            <Button type='primary' shape='circle' disabled={disabled} onClick={handleCollectios_PCAS_SYS.searchLICODE} icon={<SearchOutlined />} ></Button>
                            <Modal title={<div><EyeOutlined />查看LICODE</div>} visible={modal_PCAS_SYS.visible} onOk={handleCollectios_PCAS_SYS.closeModal} onCancel={handleCollectios_PCAS_SYS.closeModal}>
                                <Row gutter={[24, 16]}>
                                    <Col span={24}>
                                        <List
                                            size="small" header={<div style={{ textAlign: 'center' }}>{'PCAS系统名:' + PCAS_SYS_name} 的LICODE</div>} dataSource={modal_PCAS_SYS.LICODE}
                                            renderItem={item => <List.Item>{item}</List.Item>}
                                        />
                                    </Col>
                                </Row>
                            </Modal>
                        </Col>
                    </Row>
                </Col>
                <Col span={8}>
                    <Row gutter={16}>
                        <Col span={8} className={styles['col-label']}>掃描點</Col>
                        <Col span={16}>
                            <Input disabled={disabled} value={scanPoint} onChange={e => { setLineMsg({ scanPoint: e.target.value }) }} />
                        </Col>
                    </Row>
                </Col>
                <Col span={16}>
                    <Row gutter={16}>
                        <Col span={4} className={styles['col-label']}>產線|ME等相關</Col>
                        <Col span={20}>
                            <Select mode="multiple" allowClear disabled={disabled} value={IME} onChange={IME => { setLineMsg({ IME }) }} style={{ width: '100%' }} >
                                {
                                    allIME.map(v => <Option key={v} value={v}>{v}</Option>)
                                }
                            </Select>
                        </Col>
                    </Row>
                </Col>
                <Col span={8}>
                    <Row gutter={16}>
                        <Col span={8} className={styles['col-label']}>段別</Col>
                        <Col span={16}>
                            <Select disabled={disabled} value={section} onChange={section => { setLineMsg({ section }) }} style={{ width: '100%' }}>
                                {
                                    allSection.map(v => <Option key={v} value={v}>{v}</Option>)
                                }
                            </Select>
                        </Col>
                    </Row>
                </Col>
                <Col span={16}>
                    <Row gutter={16}>
                        <Col span={4} className={styles['col-label']}>休息時間</Col>
                        <Col span={20}>
                            <List size="small" disabled={disabled} bordered={true} dataSource={breakPeriodList} renderItem={item => {
                                return <List.Item>
                                    {item}
                                    <Popconfirm
                                        disabled={disabled}
                                        title="是否删除该时间段？"
                                        onConfirm={() => { message.success('已删除！') }}
                                        onCancel={() => { }}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button type='primary' size='small' disabled={disabled} danger={true} style={{ float: 'right' }}>删除</Button>
                                    </Popconfirm>
                                </List.Item>
                            }} />
                        </Col>
                    </Row>
                </Col>
                <Col span={8}>
                    <Row gutter={16} justify='center'>
                        <Col span={8}>
                            <Button type="primary" disabled={disabled} onClick={handleCollectios_addBreakPeriod.handleClick}><PlusOutlined />添加休息時間</Button>
                            <Modal title={<div><PlusOutlined />添加休息时间</div>} visible={addBreakPeriod.visible} onOk={handleCollectios_addBreakPeriod.handleOk} onCancel={handleCollectios_addBreakPeriod.handleCancel}>
                                <Row gutter={[24, 16]}>
                                    <Col span={6} className={styles['col-label']}>小時段(时)</Col>
                                    <Col span={17}>
                                        <Select value={addBreakPeriod.breakPeriod[0]} onChange={v => {
                                            handleCollectios_addBreakPeriod.setLocalState({ breakPeriod: [v, addBreakPeriod.breakPeriod[1], addBreakPeriod.breakPeriod[2]] })
                                        }} style={{ width: '100%' }}>
                                            {
                                                createArr(24).map((i) => <Option key={i} value={i}>{i}</Option>)
                                            }
                                        </Select>
                                    </Col>
                                    <Col span={6} className={styles['col-label']}>起始时间(分)</Col>
                                    <Col span={6}>
                                        <Select value={addBreakPeriod.breakPeriod[1]} onChange={v => {
                                            handleCollectios_addBreakPeriod.setLocalState({ breakPeriod: [addBreakPeriod.breakPeriod[0], v, addBreakPeriod.breakPeriod[2]] })
                                        }} style={{ width: '100%' }}>
                                            {
                                                createArr(60).map((i) => <Option key={i} value={i}>{i}</Option>)
                                            }
                                        </Select>
                                    </Col>
                                    <Col span={5} className={styles['col-label']}>结束时间(分)</Col>
                                    <Col span={6}>
                                        <Select value={addBreakPeriod.breakPeriod[2]} onChange={v => {
                                            handleCollectios_addBreakPeriod.setLocalState({ breakPeriod: [addBreakPeriod.breakPeriod[0], addBreakPeriod.breakPeriod[1], v] })
                                        }} style={{ width: '100%' }}>
                                            {
                                                createArr(60).map((i) => <Option key={i} value={i}>{i}</Option>)
                                            }
                                        </Select>
                                    </Col>
                                    <Col span={6} className={styles['col-label']}>备注</Col>
                                    <Col span={17}>
                                        <Input value={addBreakPeriod.remark} onChange={handleCollectios_addBreakPeriod.remarkChange} />
                                    </Col>
                                    <Col span={6} className={styles['col-label']}>预览</Col>
                                    <Col span={17}>
                                        <span style={{ lineHeight: '32px' }}>
                                            {
                                                addBreakPeriod.breakPeriod[1][0] < addBreakPeriod.breakPeriod[2][0] ||
                                                    (addBreakPeriod.breakPeriod[1][0] == addBreakPeriod.breakPeriod[2][0] && addBreakPeriod.breakPeriod[1][1] <= addBreakPeriod.breakPeriod[2][1]) ?
                                                    (addBreakPeriod.breakPeriod[0] + ':' + addBreakPeriod.breakPeriod[1] + ' - ' + addBreakPeriod.breakPeriod[0] + ':' + addBreakPeriod.breakPeriod[2] + ' ' + addBreakPeriod.remark) :
                                                    <span style={{ color: 'red' }}>结束时间不能小于开始时间！</span>
                                            }
                                        </span>
                                    </Col>
                                </Row>
                            </Modal>
                        </Col>
                    </Row>
                </Col>

                <Col span={8}>
                    <Row gutter={16}>
                        <Col span={8} className={styles['col-label']}>課級</Col>
                        <Col span={16}>
                            <Select disabled={disabled} showSearch value={sectionManager} onChange={v => { setLineMsg({ sectionManager: v }) }} filterOption={filterOption} style={{ width: '100%' }} >
                                {
                                    allSectionManager.map(v => <Option key={v} value={v}>{v}</Option>)
                                }
                            </Select>
                        </Col>
                    </Row>
                </Col>
                <Col span={8}>
                    <Row gutter={16}>
                        <Col span={8} className={styles['col-label']}>部級</Col>
                        <Col span={16}>
                            <Select disabled={disabled} showSearch value={minister} onChange={v => { setLineMsg({ minister: v }) }} filterOption={filterOption} style={{ width: '100%' }} >
                                {
                                    allMinister.map(v => <Option key={v} value={v}>{v}</Option>)
                                }
                            </Select>
                        </Col>
                    </Row>
                </Col>
                <Col span={8}>
                    <Row gutter={16}>
                        <Col span={8} className={styles['col-label']}>處級</Col>
                        <Col span={16}>
                            <Select disabled={disabled} showSearch value={sectionChief} onChange={v => { setLineMsg({ sectionChief: v }) }} filterOption={filterOption} style={{ width: '100%' }} >
                                {
                                    allSectionChief.map(v => <Option key={v} value={v}>{v}</Option>)
                                }
                            </Select>
                        </Col>
                    </Row>
                </Col>
                <Col span={16}>
                    <Row gutter={16}>
                        <Col span={4} className={styles['col-label']}>線體管理員</Col>
                        <Col span={20}>
                            <Select mode="multiple" allowClear disabled={disabled} value={lineLeader} onChange={lineLeader => { setLineMsg({ lineLeader }) }} style={{ width: '100%' }} >
                                {
                                    allLineLeader.map(v => <Option key={v} value={v}>{v}</Option>)
                                }
                            </Select>
                        </Col>
                    </Row>
                </Col>
                <Col span={8}>
                    <Row gutter={16}>
                        <Col span={8} className={styles['col-label']}>最後修改時間</Col>
                        <Col span={16}>
                            <Input disabled={true} value={lastTime} />
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <Row gutter={[16, 24]} justify='center'>
                        <Col span={4}>
                            <Popconfirm
                                disabled={disabled}
                                title="是否修改当前線別信息？"
                                onConfirm={() => { message.success('已修改！') }}
                                onCancel={() => { }}
                                okText="是的"
                                cancelText="取消"
                            >
                                <Button type='primary' disabled={disabled} icon={<EditOutlined />}>修改線別信息</Button>
                            </Popconfirm>
                        </Col>
                        <Col span={4}>
                            <Popconfirm
                                disabled={disabled}
                                title="是否删除当前線別？"
                                onConfirm={() => { message.success('已删除！') }}
                                onCancel={() => { }}
                                okText="是的"
                                cancelText="取消"
                            >
                                <Button type='danger' disabled={disabled} icon={<DeleteOutlined />}>删除当前線別</Button>
                            </Popconfirm>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    </Card>
}
Cart2 = connect(state => state.LineMsg)(Cart2);


//-----------------------------------------------------------------------------------------------------------------------


let Cart3 = (props) => {
    let { currentMFG, disabled } = props;

    // currentMFG: 'MFGI',
    //     currentLine: 'Line1',  //当前操作的线体
    //     disabled: true,  // 是否不可操作？
    //     SFC_AP_SYS_name: 'DA3P3A',   // SFC/AP系统名 
    //     PCAS_SYS_name: 'DA3P3A', // PCAS系统名
    //     scan_point: 'DA3S2CT1', // 掃描點
    //     IME: ['aaaa', 'bbbb'], // 產線|ME等相關
    //     allIME: ['aaaa', 'bbbb', 'cccc', 'dddd'],   // 所有IME
    //     section: 'SMT', // 段別
    //     allSection: ['SMT', 'PTH', 'SI', '5DX', 'ICT', 'TEST'], //所有段别
    //     breakPeriodList: ['08:00-11:40 工作', '12:00-13:30 休息', '13:30-17:00 工作', '17:00-19:00 加班'],  // 休息时间列表
    //     // breakPeriod: '',  // 時間段
    //     // remark: 'hhhuuuhuhuhu', // 备注
    //     sectionManager: '劉日紅(F1300825)', //课级 
    //     allSectionManager: ['劉日紅(F1300825)', 'xxxxxxxxxxxx', 'yyyyyyyyyyyyyy'], //所有课级
    //     minister: '洪永祥(F1300147)', //部级
    //     allMinister: ['洪永祥(F1300147)', 'xxxxxxxxxxxx', 'yyyyyyyyyyyyyy'], //所有部级
    //     sectionChief: '劉日紅(F1300825)', //处级
    //     allSectionChief: ['劉日紅(F1300825)', 'xxxxxxxxxxxxxxxxx', 'yyyyyyyyyyyyy'], //所有处级
    //     lineLeader: ['xxxxxxxx'],  //线体管理员
    //     allLineLeader: ['xxxxxxxx', 'yyyyyyyyy', 'zzzzzzzzzzzzzz', 'aaaaaaaaaaaa'],   //所有线体管理员
    //     lastTime: '2021-01-25'  //最后修改时间
    let [lineMsg, setLineMsg] = useState({
        line: '',
        SFC_AP_SYS_name: '',
        PCAS_SYS_name: '',
        scanPoint: '',
        section: 'SMT',
        allSection: ['SMT', 'PTH', 'SI', '5DX', 'ICT', 'TEST'],
        dataSource: 'SFC',
        allDataSource: ['SFC', 'ALL PartsAll', 'ALL Parts外包'],
        sectionManager: '',
        minister: '',
        sectionChief: ''
    });
    let setLocalState = payload => {
        setLineMsg({ ...lineMsg, ...payload });
    }

    let [modalOfShowLICODE, setModalOfShowLICODE] = useState({   //查看LICODE
        LICODE: [],
        visible: false
    });
    let handleCollectios_showLICODE = useMemo(() => {   //查看LICODE对话框的所有操作
        return {
            searchLICODE() {
                setModalOfShowLICODE({
                    ...modalOfShowLICODE,
                    LICODE: ['dsadawfaefewgfwhnfyuwegtf', 'efwejwfuihefuiwehfewfwef', 'fewfewfwejfweuifhweuifh'],
                    visible: true
                })
            },
            closeModal() {
                setModalOfShowLICODE({
                    ...modalOfShowLICODE,
                    visible: false
                })
            }
        }
    }, [modalOfShowLICODE, lineMsg.PCAS_SYS_name]);

    return <Card size='small' style={{ marginTop: '15px', display: disabled ? 'none' : 'block' }} title={<Card3Tit />}>
        <div style={{ padding: '15px 25px 0px 25px' }}>
            <Row gutter={[16, 16]} justify='center'>
                <Col span={8}>
                    <Row gutter={16}>
                        <Col span={8} className={styles['col-label']}>線體名稱</Col>
                        <Col span={16}>
                            <Input value={lineMsg.line} onChange={e => { setLocalState({ line: e.target.value }) }} />
                        </Col>
                    </Row>
                </Col>
                <Col span={8}>
                    <Row gutter={16}>
                        <Col span={8} className={styles['col-label']}>SFC/AP系统名</Col>
                        <Col span={16}>
                            <Input value={lineMsg.SFC_AP_SYS_name} onChange={e => { setLocalState({ SFC_AP_SYS_name: e.target.value }) }} />
                        </Col>
                    </Row>
                </Col>
                <Col span={8}>
                    <Row gutter={16}>
                        <Col span={8} className={styles['col-label']}>PCAS系统名</Col>
                        <Col span={12}>
                            <Input value={lineMsg.PCAS_SYS_name} onChange={e => { setLocalState({ PCAS_SYS_name: e.target.value }) }} />
                        </Col>
                        <Col span={4}>
                            <Button type='primary' shape='circle' onClick={handleCollectios_showLICODE.searchLICODE} icon={<SearchOutlined />} ></Button>
                            <Modal title={<div><EyeOutlined />查看LICODE</div>} visible={modalOfShowLICODE.visible} onOk={handleCollectios_showLICODE.closeModal} onCancel={handleCollectios_showLICODE.closeModal}>
                                <Row gutter={[24, 16]}>
                                    <Col span={24}>
                                        <List
                                            size="small" header={<div style={{ textAlign: 'center' }}>{'PCAS系统名:' + lineMsg.PCAS_SYS_name} 的LICODE</div>} dataSource={modalOfShowLICODE.LICODE}
                                            renderItem={item => <List.Item>{item}</List.Item>}
                                        />
                                    </Col>
                                </Row>
                            </Modal>
                        </Col>
                    </Row>
                </Col>
                <Col span={8}>
                    <Row gutter={16}>
                        <Col span={8} className={styles['col-label']}>掃描點</Col>
                        <Col span={16}>
                            <Input value={lineMsg.scanPoint} onChange={e => { setLocalState({ scanPoint: e.target.value }) }} />
                        </Col>
                    </Row>
                </Col>
                <Col span={8}>
                    <Row gutter={16}>
                        <Col span={8} className={styles['col-label']}>段別</Col>
                        <Col span={16}>
                            <Select value={lineMsg.section} onChange={section => { setLocalState({ section }) }} style={{ width: '100%' }}>
                                {
                                    lineMsg.allSection.map(v => <Option key={v} value={v}>{v}</Option>)
                                }
                            </Select>
                        </Col>
                    </Row>
                </Col>
                <Col span={8}>
                    <Row gutter={16}>
                        <Col span={8} className={styles['col-label']}>數據源</Col>
                        <Col span={16}>
                            <Select value={lineMsg.dataSource} onChange={dataSource => { setLocalState({ dataSource }) }} style={{ width: '100%' }}>
                                {
                                    lineMsg.allDataSource.map(v => <Option key={v} value={v}>{v}</Option>)
                                }
                            </Select>
                        </Col>
                    </Row>
                </Col>
                <Col span={8}>
                    <Row gutter={16}>
                        <Col span={8} className={styles['col-label']}>課級主管</Col>
                        <Col span={16}>
                            <Input value={lineMsg.sectionManager} onChange={e => { setLocalState({ sectionManager: e.target.value }) }} />
                        </Col>
                    </Row>
                </Col>
                <Col span={8}>
                    <Row gutter={16}>
                        <Col span={8} className={styles['col-label']}>部級主管</Col>
                        <Col span={16}>
                            <Input value={lineMsg.minister} onChange={e => { setLocalState({ minister: e.target.value }) }} />
                        </Col>
                    </Row>
                </Col>
                <Col span={8}>
                    <Row gutter={16}>
                        <Col span={8} className={styles['col-label']}>處級主管</Col>
                        <Col span={16}>
                            <Input value={lineMsg.sectionChief} onChange={e => { setLocalState({ sectionChief: e.target.value }) }} />
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <Row gutter={16} justify='center'>
                        <Col span={3}>
                            <Button type='primary' icon={<PlusOutlined />}>新增線體</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    </Card>
}

Cart3 = connect(state => {
    return {
        currentMFG: state.LineMsg.currentMFG,
        disabled: state.LineMsg.disabled
    }
})(Cart3);

export default connect(state => {
    return {
        currentMFG: state.LineMsg.currentMFG,
        disabled: state.LineMsg.disabled
    }
})(LineMsg);
