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
});