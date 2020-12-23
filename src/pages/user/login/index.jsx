// import { AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined } from '@ant-design/icons';
import { Space, Alert, Checkbox } from 'antd';
import React, { useState, useRef } from 'react';
import { Link, connect } from 'umi';
import LoginForm from './components/Login';
// import smcApp from '../../../assets/smc_qrcode.png';

import styles from './style.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginForm;

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

const Login = props => {
  // const { userLogin = {}, submitting } = props;
  // const { status, type: loginType } = userLogin;
  // const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState('account');

  let username = useRef();
  let password = useRef();
  let vcode = useRef();

  const handleSubmit = () => {
    var values = {
      userName: username.current.value,
      password: password.current.value,
      vcode: vcode.current.value
    }
    // console.log(values);
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values, type },
    });
  };

  const Keydown = e => {
    if(e.nativeEvent.keyCode == 13){
      handleSubmit();
    }
  }

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
          <div className={styles["vcode-img"]}></div>
        </div>
      </div>
      <div className={styles.link}>
        <Space size='large' style={{ float: 'right' }}>
          <span><a>忘記密碼</a></span>
          <span><a>註冊</a></span>
        </Space>
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
