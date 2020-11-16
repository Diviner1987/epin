import './library/jquery.js';
import './library/jquery.lazyload.js';
import { baseUrl } from './library/config.js';
import './library/idangerous.swiper.min.js';
import './lunbo-sp.js'; //轮播JS
// import './dataopc.js'; //透明度改变js
// import { lunbotz } from './lunbo-tz.js';
import './left-nav.js';


//首页有关数据的渲染-----其他模块写的功能也就是单个的js 写完

$.ajax({
    type: "get",
    url: `${baseUrl}/product/getProducts`,
    dataType: "json",
    success: function(res) {
        // console.log(res);
        // 获得数据后进行字符串拼接
        let tempLi = '';
        res.forEach((elm, i) => {

            let picture = JSON.parse(elm.picture); //收到数据转换成JSON对象
            // console.log(picture);
            // console.log(picture[0].src);
            tempLi += `
                <li style="display:flex; flex-direction: column;
                justify-content: space-around;
                align-items: center;">  
                    <img src="../img/${picture[0].src}" style="width: 150px;
                    height: 150px;
                    margin-left: -5px;" >                      
                    <a href="../detail.html?id=${elm.id}">
                    <p style="text-align: center;">${elm.title}</p>
                    <p style="text-align: center;">¥${elm.price}</p>
                    </a>
                    
                </li>
                `;
        });
        $('.p-list').append(tempLi);


        //移入之后出现透明度的效果
        // console.log($('.new-left'));
        $('.new-left').on('mouseover', function() {
            $(this).addClass('hoveropc');
        })
        $('.new-left').on('mouseout', function() {
            $(this).removeClass('hoveropc');
        })


        //右边的导航栏二维码图片
        $('.quick_toggle').on('mouseover', (function() {
            console.log(333333); //事件触发了，但是为什么不在执行效果
            $('mp_qrcode').addClass('show-erwei')

        }));
        $('.quick_toggle').on('mouseout', (function() {
            console.log(777777);
            $('mp_qrcode').removeClass('.show-erwei')

        }));


        //楼层效果
        $(function() {
            //点击左边楼层的li跳转楼层
            $('#list>li>i').on('click', function() {
                // console.log(1);
                // 获得 被点击的a元素对应的div元素距离页面顶部的高度
                let top = $(`#${$(this).attr('title')}`).offset().top;
                $('html').animate({
                    scrollTop: top
                }, 600);
            });
            //滚动右边的滚轴对应的左边的li
            $(window).on('scroll', function() {
                // console.log(1);
                // 当前文档距离顶部的高度
                let top = $(document).scrollTop();
                // console.log(top);

                let index = Math.round(top / 600);
                $('#list>li>i').removeClass('active').eq(index).addClass('active');
            });
        });



    }
});




//
$(".lazy").lazyload({ effect: "fadeIn" });