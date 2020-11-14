import "./library/jquery.js";
import { baseUrl } from './library/config.js';
import cookie from './library/cookie.js';
import glass from './glass.js'; //放大镜
import sTab from './smallpic.js'; //小图切换
//详情页商品的数据渲染
(function() {

    let id = location.search.split('=')[1]; // 第一步获得商品id---是渲染的某块数据点击的时候传递给详情页的id

    //将id传给后端并且获取数据来传给后端---但是Ajax是异步的请求，他渲染的数据属于未来元素，所以渲染数据的效果写在Ajax请求后面去实现
    $.ajax({
        type: "get",
        url: `${baseUrl}/product/getItem`, //单条数据查询
        data: { id: id },
        dataType: "json",
        success: function(res) {
            res = res[0];
            let picture = JSON.parse(res.picture);

            //详情页的渲染拼接部分
            let template = `
           
        <!-- 详情页图片 -->
        <div style="width: 1200px;margin: -710px auto;"  class="product-info">
            <div class="infor-1">
              <!-- 放大镜 -->
                <div class="smallbox">
                    <a>
                        <span class="img-wrap">
                            <img src="../img/${picture[1].src}" alt="" class="smallpic">
                            <div class="movebox"></div>
                        </span>
                    </a>
                </div>
                <div class="bigbox">
                    <img src="../img/${picture[1].src}" alt="" class="bigpic">
                </div>
                <div>
                    <a class="bx-prev" style=" cursor: pointer;">&lt;</a>
                    <a class="bx-next" style=" cursor: pointer;">&gt;</a>
                    <ul class="list">
                        <li>
                            <img src="../img/${picture[1].src}" alt="">
                        </li>
                        <li>
                            <img src="../img/${picture[2].src}" alt="">
                        </li>
                        <li>
                            <img src="../img/${picture[3].src}" alt="">
                        </li>
                        <li>
                            <img src="../img/${picture[4].src}" alt="">
                        </li>
                        <li>
                            <img src="../img/${picture[5].src}" alt="">
                        </li>
                    </ul>
                </div>
            </div>
            `;

            // 渲染页面---发现元素点击时将id值存进cookie里面
            $('body').append(template).find('.btn-append').on('click', function() {
                addItem(res.id, $('#quantity').val());
            });


            const movebox = $('.movebox');
            const bigpic = $('.bigpic');
            const small = $('.smallbox');
            const big = $('.bigbox');

            glass(movebox, bigpic, small, big);


            // 小图切换
            const smallpic = $('.smallpic');
            const list = $('.shopping-list .outer');
            // const bLeft = $('.btn-left');
            // const bRight = $('.btn-right');
            sTab(smallpic, bigpic);
        }
    });

    //将id存到cookie里面的函数，参数就是获得的id
    function addItem(id, num) {
        let shop = cookie.get('shop'); // 从cookie中获得shop数据

        let product = {
            id: id,
            num: num
        }

        if (shop) { // 判断是否存有购物车数据
            shop = JSON.parse(shop); // 将取出的cookie数据转成对象

            // 判断cookie中的购物车数据 是否已存在本条数据的id
            // 如果本条数据的id已存在 修改数量
            if (shop.some(elm => elm.id == id)) {
                shop.forEach(el => {
                    el.id === id ? el.num = num : null;
                });
            } else {
                shop.push(product);
            }

        } else { // cookie中不存在shop数据
            shop = []; // 设置一个数组
            shop.push(product); // 将当前商品存入数组
        }

        cookie.set('shop', JSON.stringify(shop), 1); //最后将shop的数据存进cookie
    }
    //放大镜
    // const movebox = $('.movebox');
    // const bigpic = $('.bigpic');
    // const small = $('.smallbox');
    // const big = $('.bigbox');

    // glass(movebox, bigpic, small, big);


    // // 小图切换
    // const smallpic = $('.smallpic');
    // const list = $('.shopping-list .outer');
    // // const bLeft = $('.btn-left');
    // // const bRight = $('.btn-right');
    // // sTab(smallpic, bigpic);


})();