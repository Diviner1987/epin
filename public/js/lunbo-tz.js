//轮播图
function getStyle(obj, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj)[attr];
    } else {
        return obj.currentStyle[attr]
    }
}

function bufferMove(obj, json, fn) {
    let speed = 0;
    clearInterval(obj.timer);
    obj.timer = setInterval(() => {
        let flag = true;
        for (let attr in json) {
            var currentValue = null;
            if (attr === 'opacity') {
                currentValue = Math.round(getStyle(obj, attr) * 100);
            } else {
                currentValue = parseInt(getStyle(obj, attr));
            }
            speed = (json[attr] - currentValue) / 10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (currentValue !== json[attr]) {
                if (attr === 'opacity') {
                    obj.style.opacity = (currentValue + speed) / 100;
                } else {
                    obj.style[attr] = currentValue + speed + 'px';
                }
                flag = false;
            }
        }
        if (flag) {
            clearInterval(obj.timer);
            fn && typeof fn === 'function' && fn();
        }
    }, 1000 / 60);
}

//封装函数实现快速获取元素。
function $(selector, bool) { //selector:选择器,bool:是否获取多个元素
    if (!bool) {
        return document.querySelector(selector);
    } else {
        return document.querySelectorAll(selector);
    }
}

const banner = $('.slider');
const picLi = $('.slider div a', true); //6张图片
const btnLi = $('.slider ol li', true); //6个小圆圈
let num = 0; //索引
let timer = null;

//1.6个小圆圈添加事件
for (let i = 0; i < btnLi.length; i++) {
    btnLi[i].onclick = function() {
        console.log(1111);
        num = i;
        tabswitch()
    };
}

function tabswitch() {
    //清空
    for (let j = 0; j < btnLi.length; j++) {
        btnLi[j].className = '';
        bufferMove(picLi[j], {
            opacity: 0
        });
    }
    //当前添加
    btnLi[num].className = 'active';
    bufferMove(picLi[num], {
        opacity: 100
    });
}
// export default { lunbotz };