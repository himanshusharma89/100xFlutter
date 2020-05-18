const Twit = require('twit');
const auth = require('./config');
const T = new Twit(auth);

// start stream and track tweets
const stream = T.stream('statuses/filter', { track: '#100DaysOfFlutter' });

// use this to log errors from requests
function responseCallback(err, data, response) {
  console.log(err);
}

// event handler
stream.on('tweet', tweet => {
  // retweet
  T.post('statuses/retweet/:id', { id: tweet.id_str }, responseCallback);
  // like
  T.post('favorites/create', { id: tweet.id_str }, responseCallback);
});