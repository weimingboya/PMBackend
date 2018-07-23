let productService = require("../service/productService");
let router = require("express").Router();

router.get("/",async (req, res) => {
    let p = await productService.getProductsByPage(req.query.page);
    res.success(p)
})

router.post('/',async (req, res) => {
    res.success(await productService.addProduct(req.body));
})

router.put('/:id',async (req, res) => {
    await productService.updateProduct(req.params.id,req.body)
    res.success();
})

router.delete('/:id',async (req, res) => {
    await productService.deleteProduct(req.params.id)
    res.success();
})

module.exports = router;