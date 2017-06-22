import axios from 'axios';

//const postBaseUrl = 'http://weathermood-production.us-west-2.elasticbeanstalk.com/api';
//const postBaseUrl = 'localhost:3000/api';
const postBaseUrl = 'http://mid-14.us-west-2.elasticbeanstalk.com/api';

export function createPost(account, user ,text, color) {
    let url = `${postBaseUrl}/posts`;
    console.log(account);
    console.log(user);
    console.log(text);
    console.log(color);
    console.log(`Making POST request to: ${url}`);

    return axios.post(url, {
        account,
        user,
        text,
        color
    }).then(function(res) {
        if (res.status !== 200){
            throw new Error(`Unexpected response code: ${res.status}`);
        }
        return res.data;
    })
}

export function listPosts(account) {
    let url = `${postBaseUrl}/posts?account=${account}`;
    console.log(account);
    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(function(res) {
        if (res.status !== 200){
            throw new Error(`Unexpected response code: ${res.status}`);
        }
        console.log('ttt');
        console.log(res.data);
        return res.data;
    })
}

export function Delete(id) {
    let url = `${postBaseUrl}/posts/${id}`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}
