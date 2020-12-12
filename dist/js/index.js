$(function () {
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
    // 底部li滑动效果
    $(".bottom_hua li").hover(function () {
        $(this).stop().animate({
            "left": "8px"
        }, 200);
    }, function () {
        $(this).stop().animate({
            "left": "0px"
        }, 200);
    });
    // 右边导航栏弹出框向右滑动效果
    function dh_right(fu, zi) {
        $(fu).hover(function () {
            $(zi).css({
                "display": "block"
            }).stop().animate({
                "left": "-92px",
                "opacity": "1"
            }, 300);
        }, function () {
            $(zi).css({
                "display": "none"
            }).stop().animate({
                "left": "-132px",
                "opacity": "0.2"
            }, 300);
        });
    }
    dh_right(".caichan", ".caichan h3");
    dh_right(".xinyuan", ".xinyuan h3");
    dh_right(".kanguo", ".kanguo h3");
    dh_right(".kefu", ".kefu h3");
    // 轮播图
    var swiper3 = new Swiper(".lunbo", {
        effect: "fade", //切换方式为渐变
        slidesPerView: 1,
        loop: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 2000, //自动轮播速度单位毫秒
            disableOnInteraction: false
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        }
    });
    //   判断是否登录
    if (localStorage.getItem("yonghu")) {

        function qian() {
            if (localStorage.getItem("u-id")) {
                let uu = localStorage.getItem("u-id");
                console.log(uu);
                if (localStorage.getItem(`${uu}`)) {
                    let qian = localStorage.getItem(`${uu}`);
                    $("#yu").text(qian);
                } else {
                    localStorage.setItem(`${uu}`, 0);
                }
            }
        }
        qian(); //调用
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
        //   右边栏状态
        $("#youbianming").html("你好！" + localStorage.getItem("yonghu")).css({
            "color": " #e31256"
        });
        let woid = localStorage.getItem("u-id");
        let wodeqian = localStorage.getItem(`${woid}`);
        console.log(wodeqian);
        $(".caichan span").html("余额&nbsp;" + wodeqian + "元").css({});
    }
    //   楼梯效果
    let flag = true;
    $(window).scroll(function () {
        if (flag) {
            let st = $(this).scrollTop();
            if (st > 526) {
                $("#floorNav").fadeIn();
                $("#floorNav li").eq(1).addClass("hover").siblings().removeClass("hover");
                if (st > $(".daiyan_wrap").offset().top) {
                    $("#floorNav li").eq(2).addClass("hover").siblings().removeClass("hover");
                }
            } else {
                $("#floorNav").fadeOut();
            }
        }
    });

    $("#floorNav li").eq(1).click(function () {
        flag = false;
        $("body,html").stop().animate({
            "scrollTop": 526
        }, 800, function () {
            flag = true;
        });
        $(this).addClass("hover").siblings().removeClass("hover");
    });

    $("#floorNav li").eq(2).click(function () {
        flag = false;

        $("body,html").stop().animate({
            "scrollTop": $(".daiyan_wrap").offset().top
        }, 800, function () {
            flag = true;
        });
        $(this).addClass("hover").siblings().removeClass("hover");
    });

    $("#floorNav li:last").click(function () {
        flag = false;
        $("body,html").stop().animate({
            "scrollTop": 0
        }, 800, function () {
            flag = true;
        });

        $("#floorNav").fadeOut();
    });

    // 判断购物车里是否有商品，然后改变状态
    if (localStorage.getItem("yonghu")) {
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
                    $("#gouwucheshu").text(res.data.length);
                    youwu();
                }
            }
        });

        function youwu() {
            $(".car_xiala p").text("亲爱的，购物车里的小宝贝迫不及待要跟你回家了");
        }
        function wu() {
            $(".car_xiala p").text("购物车中还没有商品，赶快去挑选心爱的商品吧！");
        }
    }
});