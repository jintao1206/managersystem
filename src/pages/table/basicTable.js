import React,{Component} from 'react';
import {Card,Table,Modal,Button,message} from 'antd';
import axios from './../../axios';
import Utils from './../../utils/utils';
export default class BasicTable extends Component{
    state={
        dataSource2:[]
    };
    params={
        page:1
    }
    componentWillMount(){
        const data = [
            {
                id:'0',
                userName:'Jack',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'2000-01-01',
                address:'北京市海淀区奥林匹克公园',
                time:'09:00'
            },
            {
                id: '1',
                userName: 'Tom',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            },
            {
                id: '2',
                userName: 'Lily',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            },
        ]
        //给自己写的数据循环添加key
        data.map((item,index)=>{
            item.key=index;
        })
        this.setState({
            dataSource:data
        })
        this.request();
    }
    //动态获取mock数据
    request=()=>{
        let _this=this;
        axios.ajax({
            url:'/table/list',
            data:{
                params:{
                    page:this.params.page
                },
                isShowLoading:false
            }

        }).then((res)=>{
            //解决控制台没有key的问题
            res.result.list.map((item,index)=>{
                item.key=index;
            })
            this.setState({
                dataSource2:res.result.list,
                selectedRowKeys:[],
                selectedRows:null,
                pagination:Utils.pagination(res,(current)=>{
                    _this.params.page=current;
                    this.request();
                })
            })
        })
    }
    //多选删除
    handleDelete=()=>{
        let rows=this.state.selectedRows;
        let ids=[];
        rows.map((item)=>{
            ids.push(item.id);
        })
        Modal.confirm({
            title:'删除提示',
            content: `您确定要删除这些数据吗？${ids.join(',')}`,
            onOk:()=>{
                message.success('删除成功');
                this.request();
            }
        })
    }
    onRowClick=(record,index)=>{
        let selectKey=[index];
        Modal.info({
            title:'用户信息',
            content:`用户名:${record.userName}`
        })
        this.setState({
            selectedRowKeys:selectKey,
            selectItem:record
        })
    }
    render(){
        const columns=[
            {
                title:'id',
                key:'id',
                dataIndex:'id'
            },
            {
                title: '用户名',
                key: 'userName',
                dataIndex: 'userName'
            },
            {
                title: '性别',
                key: 'sex',
                dataIndex: 'sex',
                render(sex){
                    return sex==1?'男':'女'
                }
            },
            {
                title: '状态',
                key: 'state',
                dataIndex: 'state',
                render(state){
                    let config={
                        '1':'阿里ued',
                        '2':'携程ued',
                        '3':'奇舞团',
                        '4':'百度FE',
                        '5':'搜狗ued'
                    }
                    return config[state];
                }

            },
            {
                title: '爱好',
                key: 'interest',
                dataIndex: 'interest',
                render(interest){
                    let config={
                        '1':'游泳',
                        '2':'打篮球',
                        '3':'踢足球',
                        '4':'跑步',
                        '5':'爬山',
                        '6':'骑行',
                        '7':'桌球',
                        '8':'麦霸'

                    }
                    return config[interest];
                }
            },
            {
                title: '生日',
                key: 'birthday',
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                key: 'address',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                key: 'time',
                dataIndex: 'time'
            }
        ]
        const {selectedRowKeys}=this.state;
        const rowSelection={
            type:'radio',
            selectedRowKeys //选中单选按钮
        }
        const rowCheckSelection={
            type:'checkbox',
            selectedRowKeys,
            onChange:(selectedRowKeys,selectedRows)=>{
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
            }
        }
        return (
            <div>
                <Card title="基础表格">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />
                </Card>
                <Card title="动态数据渲染表格">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card title="Mock-单选" style={{ margin: '10px 0' }}>
                    <Table
                        bordered
                        rowSelection={rowSelection}
                        onRow={(record,index) => {
                            return {
                                onClick:()=>{
                                    this.onRowClick(record,index);
                                }
                            }
                        }}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card title="Mock-多选" style={{ margin: '10px 0' }}>
                    <div style={{marginBottom:10}}>
                        <Button onClick={this.handleDelete}>删除</Button>
                    </div>
                    <Table
                        bordered
                        rowSelection={rowCheckSelection}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card title="Mock-表格分页" style={{ margin: '10px 0' }}>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={this.state.pagination}
                    />
                </Card>
            </div>
        )
    }
}