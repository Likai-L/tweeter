/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

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

$(document).ready(function() {
  renderTweets(data);
});