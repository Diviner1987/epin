//商品模块----获取数据的接口配置
const express = require('express');
const conn = require('../dao/conn'); //连接数据库
const router = express.Router();

//接口测试
router.route('/getProducts')
    .get((req, res, nex) => {
        let sql = 'select * from products';
        //SQL语句查询
        conn.query(sql, (err, result) => {
            if (err) console.log(err);
            res.eval(result); //响应数据结果---undefined
        });
    });


//查询单个数据的id的接口
router.route('/getItem')
    .get((req, res, next) => {
        // let sql = `select * from products where id=${req.query.id}`;
        let sql = `select * from products where id=${req.query.id}`;
        console.log(sql);
        conn.query(sql, (err, result) => {
            if (err) console.log(err);
            // res.json(result); //拿不到id
            console.log(result);
        });
    });


//查询多个id的数据接口
router.route('/getItems')
    .get((req, res, next) => {
        let sql = `select * from products where id in (${req.query.idList})`;

        conn.query(sql, (err, result) => {
            if (err) console.log(err);
            res.json(result);
        })
    });

//导出模块
module.exports = router;