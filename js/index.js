//首页轮播
function carousel() {
    //1.鼠标放上停止自动轮播，根据鼠标移动轮播
    var span = document.getElementsByClassName("imgSpan")
    var img = document.getElementsByClassName("img")
    for (let i = 0; i < span.length; i++) {
        span[i].onmouseover = function () {
            clearInterval(id)
            for (let j = 0; j < span.length; j++) {
                span[j].style.backgroundColor = "blue";
                img[j].style.display = "none"
            }
            this.style.backgroundColor = "red";
            img[i].style.display = "block"
        }
    }
    //继续执行
    for (let i = 0; i < span.length; i++) {
        span[i].onmouseout = function () {
            id = setInterval('init()', 1000)
        }
    }
    //加载时自动轮播
    var id = setInterval('init()', 1000)
}
var i = 0;

function init() {
    var span = document.getElementsByClassName("imgSpan")
    var img = document.getElementsByTagName("img");
    for (let i = 0; i < 5; i++) {
        span[i].style.backgroundColor = "blue";
        img[i].style.display = "none"
    }
    img[i].style.display = "block"
    span[i].style.backgroundColor = "red";
    i++;
    if (i > 4) {
        i = 0;
    }
}
carousel();
//左边菜单栏缩放
var section1Li1P = document.getElementsByClassName("section1-li1-p")
for (let i = 0; i < section1Li1P.length; i++) {
    section1Li1P[i].onmouseover = function () {
        section1Li1P[i].nextElementSibling.style.display = "block"
    }
    section1Li1P[i].onmouseout = function () {
        section1Li1P[i].nextElementSibling.style.display = "none"
    }
    section1Li1P[i].nextElementSibling.onmouseover = function () {
        section1Li1P[i].nextElementSibling.style.display = "block"
    }
    section1Li1P[i].nextElementSibling.onmouseout = function () {
        section1Li1P[i].nextElementSibling.style.display = "none"
    }
}
//倒计时
function countDown() {
    //倒计时分秒
    function countDownSta() {
        var endTime = new Date(2019, 10, 18);
        var currentTime = new Date();
        var countDownTime = Math.floor((endTime - currentTime) / 1000); //倒计总秒数
        // countDownTime--;
        var countDownSeconds = countDownTime % 3600 % 60;
        var countDownMinutes = Math.floor(countDownTime % 3600 / 60);
        var countDownHours = Math.floor(countDownTime / 3600);
        //小于10时加0赋值，否则直接赋值
        function zero(id, time1) {
            if (time1 < 10) {
                document.getElementById(id).innerHTML = '0' + time1;
            } else {
                document.getElementById(id).innerHTML = time1;
            }
        }
        zero("hour", countDownHours)
        zero("minute", countDownMinutes)
        zero("second", countDownSeconds)
        //如果倒计时的总秒数小于0，那么清除倒计时
        if (countDownTime < 0) {
            clearCount()
            document.getElementById('hour').innerHTML = "00"
            document.getElementById('minute').innerHTML = "00"
            document.getElementById('second').innerHTML = "00"
        }
    }
    var id = setInterval(countDownSta, 1000)

    //清除倒计时
    function clearCount() {
        clearInterval(id);
    }

}

countDown();
//存一个空数组，方便点击购物车时产品的存储
// var productArr=[]
localStorage.setItem('shoppingList',JSON.stringify(productArr))