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
      left: "8px"
    }, 200);
  }, function () {
    $(this).stop().animate({
      left: "0px"
    }, 200);
  });
  // 右边导航栏弹出框向右滑动效果
  function dh_right(fu, zi) {
    $(fu).hover(function () {
      $(zi).css({
        display: "block"
      }).stop().animate({
        left: "-92px",
        opacity: "1"
      }, 300);
    }, function () {
      $(zi).css({
        display: "none"
      }).stop().animate({
        left: "-132px",
        opacity: "0.2"
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

  //拿到商品
  if (localStorage.getItem("u-id")) {
    $.ajax({
      type: "Get",
      url: "http://jx.xuzhixiang.top/ap/api/productlist.php?",
      data: {
        uid: 45116
      },
      success: function (res) {
        console.log(res.data);
        let html = "";
        res.data.forEach(v => {
          html += `<a href="xiangqing.html?product_id=${v.pid}"><figure>
                      <figcaption><img src="${v.pimg}" alt="" /></figcaption>
                        <div class="lb_miaoshu">
                          <div class="ms_top">
                            <h3><img src="../images/019_flag.jpg" alt=""><p>United&nbsp;States <br>美国品牌</p></h3>
                            <ul class="daojishi">
                              <li>距结束还剩</li> 
                              <li>00</li>
                              <li>天</li>
                              <li></li>
                              <li>时</li>
                              <li></li>
                              <li>分</li>
                              <li></li>
                              <li>秒</li>
                            </ul>
                          </div>
                          <!-- 描述 -->
                          <div class="ms_bottom">
                            <b>${v.pname}</b>
                            <p>${v.pdesc}</p>
                            <h5><span>￥</span>${v.pprice}<span>包邮</span></h5>
                            <div class="ca_xq"></div>
                          </div>
                        </div>
                      </figcaption>
                    </figure></a>`;
        });
        $(".sp_lb").html(html);
        var shidian = new Date(new Date(new Date().toLocaleDateString()).getTime() + 22 * 60 * 60 * 1000);
        console.log(shidian);
        var Oul = document.querySelectorAll(".daojishi");
        var Oli = document.querySelectorAll(".daojishi li");
        for (let i = 0; i < Oul.length; i++) {
          time(shidian, Oli[(i + 1) * 9 - 6], Oli[(i + 1) * 9 - 4], Oli[(i + 1) * 9 - 2], Oul[i]);
        }
      }
    });
  } else {
    $.ajax({
      type: "Get",
      url: "http://jx.xuzhixiang.top/ap/api/productlist.php?",
      data: {
        uid: 44913
      },
      success: function (res) {
        console.log(res.data);
        let html = "";
        res.data.forEach(v => {
          html += `<a href="xiangqing.html?product_id=${v.pid}"><figure>
                <figcaption><img src="${v.pimg}" alt="" /></figcaption>
                  <div class="lb_miaoshu">
                    <div class="ms_top">
                      <h3><img src="../images/019_flag.jpg" alt=""><p>United&nbsp;States <br>美国品牌</p></h3>
                      <ul class="daojishi">
                        <li>距结束还剩</li> 
                        <li>00</li>
                        <li>天</li>
                        <li></li>
                        <li>时</li>
                        <li></li>
                        <li>分</li>
                        <li></li>
                        <li>秒</li>
                      </ul>
                    </div>
                    <!-- 描述 -->
                    <div class="ms_bottom">
                      <b>${v.pname}</b>
                      <p>${v.pdesc}</p>
                      <h5><span>￥</span>${v.pprice}<span>包邮</span></h5>
                      <div class="ca_xq"></div>
                    </div>
                  </div>
                </figcaption>
              </figure></a>`;
        });
        $(".sp_lb").html(html);
        var shidian = new Date(new Date(new Date().toLocaleDateString()).getTime() + 22 * 60 * 60 * 1000);
        console.log(shidian);
        var Oul = document.querySelectorAll(".daojishi");
        var Oli = document.querySelectorAll(".daojishi li");
        console.log(Oul.length);
        for (let i = 0; i < Oul.length; i++) {
          time(shidian, Oli[(i + 1) * 9 - 6], Oli[(i + 1) * 9 - 4], Oli[(i + 1) * 9 - 2], Oul[i]);
        }
      }
    });
  }
  console.log(localStorage.getItem("u-id"));
});

//   倒计时
function time(date, shi, fen, miao, box) {
  let oDate = new Date(date);
  var nowDate = new Date();
  var ss = Math.floor((oDate - nowDate) / 1000);
  var h = Math.floor(ss / 3600);
  var m = Math.floor(ss / 60 % 60);
  var s = Math.floor(ss % 60);
  function format(num) {
    return num < 10 ? "0" + num : num;
  }
  h = format(h);
  m = format(m);
  s = format(s);
  shi.innerText = h;
  fen.innerText = m;
  miao.innerText = s;
  if (ss <= 0) {
    clearInterval(timer);
    $(box).html("<li>已结束</li>");
  }
  var timer = setInterval(function () {
    time(date, shi, fen, miao);
  }, 1000);
}

//   判断是否登录
if (localStorage.getItem("yonghu")) {
  //   导航状态
  $("#qdenglu").html("已登录").css({
    color: " #e31256"
  });
  $("#zhuxiao").css({
    display: "inline-block"
  }).click(function () {
    localStorage.removeItem("u-id");
    localStorage.removeItem("u-token");
    localStorage.removeItem("yonghu");
  });
  //   右边栏状态
  $("#yonghum").html("你好！" + localStorage.getItem("yonghu")).css({
    color: " #e31256"
  });

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
        $("#gouwucheshu").text(res.data.length);
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

  let woid = localStorage.getItem("u-id");
  let wodeqian = localStorage.getItem(`${woid}`);
  console.log(wodeqian);
  $(".caichan span").html("余额&nbsp;" + wodeqian + "元").css({});
}