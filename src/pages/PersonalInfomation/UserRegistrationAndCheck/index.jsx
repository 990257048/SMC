
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { connect } from 'umi';
import { Card, Row, Col, Input, Select, Table, Modal, Button, message, List, DatePicker, Popconfirm, Space, Typography, Divider } from 'antd';
import {SettingOutlined, EditOutlined, DeleteOutlined, SelectOutlined, FormOutlined, PlusOutlined, PlusSquareOutlined, SearchOutlined, EyeOutlined } from '@ant-design/icons';
import {getUserRegistrationMsg, userRegistrationSign, userRegistrationResolve, userRegistrationReject} from './service'
import styles from './style.less';

import cookies from 'js-cookie';

let { TextArea } = Input;
let { Option } = Select;
let { RangePicker } = DatePicker;

const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
    },
    {
        title: '工號',
        dataIndex: 'workNO',
    },
    {
        title: '郵箱',
        dataIndex: 'Email',
    },
    {
        title: '製造處',
        dataIndex: 'MFG',
    },
    {
        title: '職位',
        dataIndex: 'position',
    }
];

const data = [];

for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `高超輝`,
        workNO: 'F1335257',
        Email: `nsdii-brocade-sfc@mail.foxconn.com`,
        MFG: 'MFGII',
        position: 'IT'
    });
}

let useTableState = (columns, dataSource, other) => {
    // 列配置 行配置 源数据 加载中 其它状态 改变状态的方法
    other = other ? other : {}
    // let s = Object.keys(rowSelection).length == 0 ? {columns, dataSource, loading: false, ...other} : {columns, rowSelection, dataSource, loading: false, ...other}
    let [state, setState] = useState({ columns, dataSource, loading: false, ...other});
    let tableConfig = {columns: state.columns, dataSource: state.dataSource, loading: state.loading};
    let changeDataSource = (dataSource) => {   //改变表数据
        setState({
            ...state, dataSource
        });
    }
    let setLoading = loading => {
        setState({
            ...state, loading
        });
    }
    let setTableState = payload => {
        setState({
            ...state, ...payload
        });
    }

    return [state, tableConfig, setTableState, changeDataSource, setLoading];
}

const Tab = props => {
    let [tableState, tableConfig, setTableState, setDataSource, setLoading] = useTableState(columns, [], {
        selectedRowKeys: [],
        selectedData: [], //已选择的数据
        hasSelected: false //是否已选择数据
    });
    let rowSelection = {
        type: 'checkbox',
        selectedRowKeys: tableState.selectedRowKeys,
        onChange: (keys, rows) => {
            rows.length > 0 ? 
            setTableState({selectedRowKeys: keys, hasSelected: true, selectedData: rows}) : 
            setTableState({selectedRowKeys: keys, hasSelected: false, selectedData: rows});
        }
    }

    useMemo(() => {
        getUserRegistrationMsg().then(e => {    // 获取用户注册待签核信息
            if(e.Status == 'Pass'){
                setDataSource(e.Data.map(row => ({...row, key: row.id})));
                message.success(e.Message);
            }else{
                message.error(e.Message);
            }
        });
    }, []);

    let resolve = () => {    //通过申请
        let ID = tableState.selectedData.map(row => row.id);
        userRegistrationSign('pass', ID).then(e => {
            if(e.Status == 'Pass'){
                message.success(e.Message);
                // 清空(放下面一起)
                // setTableState({selectedRowKeys: [], hasSelected: false, selectedData: []});
                getUserRegistrationMsg().then(e => {    // 获取用户注册待签核信息
                    if(e.Status == 'Pass'){
                        setTableState({
                            dataSource: e.Data.map(row => ({...row, key: row.id})),
                            selectedRowKeys: [], 
                            hasSelected: false, 
                            selectedData: []
                        });  // 更新数据 清空选择
                        message.success(e.Message);
                    }else{                                                                                                                            
                        message.error(e.Message);
                    }
                });
            }else{
                message.error(e.Message);
            }
        });
    }

    let reject = () => {     //拒绝申请
        let ID = tableState.selectedData.map(row => row.id);
        userRegistrationSign('reject', ID).then(e => {
            if(e.Status == 'Pass'){
                message.success(e.Message);
                // 清空
                setTableState({selectedRowKeys: [], hasSelected: false, selectedData: []});
            }else{
                message.error(e.Message);
            }
        });
    }

    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <Space>
                    <Button type='primary' disabled={!tableState.hasSelected} onClick={resolve} >通過</Button>
                    <Button type='primary' danger disabled={!tableState.hasSelected} onClick={reject} >駁回</Button>
                </Space>
            </div>
            <Table rowSelection={rowSelection} {...tableConfig} />
        </div>
    );
}


const UserRegistrationAndCheck = props => {
    return <div className={styles.UserRegistrationAndCheck}>
        <h3>
            <FormOutlined />
            <b> 用戶註冊簽核</b>
        </h3>
        {/* <Space>
            <Button type='primary'>通過</Button>
            <Button type='primary'>駁回</Button>
        </Space> */}
        <div style={{ marginTop: '15px' }}>
            <Tab />
        </div>
    </div>
}

export default connect((state) => {
    return state
})(UserRegistrationAndCheck)