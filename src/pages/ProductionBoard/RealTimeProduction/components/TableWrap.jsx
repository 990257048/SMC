import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { connect, FormattedMessage, formatMessage } from 'umi';
import { Space, Input, Button, Table, Modal, Row, Col, Switch, Select } from 'antd';
import { ProfileOutlined, BarChartOutlined, RedoOutlined } from '@ant-design/icons';
let { Option } = Select;

import {
    findAllAbnormalCategory, findAllSubAbnormal, findSubAbnormalCategoryByLiCodeTypeCode,
    findAllAbnormalCategoryByLCTCIC, getPCASOrgsByPcasUserID, responsibilitydepartment,
    insertAbnormal, bindPcasid
} from '../service';
import styles from '../style.less';

const dataSource = [
    {
        field1: '08:00 - 09:00',
        field2: '74-123456-01',
        field3: '74-123456-01-A0',
        field4: '60',
        field5: '100',
        field6: '80',
        field7: '-20',
        field8: '80',
        field9: '-20',
        field10: '類型:開/收線/開/收線(20m)劉達\r\n:SMC:開/收線類型:開/收線/開/收線(20m)劉達:SMC:開/收線',
    },
    {
        field1: '09:00 - 10:00',
        field2: '74-123456-01',
        field3: '74-123456-01-A0',
        field4: '60',
        field5: '100',
        field6: '80',
        field7: '-20',
        field8: '80',
        field9: '-20',
        field10: 'xxxxxxxxxxxxxxxx xxxxxx xxxxxxxx',
    },
    {
        field1: '10:00 - 11:00',
        field2: '74-123456-01',
        field3: '74-123456-01-A0',
        field4: '60',
        field5: '100',
        field6: '110',
        field7: '10',
        field8: '80',
        field9: '-20',
        field10: 'xxxxxxxxxxxxxxxx xxxxxx xxxxxxxx',
    },
    {
        field1: '11:00 - 12:00',
        field2: '74-123456-01 74-123456-02 74-123456-03',
        field3: '74-123456-01-A0 74-123456-02-A0 74-123456-03-A0',
        field4: '60 60 60',
        field5: '100 100 100',
        field6: '80 80 80',
        field7: '-20 -20 -20',
        field8: '80',
        field9: '-20',
        field10: 'xxxxxxxxxxxxxxxx xxxxxx xxxxxxxx',
    },
    {
        field1: '11:00 - 12:00',
        field2: '74-123456-01',
        field3: '74-123456-01-A0 74-123456-01-A0 74-123456-01-A0',
        field4: '60',
        field5: '100 100 100',
        field6: '80 120 80',
        field7: '-20 20 -20',
        field8: '80',
        field9: '-20',
        field10: 'xxxxxxxxxxxxxxxx xxxxxx xxxxxxxx',
    },
    {
        field1: '13:00 - 14:00',
        field2: '74-123456-01',
        field3: '74-123456-01-A0',
        field4: '60',
        field5: '100',
        field6: '80',
        field7: '-20',
        field8: '80',
        field9: '-20',
        field10: 'xxxxxxxxxxxxxxxx xxxxxx xxxxxxxx',
    },
    {
        field1: '14:00 - 15:00',
        field2: '74-123456-01',
        field3: '74-123456-01-A0',
        field4: '60',
        field5: '100',
        field6: '80',
        field7: '-20',
        field8: '80',
        field9: '-20',
        field10: 'xxxxxxxxxxxxxxxx xxxxxx xxxxxxxx',
    },
    {
        field1: '15:00 - 16:00',
        field2: '74-123456-01',
        field3: '74-123456-01-A0',
        field4: '60',
        field5: '100',
        field6: '110',
        field7: '10',
        field8: '80',
        field9: '-20',
        field10: 'xxxxxxxxxxxxxxxx xxxxxx xxxxxxxx',
    },
    {
        field1: '16:00 - 17:00',
        field2: '74-123456-01',
        field3: '74-123456-01-A0 74-123456-01-A0 74-123456-01-A0',
        field4: '60',
        field5: '100 100 100',
        field6: '80 80 80',
        field7: '-20 -20 -20',
        field8: '80',
        field9: '-20',
        field10: 'xxxxxxxxxxxxxxxx xxxxxx xxxxxxxx',
    },
    {
        field1: '17:00 - 18:00',
        field2: '74-123456-01 74-123456-02 74-123456-03',
        field3: '74-123456-01-A0 74-123456-02-A0 74-123456-03-A0',
        field4: '60',
        field5: '100 100 100',
        field6: '80 120 80',
        field7: '-20 20 -20',
        field8: '80',
        field9: '-20',
        field10: 'xxxxxxxxxxxxxxxx xxxxxx xxxxxxxx',
    }
];

const ret_table_config = (h, tableData) => ({
    size: 'small',
    scroll: { y: h },
    bordered: true,
    pagination: {
        size: 'small',
        defaultPageSize: 50,
        hideOnSinglePage: true
    },
    dataSource: tableData, // dataSource.map((row, i) => ({ key: 'row' + i, ...row })),
    columns: [
        {
            title: formatMessage({ id: '实时生产看板.表字段.时间段' }),
            align: 'center',
            dataIndex: 'PERIOD',
            width: 120
        },
        {
            title: formatMessage({ id: '实时生产看板.表字段.机种' }),
            align: 'center',
            dataIndex: 'SKU_NAME',
            width: 120,
            render: (text) => <> {
                text.split('\n').map((t, i) => <p key={text + '-' + t + i} style={{ height: '16px', lineHeight: '16px', marginBottom: '0' }}>{t}</p>)
            } </>
        },
        {
            title: formatMessage({ id: '实时生产看板.表字段.料号' }),
            align: 'center',
            dataIndex: 'SKUNO',
            width: 130,
            render: (text) => <> {
                text.split('\n').map((t, i) => <p key={text + '-' + t + i} style={{ height: '16px', lineHeight: '16px', marginBottom: '0' }}>{t}</p>)
            } </>
        },
        {
            title: formatMessage({ id: '实时生产看板.表字段.有效工时' }),
            align: 'center',
            dataIndex: 'COST_TIME',
            width: 80,
            render: (text) => <> {
                text.split('\n').map((t, i) => <p key={text + '-' + t + i} style={{ height: '16px', lineHeight: '16px', marginBottom: '0' }}>{t}</p>)
            } </>
        },
        {
            title: formatMessage({ id: '实时生产看板.表字段.目标产能' }),
            align: 'center',
            dataIndex: 'UPH',
            width: 80,
            render: (text) => <> {
                text.split('\n').map((t, i) => <p key={text + '-' + t + i} style={{ color: 'green', height: '16px', lineHeight: '16px', marginBottom: '0' }}>{t}</p>)
            } </>
        },
        {
            title: formatMessage({ id: '实时生产看板.表字段.实际产出' }),
            align: 'center',
            dataIndex: 'REAL_OUT',
            width: 80,
            render: (text) => <> {
                text.split('\n').map((t, i) => <p key={text + '-' + t + i} style={{ color: '#337ab7', height: '16px', lineHeight: '16px', marginBottom: '0' }}>{t}</p>)
            } </>
        },
        {
            title: formatMessage({ id: '实时生产看板.表字段.差异' }),
            align: 'center',
            dataIndex: 'DIFF',
            width: 80,
            render: (text) => <> {
                text.split('\n').map((t, i) => <p key={text + '-' + t + i} style={{ color: /^-/.test(t) ? 'red' : 'green', height: '16px', lineHeight: '16px', marginBottom: '0' }}>{t}</p>)
            } </>
        },
        {
            title: formatMessage({ id: '实时生产看板.表字段.累计产出' }),
            align: 'center',
            dataIndex: 'TOTAL_OUT',
            width: 80,
        },
        {
            title: formatMessage({ id: '实时生产看板.表字段.累计差异' }),
            align: 'center',
            dataIndex: 'TOTAL_DIFF',
            width: 80,
        },
        {
            title: formatMessage({ id: '实时生产看板.表字段.备注' }),
            align: 'center',
            dataIndex: 'REMARK',
            // width: 300,
            // render: (text) => <> {
            //     text.split('\n').map((t, i) => <p key={text + '-' + t + i} style={{ height: '16px', lineHeight: '16px', textAlign: 'left', marginBottom: '0' }}>{t}</p>)
            // } </>
            render: (text) => <> {
                <p style={{ lineHeight: '16px', textAlign: 'left', marginBottom: '0' }}>{text}</p>
            } </>
        }
    ],
    rowClassName: styles._tab_row
})

let useModal = (initState = {}) => {
    let [state, setState] = useState({ ...initState, visible: false, width: 800 });
    let setStates = payload => {
        setState({ ...state, ...payload });
    }
    let open = () => {
        setStates({ visible: true });
    }
    let close = () => {
        setStates({ visible: false });
    }
    let submit = () => {

    }
    return [state, setStates, open, close];
}

let TableWrap = props => {
    let { height, realTimeProduction: { AbnormalTable, currentDate, currentMFG, currentLine, currentClass } } = props;

    const tableConfig = useMemo(() => {
        let h = height - 430;
        return ret_table_config(h, AbnormalTable);
    }, [height, AbnormalTable]);

    let [modalData, setModalData, open, close, submit] = useModal({
        KANBAN_ID: "",
        currentLine: "", WO: "", caseLarge: "", caseLargeList: [], caseSmall: "", caseSmallList: [], PERIOD: "", organization: "", responsibleUnit: "", responsibleUnitList: [], skuno: "",
        desc: "", PredictiveMaintenance: false
    });
    let [subModalData, setSubModalData, subOpen, subClose] = useModal({});

    const onRow = useCallback((row, index) => {   //绑事件（行）
        //console.log(row, index);
        return {
            onClick: () => {
                console.log(row);
                setModalData({ visible: true, KANBAN_ID: row.KANBAN_ID, currentLine, PERIOD: row.PERIOD, skuno: row.SKUNO });   // 代入表数据，全局条件
            }
        };
    }, [modalData, currentLine]);

    // PCAS信息（licode）发生变化 -> 初始化异常大项 findAllAbnormalCategory 初始化异常小项 findAllSubAbnormal  带出责任单位 responsibilitydepartment
    // 异常大项(licode typecode )发生变化 -> 带出异常小项 findSubAbnormalCategoryByLiCodeTypeCode
    // 异常大项，异常小项(licode typecode itemcode)发生变化 -》 带出异常描述 findAllAbnormalCategoryByLCTCIC
    // 根据登录人(empno) -》 组织名称 getPCASOrgsByPcasUserID
    // 填完信息 -》提交  insertAbnormal
    // 根据登录人 pcasuserid -》修改绑定信息  bindPcasid

    // useEffect(() => {
    //     PCAS.LI_CODE && Promise.all([findAllAbnormalCategory(PCAS.LI_CODE), findAllSubAbnormal(PCAS.LI_CODE), responsibilitydepartment(PCAS.LI_CODE)]).then(res => {
    //         console.log(res);
    //         res.forEach(({ Status, Data, Message }, index) => {
    //             if (Status == 'Pass') {
    //                 switch (index) {
    //                     case 0:   // 异常大项
    //                         setModalData({
    //                             caseLarge: Data[0].DEFECT_TYPE_CODE,
    //                             caseLargeList: Data.map(r => ({ label: r.DEFECT_TYPE_DESC1, value: r.DEFECT_TYPE_CODE }))
    //                         });
    //                         break;
    //                     case 1:
    //                         setModalData({
    //                             caseSmall: Data[0].DEFECT_ITEM_CODE,
    //                             caseSmallList: Data.map(r => ({ label: r.DEFECT_TYPE_DESC1, value: r.DEFECT_ITEM_CODE }))
    //                         });
    //                         break;
    //                     default:
    //                         setModalData({
    //                             responsibleUnit: Data[0].DEPART_CODE,
    //                             responsibleUnitList: Data.map(r => ({ label: r.DEPART_DESC, value: r.DEPART_CODE }))
    //                         });
    //                         console.log(modalData);
    //                         break;
    //                 }
    //             } else {
    //                 message.error(Message);
    //             }
    //         })
    //     });
    // }, [PCAS.LI_CODE])


    return <div className={styles['table-wrap']}>
        <Table {...tableConfig} onRow={onRow} />
        <Modal title="异常维护" visible={modalData.visible} onOk={close} onCancel={close} width={modalData.width}>
            <div className={styles['modal-wrap']}>
                <Row gutter={[12, 24]}>
                    <Col className={styles['modal-lable']} span={4}>
                        线体名
                    </Col>
                    <Col span={8}>
                        <Input disabled defaultValue={modalData.currentLine} />
                    </Col>
                    <Col className={styles['modal-lable']} span={4}>
                        工单号（选填）
                    </Col>
                    <Col span={8}>
                        <Input value={modalData.WO} onChange={e => setModalData({ WO: e.target.value })} />
                    </Col>
                </Row>
                <Row gutter={[12, 24]}>
                    <Col className={styles['modal-lable']} span={4}>
                        异常大项
                    </Col>
                    <Col span={8}>
                        <Select value={modalData.caseLarge} onChange={v => setModalData({ caseLarge: v })} style={{ width: '100%' }}>
                            {
                                modalData.caseLargeList.map((v, i) => <Option key={i} value={v}>{v}</Option>)
                            }
                        </Select>
                    </Col>
                    <Col className={styles['modal-lable']} span={4}>
                        异常小项
                    </Col>
                    <Col span={8}>
                        <Select value={modalData.caseSmall} onChange={v => setModalData({ caseSmall: v })} style={{ width: '100%' }}>
                            {
                                modalData.caseSmallList.map((v, i) => <Option key={i} value={v}>{v}</Option>)
                            }
                        </Select>
                    </Col>
                </Row>
                <Row gutter={[12, 24]}>
                    <Col className={styles['modal-lable']} span={4}>
                        时间段
                    </Col>
                    <Col span={8}>
                        <Input value={modalData.PERIOD} onChange={e => setModalData({ PERIOD: e.target.value })} />
                    </Col>
                    <Col className={styles['modal-lable']} span={4}>
                        组织名称
                    </Col>
                    <Col span={8}>
                        <Input value={modalData.organization} onChange={e => setModalData({ organization: e.target.value })} />
                    </Col>
                </Row>
                <Row gutter={[12, 24]}>
                    <Col className={styles['modal-lable']} span={4}>
                        责任单位
                    </Col>
                    <Col span={8}>
                        <Input value={modalData.responsibleUnit} onChange={e => setModalData({ responsibleUnit: e.target.value })} />
                    </Col>
                    <Col className={styles['modal-lable']} span={4}>
                        料号（必填）
                    </Col>
                    <Col span={8}>
                        <Input value={modalData.skuno} onChange={e => setModalData({ skuno: e.target.value })} />
                    </Col>
                </Row>
                <Row gutter={[12, 24]}>
                    <Col className={styles['modal-lable']} span={4}>
                        异常描述
                    </Col>
                    <Col span={20}>
                        <Input value={modalData.desc} onChange={e => setModalData({ desc: e.target.value })} />
                    </Col>
                </Row>
                <Row gutter={[12, 24]}>
                    <Col className={styles['modal-lable']} span={4}>
                        是否为预维护
                    </Col>
                    <Col span={20}>
                        <Switch checkedChildren="是" unCheckedChildren="否" checked={modalData.PredictiveMaintenance} onChange={v => setModalData({ PredictiveMaintenance: v })} />
                    </Col>
                </Row>
                <Row gutter={[12, 24]}>
                    <Col className={styles['modal-lable']} span={9}>

                    </Col>
                    <Col span={8}>
                        <Space>
                            <Button type='primary' onClick={submit}>提交</Button>
                            <Button type='primary' onClick={subOpen}>PCAS账号绑定修改</Button>
                            <Modal title="PCAS账号绑定" visible={subModalData.visible} onOk={subClose} onCancel={subClose} width={400}>
                                <Row gutter={[12, 24]}>
                                    <Col span={8}>
                                        要绑定的PCAS账号
                                    </Col>
                                    <Col span={16}>
                                        <Input />
                                    </Col>
                                </Row>
                            </Modal>
                        </Space>
                    </Col>
                </Row>
            </div>

        </Modal>
    </div>
}



export default connect(({ global, user, realTimeProduction: { AbnormalTable, currentDate, currentMFG, currentLine, currentClass, PCAS } }) => ({
    height: global.height,
    // empno: user.currentUser[0].WORKID,
    realTimeProduction: {
        currentDate,
        currentMFG,
        currentLine,
        currentClass,
        AbnormalTable,
        // PCAS
    }
}))(TableWrap);