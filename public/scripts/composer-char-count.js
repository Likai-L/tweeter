/* eslint-disable no-undef */
const reloadNav = function() {
  let treshold = 300;
  let element = $("nav");
  if (window.matchMedia("(min-width: 1024px)").matches) {
    treshold = 100;
    element = $(".nav-left");
  }
  if ($(this).scrollTop() > treshold) {
    element.fadeOut(200);
    $("#back-to-top").show(300);
  } else {
    // have to fade in both because both because after fading out
    // displat is set to none and to show .nav-left
    // neither itself nor its parent nav can have a display: none
    $("nav, .nav-left").fadeIn(200);
    $("#back-to-top").hide(300);
  }
};

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

  $(window).scroll(reloadNav);

  $(window).resize(reloadNav);

  $("#back-to-top").click(function() {
    $(window).scrollTop(0);
    $(".new-tweet").slideDown(300);
    $(".new-tweet").find("textarea").focus();
  });
});
