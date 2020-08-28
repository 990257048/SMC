
import React, { useEffect, useMeno, useCallback } from 'react';
import { connect, FormattedMessage, formatMessage } from 'umi';
import { Button, Space, Input, Tabs, Popover, Row, Col, Divider, Select, Radio, DatePicker, Tooltip } from 'antd';
import { SearchOutlined, PlusOutlined, ProfileOutlined, BarsOutlined, ZoomInOutlined } from '@ant-design/icons'
import moment from 'moment';

import styles from '../style.less';

const { TabPane } = Tabs;
const { Option } = Select;
const { RangePicker } = DatePicker;

let AdvancedSearch = props => {  // 高级搜索
    return <div className={styles['control-content']}>
        <Tabs size="small" type='line' defaultActiveKey="1" className={styles['tabs-query']} >
            <TabPane tab="按年份" key="1">
                <div className={styles['tab-query']}>
                    <Row gutter={[16, 12]} style={{ marginTop: '10px' }}>
                        <Col span={6}>
                            <div className={styles['col-con']}>年份</div>
                        </Col>
                        <Col span={18}>
                            <div>
                                <Select defaultValue="2020年" className={styles.w100}>
                                    <Option value="2020年">2020年</Option>
                                    <Option value="2019年">2019年</Option>
                                    <Option value="2018年">2018年</Option>
                                    <Option value="2017年">2017年</Option>
                                </Select>
                            </div>
                        </Col>
                    </Row>
                </div>
            </TabPane>
            <TabPane tab="按季度" key="2">
                <div className={styles['tab-query']}>
                    <Row gutter={[16, 12]} style={{ marginTop: '10px' }}>
                        <Col span={6}>
                            <div className={styles['col-con']}>年份</div>
                        </Col>
                        <Col span={18}>
                            <div>
                                <Select defaultValue="2020年" className={styles.w100}>
                                    <Option value="2020年">2020年</Option>
                                    <Option value="2019年">2019年</Option>
                                    <Option value="2018年">2018年</Option>
                                    <Option value="2017年">2017年</Option>
                                </Select>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className={styles['col-con']}>季度</div>
                        </Col>
                        <Col span={18}>
                            <div>
                                <Select defaultValue="第一季度" className={styles.w100}>
                                    <Option value="第一季度">第一季度</Option>
                                    <Option value="第二季度">第二季度</Option>
                                    <Option value="第三季度">第三季度</Option>
                                    <Option value="第四季度">第四季度</Option>
                                </Select>
                            </div>
                        </Col>
                    </Row>
                </div>
            </TabPane>
            <TabPane tab="按月份" key="3">
                <div className={styles['tab-query']}>
                    <Row gutter={[16, 12]} style={{ marginTop: '10px' }}>
                        <Col span={6}>
                            <div className={styles['col-con']}>年份</div>
                        </Col>
                        <Col span={18}>
                            <div>
                                <Select defaultValue="2020年" className={styles.w100}>
                                    <Option value="2020年">2020年</Option>
                                    <Option value="2019年">2019年</Option>
                                    <Option value="2018年">2018年</Option>
                                    <Option value="2017年">2017年</Option>
                                </Select>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className={styles['col-con']}>月份</div>
                        </Col>
                        <Col span={18}>
                            <div>
                                <Select defaultValue="一月份" className={styles.w100}>
                                    <Option value="一月份">一月份</Option>
                                    <Option value="二月份">二月份</Option>
                                    <Option value="三月份">三月份</Option>
                                    <Option value="四月份">四月份</Option>
                                    <Option value="五月份">五月份</Option>
                                    <Option value="六月份">六月份</Option>
                                    <Option value="七月份">七月份</Option>
                                    <Option value="八月份">八月份</Option>
                                    <Option value="九月份">九月份</Option>
                                    <Option value="十月份">十月份</Option>
                                    <Option value="十一月份">十一月份</Option>
                                    <Option value="十二月份">十二月份</Option>
                                </Select>
                            </div>
                        </Col>
                    </Row>
                </div>
            </TabPane>
            <TabPane tab="按周别" key="4">
                <div className={styles['tab-query']}>
                    <Row gutter={[16, 12]} style={{ marginTop: '10px' }}>
                        <Col span={6}>
                            <div className={styles['col-con']}>年份</div>
                        </Col>
                        <Col span={18}>
                            <div>
                                <Select defaultValue="2020年" className={styles.w100}>
                                    <Option value="2020年">2020年</Option>
                                    <Option value="2019年">2019年</Option>
                                    <Option value="2018年">2018年</Option>
                                    <Option value="2017年">2017年</Option>
                                </Select>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className={styles['col-con']}>周别</div>
                        </Col>
                        <Col span={18}>
                            <div>
                                <Select defaultValue="第1周" className={styles.w100}>
                                    {
                                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                                            11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                                            21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
                                            31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
                                            41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
                                            51, 52, 53
                                        ].map(n => <Option key={'week' + n} value={'第' + n + '周'}>{'第' + n + '周'}</Option>)
                                    }
                                </Select>
                            </div>
                        </Col>
                    </Row>
                </div>
            </TabPane>
            <TabPane tab="按时间段" key="5">
                <div className={styles['tab-query']}>
                    <Row gutter={[16, 12]} style={{ marginTop: '10px' }}>
                        <Col span={6}>
                            <div className={styles['col-con']}>年份</div>
                        </Col>
                        <Col span={18}>
                            <div>
                                <RangePicker className={styles.w100}
                                    defaultValue={[moment('2020/01/01', 'YYYY/MM/DD'), moment('2020/01/01', 'YYYY/MM/DD')]} format='YYYY/MM/DD'
                                />
                            </div>
                        </Col>
                    </Row>
                </div>
            </TabPane>
        </Tabs>
        <Row gutter={[16, 12]}>
            <Col span={24}>
                <div className={styles['col-con']}>
                    <Button type="primary" icon={<SearchOutlined />}>查询</Button>
                </div>
            </Col>
        </Row>
    </div>
}

export default AdvancedSearch;
