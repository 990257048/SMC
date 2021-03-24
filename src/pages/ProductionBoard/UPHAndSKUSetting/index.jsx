import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col, Input, Button, Modal, Space, Select, message } from 'antd';
import { SettingOutlined, EditOutlined, SearchOutlined, SelectOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { getUPHMsg, updateSMCUPH, addUPHMsg } from './service';
import styles from './style.less';

let { Option } = Select;

let UPHAndSKUSetting = props => {
  return <div>
    <h3>
      <SettingOutlined />
      <b>UPH和机种信息配置</b>
    </h3>
    <Card1 />
    <Card2 />
  </div>
}

UPHAndSKUSetting = connect(state => state.UPHAndSKUSetting)(UPHAndSKUSetting);

export default UPHAndSKUSetting;

let CardTitle1 = () => {
  return <div className={styles['card-tit']}><SelectOutlined /> UPH维护</div>
}

let CardTitle2 = () => {
  return <div className={styles['card-tit']}><SelectOutlined /> 机种信息维护</div>
}

let filterOption = (input, option) => option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0

let Sel = () => {
  function onChange(value) {
    console.log(`selected ${value}`);
  }

  return <Select showSearch style={{ width: '100%' }} optionFilterProp="children" onChange={onChange} filterOption={filterOption}>
    <Option value="jack">Jack</Option>
    <Option value="lucy">Lucy</Option>
    <Option value="tom">Tom</Option>
  </Select>
}


let M = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
        </Button>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
}



// 自定义Hooks
let useModal = (initModalState) => {
  let [s, setS] = useState({ ...initModalState, visible: false });
  let newSetState = payload => {
    setS({ ...s, ...payload });
  }
  let close = () => newSetState({ visible: false });
  let open = () => newSetState({ visible: true });
  return [s, newSetState, close, open];
}

let Card1 = props => {
  let { dispatch } = props;
  let { MFG, line, skuno, allMFG, allLine, allSkuno } = props.UPHMsg;

  
  // UPH信息
  let [searchResult, setResult] = useState({ isShow: false, isSuccess: false, skuno: '未找到', face: '未找到', pcasUPH: '未找到', editTime: '未找到', smcUPH: '未找到' });

  // 对话框信息
  let [modalState, setModalState, closeModal, openModal] = useModal({ line, face: '无', allFace: ['无', 'B', 'T', 'S', 'O'], skuno: '', smcUPH: '' });

  let setUPHMsg = (payload) => {
    dispatch({ type: 'UPHAndSKUSetting/setUPHMsg', payload });
  }


  // 加载制造处
  useMemo(() => {
    dispatch({ type: 'UPHAndSKUSetting/getMFG' });
    setResult({ ...searchResult, isShow: false });
  }, []);

  useEffect(() => {
    MFG && dispatch({ type: 'UPHAndSKUSetting/getSMCLine', MFG });
    setResult({ ...searchResult, isShow: false });
  }, [MFG]);

  useEffect(() => {
    MFG && line && dispatch({ type: 'UPHAndSKUSetting/getSkuno', MFG, line });
    setResult({ ...searchResult, isShow: false });
    setModalState({line}); 
  }, [MFG, line]);

  useEffect(() => {
    MFG && line && skuno && getUPHMsg(MFG, line, skuno).then(({ Status, Message, Data }) => {
      if (Status == 'Pass') {
        setResult({ isShow: true, isSuccess: true, ...Data });
      } else {
        setResult({ isShow: true, isSuccess: false, skuno: '未找到', face: '未找到', pcasUPH: '未找到', editTime: '未找到', smcUPH: '未找到' });
        setTimeout(() => {
          setResult({ ...searchResult, isShow: false });
        }, 2000);
      }
    });
  }, [MFG, line, skuno]);

  let updataSMC_UPH = useCallback(() => {
    updateSMCUPH(searchResult.skuno, searchResult.smcUPH).then(({ Status, Message, Data }) => {
      if (Status == 'Pass') {
        setResult({ ...searchResult, isShow: false });
        message.success(Message);
      } else {
        message.error(Message);
      }
    })
  }, [searchResult]);

  let new_disabled = useMemo(() => {
    return line ? false : true; //存在线体时才可以新增操作
  }, [line]);


  let onOk = useCallback(() => {
    let {line, face, skuno, smcUPH} = modalState;
    let flag = line && face && skuno && smcUPH;
    if(!flag){
      message.error('请补全信息！');
    }
    flag && addUPHMsg({MFG, line, face, skuno, smcUPH}).then(({Status, Message}) => {
      if(Status == 'Pass'){
        message.success(Message);
        setModalState({visible: false, face: '无', skuno: '', smcUPH: ''});   // 清空
      }else{
        message.error(Message);
      }
    });
  }, [MFG, modalState, closeModal]);

  // console.log(MFG, line, modalState);
  return <Card size='small' title={<CardTitle1 />}>
    <div style={{ padding: '15px 25px 0px 25px' }}>
      <Row gutter={[16, 16]} justify='center'>
        <Col span={6}>
          <Row gutter={16}>
            <Col span={8} className={styles['col-label']}>制造处</Col>
            <Col span={16}>
              <Select showSearch optionFilterProp="children" value={MFG} onChange={(v) => { setUPHMsg({ MFG: v, line: '', skuno: '' }) }} filterOption={filterOption} style={{ width: '100%' }}>
                {
                  allMFG.map(v => <Option key={v} value={v}>{v}</Option>)
                }
              </Select>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row gutter={16}>
            <Col span={8} className={styles['col-label']}>SMC線別</Col>
            <Col span={16}>
              <Select showSearch optionFilterProp="children" value={line} onChange={(v) => { setUPHMsg({ line: v, skuno: '' }) }} filterOption={filterOption} style={{ width: '100%' }}>
                {
                  allLine.map(v => <Option key={v} value={v}>{v}</Option>)
                }
              </Select>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row gutter={16}>
            <Col span={8} className={styles['col-label']}>机种料号</Col>
            <Col span={16}>
              <Select showSearch optionFilterProp="children" value={skuno} onChange={(v) => { setUPHMsg({ skuno: v }) }} filterOption={filterOption} style={{ width: '100%' }}>
                {
                  allSkuno.map(v => <Option key={v} value={v}>{v}</Option>)
                }
              </Select>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row gutter={24} justify='center'>
            <Col span={20}>
              {/* <Space size='large'>
                <Button type="primary" disabled={false} icon={<SearchOutlined />} onClick={() => { }}>查询</Button>
                <Button type="primary" disabled={false} icon={<PlusOutlined />} onClick={() => { }}>新增</Button>
              </Space> */}
              <Button type="primary" disabled={new_disabled} icon={<PlusOutlined />} onClick={openModal}>新增</Button>
              <Modal title="Basic Modal" visible={modalState.visible} onOk={onOk} onCancel={closeModal}>
                <Row gutter={[16, 16]} justify='center'>
                  <Col span={4} className={styles['col-label']}>线体名称</Col>
                  <Col span={16}>
                    <Input disabled={true} value={modalState.line} onChange={(e) => { setModalState({ line: e.target.value }) }} />
                  </Col>
                </Row>
                <Row gutter={[16, 16]} justify='center'>
                  <Col span={4} className={styles['col-label']}>面别</Col>
                  <Col span={16}>
                    <Select value={modalState.face} style={{ width: '100%' }}>
                        {
                          modalState.allFace.map(v => <Option key={v} value={v}>{v}</Option>)
                        }
                    </Select>
                  </Col>
                </Row>
                <Row gutter={[16, 16]} justify='center'>
                  <Col span={4} className={styles['col-label']}>机种料号</Col>
                  <Col span={16}>
                    <Input value={modalState.skuno} onChange={(e) => { setModalState({ skuno: e.target.value }) }} />
                  </Col>
                </Row>
                <Row gutter={[16, 16]} justify='center'>
                  <Col span={4} className={styles['col-label']}>SMC UPH</Col>
                  <Col span={16}>
                    <Input value={modalState.smcUPH} onChange={(e) => { Number(e.target.value) >= 0 && setModalState({ smcUPH: e.target.value }) }} />
                  </Col>
                </Row>
              </Modal>
              {/* <M /> */}
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <div className={styles['search-result']} style={{ display: searchResult.isShow ? 'block' : 'none' }}>

            <Row gutter={[16, 16]} justify='center'>
              <Col span={6}>
                <Row gutter={16}>
                  <Col span={8} className={styles['col-label']}>料号</Col>
                  <Col span={16} className={styles['col-text']}>
                    {searchResult.skuno}
                  </Col>
                </Row>
              </Col>
              <Col span={6}>
                <Row gutter={16}>
                  <Col span={8} className={styles['col-label']}>面别</Col>
                  <Col span={16} className={styles['col-text']}>
                    {searchResult.face}
                  </Col>
                </Row>
              </Col>
              <Col span={6}>
                <Row gutter={16}>
                  <Col span={8} className={styles['col-label']}>PCAS UPH</Col>
                  <Col span={16} className={styles['col-text']}>
                    {searchResult.pcasUPH}
                  </Col>
                </Row>
              </Col>
              <Col span={6}>
                <Row gutter={16}>
                  <Col span={8} className={styles['col-label']}>修改时间</Col>
                  <Col span={16} className={styles['col-text']}>
                    {searchResult.editTime}
                  </Col>
                </Row>
              </Col>
              <Col span={6}>
                <Row gutter={16}>
                  <Col span={8} className={styles['col-label']}>SMC UPH</Col>
                  <Col span={16} className={styles['col-text']}>
                    <Input value={searchResult.smcUPH} disabled={!searchResult.isSuccess} onChange={e => { Number(e.target.value) >= 0 && setResult({ ...searchResult, smcUPH: e.target.value }) }} />
                  </Col>
                </Row>
              </Col>
              <Col span={6}>
                <Row gutter={16} justify='center'>
                  <Col span={18}>
                    <Button type="primary" size='middle' shape='circle' danger disabled={!searchResult.isSuccess} icon={<EditOutlined />} onClick={updataSMC_UPH}></Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  </Card>
}

Card1 = connect(state => {
  return {
    UPHMsg: state.UPHAndSKUSetting.UPHMsg
  }
})(Card1);

let Card2 = props => {

  let { dispatch } = props;
  let { skuno, allSkuno, skuName } = props.skuMsg;
  // function onChange(value) {
  //   console.log(`selected ${value}`);
  // }
  let setSkuMsg = (payload) => {
    dispatch({ type: 'UPHAndSKUSetting/setSkuMsg', payload })
  }

  let retChange = key => v => {
    setSkuMsg({ [key]: v });
  }

  // skuno: '68-100056-01',
  //           allSkuno: ['68-100056-01', '68-100056-02', '68-100056-03'],
  //           skuName: ''
  
  useMemo(() => {
    dispatch({type: 'UPHAndSKUSetting/skuSetting_getSkuno'});
  }, []);

  useEffect(() => {
    dispatch({type: 'UPHAndSKUSetting/getSkuName', skuno});
  }, [skuno]);

  let saveHandle = useCallback(() => {
    dispatch({type: 'UPHAndSKUSetting/updateSkuName', skuno, skuName});
  }, [skuno, skuName]);

  return <Card size='small' title={<CardTitle2 />} style={{ marginTop: '25px' }}>
    <div style={{ padding: '15px 25px 0px 25px' }}>
      <Row gutter={[16, 16]} justify='left'>
        <Col span={6}>
          <Row gutter={16}>
            <Col span={8} className={styles['col-label']}>料号</Col>
            <Col span={16}>
              <Select showSearch optionFilterProp="children" value={skuno} onChange={retChange('skuno')} filterOption={filterOption} style={{ width: '100%' }}>
                {
                  allSkuno.map(v => <Option key={v} value={v}>{v}</Option>)
                }
              </Select>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row gutter={16}>
            <Col span={8} className={styles['col-label']}>机种名称</Col>
            <Col span={16}>
              <Input value={skuName} onChange={e => {setSkuMsg({skuName: e.target.value})}} style={{ width: '100%' }} />
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row gutter={24} justify='center'>
            <Col span={20}>
              <Button type="primary" disabled={false} icon={<SaveOutlined />} onClick={saveHandle}>保存</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  </Card>
}

Card2 = connect(state => {
  return {
    skuMsg: state.UPHAndSKUSetting.skuMsg
  }
})(Card2);

// F1300825
// Foxconn158!!
