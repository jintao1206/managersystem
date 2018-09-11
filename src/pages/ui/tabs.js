import React,{Component} from 'react';
import {Card,Button,Tabs,message,Icon}  from 'antd';
import './ui.less';
const TabPane = Tabs.TabPane;
export default class TabPanels extends Component {
    newTabIndex = 0;
    handleCallback=(key)=>{
        message.info("您选择了页签："+key)
    }
    componentWillMount(){
        const panes=[
            {title:'Tab 1',content:'content 1',key:'1'},
            {title:'Tab 2',content:'content 2',key:'2'},
            {title:'Tab 3',content:'content 3',key:'3'},
        ]
        this.setState({
            activeKey:panes[0].key,
            panes
        })
    }
    onChange=(activeKey)=>{
        this.setState({
            activeKey
        })
    }
    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }

    add = () => {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: activeKey, content: 'Content of new Tab', key: activeKey });
        this.setState({ panes, activeKey });
    }

    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey });
    }
    render(){
        return (
            <div>
                <Card title="Tab页签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                        <TabPane tab="Tab 1" key="1">欢迎学习React课程</TabPane>
                        <TabPane tab="Tab 2" key="2" disabled>欢迎学习React课程2</TabPane>
                        <TabPane tab="Tab 3" key="3">React是一个非常受欢迎的MV*框架</TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab带图的页签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                        <TabPane tab={<span><Icon type="plus"/>Tab1</span>}  key="1">添加</TabPane>
                        <TabPane tab={<span><Icon type="edit"/>Tab2</span>}  key="2">编辑</TabPane>
                        <TabPane tab={<span><Icon type="delete" />Tab 3</span>} key="3">删除</TabPane>
                    </Tabs>
                </Card>
                <Card title="动态添加tab标签" className="card-wrap">
                    <Tabs
                        onChange={this.onChange}
                        type="editable-card"
                        activeKey={this.state.activeKey}
                        onEdit={this.onEdit}
                    >
                        {
                            this.state.panes.map((panel)=>{
                                return <TabPane
                                    tab={panel.title}
                                    key={panel.key}
                                />
                            })
                        }
                    </Tabs>
                </Card>
            </div>
        )
    }
}