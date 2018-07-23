let productDao = require("../model/productDao");
let config = require("../config");

async function addProduct(product) {
    return await productDao.create(product);
}

async function getProductsByPage(page=1) {
    return await productDao.find().skip(config.PageCount*(page-1)).limit(config.PageCount)
        .sort("created").select("-__v")
}

async function isIdExist(id) {
    let p = await productDao.findOne({_id:id});
    if(!p){
        throw Error(`id为【${id}】的商品不存在`)
    }
}

async function updateProduct(id,product){
    await isIdExist(id);
    let res = await productDao.update({_id:id},product);
    if(res.n<1){
        throw Error("更新失败")
    }
}

async function deleteProduct(id){
    await isIdExist(id);
    await productDao.deleteOne({_id:id})
    let res = await productDao.update({_id:id},product);
    if(res.n<1){
        throw Error("删除失败")
    }
}

async function getProductById(id){
    await isIdExist(id);
    return await productDao.findOne({_id:id})
}

module.exports = {
    addProduct,
    getProductsByPage,
    updateProduct,
    deleteProduct,
    getProductById
}