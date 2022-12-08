/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

// escape function for safely inserting user text into HTML elements
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweetObj) {
  const $tweet = $(`<article class="tweet">
  <header>
    <div class="tweet-author" >
      <img src=${tweetObj.user.avatars} alt="lana">
      <p>${tweetObj.user.name}</p>
    </div>
    <p>${tweetObj.user.handle}</p>
  </header>
  <div class="tweet-text">
  <p>${escape(tweetObj.content.text)}</p>
  </div>
  <footer>
    <p>${timeago.format(tweetObj["created_at"])}</p>
    <div class="interactions">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  </footer>
</article>`);
  return $tweet;
};

const renderTweets = function(tweetsArr) {
  for (let tweetObj of tweetsArr) {
    const $tweet = createTweetElement(tweetObj);
    $('#tweets-container').prepend($tweet);
  }
};

const loadTweets = function() {
  $.ajax({
    url: "/tweets/",
    method: "GET"
  })
    .then((tweets) => {
      renderTweets(tweets);
    })
    .catch((error) => {
      console.log(error);
    });
};

$(document).ready(function() {
  loadTweets();
  $("#new-tweet-form").submit(function(event) {
    event.preventDefault();
    const textBox = $(this).find("textarea");

    if (textBox.val().length === 0) {
      return alert("Your tweet cannot be empty.");
    }
    if (textBox.val().length > 140) {
      return alert("Your tweet exceeds the character limit of 140.");
    }

    $.ajax({
      url: "/tweets/",
      method: "POST",
      data: textBox.serialize()
    })
      .then(() => {
        console.log("Tweet sent!");
        textBox.val("");
        $(".counter").val(140);
        loadTweets();
      })
      .catch((error) => {
        console.log(error);
      });
  });
});