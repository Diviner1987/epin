import "./library/jquery.js";
import { baseUrl } from './library/config.js';
import cookie from './library/cookie.js';

//详情页商品的数据渲染``
(function() {
    let id = location.search.split('=')[1]; // 第一步获得商品id---是渲染的某块数据点击的时候传递给详情页的id

    //将id传给后端并且获取数据来传给后端---但是Ajax是异步的请求，他渲染的数据属于未来元素，所以渲染数据的效果写在Ajax请求后面去实现
    $.ajax({
        type: "get",
        url: `${baseUrl}/product/getItem`, //单条数据查询
        data: { id: id },
        dataType: "json",
        success: function(res) {
            // console.log(1);
            res = res[0];

            let picture = JSON.parse(res.picture);
            console.log(picture[0]);
            // console.log(id);
            //详情页的渲染拼接部分
            let template = `
            <div class="infor-1">
            
            <div class="smallbox">
                <div class="small" style="position: relative;width: 400px;height:400px;border:1px solid #ccc;">
                    <img src="../img/${picture[1].src}" alt="" style="width: 100%;height: 100%;">
                    <div class="movebox hide" style="width: 200px;height: 200px;background-color: orange;opacity: .2;position: absolute;top: 0;left: 0;"></div>
                </div>
                <div class="big hide" style="width: 500px;height: 500px;overflow: hidden;position: fixed;top:243px;left:641px;z-index: 10;">
                    <img src="../img/${picture[1].src}" alt="" class="bigpic" style="position: absolute;top: 0;left: 0;width: 700px;height: 700px;">
                </div>
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
                        <img src="../img/${picture[4].src}" alt="">
                    </li>
                </ul>
            </div>

        </div>
            <div class="infor-2">
                <div class="done-title">
                    <h1>${res.title}</h1> 
                </div>
                <div class="done-price" >
                    <span>商城价:</span> 
                    <span>¥</span>
                    <span>${res.price}</span>
                    <span>
                        <a href="javascript">(降价通知)</a>
                    </span>
                </div>
                <div class="done-num">
                    <span>库存：${res.num}</span>  
                </div>
                <div class="done-addnum">
                    <span >数量:</span> 
                    <a href="javascript:;" class="btn-reduce" >+</a>
                    <input type="text" class="text buy-num" id="quantity" onblur="changePrice()" value="1" name="number" defaultnumber="1">
                    <a href="javascript:;"class="btn-add">-</a>
                </div>
                <div class="addcar">
                         <a href="javascript:;" class="buynow btn-buynow">立即购买</a>
                        <a href="shpcar.html" class="btn-append">
                        <i class="icon"></i>
                        加入购物车
                    </a>
                </div>
            </div>
            
            <div class="infor-3">
                <div class="seller-pop">
                    <div class="seller-logo">
                                        <a href="brand.php?id=5268&amp;mbid=1047" target="_blank">健康美食</a>
                                    </div>
                    <div class="seller-infor" style="display:none;">
                        <a href="brand.php?id=5268&amp;mbid=1047" title="新郑健康好枣" target="_blank" class="name">新郑健康好枣</a>
                        <i class="icon arrow-show-more"></i>
                    </div>
                    <div class="seller-kefu">
                        <a id="ykf" onclick="qimoChatClick()" href="javascript:;" goods_id="34683" class="seller-btn" ><i class="icon"></i><span style="margin-left: -15px;">在线客服</span></a>
                    </div>
                </div>
            </div>

           


            <div>
             ${res.details}
             
            </div>
            `;

            // 渲染页面---发现元素点击时将id值存进cookie里面

            $('.product-info').append(template).find('.btn-append').on('click', function() {
                addItem(res.id, $('#quantity').val());
            });;

            // 放大镜
            $(function() {
                let movebox = $('.movebox'),
                    bigpic = $('.bigpic'),
                    small = $('.small'),
                    big = $('.big');

                // 1. 鼠标悬浮到small上 
                small.on('mouseover', function() {
                    // 显示元素
                    console.log(999);
                    movebox.addClass('show');
                    big.addClass('show');

                    // 5. 给movebox计算大小
                    movebox.css({
                        width: (small.offset().width * big.offset().width / bigpic.offset().width) + 'px',
                        height: (small.offset().height * big.offset().height / bigpic.offset().height) + 'px'

                    });


                    // 3. 移动movebox
                    small.on('mousemove', function(ev) {

                        let top = ev.pageY - small.offset().top - movebox.offset().top / 2;
                        let left = ev.pageX - small.offset().left - movebox.offset().left / 2;
                        // console.log(ev.pageY - small.offset().top - movebox.offset().top);
                        // console.log(left);

                        // 4. 比例计算
                        let ratio = bigpic.offset().left / small.offset().left; // 比例需要大于1
                        // console.log(ratio);
                        // 管理边界
                        if (top <= 0) {
                            top = 0;
                        } else if (top >= small.offset().height - movebox.offset().height) {
                            top = small.offset().height - movebox.offset().height - 2;
                        }

                        if (left <= 0) {
                            left = 0;
                        } else if (left >= small.offset().width - movebox.offset().width) {
                            left = small.offset().width - movebox.offset().width - 2;
                        }

                        // 设置定位
                        movebox.css({
                            top: top + 'px',
                            left: left + 'px'
                        });

                        // 6.移动大图
                        bigpic.css({
                            top: ratio * -top + 'px',
                            left: ratio * -left + 'px'
                        });
                    });
                });


                // 2. 鼠标离开事件
                small.on('mouseout', function() {
                    movebox.removeClass('show');
                    big.removeClass('show');
                });
            });


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


})();