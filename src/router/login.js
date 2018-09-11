const express = require('express');
const router = express.Router();

let mySql=[{"name":"admin","pass":"admin"},{"name":"admin888","pass":"admin888"},{"name":"yjt666","pass":"yjt666"}]



router.post('/',function(req,res,next){
    const json = {code:-1,msg:"输入错误"};
    const body = req.body;
    let {act,name,pass} = body;
    let oo=mySql.find(e=>{
        return e.name===name;
    })
    switch (act){
        case 'login':
            if(!oo){
                json.code = -1;
                json.msg = '输入错误';
            }else{
                json.code = 0;
                json.msg = '登录成功'
            }
            res.json(json);
            break;
    }

})
module.exports = router;