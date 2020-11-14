// (function($) {
$.fn.extend({
        tabs: function(options) {
            let defaults = {
                ev: 'click',
                active: 'active',
                content: 'show'
            };

            $.extend(defaults, options); // 合并参数

            let btns = this.children('ul').children('li');
            let divs = this.children('div');

            btns.on(defaults.ev, function() {
                let i = btns.index(this); // 获得当前元素在集合中的索引
                $(this).addClass(defaults.active).siblings().removeClass(defaults.active);
                divs.eq(i).addClass(defaults.content).siblings().removeClass(defaults.content);
            });
        }
    })
    // })(jQuery);
    // export default { tabs };