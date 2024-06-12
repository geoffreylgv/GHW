const Twit = require('twit');
const fs = require('fs');

// Replace with your Twitter API credentials
// bearer: 'AAAAAAAAAAAAAAAAAAAAAADdrQEAAAAAyskKZQSe3YdG2BoemTQvTTz%2BtwE%3DKacFLfGXOIkuLFTEBLDHCd9X5Fx0Q0wiuLGPSS080m5Tck0hDr',
const T = new Twit({
  consumer_key: '28171520',
  consumer_secret: 'your_consumer_secret',
  access_token: '940894696947306496-Sijlbw2heMRxxowspmfh3Dn60dLSGVt%2BtwE%3DKacFLfGXOIkuLFTEBLDHCd9X5Fx0Q0wiuLGPSS080m5Tck0hDr',
  access_token_secret: 'i8HUWhyzuCDTrOtIBbmPCNPQT2K48sEWNenNLliwiF4g3',
});

async function getFollowers(username) {
  try {
    const response = await T.get('followers/list', { screen_name: username });
    return response.data.users.map(follower => follower.screen_name);
  } catch (error) {
    console.error('Error fetching followers:', error.message);
    return null;
  }
}

async function getFollowing(username) {
  try {
    const response = await T.get('friends/list', { screen_name: username });
    return response.data.users.map(following => following.screen_name);
  } catch (error) {
    console.error('Error fetching following:', error.message);
    return null;
  }
}

async function findNonFollowers(username) {
  const followers = await getFollowers(username);
  const following = await getFollowing(username);

  if (followers !== null && following !== null) {
    const nonFollowers = following.filter(user => !followers.includes(user));
    return nonFollowers;
  } else {
    return null;
  }
}

async function main() {
  const yourUsername = 'geoffreylgv';
  const nonFollowers = await findNonFollowers(yourUsername);

  if (nonFollowers !== null) {
    const result = { non_followers: nonFollowers };
    fs.writeFileSync('non_followers_twitter.json', JSON.stringify(result, null, 2));
    console.log('Non-followers list saved to non_followers_twitter.json');
  } else {
    console.log('Error fetching data from Twitter API');
  }
}

main();
