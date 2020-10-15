
import React, { useEffect, useMeno, useCallback } from 'react';
import { connect, FormattedMessage, formatMessage } from 'umi';
import { Button, Space, Input, Tabs, Popover, Row, Col, Divider, Select, Radio, Checkbox, DatePicker, Tooltip } from 'antd';
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
                <div className={styles['tab-query']}>
                    <Row gutter={[0, 24]} justify="center" style={{ marginTop: '20px' }}>
                        <Col span={24}>
                            <Row>
                                {/* <Col span={4} style={{ textAlign: 'center' }}>按BU:</Col> */}
                                <Col span={24}>
                                    <Checkbox.Group defaultValue="PCBU">
                                        <Checkbox style={{ marginLeft: '8px' }} value="SRG">SRG</Checkbox>
                                        <Checkbox value="PCBU">PCBU</Checkbox>
                                    </Checkbox.Group>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </TabPane>
            <TabPane tab="按发生区域" key="2">
                <div className={styles['tab-query']}>
                    <Row gutter={[0, 24]} justify="center" style={{ marginTop: '20px' }}>
                        <Col span={24}>
                            <Row>
                                {/* <Col span={4} style={{ textAlign: 'center' }}>按发生区域:</Col> */}
                                <Col span={24}>
                                    <Checkbox.Group defaultValue="Kitting">
                                        <Checkbox style={{ marginLeft: '8px' }} value="Kitting">Kitting</Checkbox>
                                        <Checkbox value="SMT">SMT</Checkbox>
                                        <Checkbox value="ICT">ICT</Checkbox>
                                        <Checkbox value="Packing">Packing</Checkbox>
                                        <Checkbox value="5DX">5DX</Checkbox>
                                        <Checkbox value="压合">压合</Checkbox>
                                        <Checkbox value="PTH">PTH</Checkbox>
                                        <Checkbox value="RE">RE</Checkbox>
                                        <Checkbox value="MCEBU">MCEBU</Checkbox>
                                        <Checkbox value="分板">分板</Checkbox>
                                        <Checkbox value="BST">BST</Checkbox>
                                        <Checkbox value="其它">其它</Checkbox>
                                    </Checkbox.Group>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </TabPane>
            <TabPane tab="按异常分类" key="3">
                <div className={styles['tab-query']}>
                    <Row gutter={[0, 16]} justify="center">
                        <Col span={24}>
                            <Row>
                                {/* <Col span={3} style={{ textAlign: 'right', paddingRight: '15px' }}>按异常分类:</Col> */}
                                <Col span={24}>

                                    {/* ====================================================================================================================================== */}

                                    {/* 設備異常 物料異常 人員異常 品質異常 治工具異常 系統異常     */}
                                    <Tabs size="small" type='card' defaultActiveKey="1" style={{ width: '100%', border: '1px solid #ddd' }} >
                                        <TabPane tab="設備異常" key="1">
                                            <div style={{ width: '100%' }}>

                                                <Row gutter={[0, 12]} justify="center">
                                                    <Col span={24}>
                                                        <Row>
                                                            <Col span={4} style={{ textAlign: 'center' }}>異常描述</Col>
                                                            <Col span={20}>
                                                                {/* 設備檔機 保養超時 低效生產 安全隱患 功能缺失 帶病運行 */}
                                                                <Checkbox.Group defaultValue="設備檔機">
                                                                    <Checkbox style={{ marginLeft: '8px' }} value="設備檔機">設備檔機</Checkbox>
                                                                    <Checkbox value="保養超時">保養超時</Checkbox>
                                                                    <Checkbox value="低效生產">低效生產</Checkbox>
                                                                    <Checkbox value="安全隱患">安全隱患</Checkbox>
                                                                    <Checkbox value="功能缺失">功能缺失</Checkbox>
                                                                    <Checkbox value="帶病運行">帶病運行</Checkbox>
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
                                                                <Checkbox.Group defaultValue="SMT設備">
                                                                    <Checkbox style={{ marginLeft: '8px' }} value="SMT設備">SMT設備</Checkbox>
                                                                    <Checkbox value="PTH設備">PTH設備</Checkbox>
                                                                    <Checkbox value="測試設備">測試設備</Checkbox>
                                                                    <Checkbox value="流水線">流水線</Checkbox>
                                                                    <Checkbox value="SFC設備">SFC設備</Checkbox>
                                                                    <Checkbox value="公務設備">公務設備</Checkbox>
                                                                </Checkbox.Group>
                                                            </Col>
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
                                                    <Col span={12}></Col>
                                                </Row>

                                                <Row gutter={[0, 12]} justify="center">
                                                    <Col span={12}>
                                                        <Row>
                                                            <Col span={8} style={{ textAlign: 'center' }}>設備編號</Col>
                                                            <Col span={15}><Input size="small" /></Col>
                                                        </Row>
                                                    </Col>
                                                    <Col span={12}></Col>
                                                </Row>

                                                <Row gutter={[0, 12]} justify="center">
                                                    <Col span={12} style={{textAlign: 'center'}}>
                                                        <Button type="primary" size="small" icon={ <CheckOutlined /> }>确定</Button>
                                                    </Col>
                                                </Row>

                                            </div>
                                        </TabPane>
                                        <TabPane tab="物料異常" key="2">
                                            {/* 異常描述: 來料短缺 物料Delay 錯料 混料 物料包裝異常 特采過期 包裝信息與實物不符 有帳無務 其它 */}
                                            <div style={{ width: '100%' }}>

                                                <Row gutter={[0, 12]} justify="center">
                                                    <Col span={24}>
                                                        <Row>
                                                            <Col span={4} style={{ textAlign: 'center' }}>異常描述</Col>
                                                            <Col span={20}>
                                                                <Checkbox.Group defaultValue="來料短缺">
                                                                    <Checkbox style={{ marginLeft: '8px' }} value="來料短缺">來料短缺</Checkbox>
                                                                    <Checkbox value="物料Delay">物料Delay</Checkbox>
                                                                    <Checkbox value="錯料">錯料</Checkbox>
                                                                    <Checkbox value="混料">混料</Checkbox>
                                                                    <Checkbox value="物料包裝異常">物料包裝異常</Checkbox>
                                                                    <Checkbox value="有帳無務">有帳無務</Checkbox>
                                                                    <Checkbox value="包裝信息與實物不符">包裝信息與實物不符</Checkbox>
                                                                    <Checkbox value="其它">其它</Checkbox>
                                                                </Checkbox.Group>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>

                                                <Row gutter={[0, 12]} justify="center">
                                                    <Col span={12}>
                                                        <Row>
                                                            <Col span={8} style={{ textAlign: 'center' }}>零件料號</Col>
                                                            <Col span={15}><Input size="small" /></Col>
                                                        </Row>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Col span={8} style={{ textAlign: 'center' }}>不良率</Col>
                                                            <Col span={15}><Input size="small" /></Col>
                                                        </Row>
                                                    </Col>
                                                </Row>

                                                <Row gutter={[0, 12]} justify="center">
                                                    <Col span={12}>
                                                        <Row>
                                                            <Col span={8} style={{ textAlign: 'center' }}>供應商</Col>
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
                                                    <Col span={12}></Col>
                                                </Row>

                                                <Row gutter={[0, 12]} justify="center">
                                                    <Col span={12} style={{textAlign: 'center'}}>
                                                        <Button type="primary" size="small" icon={ <CheckOutlined /> }>确定</Button>
                                                    </Col>
                                                </Row>

                                            </div>
                                        </TabPane>
                                        <TabPane tab="人員異常" key="3">
                                            {/* 異常描述: 人力不足 新人技能不足 外借人力技能不足 其它 */}
                                            <div style={{ width: '100%' }}>

                                                <Row gutter={[0, 12]} justify="center">
                                                    <Col span={24}>
                                                        <Row>
                                                            <Col span={4} style={{ textAlign: 'center' }}>異常描述</Col>
                                                            <Col span={20}>
                                                                <Checkbox.Group defaultValue="人力不足">
                                                                    <Checkbox style={{ marginLeft: '8px' }} value="人力不足">人力不足</Checkbox>
                                                                    <Checkbox value="新人技能不足">新人技能不足</Checkbox>
                                                                    <Checkbox value="外借人力技能不足">外借人力技能不足</Checkbox>
                                                                    <Checkbox value="其它">其它</Checkbox>
                                                                </Checkbox.Group>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>

                                                <Row gutter={[0, 12]} justify="center">
                                                    <Col span={12} style={{textAlign: 'center'}}>
                                                        <Button type="primary" size="small" icon={ <CheckOutlined /> }>确定</Button>
                                                    </Col>
                                                </Row>

                                            </div>
                                        </TabPane>
                                        <TabPane tab="品質異常" key="4">
                                            <div style={{ width: '100%' }}>

                                                <Row gutter={[0, 12]} justify="center">
                                                    {/* 製程段:  SMT製程不良 PTH製程不良 組裝製程不良 測試製程不良 維修製程不良 壓合製程不良  */}
                                                    <Col span={24}>
                                                        <Row>
                                                            <Col span={4} style={{ textAlign: 'center' }}>製程段</Col>
                                                            <Col span={20}>
                                                                <Checkbox.Group defaultValue="SMT製程不良">
                                                                    <Checkbox style={{ marginLeft: '8px' }} value="SMT製程不良">SMT製程不良</Checkbox>
                                                                    <Checkbox value="PTH製程不良">PTH製程不良</Checkbox>
                                                                    <Checkbox value="組裝製程不良">組裝製程不良</Checkbox>
                                                                    <Checkbox value="測試製程不良">測試製程不良</Checkbox>
                                                                    <Checkbox value="維修製程不良">維修製程不良</Checkbox>
                                                                    <Checkbox value="壓合製程不良">壓合製程不良</Checkbox>
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
                                                                <Checkbox.Group defaultValue="批量損件">
                                                                    <Checkbox style={{ marginLeft: '8px' }} value="批量損件">批量損件</Checkbox>
                                                                    <Checkbox value="燒機">燒機</Checkbox>
                                                                    <Checkbox value="批量錯件">批量錯件</Checkbox>
                                                                    <Checkbox value="批量少料">批量少料</Checkbox>
                                                                    <Checkbox value="批量反向">批量反向</Checkbox>
                                                                    <Checkbox value="不良率超標">不良率超標</Checkbox>
                                                                    <Checkbox value="其它">其它</Checkbox>
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
                                                                <Checkbox.Group defaultValue="當前工站">
                                                                    <Checkbox style={{ marginLeft: '8px' }} value="當前工站">當前工站</Checkbox>
                                                                    <Checkbox value="前置工站">前置工站</Checkbox>
                                                                    <Checkbox value="後續工站">後續工站</Checkbox>
                                                                </Checkbox.Group>
                                                            </Col>
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
                                                    <Col span={12}></Col>
                                                </Row>

                                                <Row gutter={[0, 12]} justify="center">
                                                    <Col span={12}>
                                                        <Row>
                                                            <Col span={8} style={{ textAlign: 'center' }}>當前措施</Col>
                                                            <Col span={15}><Input size="small" /></Col>
                                                        </Row>
                                                    </Col>
                                                    <Col span={12}></Col>
                                                </Row>

                                                <Row gutter={[0, 12]} justify="center">
                                                    <Col span={12} style={{textAlign: 'center'}}>
                                                        <Button type="primary" size="small" icon={ <CheckOutlined /> }>确定</Button>
                                                    </Col>
                                                </Row>

                                            </div>
                                        </TabPane>
                                        <TabPane tab="治工具異常" key="5">
                                            <div style={{ width: '100%' }}>
                                                <Row gutter={[0, 12]} justify="center">
                                                    {/* 異常描述: 治工具損壞 治工具不足 治工具功能不良 治工具未點檢 治工具要求不符 其它 */}
                                                    <Col span={24}>
                                                        <Row>
                                                            <Col span={4} style={{ textAlign: 'center' }}>異常描述</Col>
                                                            <Col span={20}>
                                                                <Checkbox.Group defaultValue="治工具損壞">
                                                                    <Checkbox style={{ marginLeft: '8px' }} value="治工具損壞">治工具損壞</Checkbox>
                                                                    <Checkbox value="治工具不足">治工具不足</Checkbox>
                                                                    <Checkbox value="治工具功能不良">治工具功能不良</Checkbox>
                                                                    <Checkbox value="治工具未點檢">治工具未點檢</Checkbox>
                                                                    <Checkbox value="治工具要求不符">治工具要求不符</Checkbox>
                                                                    <Checkbox value="其它">其它</Checkbox>
                                                                </Checkbox.Group>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>

                                                <Row gutter={[0, 12]} justify="center">
                                                    <Col span={12}>
                                                        <Row>
                                                            <Col span={8} style={{ textAlign: 'center' }}>涉及的產品料號</Col>
                                                            <Col span={15}><Input size="small" /></Col>
                                                        </Row>
                                                    </Col>
                                                    <Col span={12}></Col>
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

                                                <Row gutter={[0, 12]} justify="center">
                                                    <Col span={12} style={{textAlign: 'center'}}>
                                                        <Button type="primary" size="small" icon={ <CheckOutlined /> }>确定</Button>
                                                    </Col>
                                                </Row>

                                            </div>
                                        </TabPane>
                                        <TabPane tab="系統異常" key="6">
                                            <div style={{ width: '100%' }}>
                                                {/* 異常類別: 測試系統異常 SFC系統異常 氮氣供應系統異常 電力系統異常 壓縮空氣系統異常 真空供氣系統異常 冰水供應系統異常
                                                ALL Parts系統異常 Beacon系統異常 Agile系統異常 Dom系統異常 SAP系統異常 其它 */}
                                                <Row gutter={[0, 12]} justify="center">

                                                    <Col span={24}>
                                                        <Row>
                                                            <Col span={4} style={{ textAlign: 'center' }}>異常類別</Col>
                                                            <Col span={20}>
                                                                <Checkbox.Group defaultValue="測試系統異常">
                                                                    <Checkbox style={{ marginLeft: '8px' }} value="測試系統異常">測試系統異常</Checkbox>
                                                                    <Checkbox value="SFC系統異常">SFC系統異常</Checkbox>
                                                                    <Checkbox value="氮氣供應系統異常">氮氣供應系統異常</Checkbox>
                                                                    <Checkbox value="電力系統異常">電力系統異常</Checkbox>
                                                                    <Checkbox value="壓縮空氣系統異常">壓縮空氣系統異常</Checkbox>
                                                                    <Checkbox value="真空供氣系統異常">真空供氣系統異常</Checkbox>
                                                                    <Checkbox value="冰水供應系統異常">冰水供應系統異常</Checkbox>
                                                                    <Checkbox value="ALL Parts系統異常">ALL Parts系統異常</Checkbox>
                                                                    <Checkbox value="Beacon系統異常">Beacon系統異常</Checkbox>
                                                                    <Checkbox value="Agile系統異常">Agile系統異常</Checkbox>
                                                                    <Checkbox value="Dom系統異常">Dom系統異常</Checkbox>
                                                                    <Checkbox value="SAP系統異常">SAP系統異常</Checkbox>
                                                                    <Checkbox value="其它">其它</Checkbox>
                                                                </Checkbox.Group>
                                                            </Col>
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

                                                <Row gutter={[0, 12]} justify="center">
                                                    <Col span={12} style={{textAlign: 'center'}}>
                                                        <Button type="primary" size="small" icon={ <CheckOutlined /> }>确定</Button>
                                                    </Col>
                                                </Row>

                                            </div>
                                        </TabPane>
                                    </Tabs>

                                    {/* ====================================================================================================================================== */}

                                </Col>
                            </Row>
                        </Col>
                    </Row>

                </div>
            </TabPane>
            <TabPane tab="按原因分析" key="4">
                <div className={styles['tab-query']}>
                    <Row gutter={[0, 16]} justify="center">
                        <Col span={24}>
                            <Row>
                                <Col span={24}>

                                    {/* ====================================================================================================================================== */}

                                    {/* 人 機 料 法 環 量檢測     */}
                                    <Tabs size="small" type='card' defaultActiveKey="1" style={{ width: '100%', border: '1px solid #ddd' }} >
                                        <TabPane tab="人" key="1">
                                            <div style={{ width: '100%' }}>

                                                <Row gutter={[0, 12]} justify="center">
                                                    <Col span={12}>
                                                        <Row>
                                                            <Col span={8} style={{ textAlign: 'center' }}>責任人</Col>
                                                            <Col span={15}><Input size="small" /></Col>
                                                        </Row>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Col span={8} style={{ textAlign: 'center' }}>處理決定</Col>
                                                            <Col span={15}><Input size="small" /></Col>
                                                        </Row>
                                                    </Col>
                                                </Row>

                                                <Row gutter={[0, 12]} justify="center">
                                                    <Col span={12}>
                                                        <Row>
                                                            <Col span={8} style={{ textAlign: 'center' }}>改善方向</Col>
                                                            <Col span={15}><Input size="small" /></Col>
                                                        </Row>
                                                    </Col>
                                                    <Col span={12}></Col>
                                                </Row>

                                                <Row gutter={[0, 12]} justify="center">
                                                    <Col span={12} style={{textAlign: 'center'}}>
                                                        <Button type="primary" size="small" icon={ <CheckOutlined /> }>确定</Button>
                                                    </Col>
                                                </Row>

                                            </div>
                                        </TabPane>
                                        <TabPane tab="机" key="2">
                                            <div style={{ width: '100%' }}>
                                                {/* 負責人 機器名稱 機器編號 具體原因 改善方向 橫向展開改善  預計完成時間 */}

                                                <Row gutter={[0, 12]} justify="center">
                                                    <Col span={12}>
                                                        <Row>
                                                            <Col span={8} style={{ textAlign: 'center' }}>負責人</Col>
                                                            <Col span={15}><Input size="small" /></Col>
                                                        </Row>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Col span={8} style={{ textAlign: 'center' }}>機器名稱</Col>
                                                            <Col span={15}><Input size="small" /></Col>
                                                        </Row>
                                                    </Col>
                                                </Row>

                                                <Row gutter={[0, 12]} justify="center">
                                                    <Col span={12}>
                                                        <Row>
                                                            <Col span={8} style={{ textAlign: 'center' }}>機器編號</Col>
                                                            <Col span={15}><Input size="small" /></Col>
                                                        </Row>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Col span={8} style={{ textAlign: 'center' }}>具體原因</Col>
                                                            <Col span={15}><Input size="small" /></Col>
                                                        </Row>
                                                    </Col>
                                                </Row>

                                                <Row gutter={[0, 12]} justify="center">
                                                    <Col span={12}>
                                                        <Row>
                                                            <Col span={8} style={{ textAlign: 'center' }}>改善方向</Col>
                                                            <Col span={15}><Input size="small" /></Col>
                                                        </Row>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Col span={8} style={{ textAlign: 'center' }}>橫向展開改善</Col>
                                                            <Col span={15}>
                                                                <Checkbox.Group defaultValue="是">
                                                                    <Checkbox value="是">是</Checkbox>
                                                                    <Checkbox value="否">否</Checkbox>
                                                                </Checkbox.Group>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>

                                                <Row gutter={[0, 12]} justify="center">
                                                    <Col span={12}>
                                                        <Row>
                                                            <Col span={8} style={{ textAlign: 'center' }}>預計完成時間</Col>
                                                            <Col span={15}><Input size="small" /></Col>
                                                        </Row>
                                                    </Col>
                                                    <Col span={12}></Col>
                                                </Row>

                                                <Row gutter={[0, 12]} justify="center">
                                                    <Col span={12} style={{textAlign: 'center'}}>
                                                        <Button type="primary" size="small" icon={ <CheckOutlined /> }>确定</Button>
                                                    </Col>
                                                </Row>

                                            </div>
                                        </TabPane>
                                        <TabPane tab="料" key="3">
                                            <div style={{ width: '100%' }}>

                                                <Row gutter={[0, 12]} justify="center">
                                                    <Col span={12}>
                                                        <Row>
                                                            <Col span={8} style={{ textAlign: 'center' }}>負責人</Col>
                                                            <Col span={15}><Input size="small" /></Col>
                                                        </Row>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Col span={8} style={{ textAlign: 'center' }}>料號</Col>
                                                            <Col span={15}><Input size="small" /></Col>
                                                        </Row>
                                                    </Col>
                                                </Row>

                                                <Row gutter={[0, 12]} justify="center">
                                                    <Col span={12}>
                                                        <Row>
                                                            <Col span={8} style={{ textAlign: 'center' }}>DC</Col>
                                                            <Col span={15}><Input size="small" /></Col>
                                                        </Row>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Col span={8} style={{ textAlign: 'center' }}>LC</Col>
                                                            <Col span={15}><Input size="small" /></Col>
                                                        </Row>
                                                    </Col>
                                                </Row>

                                                <Row gutter={[0, 12]} justify="center">
                                                    <Col span={12}>
                                                        <Row>
                                                            <Col span={8} style={{ textAlign: 'center' }}>廠商</Col>
                                                            <Col span={15}><Input size="small" /></Col>
                                                        </Row>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Col span={8} style={{ textAlign: 'center' }}>處理結果</Col>
                                                            <Col span={15}><Input size="small" /></Col>
                                                        </Row>
                                                    </Col>
                                                </Row>

                                                <Row gutter={[0, 12]} justify="center">
                                                    <Col span={12}>
                                                        <Row>
                                                            <Col span={8} style={{ textAlign: 'center' }}>改善方向</Col>
                                                            <Col span={15}><Input size="small" /></Col>
                                                        </Row>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Col span={8} style={{ textAlign: 'center' }}>預計完成時間</Col>
                                                            <Col span={15}><Input size="small" /></Col>
                                                        </Row>
                                                    </Col>
                                                </Row>

                                                <Row gutter={[0, 12]} justify="center">
                                                    <Col span={12} style={{textAlign: 'center'}}>
                                                        <Button type="primary" size="small" icon={ <CheckOutlined /> }>确定</Button>
                                                    </Col>
                                                </Row>

                                            </div>
                                        </TabPane>
                                        <TabPane tab="法" key="4">
                                            <div style={{ width: '100%' }}>

                                                <Row gutter={[0, 12]} justify="center">
                                                    <Col span={12}>
                                                        <Row>
                                                            <Col span={8} style={{ textAlign: 'center' }}>負責人</Col>
                                                            <Col span={15}><Input size="small" /></Col>
                                                        </Row>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Col span={8} style={{ textAlign: 'center' }}>改善結果</Col>
                                                            <Col span={14}><Input size="small" /></Col>
                                                        </Row>
                                                    </Col>
                                                </Row>

                                                <Row gutter={[0, 12]} justify="center">
                                                    <Col span={12}>
                                                        <Row>
                                                            <Col span={8} style={{ textAlign: 'center' }}>橫向展開改善</Col>
                                                            <Col span={15}>
                                                                <Checkbox.Group defaultValue="是">
                                                                    <Checkbox value="是">是</Checkbox>
                                                                    <Checkbox value="否">否</Checkbox>
                                                                </Checkbox.Group>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Col span={8} style={{ textAlign: 'center' }}>預計完成時間</Col>
                                                            <Col span={14}><Input size="small" /></Col>
                                                        </Row>
                                                    </Col>
                                                </Row>

                                                <Row gutter={[0, 12]} justify="center">
                                                    <Col span={12} style={{textAlign: 'center'}}>
                                                        <Button type="primary" size="small" icon={ <CheckOutlined /> }>确定</Button>
                                                    </Col>
                                                </Row>

                                            </div>
                                        </TabPane>
                                        <TabPane tab="环" key="5">
                                            <div style={{ width: '100%' }}>

                                                <Row gutter={[0, 12]} justify="center">
                                                    <Col span={12}>
                                                        <Row>
                                                            <Col span={8} style={{ textAlign: 'center' }}>負責人</Col>
                                                            <Col span={15}><Input size="small" /></Col>
                                                        </Row>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Col span={8} style={{ textAlign: 'center' }}>具體原因</Col>
                                                            <Col span={15}><Input size="small" /></Col>
                                                        </Row>
                                                    </Col>
                                                </Row>

                                                <Row gutter={[0, 12]} justify="center">
                                                    <Col span={12}>
                                                        <Row>
                                                            <Col span={8} style={{ textAlign: 'center' }}>處理結果</Col>
                                                            <Col span={15}><Input size="small" /></Col>
                                                        </Row>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Col span={8} style={{ textAlign: 'center' }}>改善方向</Col>
                                                            <Col span={15}><Input size="small" /></Col>
                                                        </Row>
                                                    </Col>
                                                </Row>


                                                <Row gutter={[0, 12]} justify="center">
                                                    <Col span={12}>
                                                        <Row>
                                                            <Col span={8} style={{ textAlign: 'center' }}>預計完成時間</Col>
                                                            <Col span={15}><Input size="small" /></Col>
                                                        </Row>
                                                    </Col>
                                                    <Col span={12}></Col>
                                                </Row>

                                                <Row gutter={[0, 12]} justify="center">
                                                    <Col span={12} style={{textAlign: 'center'}}>
                                                        <Button type="primary" size="small" icon={ <CheckOutlined /> }>确定</Button>
                                                    </Col>
                                                </Row>

                                            </div>
                                        </TabPane>
                                        <TabPane tab="量检测" key="6">
                                            <div style={{ width: '100%' }}>

                                                <Row gutter={[0, 12]} justify="center">
                                                    <Col span={12}>
                                                        <Row>
                                                            <Col span={8} style={{ textAlign: 'center' }}>負責人</Col>
                                                            <Col span={15}><Input size="small" /></Col>
                                                        </Row>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Col span={8} style={{ textAlign: 'center' }}>測試內容</Col>
                                                            <Col span={15}><Input size="small" /></Col>
                                                        </Row>
                                                    </Col>
                                                </Row>


                                                <Row gutter={[0, 12]} justify="center">
                                                    <Col span={12}>
                                                        <Row>
                                                            <Col span={8} style={{ textAlign: 'center' }}>測試結果</Col>
                                                            <Col span={15}><Input size="small" /></Col>
                                                        </Row>
                                                    </Col>
                                                    <Col span={12}></Col>
                                                </Row>

                                                <Row gutter={[0, 12]} justify="center">
                                                    <Col span={12} style={{textAlign: 'center'}}>
                                                        <Button type="primary" size="small" icon={ <CheckOutlined /> }>确定</Button>
                                                    </Col>
                                                </Row>

                                            </div>
                                        </TabPane>
                                    </Tabs>

                                    {/* ====================================================================================================================================== */}

                                </Col>
                            </Row>
                        </Col>
                    </Row>

                </div>
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

export default AdvancedSearch;
