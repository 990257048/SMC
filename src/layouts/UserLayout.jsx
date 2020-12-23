import { getMenuData, getPageTitle } from '@ant-design/pro-layout';

import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, SelectLang, useIntl, connect } from 'umi';
import React from 'react';
import GlobalFooter from '../components/GlobalFooter';
import logo from '../assets/login/logo.png';
import styles from './UserLayout.less';

const UserLayout = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { formatMessage } = useIntl();
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    ...props,
  });
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.bg}></div>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            {/* <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
              </Link>
            </div> */}
            <br/>
            {/* <div className={styles.desc}>欢迎使用SMC系统</div> */}
          </div>
          {children}
        </div>
        {/* <GlobalFooter /> */}
      </div>
    </HelmetProvider>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
