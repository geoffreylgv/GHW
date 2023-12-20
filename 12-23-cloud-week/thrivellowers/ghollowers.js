const axios = require('axios');

async function getFollowingList(username, token) {
    const url = `https://api.github.com/users/${username}/followers`;

    try {
        // Make the GET request with Authorization header
        const response = await axios.get(url, {
            headers: {
                Authorization: `token ${token}`
            }
        });

        // Return the following list
        return response.data;
    } catch (error) {
        // Handle errors
        console.error(`Error: ${error.response ? error.response.status : error.message}`);
        return null;
    }
}

// Replace 'YOUR_USERNAME' and 'YOUR_TOKEN' with your GitHub username and access token
const githubUsername = 'geoffreylgv';
const githubToken = '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';

// Call the function and log the following list
getFollowingList(githubUsername, githubToken)
    .then(followingList => {
        if (followingList) {
            console.log(`${githubUsername}'s following list:`);
            followingList.forEach(user => {
                console.log(user.login);
            });
        }
    })
    .catch(error => console.error(`Error: ${error.message}`));
