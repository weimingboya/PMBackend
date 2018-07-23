let categoryService = require("../service/categoryService");
let router = require("express").Router();

router.get("/",async (req, res) => {
    let categories = await categoryService.getCategoriesByPage(req.query.page);
    res.success(categories);
});

router.post('/',async (req, res) => {
    let c = await categoryService.addCategory(req.body);
    res.success(c);
});

router.put('/:id',async (req, res) => {
    await categoryService.updateCategory(req.params.id,req.body)
    res.success()
})

router.delete('/:id',async (req, res) => {
    await categoryService.deleteCategory(req.params.id)
    res.success()
})

module.exports = router;

