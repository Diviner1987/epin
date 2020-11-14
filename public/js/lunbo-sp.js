$(function() {
    // console.log(1);
    let index = 0
    let timer = null;
    $('.seckill-content').on('mouseover', function() {
        $('.bx-prev').css({
            'display': 'block'
        })
        $('.bx-next').css({
            'display': 'block'
        })
    })
    $('.seckill-content').on('mouseout', function() {
        $('.bx-prev').css({
            'display': 'none'
        })
        $('.bx-next').css({
            'display': 'none'
        })
    })
    $('.bx-prev').on('click', function() {
        index -= 1;
        if (index < 0) {
            index = $('.wrapp li').length - 1;
            $('.wrapp').css({
                'right': 0,
            })
        }
        $('.wrapp').stop(true).animate({
            'left': parseInt($('.wrapp>li').css('width')) * -index
        }, 300)
        console.log(index);
    })
    $('.bx-next').on('click', function() {
        index += 1;
        console.log($('.wrapp li').length);
        if ($('.wrapp li').length == index) {
            $('.wrapp').css({
                'left': 0,
            })
            index = 0;
        } else {

            $('.wrapp').stop(true).animate({
                'left': parseInt($('.wrapp>li').css('width')) * -index
            }, 300)
        }
        console.log(index);
    })
});