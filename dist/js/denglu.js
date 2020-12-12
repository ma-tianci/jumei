$(function () {
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
  // 登录
  // 判断是否七天免登录
  if (getCookie("username")) {
    $(".yonghu").val(getCookie("username"));
    $(".mima").val(getCookie("password"));
    var qi = document.querySelector("#qi");
    console.log(qi);
    qi.checked = true;
  } else if (getCookie("anhao") == 1) {
    $(".yonghu").val(getCookie("yy"));
    $(".mima").val(getCookie("mm"));
    setCookie("anhao", 2);
  }

  //   登录
  $(".btn").click(function () {
    console.log($(".yonghu").val());
    if ($(".yonghu").val() == "" || $(".mima").val() == "") {
      alert("用户名或密码不能为空");
    } else {
      if ($("#qi").is(":checked") == true) {
        setCookie("username", $(".yonghu").val(), 7);
        setCookie("password", $(".mima").val(), 7);
      } else {
        removeCookie("username");
        removeCookie("password");
      }
      $.ajax({
        url: "http://jx.xuzhixiang.top/ap/api/login.php",
        type: "POST",
        data: {
          username: $(".yonghu").val(),
          password: $(".mima").val()
        },
        success: function (res) {
          console.log(res);
          console.log(res.data);

          if (res.code == 1) {
            localStorage.setItem("yonghu", $(".yonghu").val());
            localStorage.setItem("u-id", res.data.id);
            localStorage.setItem("u-token", res.data.token);

            alert("登录成功");
            location.href = "../index.html";
          } else {
            alert(res.msg);
          }
        }
      });
    }
  });
});