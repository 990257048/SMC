// import { AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined } from '@ant-design/icons';
import { Space, Alert, Checkbox, Modal, Upload, Button, Row, Col, Input, Select, message, Radio, Spin, Drawer } from 'antd';
import { PlusOutlined, UploadOutlined, UnorderedListOutlined, SaveOutlined, DownloadOutlined } from '@ant-design/icons';
import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Link, connect } from 'umi';
import LoginForm from './components/Login';
// import smcApp from '../../../assets/smc_qrcode.png';
import { getAttachedMessage, getBU, userRegister } from '@/services/register';
import { filterByObj } from '@/utils/custom';
import { getValidCode, getAppList, batchAddUserInfoWeb } from '@/services/login';
import styles from './style.less';

import vcode from '@/assets/vcode/test.png'

const { Option } = Select;
// const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginForm;

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);


const useModalState = (states) => {
  states = states ? states : {};
  const [state, setState] = useState({ visible: false, ...states });
  const setVisible = visible => {
    setState({ ...state, visible });
  }
  const setStates = payload => {
    setState({ ...state, ...payload });
  }
  return [state, setVisible, setStates];
}

const useDrawer = (initState = {}) => {
  // initState setState visible open close 
  const [state, setState] = useState({ visible: false, downloadList: [], ...initState });
  const open = useCallback(() => {
    setState({ ...state, visible: true });
  }, [state]);
  const close = useCallback(() => {
    setState({ ...state, visible: false });
  }, [state]);
  const setStates = useCallback((payload) => {
    setState({ ...state, ...payload })
  }, [state]);

  useMemo(() => {
    !state.downloadList.length && getAppList().then(({ Status, Data, Message }) => {
      if (Status == 'Pass') {
        console.log(Data);
        setStates({ downloadList: Data.map(item => ({ appName: item.AppName, size: Math.round(item.FileSize / (1024 * 1024)) ? Math.round(item.FileSize / (1024 * 1024)) + 'MB' : '<1MB', time: item.LastTime })) });
      } else {
        message.error(Message);
      }
    })
  }, [state.downloadList]);
  const DownloadList = useMemo(() => {
    return state.downloadList.map(({ appName, size, time }, index) => {
      return <Row key={index} gutter={[12, 12]} style={{ cursor: 'pointer', borderBottom: '1px solid #ddd' }}>
        <Col span={11} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          <a href={'http://10.132.50.107:800/api/DownLoadFile/GetAppFile?AppName=' + appName} download={appName}>{appName}</a>
        </Col>
        <Col span={5}>{size}</Col>
        <Col span={8}>
          {/* <Button size='small' type='primary' icon={<DownloadOutlined />}>
            <a href={'http://10.132.50.107:800/api/DownLoadFile/GetAppFile?AppName=' + appName} download={appName} style={{ color: '#fff' }}>download</a>
          </Button> */}
          {time}
        </Col>
      </Row>
    })
  }, [state.downloadList])
  return [state, close, open, setStates, DownloadList];
}

const useUpload = () => {
  const [fileList, setFileList] = useState([]);
  const beforeUpload = (file) => {
    console.log(file);
    setFileList([file]);
    return false;
  }
  const upload = useCallback(() => {
    let fd = new FormData();
    fd.append('attachFile', fileList[0]);
    batchAddUserInfoWeb(fd).then(({ Status, Message }) => {
      if (Status == 'Pass') {
        setFileList([]);
        message.success(Message);
      } else {
        message.error(Message);
      }
    })
  }, [fileList]);
  return { fileList, beforeUpload, upload };
}

const VcodeImg = () => {
  let [url, setUrl] = useState('');

  let getValidCodeHandle = useCallback(() => {
    getValidCode().then(({ Data, Status, Message }) => {
      // console.log(Data, vcode);
      if (Status == 'Pass') {
        setUrl(Data)
      } else {
        message.error(Message);
      }
    })
  }, []);

  useMemo(() => {
    getValidCodeHandle();
  }, []);

  let style = useMemo(() => {
    return {
      width: '100%',
      height: '100%',
      backgroundImage: 'url(' + url + ')',
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat'
    }
  }, [url])
  if (url == '') {
    return <Spin size='small' />
  }
  return <div style={style} onClick={getValidCodeHandle} title='看不清？点击这里换一张验证码！'></div>
}


const Login = props => {
  // const { userLogin = {}, submitting } = props;
  // const { status, type: loginType } = userLogin;
  // const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState('account');

  // 对话框状态
  const [registerState, setRegisterVisible, setRegisterState] = useModalState({
    name: '',
    englishName: '',
    empNo: '',
    password: '',
    confirmPassword: '',
    director: '',       //上级
    department: '',     //部门
    position: '',       //职位
    MFG: '',
    BU: '',
    allDepartment: [],
    allPosition: [],
    allMFG: [],
    allBU: [],
    email: '',
    emailSuffix: '@mail.foxconn.com'
  });

  // 资源下载抽屉
  const [drawerState, drawerClose, drawerOpen, setDrawerState, DownloadList] = useDrawer();

  // 注册方式（个人 批量）
  const [registType, setRegistType] = useState('a');  // a个人 b批量

  const uploadProps = useUpload();

  let username = useRef();
  let password = useRef();
  let vcode = useRef();

  useMemo(() => {   // 获取附带信息
    getAttachedMessage().then(e => {
      if (e.Status == 'Pass') {
        let { allDepartment, allPosition, allMFG } = e.Data;
        setRegisterState({ ...e.Data, department: allDepartment[0], position: allPosition[0], MFG: allMFG[0] });
      } else {
        message.error(e.Message);
      }
    });
  }, []);

  useMemo(() => {   // 获取BU
    registerState.MFG && getBU(registerState.MFG).then(e => {
      if (e.Status == 'Pass') {
        setRegisterState({ allBU: e.Data.BU, BU: e.Data.BU[0] });
      } else {
        message.error(e.Message);
      }
    });
  }, [registerState.MFG]);

  const handleSubmit = () => {
    var values = {
      userName: username.current.value,
      password: password.current.value,
      vcode: vcode.current.value
    }
    console.log(values);
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values, type },
    });
  };

  const Keydown = e => {
    if (e.nativeEvent.keyCode == 13) {
      handleSubmit();
    }
  }

  const forgetPassword = e => {
    console.log(props);
    //props.
  }

  const register = e => {
    setRegisterVisible(true);
  }

  const registerHandle = () => {
    // name: '',
    // englishName: '',
    // empNo: '',
    // password: '',
    // confirmPassword: '',
    // director: '',       //上级
    // department: '',     //部门
    // position: '',       //职位
    // MFG: '',
    // BU: '',
    // allDepartment: [],
    // allPosition: [],
    // allMFG: [],
    // allBU: [],
    // email: '',
    // emailSuffix: '.@mail.foxconn.com'
    let flag = registerState.password == registerState.confirmPassword;
    !flag && message.error('确认密码应与密码一致！');
    let sendData = filterByObj(registerState, (val, key) => ['name', 'englishName', 'empNo', 'password', 'director', 'department', 'position', 'MFG', 'BU', 'email', 'emailSuffix'].includes(key))
    flag && userRegister(sendData).then(e => {
      if (e.Status == 'Pass') {
        message.success(e.Message);
        // 清空 关闭Modal
        setRegisterState({
          name: '',
          englishName: '',
          empNo: '',
          password: '',
          confirmPassword: '',
          email: '',
          visible: false
        });
      } else {
        message.error(e.Message);
      }
    })
  }

  const selectAfter = (   // email后缀
    <Select value={registerState.emailSuffix} onChange={v => { setRegisterState({ emailSuffix: v }) }} className="select-after">
      <Option value="@mail.foxconn.com">@mail.foxconn.com</Option>
      <Option value="@foxconn.com">@foxconn.com</Option>
    </Select>
  );

  return (
    <div className={styles.main}>

      <div className={styles.logo}>
        <div className={styles["logo-img"]}></div>
      </div>
      <div className={styles.username}>
        <span></span>
        <input type="text" ref={username} placeholder="請輸入工號" />
      </div>
      <div className={styles.password}>
        <span></span>
        <input type="password" ref={password} placeholder="請輸入密碼" />
      </div>
      <div className={styles.vcode}>
        <span></span>
        <input type="text" ref={vcode} onKeyDown={Keydown} placeholder="請輸入驗證碼" />
        <div className={styles["vcode-wrap"]}>
          <VcodeImg />
          {/* <div className={styles["vcode-img"]} title='看不清？点击这里换一张验证码！'></div> */}
        </div>
      </div>
      <div className={styles.link}>
        <Space size='small' style={{ float: 'right' }}>
          {/* <span><a href='https://eface.efoxconn.com/api/DownLoadFile/GetFile?appName=SMC.apk'>资源</a></span> */}
          <span><a onClick={drawerOpen}>资源下载</a></span>
          <span><a onClick={forgetPassword}>忘記密碼</a></span>
          <span><a onClick={register}>註冊</a></span>
        </Space>
        <Drawer
          title={<div><UnorderedListOutlined /> <b>资源列表</b></div>}
          placement="left"
          width={480}
          closable={false}
          onClose={drawerClose}
          visible={drawerState.visible}
        >
          <Row gutter={[12, 12]} style={{ cursor: 'pointer', borderBottom: '1px solid #ddd' }}>
            <Col span={11}><b>文件名</b></Col>
            <Col span={5}><b>文件大小</b></Col>
            <Col span={8}><b>上传时间</b></Col>
          </Row>
          {/* <Row gutter={[12, 12]} className={styles['drawer-row']}>  className不生效
            <Col className={styles['drawer-col']} span={18}>SMC APPhfeuiwfgweyugfweuyfgewfyuwefwegteewyguwehuyweghuykweghweugwejk</Col>
            <Col span={6}>3MB</Col>
          </Row> */}
          {DownloadList}
        </Drawer>

        <Modal title={<Space><PlusOutlined /><span>用户注册</span></Space>} visible={registerState.visible} width={'680px'} onOk={() => { setRegisterVisible(false) }} onCancel={() => { setRegisterVisible(false) }}>
          <Radio.Group value={registType} buttonStyle="solid" onChange={e => { setRegistType(e.target.value) }}>
            <Radio.Button value="a">个人注册</Radio.Button>
            <Radio.Button value="b">批量注册</Radio.Button>
          </Radio.Group>
          <hr color='#eee' />
          <div style={{ width: '100%', padding: '5px 20px', display: registType == 'a' ? 'inline-block' : 'none' }}>
            <Row gutter={[12, 12]}>
              <Col span={4} style={{ textAlign: 'right' }}>姓名：</Col>
              <Col span={8}>
                <Input placeholder="" value={registerState.name} onChange={e => { setRegisterState({ name: e.target.value }) }} style={{ width: '100%' }} />
              </Col>
              <Col span={4} style={{ textAlign: 'right' }}>上级主管：</Col>
              <Col span={8}>
                <Input placeholder="工号" value={registerState.director} onChange={e => { setRegisterState({ director: e.target.value }) }} style={{ width: '100%' }} />
              </Col>
            </Row>
            <Row gutter={[12, 12]}>
              <Col span={4} style={{ textAlign: 'right' }}>英文名：</Col>
              <Col span={8}>
                <Input placeholder="" value={registerState.englishName} onChange={e => { setRegisterState({ englishName: e.target.value }) }} style={{ width: '100%' }} />
              </Col>
              <Col span={4} style={{ textAlign: 'right' }}>部门：</Col>
              <Col span={8}>
                <Select value={registerState.department} onChange={v => { setRegisterState({ department: v }) }} style={{ width: '100%' }}>
                  {
                    registerState.allDepartment.map(v => <Option key={v} value={v}>{v}</Option>)
                  }
                </Select>
              </Col>
            </Row>
            <Row gutter={[12, 12]}>
              <Col span={4} style={{ textAlign: 'right' }}>工号：</Col>
              <Col span={8}>
                <Input placeholder="" value={registerState.empNo} onChange={e => { setRegisterState({ empNo: e.target.value }) }} style={{ width: '100%' }} />
              </Col>
              <Col span={4} style={{ textAlign: 'right' }}>职位：</Col>
              <Col span={8}>
                <Select value={registerState.position} onChange={v => { setRegisterState({ position: v }) }} style={{ width: '100%' }}>
                  {
                    registerState.allPosition.map(v => <Option key={v} value={v}>{v}</Option>)
                  }
                </Select>
              </Col>
            </Row>
            <Row gutter={[12, 12]}>
              <Col span={4} style={{ textAlign: 'right' }}>密码：</Col>
              <Col span={8}>
                <Input type='password' placeholder="" value={registerState.password} onChange={e => { setRegisterState({ password: e.target.value }) }} style={{ width: '100%' }} />
              </Col>
              <Col span={4} style={{ textAlign: 'right' }}>制造处：</Col>
              <Col span={8}>
                <Select value={registerState.MFG} onChange={v => { setRegisterState({ MFG: v }) }} style={{ width: '100%' }}>
                  {
                    registerState.allMFG.map(v => <Option key={v} value={v}>{v}</Option>)
                  }
                </Select>
              </Col>
            </Row>
            <Row gutter={[12, 12]}>
              <Col span={4} style={{ textAlign: 'right' }}>确认密码：</Col>
              <Col span={8}>
                <Input type='password' placeholder="" value={registerState.confirmPassword} onChange={e => { setRegisterState({ confirmPassword: e.target.value }) }} style={{ width: '100%' }} />
              </Col>
              <Col span={4} style={{ textAlign: 'right' }}>BU：</Col>
              <Col span={8}>
                <Select value={registerState.BU} onChange={v => { setRegisterState({ BU: v }) }} style={{ width: '100%' }}>
                  {
                    registerState.allBU.map(v => <Option key={v} value={v}>{v}</Option>)
                  }
                </Select>
              </Col>
            </Row>
            <Row gutter={[12, 12]}>
              <Col span={4} style={{ textAlign: 'right' }}>邮箱：</Col>
              <Col span={20}>
                <Input addonAfter={selectAfter} value={registerState.email} onChange={e => { setRegisterState({ email: e.target.value }) }} style={{ width: '100%' }} />
              </Col>
            </Row>
            <Row gutter={[12, 12]}>
              <Col span={4} style={{ textAlign: 'right' }}></Col>
              <Col span={20}>
                <Button type='primary' onClick={registerHandle} icon={<SaveOutlined />}>提交</Button>
              </Col>
            </Row>
          </div>
          <div style={{ width: '100%', padding: '5px 20px', display: registType == 'b' ? 'inline-block' : 'none' }}>
            <Row gutter={[12, 12]}>
              <Col span={24}>注册步骤：</Col>
              <Col span={24}>1.点击下载注册SMC账号专用模板（.xlsx）。</Col>
              <Col span={24}>2.用Excel打开模板，按照要求填写好数据。</Col>
              <Col span={24}>3.点击选择文件，选择填写好的Excel档文件,点击上传文件即可(注意：只能上传一个文件！)。</Col>
              <Col span={24} style={{ textAlign: 'left' }}><span><a href='http://10.132.50.107/SMC_Attachfiles/mutil_information.xlsx'>下载注册SMC账号专用模板.xlsx</a></span></Col>
              <Col span={24} style={{ textAlign: 'left' }}>
                <Upload {...uploadProps}>
                  <Button icon={<PlusOutlined />} size='small'>选择文件</Button>
                </Upload>
              </Col>
              <Col span={24} style={{ textAlign: 'left' }}>
                <Button icon={<UploadOutlined />} size='small' type='primary' onClick={uploadProps.upload}>上传文件</Button>
              </Col>
            </Row>

          </div>

        </Modal>


      </div>
      <div className={styles.login} onClick={handleSubmit}>
        登錄
      </div>

      {/* <LoginForm activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        <Tab key="account" tab="账户密码登录">
          {status === 'error' && loginType === 'account' && !submitting && (
            <LoginMessage content="账户或密码错误（admin/ant.design）" />
          )}
          <UserName
            name="userName"
            placeholder="用户名: admin or user"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />
          <Password
            name="password"
            placeholder="密码: ant.design"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
          <div>
            <Checkbox checked={autoLogin} onChange={e => setAutoLogin(e.target.checked)}>
              自动登录
            </Checkbox>
          </div>
          <Submit loading={submitting}>登录</Submit>
        </Tab>
        <Tab key="qr-code" tab="SMC手机登录">  </Tab>
        <div>
          <Space size='middle' className={styles['float-right']}>
            <Link to="/user/down-smc">
              下载SMC
            </Link>
            <Link to="/user/forgot-pwd">
              忘记密码
            </Link>
            <Link to="/user/register">
              注册账户
            </Link>
          </Space>
        </div>
      </LoginForm>
     */}
    </div>
  );
};

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
