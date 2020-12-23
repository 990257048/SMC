// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
            },

            // 202008171508 add by gch (smc系统路由) START ================================================================================================================

            {
              path: '/dashboard',    // 仪表盘
              name: 'dashboard',
              icon: 'dashboard',
              routes: [
                {
                  path: '/dashboard/repair-wip',
                  name: 'repair-wip',
                  component: './dashboard/RepairWip'
                }
              ]
            },
            {
              path: '/increase-productivity',    // 提高生产力
              name: 'increase-productivity',
              icon: 'lineChart',
              routes: [
                {
                  path: '/increase-productivity/abnormal-decision',    // 异常决策中心
                  name: 'abnormal-decision',
                  component: './IncreaseProductivity/AbnormalDecision'
                }
              ]
            },

            {
              path: '/production-board',    // 生产看板
              name: 'production-board',
              icon: 'barChart',
              routes: [
                {
                  path: '/production-board/real-time-production',   // 实时生产看板
                  name: 'real-time-production',
                  component: './ProductionBoard/RealTimeProduction'
                }
              ]
            },
            // -------------------------------------------------------------------------------------------------------------------------------------------------------------
            {
              path: '/ant-design-components',    // ant-design 组件（快速开发系统）
              name: 'ant-design-components',
              icon: 'antDesign',
              routes: [
                {
                  path: '/ant-design-components/antd-button',   // 按钮
                  name: 'antd-button',
                  component: './AntDesignComponents/AntdButton'
                }
              ]
            },
            // 202008171508 add by gch (smc系统路由) END =====================================================================================================================

            {
              path: '/admin',
              name: 'admin',
              icon: 'crown',
              component: './Admin',
              authority: ['admin'],
              routes: [
                {
                  path: '/admin/sub-page',
                  name: 'sub-page',
                  icon: 'smile',
                  component: './Welcome',
                  authority: ['admin'],
                },
              ],
            },
            {
              name: 'list.table-list',
              icon: 'table',
              path: '/list',
              component: './ListTableList',
            },
            // {
            //   name: 'test',
            //   icon: 'plus',
            //   path: '/test',
            //   component: './Test',
            // },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
