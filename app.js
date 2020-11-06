//后端应用的入口---服务启动
//1.引入
const express = require('express');
//2.路径
const path = require('path');
//10.引入cookie模块--在所有的路由中间件之前去使用
const cookieParser = require('cookie-parser');

//3.调用函数生成应用
const app = express();
//8.路由导入---自定义的模块,命名是小驼峰命名，还要写模块的地址
const usersRouter = require('./router/users');
//11.其他的模块
const productRouter = require('./router/product')
    //4.配置服务
let conf = {
    port: 8888,
    host: 'localhost'
};
//6.配置静态服务
app.use(express.static(path.join(__dirname, 'public')));
//7.处理post数据配置---post表单数据解析成JSON
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // post表单数据解析成json 

//11.调用cookie函数--去设置和读取cookie的中间件
app.use(cookieParser());
//9.使用路由中间件--(基础路径，导入路由中间件,在基础路径上导出响应的数据)
app.use('/users', usersRouter);
//12.使用其他的模块
app.use('/product', productRouter);
//5.开启服务监听
app.listen(conf.port, conf.host, () => {
    console.log(`srever is running on http://${conf.host}:${conf.port}`);
});