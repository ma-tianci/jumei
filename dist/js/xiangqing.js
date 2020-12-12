// 最顶部导航下拉菜单
// 下拉菜单一
$("#header_xia1").hover(function () {
    $(".xiala1").stop().slideDown(200);
}, function () {
    $(".xiala1").stop().slideUp(200);
});
// 下拉菜单二
$("#header_xia2").hover(function () {
    $(".xiala2").stop().slideDown(200);
}, function () {
    $(".xiala2").stop().slideUp(200);
});
//拿到商品
$.ajax({
    url: 'http://jx.xuzhixiang.top/ap/api/detail.php',
    data: {
        id: location.search.split('=')[1]
    },
    success: function (res) {
        $('.xq_tu img').attr('src', `../${res.data.pimg}`);
        $('.xq_tu1 img').attr('src', `../${res.data.pimg}`);
        $('#mingcheng').html(`${res.data.pname}`);
        $('#miaoshu').html(`${res.data.pdesc}`);
        $('#jiage span').html(`${res.data.pprice}`);
        shuzhi();
    }
});
//  加入购物车
var jian = document.getElementById("jian");
var zhi = document.getElementById("zhi");
var jia = document.getElementById("jia");
var btn = document.getElementById("btn");
let paid = location.search.split('=')[1];
console.log(btn);
jian.onclick = function () {
    zhi.value--;
    if (zhi.value <= 1) {
        zhi.value = 1;
    }
};
jia.onclick = function () {
    zhi.value++;
};
btn.onclick = function () {
    if (localStorage.getItem("u-id")) {
        $.ajax({
            type: "Get",
            url: "http://jx.xuzhixiang.top/ap/api/add-product.php",
            data: {
                uid: localStorage.getItem("u-id"),
                pid: paid,
                pnum: $("#zhi").val()
            },
            success: function (res) {
                alert("加入购物车成功");
                console.log(res);
                location.href = "gouwuche.html";
            },
            error: function () {
                alert("不好意思，您的商品坐着火箭飞走了，程序员小哥哥正在马不停蹄的追赶中");
            }
        });
    } else {
        location.href = "denglu.html";
        alert("您还未登录，请先登录再加入购物车");
    }
};
var box1 = document.querySelector(`.xq_tu`);
var lens = document.querySelector(`.lens`);
var pic = document.querySelector(`.xq_tu1 img`);
window_drage(lens, box1, pic, 2);

// 放大镜效果,box(模拟透镜),box1(存放需要放大的图片的盒子),pic(放大区域的图片),mul(放大倍数)
// 要给模拟透镜,放大区域的图片添加绝对定位
function window_drage(box, box1, pic, mul) {
    box1.onmouseenter = function (e0) {
        let evt0 = e0 || window.e0;
        // 在可视区域点击时，模拟透镜中心位置出现在鼠标点击处
        pic.style.opacity = 1;
        $(".xq_tu1").css({
            "display": "block"
        });
        // box.style.left = evt0.clientX - box.offsetWidth / 2-box1.offsetLeft + `px`;
        // box.style.top = evt0.clientY - box.offsetHeight / 2 -box1.offsetTop+ `px`;
        // 放大区域图片可见，并显示放大位置
        box.style.backgroundColor = `rgba(167, 188, 194,0.8)`;
        // 移动模拟透镜，放大区域图片按比例进行位移,并且将模拟透镜的唯一区域固定在box1中
        box1.onmousemove = function (e2) {
            let evt2 = e2 || window.e2;
            let l = evt2.clientX - box.offsetWidth / 2 - box1.offsetLeft;
            let t = evt2.clientY - box.offsetHeight / 2 - box1.offsetTop;
            if (l >= box1.offsetWidth - box.offsetWidth) {
                l = box1.offsetWidth - box.offsetWidth;
            }
            if (l <= 0) {
                l = 0;
            }
            if (t >= box1.offsetHeight - box.offsetHeight) {
                t = box1.offsetHeight - box.offsetHeight;
            }
            if (t <= 0) {
                t = 0;
            }
            box.style.left = l + "px";
            box.style.top = t + "px";
            pic.style.left = -l * mul + "px";
            pic.style.top = -t * mul + "px";
        };
        // 鼠标松开模拟透镜消失，放大区域消失
        box1.onmouseleave = function () {
            window.onmousemove = null;
            box.style.backgroundColor = `rgba(167, 188, 194,0)`;
            pic.style.opacity = 0;
            pic.style.opacity = 1;
            $(".xq_tu1").css({
                "display": "none"
            });
        };
    };
}

//   判断是否登录
if (localStorage.getItem("yonghu")) {
    //   导航状态
    $("#yidenglu").html("已登录").css({
        "color": " #e31256"
    });
    $("#zhuxiao").css({
        "display": "inline-block"
    }).click(function () {
        localStorage.removeItem("u-id");
        localStorage.removeItem("u-token");
        localStorage.removeItem("yonghu");
    });
}

// 判断购物车里是否有商品，然后改变状态
$.ajax({
    type: "Get",
    url: "http://jx.xuzhixiang.top/ap/api/cart-list.php",
    data: {
        id: localStorage.getItem("u-id")
    },
    success: function (res) {
        console.log(res);
        console.log(res.data.length);

        console.log(res.data.length == 0);
        if (res.data.length == 0) {
            wu();
        } else {
            youwu();
        }
    }
});

function youwu() {
    $(".mai_xiala p").text("你的商品宝宝等你很久了，快去清空吧");
}
function wu() {
    $(".mai_xiala p").text("购物车中还没有商品，赶快去挑选心爱的商品吧！");
}

// input框
function shuzhi() {
    $("#zhi").focus(function () {
        let shu = $(this).val();
        console.log(shu);
        localStorage.setItem("shu", JSON.stringify(shu));
    }).blur(function () {
        let shu1 = JSON.parse(localStorage.getItem("shu"));
        console.log(shu1);
        $(this).val(shu1);
    });
}