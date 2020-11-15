    //左边的导航栏
    $(function() {
        //左边的导航栏根据滚轴的滚动来触发事件
        $(window).on('scroll', (function() {
            let scrollTop = $(document).scrollTop();
            let top = 1400;
            // console.log(scrollTop);
            if (scrollTop > top) {
                $(".elevator").css({
                    opacity: '1'
                })
            } else {
                $("#elevator").css({
                    opacity: '0'
                })
            };
            if (scrollTop > 200) {
                $(".show").css({
                    top: '0'
                })
            } else if (scrollTop < 200) {
                $(".show").css({
                    top: -60
                })
            }
        }));
    });