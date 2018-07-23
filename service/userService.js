let userDao = require('../model/userDao');
let crypto = require('lxj-crypto');
let config = require('../config');

async function getUserInfo(username) {
    let res = await userDao.findOne({username:username}).select("-__v -password");
    if(!res){
        throw Error(`用户名${username}不存在`)
    }
    return res;
}

async function isUserExist(username) {
    let res = await userDao.findOne({username:username});
    if(!res){
        throw Error(`用户名${username}不存在`)
    }
}

async function deleteUser(username) {
    await isUserExist(username);
    let res = await userDao.deleteOne({username:username});
    if(res.n<1){
        throw Error('删除失败')
    }
}

async function registerUser(user) {
    let res = await userDao.findOne({username:user.username});
    if(res){
        throw Error(`用户名${user.username}已存在`)
    }
    user.password = crypto.sha1Hmac(user.password,user.username);
    user.role = 0;
    user.created = Date.now();
    res = await userDao.create(user);
    res.password = '';
    return res;
}

async function loginUser(user) {
    user.password = crypto.sha1Hmac(user.password,user.username);
    let res = await userDao.findOne({username:user.username,password:user.password});
    if(!res){
        throw Error("用户名或者密码错误")
    }
    let tokenData = {
        username:user.username,
        expire:Date.now() + config.TokenExpire
    }
    let token = crypto.aesEncrypt(JSON.stringify(tokenData),config.TokenKey);
    return token;
}

module.exports = {
    getUserInfo,
    deleteUser,
    registerUser,
    loginUser
}

