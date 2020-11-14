import './library/jquery.js';
import cookie from './library/cookie.js';
import { baseUrl } from './library/config.js';

//购物车数据渲染
(function() {
    let shop = cookie.get('shop');

    if (shop) { // 有cookie数据才发请求
        shop = JSON.parse(shop);

        let idList = shop.map(elm => elm.id).join();

        $.ajax({
            type: "get",
            url: `${baseUrl}/product/getItems`,
            data: {
                idList: idList
            },
            dataType: "json",
            success: function(res) {
                let template = '';
                // console.log(res);



                res.forEach((elm, i) => {
                    // 现在遍历数据时是按照数据库查询得到的结果遍历
                    // cookie中存放的数据 的顺序  和 查询结果的顺序不同
                    // 需要让cookie中的id和查询结果的id 一一对应
                    // 索引不同
                    let arr = shop.filter(val => val.id === elm.id);
                    // console.log(arr);

                    let picture = JSON.parse(elm.picture);

                    template += `
                                        <div class="cell p-goods">
                                                <div class="goods-item">
                                                    <div class="p-img">
                                                        <a href="javascript:;"><img src="../${picture[0].src}" width="80" height="80"></a>
                                                    </div>
                                                    <div class="item-msg">
                                                        <div class="p-name">
                                                            <a href="goods.php?id=34683" target="_blank">${elm.title}</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="cell p-price">
                                                <strong id="goods_price_642989">¥${(elm.price).toFixed(2)}</strong>
                                            </div>

                                            <!-- 总价 -->
                                            <div class="cell p-sum">
                                                <strong id="goods_subtotal_642989">
                                                        <div
                                                        id="_642989_subtotal">¥${(elm.price*arr[0].num).toFixed(2)}</div>
                                                </strong>
                                            </div>
                                            <div class="cell p-ops">
                                                <a id="remove_642989" class="cart-remove" href="javascript:void(0);" data-dialog="dialog" data-divid="cart_remove" data-removeurl="flow.php?step=drop_goods&amp;id=642989" data-collecturl="flow.php?step=drop_to_collect&amp;id=642989" data-recid="642989"
                                                data-title="删除">删除</a>
                                        </div>`;
                });


                $('.item-form').append(template);

            }
        });
    }

})();