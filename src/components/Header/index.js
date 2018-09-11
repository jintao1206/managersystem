import React,{Component} from 'react';
import './index.less';
import Util from '../../utils/utils';
import {withRouter} from 'react-router-dom';
import {Row,Col}  from 'antd';
import {connect} from 'react-redux';
import axios from '../../axios/index';
import cookie from 'react-cookies'
class Header extends Component{
    state={};
    constructor(props){
        super(props);
    }

    logout=()=>{
        let {userName} = this.state;
        let {history}=this.props;
        cookie.remove('user', { path: '/' })
        history.push('/login');

    }
    componentWillMount(){
        setInterval(()=>{
           let sysTime= Util.formateDate(new Date().getTime());
           this.setState({
               sysTime
           })
        },1000)
        this.getWeatherAPIData();
    }
    getWeatherAPIData(){
        let city='北京';
        axios.jsonp({
            url:'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(city)+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
        }).then((res)=>{
            if(res.status=='success'){
                let data=res.results[0].weather_data[0];
                this.setState({
                    dayPictureUrl:data.dayPictureUrl,
                    weather:data.weather
                })
            }
        })
    }
    render(){
        let userName= cookie.load('user');
        const menuType=this.props.menuType;
        return (<div className="header">
            <Row className="header-top">
                {
                    menuType?<Col span="6" className="logo">
                        <img src="/assets/logo-ant.svg" alt=""/>
                        <span>IMooc 通用管理系统</span>
                    </Col>:''
                }
                <Col span={menuType?18:24}>
                    <span>欢迎,{userName}</span>
                    <a href="javascript:;" onClick={this.logout}>退出</a>
                </Col>
            </Row>
            {
                menuType?'':
                    <Row className="breadcrumb">
                        <Col span="4" className="breadcrumb-title">
                            {this.props.menuName}
                        </Col>
                        <Col span="20" className="weather">
                            <span className="date">{this.state.sysTime}</span>
                            <span className="weather-img">
                        <img src={this.state.dayPictureUrl} alt="" />
                     </span>
                            <span className="weather-detail">{this.state.weather}</span>
                        </Col>
                    </Row>

            }

        </div>)
    }
}

export default connect((state)=>{
    return {
        menuName:state.menuName
    }
}) (withRouter(Header));