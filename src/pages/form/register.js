import React,{Component} from 'react';
import
{Card,Form,Input,Radio,InputNumber,Select,Switch,DatePicker,TimePicker,Upload,Icon,Checkbox,Button,message}
from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import './index.less';
const FormItem=Form.Item;
const RadioGroup=Radio.Group;
const Option=Select.Option;
const dateFormat='YYYY-MM-DD';
const { TextArea } = Input;
class FormRegister extends Component{
    state = {
        confirmDirty: false,
        loading:false
    };
    handleSubmit=()=>{
        let userInfo=this.props.form.getFieldsValue();
        console.log(JSON.stringify(userInfo));
        message.success(`恭喜你${userInfo.userName}注册成功`);
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    getBase64 = (img, callback)=>{
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                userImg:imageUrl,
                loading: false,
            }));
        }
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两个密码输入不一样!');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    render(){
        const imageUrl = this.state.userImg;
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { getFieldDecorator }=this.props.form;
        const formItemLayout={
            labelCol:{
                xs:{span:24},
                md:4
            },
            wrapperCol: {
                xs: { span: 24 },
                md: { span: 12 },
            }
        }
        const offsetLayout = {
            wrapperCol:{
                xs:24,
                md:{
                    span:12,
                    offset:4
                }
            }
        }
        const rowObject = {
            minRows: 4, maxRows: 6
        }
        return(
            <div>
                <Card title="注册表单">
                    <Form>
                        <FormItem label="用户名" {...formItemLayout}>
                            {
                                getFieldDecorator('userName',{
                                    initialValue: '',
                                    rules:[
                                        {
                                            required:true,
                                            message:'用户名不能为空'
                                        }
                                    ]
                                })(
                                    <Input placeholder="请输入用户名"/>
                                )
                            }
                        </FormItem>
                        <FormItem label="密码" {...formItemLayout}>
                            {
                                getFieldDecorator('password',{
                                    rules:[
                                        {
                                            required: true,
                                            message:'请输入密码'
                                        },
                                        {
                                            validator: this.validateToNextPassword,
                                        }
                                    ]
                                })(
                                    <Input type="password" placeholder="请输入密码" />
                                )
                            }
                        </FormItem>
                        <FormItem label="确认密码" {...formItemLayout}>
                            {getFieldDecorator('confirm', {
                                rules: [{
                                    required: true, message: '请输入确认密码!',
                                },{
                                    validator: this.compareToFirstPassword,
                                }],
                            })(
                                <Input type="password" placeholder="请输入确认密码" onBlur={this.handleConfirmBlur} />
                            )}
                        </FormItem>
                        <FormItem label="性别" {...formItemLayout}>
                            {
                                getFieldDecorator('sex',{
                                    initialValue:'1'
                                })(
                                    <RadioGroup>
                                        <Radio value="1">男</Radio>
                                        <Radio value="2">女</Radio>
                                    </RadioGroup>
                                )
                            }
                        </FormItem>
                        <FormItem label="年龄" {...formItemLayout}>
                            {
                                getFieldDecorator('age', {
                                    initialValue: 18
                                })(
                                    <InputNumber  />
                                )
                            }
                        </FormItem>
                        <FormItem label="年龄" {...formItemLayout}>
                            {
                                getFieldDecorator('state',{
                                    initialValue: '2'
                                })(
                                    <Select>
                                        <Option value="1">阿里ued</Option>
                                        <Option value="2">携程ued</Option>
                                        <Option value="3">奇舞团</Option>
                                        <Option value="4">百度FE</Option>
                                        <Option value="5">搜狗ued</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="爱好" {...formItemLayout}>
                            {
                                getFieldDecorator('interest', {
                                    initialValue: ['2','5']
                                })(
                                    <Select mode="multiple">
                                        <Option value="1">游泳</Option>
                                        <Option value="2">打篮球</Option>
                                        <Option value="3">踢足球</Option>
                                        <Option value="4">跑步</Option>
                                        <Option value="5">爬山</Option>
                                        <Option value="6">骑行</Option>
                                        <Option value="7">桌球</Option>
                                        <Option value="8">麦霸</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="是否已婚" {...formItemLayout}>
                            {
                                getFieldDecorator('isMarried', {
                                    valuePropName:'checked',
                                    initialValue: true
                                })(
                                    <Switch/>
                                )
                            }
                        </FormItem>
                        <FormItem label="生日" {...formItemLayout}>
                            {
                                getFieldDecorator('birthday', {
                                    initialValue: moment('2018-09-01', dateFormat)
                                })
                                (
                                    <DatePicker
                                        // defaultValue={moment('2018-09-01', dateFormat)}
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem label="联系地址" {...formItemLayout}>
                            {
                                getFieldDecorator('address')(
                                    <TextArea
                                        autosize={rowObject}
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem label="早起时间" {...formItemLayout}>
                            {
                                getFieldDecorator('time')(
                                    <TimePicker/>
                                )
                            }
                        </FormItem>
                        <FormItem label="头像" {...formItemLayout}>
                            {
                                getFieldDecorator('userImg')(
                                    <Upload
                                        listType="picture-card"
                                        showUploadList={false}
                                        action="//jsonplaceholder.typicode.com/posts/"
                                        onChange={this.handleChange}
                                    >
                                        {imageUrl?<img src={imageUrl}/>:uploadButton}
                                    </Upload>
                                )
                            }
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            {
                                getFieldDecorator('agree')(
                                    <Checkbox>我已阅读<a href="#">注册协议</a></Checkbox>
                                )
                            }
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            <Button type="primary" onClick={this.handleSubmit}>注册</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default Form.create()(FormRegister);