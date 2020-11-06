//1.配合后端的数据库的连接--连接池的创建（需要数据库模块）
const mysql = require('mysql');
//2.数据库池
const pool = mysql.createPool({
    connectionLimit: 10, // 最大连接数
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'data_2009'
});
//3.导出数据库连接池模块
module.exports = pool;