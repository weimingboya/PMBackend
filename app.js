require('./db');
require('express-async-errors');

let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let config = require('./config');
let app = express();

//注册应用级中间件
app.use(morgan('combined'));
app.use(bodyParser.json());

//注册自定义中间件
app.use(require('./middleware/res_md'));
app.use(require('./middleware/token_md'));
app.use(require('./middleware/permission_md'));

//注册路由
app.use('/user',require('./router/userRouter'));
app.use('/category',require('./router/categoryRouter'));
app.use('/product',require('./router/productRouter'));
app.use('/order',require('./router/orderRouter'));
app.use((err,req,res,next)=>{
    console.log(err.toString())
    res.fail(err.toString())
});

app.listen(config.PORT);