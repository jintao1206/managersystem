import React,{Component} from 'react';
import { Menu, Icon } from 'antd';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux'
import { switchMenu } from './../../redux/action'
import MenuList from './../../config/menuConfig';
import './index.less';
const SubMenu = Menu.SubMenu;

class NavLeft extends Component{
    state = {
        currentKey:[]
    }
    handleClick = ({ item ,key})=>{
        const { dispatch } = this.props;
        dispatch(switchMenu(item.props.title))
        this.setState({
            currentKey:key
        })
    }
    componentWillMount(){
        const menuTreeNode=this.renderMenu(MenuList);
        let currentKey = window.location.hash.replace(/#|\?.*$/g, '').split('');
        this.setState({
            menuTreeNode,
            currentKey
        })
    }
    //菜单渲染
    renderMenu=(data)=>{
        return data.map((item)=>{
            if(item.children){
                return (<SubMenu title={item.title} key={item.key}>
                    {this.renderMenu(item.children)}
                </SubMenu>)
            }
            return <Menu.Item title={item.title} key={item.key} >
                <NavLink to={item.key}>{item.title}</NavLink>
            </Menu.Item>

        })
    }
    render(){
        return (
            <div>
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt=""/>
                    <h1>管理系统</h1>
                </div>
                <Menu
                    onClick={this.handleClick}
                    theme="dark"
                    selectedKeys={this.state.currentKey}
                >
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        )
    }
}

export default connect() (NavLeft);