import React,{Component} from 'react';
import { Card } from 'antd'
import axios from '../../axios'
import './detail.less';
export default class OrderDetail extends Component{
    state={};
    componentDidMount(){
        let orderId=this.props.match.params.orderId;
        if(orderId){
            this.getDetailInfo(orderId);
        }
    }
    getDetailInfo=(orderId)=>{
        axios.ajax({
            url:'/order/detail',
            data:{
                params:{
                    orderId: orderId
                }
            }
        }).then((res)=>{
            if(res.code ==1){
                this.setState({
                    orderInfo:res.result
                })
                this.renderMap(res.result);
            }
        })
    }
    renderMap=(result)=>{
        this.map = new window.BMap.Map('orderDetailMap');
        this.addMapControl();
        this.drawBikeRoute(result.position_list);
        this.drwaServiceArea(result.area);
    }
    // 添加地图控件
    addMapControl = ()=>{
        let map = this.map;
        //设置控件位置
        map.addControl(new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT}));
        map.addControl(new window.BMap.NavigationControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));
    }
    // 绘制用户的行驶路线
    drawBikeRoute=(positionList)=>{
        let map=this.map;
        let startPoint = ''; //起始坐标点
        let endPoint = '';//终点
        if(positionList.length>0){
            let first=positionList[0];
            let last = positionList[positionList.length-1];
            startPoint = new window.BMap.Point(first.lon,first.lat);
            let startIcon=new window.BMap.Icon('/assets/start_point.png',new window.BMap.Size(36,42),{
                imageSize:new window.BMap.Size(36,42),
                anchor:new window.BMap.Size(18,42)
            })
            let startMarker = new window.BMap.Marker(startPoint, { icon: startIcon});
            this.map.addOverlay(startMarker);
            endPoint = new window.BMap.Point(last.lon, last.lat);
            let endIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
                imageSize: new window.BMap.Size(36, 42),
                anchor: new window.BMap.Size(18, 42)
            })
            let endMarker = new window.BMap.Marker(endPoint, { icon: endIcon });
            this.map.addOverlay(endMarker);
            // 连接路线图
            let trackPoint=[];
            for(let i=0;i<positionList.length;i++){
                let point=positionList[i];
                trackPoint.push(new window.BMap.Point(point.lon, point.lat));
            }
            //连接坐标点
            let polyline = new window.BMap.Polyline(trackPoint,{
                strokeColor:'#1869AD', //设置矢量图标的线填充颜色
                strokeWeight:3,
                strokeOpacity:1
            })
            this.map.addOverlay(polyline); //增加折线
            this.map.enableScrollWheelZoom(true);//开启鼠标滚轮缩放
            this.map.centerAndZoom(endPoint, 11); //设置中心点坐标和地图级别

        }
    }
    //绘制服务区
    drwaServiceArea=(positionList)=>{
        let trackPoint = [];
        for (let i = 0; i < positionList.length; i++) {
            let point = positionList[i];
            trackPoint.push(new window.BMap.Point(point.lon, point.lat));
        }
        // 绘制服务区
        let polygon = new window.BMap.Polygon(trackPoint, {
            strokeColor: '#CE0000',
            strokeWeight: 4,
            strokeOpacity: 1,
            fillColor: '#ff8605',//里面的填充色
            fillOpacity:0.4
        })
        this.map.addOverlay(polygon);
    }
    render(){
        const info = this.state.orderInfo || {};
        return (
            <div>
                <Card>
                    <div id="orderDetailMap" className="order-map"></div>
                    <div className="detail-items">
                        <div className="item-title">基础信息</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">用车模式</div>
                                <div className="detail-form-content">{info.mode == 1 ?'服务区':'停车点'}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">订单编号</div>
                                <div className="detail-form-content">{info.order_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">车辆编号</div>
                                <div className="detail-form-content">{info.bike_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">用户姓名</div>
                                <div className="detail-form-content">{info.user_name}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">手机号码</div>
                                <div className="detail-form-content">{info.mobile}</div>
                            </li>
                        </ul>
                    </div>
                    <div className="detail-items">
                        <div className="item-title">行驶轨迹</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">行程起点</div>
                                <div className="detail-form-content">{info.start_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行程终点</div>
                                <div className="detail-form-content">{info.end_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行驶里程</div>
                                <div className="detail-form-content">{info.distance/1000}公里</div>
                            </li>
                        </ul>
                    </div>
                </Card>
            </div>
        )
    }
}