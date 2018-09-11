import React,{Component} from 'react';
import {Card,Button,notification} from 'antd';
import './ui.less';
export default class Notice extends Component {
    openNotification=(type,direction)=>{
        if(direction){
            notification.config({
                placement:direction,
                duration:3
            })
        }
        notification[type]({
            message:'React学起来相对还是很爽的',
            description:'比起vue来现在的react学起来好多了'
        })
    }
    render(){
        return(
            <div>
                <Card title="通知提醒框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.openNotification('success')}>success</Button>
                    <Button type="primary" onClick={()=>this.openNotification('info')}>Info</Button>
                    <Button type="primary" onClick={()=>this.openNotification('warning')}>Warning</Button>
                    <Button type="primary" onClick={()=>this.openNotification('error')}>Error</Button>
                </Card>
                <Card title="通知提醒框改变方向" className="card-wrap">
                    <Button type="primary" onClick={() => this.openNotification('success','topLeft')}>Success</Button>
                    <Button type="primary" onClick={() => this.openNotification('info','topRight')}>Info</Button>
                    <Button type="primary" onClick={() => this.openNotification('warning','bottomLeft')}>Warning</Button>
                    <Button type="primary" onClick={() => this.openNotification('error','bottomRight')}>Error</Button>
                </Card>
            </div>
        )
    }
}