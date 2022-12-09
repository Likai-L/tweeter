/* eslint-disable no-undef */
$(document).ready(function() {
  $("#new-tweet-text").on("input", function() {
    const charsLeft = 140 - $(this).val().length;
    const counter = $(this).next().children(".counter");
    counter.text(charsLeft);
    if (charsLeft < 0) {
      counter.css({"color": "red"});
    } else {
      counter.css({"color": "inherit"});
    }
  });

  $(window).scroll(function() {
    let treshold = 300;
    if (window.matchMedia("(min-width: 1024px)")) {
      treshold = 100;
    }
    if ($(this).scrollTop() > treshold) {
      $("nav").fadeOut(200);
      return $("#back-to-top").show(300);
     
    }
    $("nav").fadeIn(200);
    return $("#back-to-top").hide(300);
  });

  $("#back-to-top").click(function() {
    $(window).scrollTop(0);
    $(".new-tweet").slideDown(300);
    $(".new-tweet").find("textarea").focus();
  });
});
