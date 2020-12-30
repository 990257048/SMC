// 线体信息配置 20201228 add by gch

import React from 'react';
import { connect } from 'umi';
import { Card, Row, Col, Input, Button } from 'antd';
import { SettingOutlined, EditOutlined, DeleteOutlined, CheckOutlined, FormOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import styles from './style.less';

let { TextArea } = Input;

let LineMsg = props => {
    let { dispatch, test } = props;
    return <div className="line-msg">
        <h3>
            <SettingOutlined />
            <b> 線體信息配置</b>
        </h3>
        <Card size='small' title={<Card1Tit />}>
            <div style={{ padding: '15px 25px 0px 25px' }}>
                <Row gutter={[16, 16]} justify='center'>
                    <Col span={8}>
                        <Row gutter={16}>
                            <Col span={8} className={styles['col-label']}>MFG</Col>
                            <Col span={16}>
                                <Input />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row gutter={16}>
                            <Col span={8} className={styles['col-label']}>
                                SMC線別
                            </Col>
                            <Col span={16}>
                                <Input />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row gutter={16} justify='center'>
                            <Col span={8}>
                                <Button type="primary" icon={<EditOutlined />}>修改線體名稱</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </Card>

        <Card size='small' style={{ marginTop: '15px' }} title={<Card2Tit />} >
            <div style={{ padding: '10px 25px 0px 25px' }}>
                <Row gutter={[16, 16]} justify='center'>
                    <Col span={8}>
                        <Row gutter={16}>
                            <Col span={8} className={styles['col-label']}>SFC/AP系统名</Col>
                            <Col span={16}>
                                <Input />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row gutter={16}>
                            <Col span={8} className={styles['col-label']}>PCAS系统名</Col>
                            <Col span={16}>
                                <Input />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row gutter={16}>
                            <Col span={8} className={styles['col-label']}>掃描點</Col>
                            <Col span={16}>
                                <Input />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={16}>
                        <Row gutter={16}>
                            <Col span={4} className={styles['col-label']}>產線|ME等相關</Col>
                            <Col span={20}>
                                <Input />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row gutter={16}>
                            <Col span={8} className={styles['col-label']}>段別</Col>
                            <Col span={16}>
                                <Input />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={16}>
                        <Row gutter={16}>
                            <Col span={4} className={styles['col-label']}>休息時間</Col>
                            <Col span={20}>
                                <TextArea></TextArea>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}></Col>
                    <Col span={8}>
                        <Row gutter={16}>
                            <Col span={8} className={styles['col-label']}>休息時間段</Col>
                            <Col span={16}>
                                <Input />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row gutter={16}>
                            <Col span={8} className={styles['col-label']}>備註</Col>
                            <Col span={16}>
                                <Input />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row gutter={16} justify='center'>
                            <Col span={8}>
                                <Button type="primary"><PlusOutlined />添加線體休息時間</Button>
                            </Col>
                        </Row>
                    </Col>
                    {/* <Col span={24}>
                        <Row gutter={16} justify='center'>
                            <Col span={8}>
                                <Row gutter={16}>
                                    <Col span={8} className={styles['col-label']}>選擇時間段</Col>
                                    <Col span={16}>
                                        <Input />
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={8}>
                                <Row gutter={16}>
                                    <Col span={8} className={styles['col-label']}>備註</Col>
                                    <Col span={16}>
                                        <Input />
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={8}>
                                <Button type="primary"><PlusOutlined />添加線體休息時間</Button>
                            </Col>
                        </Row>
                    </Col> */}
                    <Col span={8}>
                        <Row gutter={16}>
                            <Col span={8} className={styles['col-label']}>課級</Col>
                            <Col span={16}>
                                <Input />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row gutter={16}>
                            <Col span={8} className={styles['col-label']}>部級</Col>
                            <Col span={16}>
                                <Input />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row gutter={16}>
                            <Col span={8} className={styles['col-label']}>處級</Col>
                            <Col span={16}>
                                <Input />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={16}>
                        <Row gutter={16}>
                            <Col span={4} className={styles['col-label']}>線體管理員</Col>
                            <Col span={20}>
                                <Input />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row gutter={16}>
                            <Col span={8} className={styles['col-label']}>最後修改時間</Col>
                            <Col span={16}>
                                <Input />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row gutter={16} justify='center'>
                            <Col span={4}>
                                <Button type='danger' icon={<DeleteOutlined />}>删除当前線別</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </Card>

        <Card size='small' style={{ marginTop: '15px' }} title={<Card3Tit />}>
            <div style={{ padding: '15px 25px 0px 25px' }}>
                <Row gutter={[16, 16]} justify='center'>
                    <Col span={8}>
                        <Row gutter={16}>
                            <Col span={8} className={styles['col-label']}>線體名稱</Col>
                            <Col span={16}>
                                <Input />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row gutter={16}>
                            <Col span={8} className={styles['col-label']}>SFC/AP系统名</Col>
                            <Col span={16}>
                                <Input />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row gutter={16}>
                            <Col span={8} className={styles['col-label']}>PCAS系统名</Col>
                            <Col span={12}>
                                <Input />
                            </Col>
                            <Col span={4}>
                                <Button type='primary' shape='circle' icon={<SearchOutlined />} ></Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row gutter={16}>
                            <Col span={8} className={styles['col-label']}>掃描點</Col>
                            <Col span={16}>
                                <Input />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row gutter={16}>
                            <Col span={8} className={styles['col-label']}>段別</Col>
                            <Col span={16}>
                                <Input />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row gutter={16}>
                            <Col span={8} className={styles['col-label']}>數據源</Col>
                            <Col span={16}>
                                <Input />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row gutter={16}>
                            <Col span={8} className={styles['col-label']}>課級主管</Col>
                            <Col span={16}>
                                <Input />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row gutter={16}>
                            <Col span={8} className={styles['col-label']}>部級主管</Col>
                            <Col span={16}>
                                <Input />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row gutter={16}>
                            <Col span={8} className={styles['col-label']}>處級主管</Col>
                            <Col span={16}>
                                <Input />
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


    </div>
}

let Card1Tit = () => {
    return <div className={styles['card-tit']}><CheckOutlined /> 選擇線體</div>
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
    return <div className={styles['card-tit']}><PlusOutlined /> 新增線體</div>
}

export default connect(state => {
    return {
        test: state.LineMsg.test
    }
})(LineMsg);