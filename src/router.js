import React from 'react';
import {HashRouter,Route,Switch,Redirect} from 'react-router-dom';
import Root from './Root';
import Login from './pages/login';
import App from './App';
import Home from './pages/home';
import Buttons from './pages/ui/buttons';
import Modals from './pages/ui/modals';
import Loadings from './pages/ui/loadings';
import Notice from './pages/ui/notice';
import Messages from './pages/ui/messages';
import TabPanels from './pages/ui/tabs';
import Gallery from './pages/ui/gallery';
import Carousels from './pages/ui/carousel';
import FormLogin from './pages/form/login';
import FormRegister from './pages/form/register';
import BasicTable from './pages/table/basicTable';
import City from './pages/city/index';
import Order from './pages/order/index';
import Common from './common';
import OrderDetail from './pages/order/detail';
import User from './pages/user';
import BikeMap from './pages/map/bikeMap';
import Bar from './pages/echarts/bar';
import Pie from './pages/echarts/pie'
import Line from './pages/echarts/line';
import RichText from './pages/rich';
import Permission from './pages/permission';
import NoMatch from './pages/nomatch';
export default class IRouter extends React.Component{
    render(){
        return(
            <HashRouter>
                <Root>
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path="/common" render={() =>
                            <Common>
                                <Route path="/common/order/detail/:orderId" component={OrderDetail}/>
                            </Common>
                        }
                        />
                        <Route path="/" render={() =>{
                            if(document.cookie.indexOf("user=")!=-1){
                                return <App>
                                    <Switch>
                                        <Route path="/home" component={Bar} />
                                        <Route path="/ui/buttons" component={Buttons} />
                                        <Route path="/ui/modals" component={Modals} />
                                        <Route path="/ui/loadings" component={Loadings} />
                                        <Route path="/ui/notification" component={Notice} />
                                        <Route path="/ui/messages" component={Messages} />
                                        <Route path="/ui/tabs" component={TabPanels} />
                                        <Route path="/ui/gallery" component={Gallery} />
                                        <Route path="/ui/carousel" component={Carousels} />
                                        <Route path="/form/login" component={FormLogin} />
                                        <Route path="/form/reg" component={FormRegister} />
                                        <Route path="/table/basic" component={BasicTable} />
                                        <Route path="/city" component={City} />
                                        <Route path="/order" component={Order} />
                                        <Route path="/user" component={User} />
                                        <Route path="/bikeMap" component={BikeMap} />
                                        <Route path="/charts/bar" component={Bar} />
                                        <Route path="/charts/pie" component={Pie}/>
                                        <Route path="/charts/line" component={Line}/>
                                        <Route path="/rich" component={RichText} />
                                        <Route path="/permission" component={Permission} />
                                        <Route component={NoMatch} />
                                    </Switch>
                                </App>
                            }else{
                                return  <Redirect to="/login"/>;
                            }
                        }}/>
                    </Switch>
                </Root>
            </HashRouter>
        );
    }
}