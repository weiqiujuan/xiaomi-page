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

oDiv.onmouseout = function () {
    timer0 = setInterval(next.onclick, 3000);
    move(next, {opacity: 0});
    move(pre, {opacity: 0});
};

function move(obj, jason, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        let mstop = true;

        for (let attr in jason) {
            let cur = 0;
            if (attr === 'opacity') {
                cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
            } else {
                cur = parseInt(getStyle(obj, attr));
            }

            let speed = (jason[attr] - cur) / 6;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (attr === 'opacity') {
                obj.style.opacity = (cur + speed) / 100;
                obj.style.filter = 'alpha(opacity:\' + cur + speed + \')'
            } else {
                obj.style[attr] = cur + speed + 'px';
            }

            if (cur !== jason[attr]) {
                mstop = false;
            }
        }

        if (mstop === true) {
            clearInterval(obj.timer);
            if (fn)
                fn();
        }
    }, 30);
}

function getStyle(obj, name) {
    if (obj.currentStyle) {
        return obj.currentStyle[name];
    } else {
        return getComputedStyle(obj, null)[name];
    }
}

/*上方导航栏*/
/*let headernav = document.getElementById('header-nav');
let siteheader = document.getElementById('site-header')
let navitem = getByClass(headernav, 'nav-item');
let navmenu = getByClass(siteheader, 'navmenu');

function getByClass(oParent, sClass) {
    let ele = oParent.getElementsByTagName('*');
    let eResult = [];

    for (let i = 0; i < ele.length; i++) {
        if (ele[i].className === sClass) {
            eResult.push(ele[i]);
        }
    }
    return eResult;
}

for (let i = 0; i < 7; i++) {
    navitem[i].index = i;
    navmenu[i].index = i;

    navitem[i].onmouseover = navmenu[i].onmouseover = function () {
        for (let i = 0; i < navmenu.length; i++) {
            navmenu[i].style.display = 'none';
        }
        navmenu[this.index].style.display = 'block';
    };

    navitem[i].onmouseout = navmenu[i].onmouseout = function () {
        for (let i = 0; i < 7; i++) {
            navmenu[i].style.display = 'none';
        }
    }
}*/


/*明星单品滑动图*/
let boxhd = document.getElementById('boxhd');
let boxbd = document.getElementById('boxbd');
let boxhda = boxhd.getElementsByTagName('a');
let boxhdul = boxbd.getElementsByTagName('ul')[0];

function startab(a, ul) {
    a[0].onclick = function () {
        ul.style.marginLeft = 0;
        a[1].style.color = '#b0b0b0';
        a[0].style.color = '#e0e0e0'
    };
    a[1].onclick = function () {
        ul.style.marginLeft = -1240 + 'px'
        a[0].style.color = "#b0b0b0";
        a[1].style.color = "#e0e0e0";
    };

    function autoStar() {
        if (ul.style.marginLeft === 0 + 'px') {
            ul.style.marginLeft = -1240 + 'px';
            a[0].style.color = "#b0b0b0";
            a[1].style.color = "#e0e0e0";
        } else {
            ul.style.marginLeft = 0;
            a[1].style.color = "#b0b0b0";
            a[1].style.color = "#e0e0e0";
        }
    }

    let timer = null;
    timer = setInterval(autoStar, 3000);

    for (let k = 0; k < 2; k++) {
        a[k].onmouseover = function () {
            clearInterval(timer);
        };
        a[k].onmouseout = function () {
            timer = setInterval(autoStar, 3000);
        }
    }
}

startab(boxhda, boxhdul);

/*商品评价*/
let switchitem = document.getElementsByClassName('switchitem');
let reviewwrapper = document.getElementsByClassName('reviewwrapper')

for (let i = 0; i < switchitem.length; i++) {
    switchitem[i].index = i;
    switchitem[i].onmouseover = function () {
        reviewwrapper[this.index].style.height = 75 + 'px';
    };
    switchitem[i].onmouseout = function () {
        reviewwrapper[this.index].style.height = 0;
    }
}