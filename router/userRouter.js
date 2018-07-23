let router = require('express').Router();
let userService = require('../service/userService');

router.get('/:username',async (req, res) => {
   let user = await userService.getUserInfo(req.params.username);
   res.success(user)
});

router.delete('/:username',async (req, res) => {
   await userService.deleteUser(req.params.username);
   res.success()
});

router.post('/register',async (req, res) => {
   let user = await userService.registerUser(req.body);
   res.success(user);
});

router.post('/login',async (req, res) => {
    let token = await userService.loginUser(req.body);
    res.success({
        token
    });
});

module.exports = router;