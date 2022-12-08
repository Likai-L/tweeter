/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

// to be simplifed as the displayed time diff shouldn't be this detailed
const getTimeDiff = function(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  let timeDiff = (now.getTime() - date.getTime()) / 1000; // time diff in seconds
  let timeUnits = ["year", "month", "day", "hour", "minute", "second"];
  let unitLength = [31104000, 2592000, 86400, 3600, 60, 1 ];
  let howLong = "";
  for (let i in timeUnits) {
    const timeDiffInThisUnit = Math.floor(timeDiff / unitLength[i]);
    if (timeDiffInThisUnit > 1) {
      howLong += ` ${timeDiffInThisUnit} ${timeUnits[i]}s`;
    } else if (timeDiffInThisUnit === 1) {
      howLong += ` 1 ${timeUnits[i]}`;
    }
    timeDiff = timeDiff % unitLength[i];
  }
  return howLong + " ago";
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
  <p>${tweetObj.content.text}</p>
  </div>
  <footer>
    <p>${getTimeDiff(tweetObj["created_at"])}</p>
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
    $('#tweets-container').append($tweet);
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
    const newTweetData = $(this).serialize();
    $.ajax({
      url: "/tweets/",
      method: "POST",
      data: newTweetData
    })
      .then(() => {
        console.log("Tweet sent!");
      })
      .catch((error) => {
        console.log(error);
      });
  });
});