import React from 'react';
import { Select } from 'antd'
const Option = Select.Option;
export default{
    formateDate(time){
        if(!time) return '';
        let date=new Date(time);
        return  date.getFullYear()+'-'+(date.getMonth()+1)+'-'+this.toZero(date.getDate())+' '
            +this.toZero(date.getHours())+':'+this.toZero(date.getMinutes())+':'+this.toZero(date.getSeconds());
    },
    formateDate2(time){
        if(!time)return '';
        let date = new Date(time);
        return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
    },
    toZero(n){
        return n<10?'0'+n:''+n;
    },
    pagination(data,callback){
        return {
            onChange:(current)=>{
                callback(current);
            },
            current:data.result.page, //当前页
            pageSize:data.result.page_size, //每页条数
            total:data.result.total_count, //数据总条数
            showTotal:()=>{
                return `共${data.result.total_count}页`
            }, //显示数据总页数
            showQuickJumper:true
        }

    },
    getOptionList(data){
        if(!data){
            return [];
        }
        let options = [] ;
        data.map((item)=>{
            options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
        })
        return options;
    },
    updateSelectedItem(selectedRowKeys, selectItem, selectedIds){
        if (selectedIds){
            this.setState({
                selectedRowKeys,
                selectItem,
                selectedIds
            })
        }else{
            this.setState({
                selectedRowKeys,
                selectItem
            })
        }
    }
}