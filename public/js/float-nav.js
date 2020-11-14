 addEvent = function() {
     const $float_nav = $('selector');
     // const $float_mask = $('.mask');
     $(window).on('type', function() {
         //取到滚动条的top值
         let $top = $(window).scrollTop();
         //当top值大于移出去的高度的时候就将要运动的元素显示效果出来
         if ($top >= 800) {
             $float_nav.stop(true).animate({
                 top: 0
             });
         }
         //当小于的时候就将元素运动隐藏,值是不要加单位的
         else {
             $float_nav.stop(true).animate({
                 top: -60
             });
         }
     });
 }
 export default addEvent;

 //取到会发生事件的元素,对于发生这个事情是因为滚轴发生的触发来使元素发生运动,出现效果