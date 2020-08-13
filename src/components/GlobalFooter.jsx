import { DefaultFooter } from '@ant-design/pro-layout';
import { GithubOutlined } from '@ant-design/icons';


let GlobalFooter = props => {
    return <DefaultFooter
        copyright={`${new Date().getFullYear()} 富士康科技集团CNSBG事业群资讯管理处SFC-IT出品`}
        links={[
            {
                key: 'Ant Design Pro',
                title: 'Ant Design Pro',
                href: 'https://pro.ant.design',
                blankTarget: true,
            },
            {
                key: 'github',
                title: <GithubOutlined />,
                href: 'https://github.com/ant-design/ant-design-pro',
                blankTarget: true,
            },
            {
                key: 'Ant Design',
                title: 'Ant Design',
                href: 'https://ant.design',
                blankTarget: true,
            },
        ]}
    />
}

export default GlobalFooter;
