$(function () {
    // 用户名正则判断
    $(".yonghu").focus(function () {
        $(".yonghus").html("4-16个字符，只支持数字字母下划线").css({
            "display": "block",
            "color": "#999"
        });
    }).blur(function () {
        var yonghuming = /^[a-zA-Z0-9_]{4,16}$/;
        if ($(".yonghu").val() == "") {
            $(".yonghus").html("用户名不能为空").css({
                "color": "red"
            });
        } else if (yonghuming.test($(".yonghu").val())) {
            $(".yonghus").html("格式正确").css({
                "color": "green"
            });
        } else {
            $(".yonghus").html("用户名格式错误，请重新输入").css({
                "color": "red"
            });
        }
    });
    // 密码正则判断
    $(".mima").focus(function () {
        $(".mimas").html("6-16个字符，建议使用数字与字母组合").css({
            "display": "block",
            "color": "#999"
        });
    }).blur(function () {
        var mm = /^[a-zA-Z0-9]{6,16}$/;
        if ($(".mima").val() == "") {
            $(".mimas").html("密码不能为空").css({
                "color": "red"
            });
        } else if (mm.test($(".mima").val())) {
            $(".mimas").html("格式正确").css({
                "color": "green"
            });
        } else {
            $(".mimas").html("密码格式错误，请重新输入").css({
                "color": "red"
            });
        }
    });
    // 使用注册接口
    $(".btn").click(function () {
        // 判断是否为空
        if ($(".yonghu").val() == "" || $(".mima").val() == "") {
            alert("用户名或者密码不能为空");
            console.log("1");
        } else {

            var yonghuming = /^[a-zA-Z0-9_]{4,16}$/;
            var mm = /^[a-zA-Z0-9]{6,16}$/;
            if (yonghuming.test($(".yonghu").val()) && mm.test($(".mima").val())) {
                $.ajax({
                    url: "http://jx.xuzhixiang.top/ap/api/reg.php",
                    type: "GET",
                    data: {
                        username: $('.yonghu').val(),
                        password: $('.mima').val()

                    },
                    success: function (res) {
                        console.log(res);

                        if (res.code == 1) {
                            if (getCookie("yonghu")) {} else {
                                setCookie("yy", $(".yonghu").val());
                                setCookie("mm", $(".mima").val());
                                setCookie("anhao", 1);
                            }
                            alert(res.msg);
                            location.href = "denglu.html";
                        } else {
                            alert(res.msg);
                        }
                    }
                });
            } else {
                alert("您输入的用户名或密码格式错误，请重新输入");
            }
        }
    });
    // 判断是否七天免登陆，没有的话，把用户名密码直接赋值到登录页
    // 封装cookie
    function setCookie(k, v, t) {
        var oDate = new Date();
        oDate.setDate(oDate.getDate() + t);
        document.cookie = `${k}=${v};expires=` + oDate;
    }
    function getCookie(k) {
        var arr = document.cookie.split("; ");
        for (var i = 0; i < arr.length; i++) {
            var arr1 = arr[i].split("=");
            if (arr1[0] === k) {
                return arr1[1];
            }
        }
    }
    function removeCookie(k) {
        setCookie(k, 1, -1);
    }
});