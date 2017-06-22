// Production server URL
const accountBaseUrl = 'http://mid-14.us-west-2.elasticbeanstalk.com/api';

export function listAccounts(user = '') {

    let url = `${accountBaseUrl}/accounts`;
    if (user)
        url += `?user=${user}`;

    console.log(`Making GET request to: ${url}`);

    // return axios.get(url).then(function(res) {
    //     if (res.status !== 200)
    //         throw new Error(`Unexpected response code: ${res.status}`);
    //
    //     return res.data;
    // });

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

export function createAccount(user, pwd, validation, email) {

    let url = `${accountBaseUrl}/accounts`;

    console.log(`Making POST(Account) request to: ${url}`);
    console.log(`user: ${user}, pwd: ${pwd},
                 validation: ${validation}, email" ${email} ...`);

    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user,
            pwd,
            validation,
            email
        })
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.json();
    });
}

export function loginAccount(searchUser = '', searchPwd = '') {

        let url = `${accountBaseUrl}/accounts`;

        if(searchUser && searchPwd)
            url += `?searchUser=${searchUser}&searchPwd=${searchPwd}`;
        else if(searchUser)
            url += `?searchUser=${searchUser}`;
        else if (searchPwd)
            url += `?searchPwd=${searchPwd}`;

        console.log(`Making GET(loginAccount) request to: ${url}`);

        return fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        }).then(function(res) {
            if (res.status !== 200)
                throw new Error(`Unexpected response code: ${res.status}`);

            return res.json();
        });

}


export function checkAccount(user, pwd, mode) {

        let url = `${accountBaseUrl}/accounts`;

        url += `?user=${user}&pwd=${pwd}&mode=${mode}`;

        console.log(`Making GET(checkAccount) request to: ${url}`);

        return fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        }).then(function(res) {
            if (res.status !== 200)
                throw new Error(`Unexpected response code: ${res.status}`);

            return res.json();
        });

}
