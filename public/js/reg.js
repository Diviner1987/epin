import './library/jquery.js';
import './library/jquery.md5.js';
import cookie from './library/cookie.js';

$('#registsubmit').on('click', function() {
    let password = $.md5($('[name=password]').val());
    $.ajax({
        type: "post",
        url: "http://localhost:8888/users/reg",
        data: {
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