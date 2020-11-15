const express = require('express');
const conn = require('../dao/conn');

const router = express.Router();

//商品数据的接口连接
router.route('/getProducts')
    .get((req, res, next) => {
        let sql = 'select * from products';
        conn.query(sql, (err, result) => {
            if (err) console.log(err);

            res.json(result);
        });
    });

//查询单个数据的id的接口
router.route('/getItem')
    .get((req, res, next) => {
        let sql = `select * from products where id=${req.query.id}`;

        conn.query(sql, (err, result) => {
            if (err) console.log(err);
            res.json(result);
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

module.exports = router;