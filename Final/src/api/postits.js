// Develop server URL
// const postBaseUrl = 'http://localhost:3000/api';

// Staging server URL
// const postBaseUrl = 'http://weathermood-staging.us-west-2.elasticbeanstalk.com/api';

// Production server URL
const postitBaseUrl = 'http://mid-14.us-west-2.elasticbeanstalk.com/api';

export function listPostits(account) {
    let url = `${postitBaseUrl}/posts?account=${account}`;
    // let query = [];
    // if (searchText)
    //     query.push(`searchText=${searchText}`);
    // if (start)
    //     query.push(`start=${start}`);
    // if (query.length)
    //     url += '?' + query.join('&');

    console.log(`Making GET request to: ${url}`);

    return fetch(url, {
        headers: {
            'Accept': 'application/json'
        }
    }).then(res => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.json();
    });
}

export function createPostit(account, user, text, color) {
    let url = `${postitBaseUrl}/posts`;

    console.log(`Making POSTIT request to: ${url}`);

    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            account,
            user,
            text,
            color
        })
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.json();
    });
}

export function Delete(id) {
    let url = `${postitBaseUrl}/posts/${id}`;

    console.log(`Making POST request to: ${url}`);

    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        }
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.json();
    });
}
