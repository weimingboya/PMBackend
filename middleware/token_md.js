let crypto = require("lxj-crypto");
let config = require("../config");
let userService = require("../service/userService");

function isExcludeUrl(url){
    let excludeUrls = [
        /.*\/user\/login/,
        /.*\/user\/register/
    ]
    let isExclude = false;
    excludeUrls.forEach(item=>{
        if(item.test(url)){
            isExclude=true;
        }
    })
    return isExclude;
}

module.exports = async (req,res,next)=>{
    if(!isExcludeUrl(req.url)){
        let token = req.get("token");
        if(!token){
            throw Error("缺少token")
        }
        let tokenData;
        try {
            tokenData = JSON.parse(crypto.aesDecrypt(token, config.TokenKey));
            // console.log(tokenData)
        } catch (e) {
            throw Error("token不合法")
        }

        if(tokenData.expire<Date.now()){
            throw Error("token已过期，请重新登陆")
        }

        let userInfo = await userService.getUserInfo(tokenData.username);
        // console.log(userInfo)
        req.user = userInfo;
    }
    next()
}