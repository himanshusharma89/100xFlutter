const Twit = require('twit');

const T = new Twit({
  consumer_key: 'PZOQa3EXsefINWzszUpeP5sGZ',
  consumer_secret: 'St5bGY1aYwfZ7Wn06YIQAVDGHiAGulpReLhVqRIrUmMrDgL5Z2',
  access_token: '1260450633259384833-qN2QJfDOd4PZ8BL3653KEM30cUNCzF',
  access_token_secret: 'DM3HOnPZyc0ivcfTLPr8VZF0RYyMpIatBHFrEEjsMxVpR'
});

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