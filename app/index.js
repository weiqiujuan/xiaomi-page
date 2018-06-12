require('../style/style.css');

//购物车
let cart = document.getElementById('cart');
let cartMenu = document.getElementById('cartMenu');

cart.onmouseover = function () {
    cart.style.background = 'fff';
    cart.style.color = '#ff6700';
    cartMenu.style.height = 100 + 'px'
};

cart.onmouseleave = function () {
    cart.style.background = '424242';
    cart.style.color = '#b0b0b0';
    cartMenu.style.height = 0 + 'px';
};

//搜索框
let searchText = document.getElementById('search-text');
let searchotwords = document.getElementById('search-hot-words');

searchText.onfocus = function () {
    searchotwords.style.display = 'none';
};

searchText.onblur = function () {
    searchotwords.style.display = 'block';
};

//轮播

let oDiv = document.getElementById('lunbo');
let next = document.getElementById('next');
let pre = document.getElementById('pre');
let ul = oDiv.getElementsByTagName('ul')[0];
let uLi = ul.getElementsByTagName('li');
let ol = oDiv.getElementsByTagName('ol')[0];
let oLi = ol.getElementsByTagName('li');

let now = 0;

for (let i = 0; i < oLi.length; i++) {
    oLi[i].index = i;
    oLi[i].onclick = function () {
        now = this.index;
        tab();
    }
}

function tab() {
    for (let j = 0; j < oLi.length; j++) {
        oLi[j].className = '';
        move(uLi[j], {opacity: 0})
    }
    oLi.className = 'click';
    move(uLi[now], {opacity: 100});
}

pre.onclick = function () {
    now--;
    if (now === -1) {
        now = oLi.length - 1;
    }
    tab();
};

next.onclick = function () {
    now++;
    if (now === oLi.length) {
        now = 0;
    }
    tab();
};

let timer0 = setInterval(next.onclick, 3000);
oDiv.onmouseover = function () {
    clearInterval(timer0);
    move(next, {opacity: 100});
    move(pre, {opacity: 100});
};

oDiv.onmouseleave=function () {
    timer0=setInterval(next.onclick,3000);
    move(next,{opacity:0});
    move(pre,{opacity:0});
};
//没写完

function move(obj,jason,fn) {
    clearInterval(obj.timer);

}

