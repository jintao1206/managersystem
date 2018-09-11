import Jsonp from 'jsonp';
import axios from 'axios';
import {Modal} from 'antd';
import Utils from './../utils/utils'
export default class Axios{
    static requestList(_this,url,params){
        var data = {
            params: params
        }
        this.ajax({
            url,
            data
        }).then((data)=>{
            if (data && data.result){
                let list = data.result.item_list.map((item, index) => {
                    item.key = index;
                    return item;
                });
                _this.setState({
                    list,
                    pagination: Utils.pagination(data, (current) => {
                        _this.params.page = current;
                        _this.requestList();
                    })
                })
            }
        });
    }
    static jsonp(options){
       return new Promise((resolve,reject)=>{
            Jsonp(options.url,{
                param: 'callback'
            },function (err,response) {
                if(response.status=='success'){
                    resolve(response);
                }else{
                    reject(response.message);
                }
            })
        })
    }
    static ajax(options){
        let loading;
        if(options.data && options.data.isShowLoading!==false){
            loading=document.getElementById('ajaxLoading');
            loading.style.display='block';
        }
        let baseApi='https://www.easy-mock.com/mock/5b8be3e961840c7b403365e6/managerapi';
        return new Promise((resolve,reject)=>{
            axios({
                url:options.url,
                method:'get',
                baseURL:baseApi,
                //timeout:1000,
                params:(options.data && options.data.params) || ''
            }).then((response)=>{
                if(options.data && options.data.isShowLoading!==false){
                    loading=document.getElementById('ajaxLoading');
                    loading.style.display='none';
                }
                if(response.status=='200'){
                    let res=response.data;
                    if(res.code=="1"){
                        resolve(res)
                    }else{
                        Modal.error({
                            title:'提示',
                            content:res.msg
                        })
                    }
                }else{
                    reject(response.data);
                }
            })
        })
    }
}