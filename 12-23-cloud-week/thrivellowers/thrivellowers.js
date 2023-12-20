const axios = require('axios');
const fs = require('fs');

async function getFollowers(username) {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}/followers`);
        return response.data.map(follower => follower.login);
    } catch (error) {
        console.error('Error fetching followers:', error.response ? error.response.data : error.message);
        return null;
    }
}

async function getFollowing(username) {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}/following`);
        return response.data.map(following => following.login);
    } catch (error) {
        console.error('Error fetching following:', error.response ? error.response.data : error.message);
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
        fs.writeFileSync('non_followers.json', JSON.stringify(result, null, 2));
        console.log('Non-followers list saved to non_followers.json');
    } else {
        console.log('Error fetching data from GitHub API');
    }
}

main();
