$(function() {
    //左边的导航栏根据滚轴的滚动来触发事件
    $(window).on('scroll', (function() {
        let scrollTop = $(document).scrollTop();
        let top = $(".elevator").offset().top;
        if (scrollTop > top) {
            $(".elevator").css({
                'top': '0'
            })
        } else {
            $("#elevator").css({
                'top': '-100'
            })
        }
    }));
});