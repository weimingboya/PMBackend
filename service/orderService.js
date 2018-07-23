let orderDao = require("../model/orderDao");
let productService = require("../service/productService");
let Big = require("big.js");
let config = require("../config");

async function addOrder(order){
    // 1.判断product是否存在
    let p = await productService.getProductById(order.productId);
    // 2.判断库存
    if(p.stock<order.count){
        throw Error("商品库存不够")
    }
    // 3.重构order的属性
    order.productName = p.name;
    order.productPrice = p.price;
    order.totalPrice = Big(order.productPrice).times(order.count)
    let o = await orderDao.create(order);
    //4.减少库存,一定要放在order入库之后，避免count为负数
    await productService.updateProduct(p._id,{stock:p.stock-order.count})
    return o;
}

async function getOrderSByPage(page=1){
    return await orderDao.find().skip((page-1)*config.PageCount)
        .sort("created").select("-__v");
}

module.exports = {
    addOrder,
    getOrderSByPage
}
