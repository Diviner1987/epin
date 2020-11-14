import './library/jquery.js';
import './library/jquery.lazyload.js';
import { baseUrl } from './library/config.js';
import './library/idangerous.swiper.min.js';
import './lunbo-sp.js'; //轮播JS
// import './dataopc.js'; //透明度改变js


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
            console.log(picture[0].src);
            tempLi += `
                <li>                            
                    <a href="../html/detail.html?id=${elm.id}">
                    <img data-original="../img/${elm.picture[0].src}" alt="${elm.picture[0].alt}" class="lazy">
                    <p>${elm.title}</p>
                    <span>¥${elm.price}</span>
                    </a>
                </li>
                `;


        });
        //移入之后出现透明度的效果
        $('.p-list').append(tempLi);
        console.log($('.new-left'));
        $('.new-left').on('mouseover', function() {
            $(this).addClass('hoveropc');
        })
        $('.new-left').on('mouseout', function() {
            $(this).removeClass('hoveropc');
        })



    }
});
//首页悬浮的导航栏
// $(window).on('scroll', (function() {
//     let scrollTop = $(document).scrollTop();
//     let top = $(".show").offset().top;
//     if (scrollTop > top) {
//         $(".show").css({
//             top: '0'
//         })
//     } else {
//         $(".show").css({
//             top: '-60'
//         })
//     }
// }));


//tab切换
// $('.tabs-div').tabs();
//左边的导航栏事件
// $('#elevator').on('')

//
$(".lazy").lazyload({ effect: "fadeIn" });


// $('.slider ol li', 'click')/