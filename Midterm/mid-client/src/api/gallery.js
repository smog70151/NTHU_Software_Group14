import axios from 'axios';

//const postBaseUrl = 'http://weathermood-production.us-west-2.elasticbeanstalk.com/api';
//const postBaseUrl = 'localhost:8080/api';
const photoBaseUrl = 'http://mid-14.us-west-2.elasticbeanstalk.com/api';

/*export function createPost(user ,text, color) {
    let url = `${postBaseUrl}/posts`;
    console.log(user);
    console.log(text);
    console.log(color);
    console.log(`Making POST request to: ${url}`);

    return axios.post(url, {
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

export function listPosts() {
    let url = `${postBaseUrl}/posts`;

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(function(res) {
        if (res.status !== 200){
            throw new Error(`Unexpected response code: ${res.status}`);
        }
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
*/
export function newPhoto(account,photoUrl) {
    let url = `${photoBaseUrl}/photos`;
    console.log(photoUrl);
    console.log(`Making POST request to: ${url}`);

    return axios.post(url, {
        account,
        photoUrl
    }).then(function(res) {
        if (res.status !== 200){
            throw new Error(`Unexpected response code: ${res.status}`);
        }
        return res.data;
    })
}

export function listPhotos(account) {
    let url = `${photoBaseUrl}/photos?account=${account}`;

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(function(res) {
        if (res.status !== 200){
            throw new Error(`Unexpected response code: ${res.status}`);
        }
        return res.data;
    })
}
