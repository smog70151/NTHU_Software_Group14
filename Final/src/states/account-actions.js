import {
    listAccounts as listAccountsFromApi,
    createAccount as createAccountFromApi,
    loginAccount as loginAccountFromApi,
    checkAccount as checkAccountFromApi
} from '../api/accounts.js';

/*  Accounts */

function startLoading() {
    return {
        type: '@ACCOUNT/START_LOADING'
    };
}

function endLoading() {
    return {
        type: '@ACCOUNT/END_LOADING'
    };
}

function endListPosts(accounts) {
    return {
        type: '@ACCOUNT/END_LIST_ACCOUNTS',
        accounts
    };
}

export function listAccounts(user, loading = false) {
    return (dispatch, getState) => {
        if (!loading)
            dispatch(startLoading());

        return listAccountsFromApi(user).then(accounts => {
            dispatch(endListPosts(accounts));
            dispatch(endLoading());
        }).catch(err => {
            console.error('Error listing accounts', err);
            dispatch(endLoading());
        });
    };
};

function endCheckAccount(accounts) {
    return {
        type: '@ACCOUNT/END_CHECK_ACCOUNT',
        accounts
    };
}

export function checkAccount(user, pwd) {
    return (dispatch, getState) => {

        return checkAccountFromApi(user, pwd, 'check').then(accounts => {
            dispatch(endCheckAccount(accounts));
        }).catch(err => {
            console.error('Error listing accounts', err);
        });
    };
};

/*  Signup Form */

export function inputUser(value) {
    return {
        type: '@SIGNUP_FORM/INPUT',
        value
    };
};

export function inputPwd(pwd) {
    return {
        type: '@SIGNUP_FORM/INPUT_PWD',
        pwd
    };
};

export function inputValid(validation) {
    return {
        type: '@SIGNUP_FORM/INPUT_VALID',
        validation
    };
};

export function inputEmail(email) {
    return {
        type: '@SIGNUP_FORM/INPUT_EMAIL',
        email
    };
};

export function inputDanger(danger) {
    return {
        type: '@SIGNUP_FORM/INPUT_DANGER',
        danger
    };
};

export function inputSignUpOK(signup, signupFail) {
    return {
        type: '@SIGNUP/INPUT_SIGN_UP_OK',
        signup,
        signupFail
    };
};

export function inputSignUpFail(signup, signupFail) {
    return {
        type: '@SIGNUP/INPUT_SIGN_UP_FAIL',
        signup,
        signupFail
    };
};

export function createAccount(user, pwd, validation, email) {
    return (dispatch, getState) => {
        dispatch(startLoading());

        // console.log(`Account-actions = user: ${user}, pwd: ${pwd}, validation: ${validation}...`);
        return createAccountFromApi(user, pwd, validation, email).then(account => {
            dispatch(checkAccount(getState().user));
        }).catch(err => {
            console.error('Error creating accounts', err);
            dispatch(endLoading());
        });
    };
};

/* Login Modal */

export function toggleModal() {
    return {
        type: '@LOG_IN/TOGGLE_MODAL'
    };
}

/* Login System */

export function setSearchUser(searchUser) {
    return {
        type: '@LOG_IN/SET_SEARCHUSER',
        searchUser
    };
};

export function setSearchPwd(searchPwd) {
    return {
        type: '@LOG_IN/SET_SEARCHUPWD',
        searchPwd
    };
};

function startLogging() {
    return {
        type: '@LOG_IN/START_LOGGING'
    };
}

function endLogging() {
    return {
        type: '@LOG_IN/END_LOGGING'
    };
}

function endLogInAccount(accounts) {
    return {
        type: '@LOG_IN/END_LIST_ACCOUNTS',
        accounts,
    };
}

export function checkLogin(isLogin) {
    return {
        type: '@LOG_IN/CHECK_LOGIN',
        isLogin
    };
}


export function logoutAccount() {
    return {
        type: '@LOG_OUT/ACCOUNT',
    };
}

export function loginAccount(searchUser, searchPwd, logging = false) {
    return (dispatch, getState) => {
        if (!logging)
            dispatch(startLogging());

        return checkAccountFromApi(searchUser, searchPwd, 'login').then(accounts => {
            dispatch(endLogInAccount(accounts));
            dispatch(endLogging());
        }).catch(err => {
            console.error('Error logging in account... ', err);
            dispatch(endLogging());
        });
    };
};
