import React,{Component} from 'react';
import {Row,Col,Form,Input,Button,message,Icon,Checkbox} from 'antd';
import cookie from 'react-cookies';
import axios from '../../axios'
import './login.less';
const FormItem = Form.Item;
class Login extends Component {

    handleSubmit=()=>{
        let userInfo=this.props.form.getFieldsValue();
        let {history}=this.props;
        this.props.form.validateFields((err,values)=>{
            if(!err){
                let userName=userInfo.userName;
                let password=userInfo.userPwd;
                fetch('http://127.0.0.1:88/login',{
                    "method": "post",
                    "body": `act=login&name=${userName}&pass=${password}`,
                    "headers": {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }).then(e=>e.json())
                    .then(data =>{
                      if(data.code==0){
                          let userInfo=this.props.form.getFieldsValue();
                          this.props.form.validateFields((err,values)=>{
                              if(!err){
                                  history.push('/home');
                                  if(userInfo.remember){
                                      const expires = new Date()
                                      expires.setDate(expires.getDate() + 7)
                                      cookie.save(
                                          'user',
                                          userInfo.userName,
                                          {
                                              path: '/',
                                              expires
                                          }
                                      )

                                  }else{
                                      cookie.save('user', userName, { path: '/' })
                                  }
                              }

                          })
                      }else if(data.code==-1){
                          message.warning(data.msg);
                          this.props.form.resetFields();
                      }
                    })

            }
        })


    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
               <div className="login-page">
                   <Row className="login-header">
                       <div className="logo">
                           <img src="/assets/logo-ant.svg" alt=""/>
                           <span>React+AntD后台管理系统</span>
                       </div>
                   </Row>
                   <div className="login-content-wrap">
                       <Row className="login-content">
                           <div className="word">共享出行 <br/>引领城市新经济</div>
                           <div className="login-box">
                                   <Form>
                                       <FormItem>
                                           {
                                               getFieldDecorator('userName',{
                                                   rules:[
                                                       {
                                                           required:true,
                                                           message:'用户名不能为空'
                                                       },
                                                       {
                                                           min:5,max:10,
                                                           message:'长度不在范围内'
                                                       },
                                                       {
                                                           pattern:/^\w+$/g,
                                                           message:'用户名必须为字母或者数字'
                                                       }
                                                   ]
                                               })(
                                                   <Input prefix={<Icon type="user"/>} placeholder="请输入用户名"/>
                                               )
                                           }
                                       </FormItem>
                                       <FormItem>
                                           {
                                               getFieldDecorator('userPwd',{
                                                   rules:[
                                                       {
                                                           required:true,
                                                           message:'密码不能为空'
                                                       },
                                                       {
                                                           min:5,max:10,
                                                           message:'长度不在范围内'
                                                       }
                                                   ]
                                               })(
                                                   <Input prefix={<Icon type="lock"/>} type="password" placeholder="请输入密码"/>
                                               )
                                           }
                                       </FormItem>
                                       <FormItem>
                                           <Button type="primary" onClick={this.handleSubmit}>登录</Button>
                                       </FormItem>
                                       <FormItem>
                                           {
                                               getFieldDecorator('remember',{
                                                   valuePropName: 'checked',
                                                   initialValue: true,
                                               })(
                                                   <Checkbox>记住密码(7天免登录)</Checkbox>
                                               )
                                           }
                                       </FormItem>
                                   </Form>
                           </div>
                       </Row>
                   </div>
               </div>
            </div>
        );
    }
}
export default Form.create()(Login);