let categoryDao = require('../model/categoryDao');
let config = require('../config');

async function addCategory(category) {
    return await categoryDao.create(category)
}

async function getCategoriesByPage(page = 1) {
    return await categoryDao.find().skip(config.PageCount*(page-1)).limit(config.PageCount)
        .sort("created").select("-__v");
}

async function isIdExist(id) {
    let c = await categoryDao.findOne({_id:id});
    if(!c){
        throw Error(`id为【${id}】的分类不存在`)
    }
}

async function updateCategory(id,update) {
    await isIdExist(id);
    let res = await categoryDao.update({_id:id},update);
    if(res.n<1){
        throw Error("更新失败")
    }
}

async function deleteCategory(id) {
    await isIdExist(id);
    let res = await categoryDao.deleteOne({_id: id});
    if(res.n<1){
        throw Error("删除失败")
    }
}

module.exports = {
    addCategory,
    getCategoriesByPage,
    updateCategory,
    deleteCategory
}