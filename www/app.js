$(document).ready(function() {
  var menu, menuToggle, signUp;
  menu = $("#navigation-menu");
  menuToggle = $("#js-mobile-menu");
  signUp = $(".sign-up");
  $(menuToggle).on("click", function(e) {
    e.preventDefault();
    menu.slideToggle(function() {
      if (menu.is(":hidden")) {
        menu.removeAttr("style");
      }
    });
  });
  $(".nav .nav-link").click(function() {
    $(".nav .nav-link").each(function() {
      $(this).removeClass("active-nav-item");
    });
    $(this).addClass("active-nav-item");
    $(".nav .more").removeClass("active-nav-item");
  });
});
