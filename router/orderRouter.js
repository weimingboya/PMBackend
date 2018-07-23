let orderService = require("../service/orderService");
let router = require("express").Router();

router.get("/",async (req, res) => {
    let orders = await orderService.getOrderSByPage(req.query.page);
    res.success(orders);
});

router.post('/',async (req, res) => {
    let o = await orderService.addOrder(req.body);
    res.success(o);
})

module.exports = router;