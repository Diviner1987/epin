//写接口
//用户模块---配置结束之后，用户使用
//1.引入模块
// const { Router } = require('express');
const express = require('express');
//7.导入数据库模块--自定义模块传路径导入模块
const conn = require('../dao/conn');

//8.导入加密模块
const crypto = require('crypto');
//2.获得router的函数，获得路由对象（可以在这个对象上面去绑定一些数据），其实就是中间件
const router = express.Router();
//3.route函数来给get,post做铺垫的根目录支持链式调用
// router.route('/')
//     .get((req, res, next) => {
//         console.log(req.query); //get是req.query打印给nodejs服务器上面的数据
//         res.json({ 'method': 'get' })
//     })
//     .post((req, res, next) => {
//         console.log(req.body); //post是req.body
//         res.json({ 'method': 'post' })
//     });
//6.post传数据
router.route('/reg')
    .post((req, res, next) => {
        //9.判断用户是不是存在
        //将查询语句写成变量
        let searchUser = `select * from users where username=${req.body.username}`;
        //将写成的SQL语句执行--从数据库里面查询
        conn.query(searchUser, (err, results) => {
            if (err) console.log(err); //c查不到就返回错误
            if (results.length) { //查到就返回用户已存在的json数据
                res.json({
                    msg: '用户已经存在',
                    username: req.body.username,
                    error: 1
                });
            } else {
                //post传输的数据
                // console.log(req.body);
                //将数据插在数据库里面
                //将密码加密
                let md5 = crypto.createHash('md5'); //用crypto模块创建哈希加密
                let passResult = md5.update(req.body.password).digest('hex'); //将密码进行加密传入数据库的密码是加密的
                let sql = `insert into users(username, password,email, phone, address) values('${req.body.username}','${passResult}','${req.body.email}','${req.body.phone}','${req.body.address}'')`;
                console.log(sql); //SQL语句
                //执行SQL语句
                conn.query(sql, (err, result) => {
                    if (err) console.log(err);
                    //数据库里面没有的话就说明我可以注册了，然后将数据插入数据库出现注册成功的语句，但是在真正的注册页面的时候是将数据传到cookie来判断该数据存不存在，存在的话就是已存在，没有的话就是可以注册
                    if (result.insertId) {
                        res.cookie('username', req.body.username); //设置cookie
                        res.cookie('isLogined', true);
                        res.json({
                            msg: "注册成功",
                            username: req.body.username,
                            error: 0
                        });
                    }
                    // console.log(result); //没有数据的情况就插入到数据库里面
                });
            }
        })
    });
//前端发请求过来判断有没有cookie---登录的时候的验证取cookie的存储值的时候就来判断
//nodejs 作为后端的时候拿到的cookie数据还是一个对象不用处理
router.route('/login')
    .get((req, res, next) => {
        //9.判断用户是不是存在
        //将查询语句写成变量
        let searchUser = `select * from users where username=${req.query.username}`;
        //将写成的SQL语句执行--从数据库里面查询
        conn.query(searchUser, (err, results) => {
            if (err) console.log(err); //c查不到就返回错误
            if (results.length) { //查到就返回用户已存在的json数据
                res.json({
                    msg: '用户已经存在',
                    username: req.query.username,
                    error: 1
                });
            } else {
                //post传输的数据
                // console.log(req.body);
                //将数据插在数据库里面
                //将密码加密
                let md5 = crypto.createHash('md5'); //用crypto模块创建querystring加密
                let passResult = md5.update(req.query.password).digest('hex'); //将密码进行加密传入数据库的密码是加密的
                let sql = `insert into users(username, password,email, phone, address) values('${req.query.username}','${passResult}','${req.query.email}','${req.query.phone}','${req.query.address}'')`;
                console.log(sql); //SQL语句
                //执行SQL语句
                conn.query(sql, (err, result) => {
                    if (err) console.log(err);
                    //数据库里面没有的话就说明我可以注册了，然后将数据插入数据库出现注册成功的语句，但是在真正的注册页面的时候是将数据传到cookie来判断该数据存不存在，存在的话就是已存在，没有的话就是可以注册
                    if (result.insertId) {
                        res.cookie('username', req.query.username); //设置cookie
                        res.cookie('isLogined', true);
                        res.json({
                            msg: "登录成功",
                            username: cookie.username,
                            error: 0
                        });
                    }
                    // console.log(result); //没有数据的情况就插入到数据库里面
                });
            }
        })
    });
//4.导出路由
module.exports = router;
//停掉服务来安装第三方模块,然后再连接服务器