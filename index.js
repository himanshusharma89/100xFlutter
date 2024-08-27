const Twit = require('twit');
const auth = require('./config');
const T = new Twit(auth);

// start stream and track tweets
const stream = T.stream('statuses/filter', { track: '#100DaysOfFlutter' });

// Helper to handle errors and avoid rate limits
function responseCallback(err, data, response) {
  if (err) {
    console.error('Error:', err.message);
  } else {
    console.log('Action performed:', data);
  }
}

// Event handler to process tweets
stream.on('tweet', tweet => {
  try {
    // Check if the tweet is from a bot or self to avoid unnecessary actions
    if (tweet.user.bot || tweet.user.screen_name === auth.own_account_name) return;

    // Retweet
    T.post('statuses/retweet/:id', { id: tweet.id_str }, responseCallback);

    // Like
    T.post('favorites/create', { id: tweet.id_str }, responseCallback);

  } catch (err) {
    console.error('Processing Error:', err.message);
  }
});