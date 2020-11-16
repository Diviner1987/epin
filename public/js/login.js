import './library/jquery.js';
import './library/jquery.md5.js';
import { baseUrl } from './library/config.js';
import cookie from './library/cookie.js';


$('#loginSubmit').on('click', function() {
    let password = $.md5($.md5($('[name=password]').val()))
    $.ajax({
        type: "get",
        url: ` ${baseUrl }/users/login`, //后端与数据库连接的地址路径
        data: { //前端给后端传递数据---因为input框里面的输入的是字符串，而且取到input里面的值用val()来取,登陆的话要与数据库里面之前匹配的数据对比，如果有就登录成功，没有就登录失败
            username: $('[name=username]').val(),
            password: password,
            email: $('[name=email]').val(),
            phone: $('[name=phone]').val(),
            address: $('[name=address]').val(),
        }, //传的数据是键值对的形式就用对象传数据
        dataType: "dataType",
        success: function(response) {
            console.log(response);

        }
    });
});