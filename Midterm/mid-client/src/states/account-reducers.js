/* Account */

const initAccountState = {
    accountLoading: false,
    accounts: []
};

export function signup(state = initAccountState, action) {
    switch (action.type) {
        case '@ACCOUNT/START_LOADING':
            return {
                ...state,
                accountLoading: true
            };
        case '@ACCOUNT/END_LOADING':
            return {
                ...state,
                accountLoading: false
            };
        case '@ACCOUNT/END_LIST_POSTS':
            return {
                ...state,
                accounts: action.accounts
            };
        default:
            return state;
    }
}

/* Check */

const initCheckAccountState = {
    accounts: []
};

export function check(state = initCheckAccountState, action) {
    switch (action.type) {
        case '@ACCOUNT/END_CHECK_ACCOUNT':
            return {
                ...state,
                accounts: action.accounts
            };
        default:
            return state;
    }
}


/* Signup Form */

const initSignupFormState = {
    user: '',
    pwd: '',
    validation: '',
    email: '',
    inputDanger: false
};

export function signupForm(state = initSignupFormState, action) {
    switch (action.type) {
        case '@SIGNUP_FORM/INPUT':
            return {
                ...state,
                user: action.value
            };
        case '@SIGNUP_FORM/INPUT_PWD':
            return {
                ...state,
                pwd: action.pwd
            };
        case '@SIGNUP_FORM/INPUT_VALID':
            return {
                ...state,
                validation: action.validation
            };
        case '@SIGNUP_FORM/INPUT_EMAIL':
            return {
                ...state,
                email: action.email
            };
        case '@SIGNUP_FORM/INPUT_DANGER':
            return {
                ...state,
                inputDanger: action.danger
            };
        default:
            return state;
    }
}

/* Login Modal */

const initLoginModalToggle = {
    loginModal: false
};

export function loginModalToggle(state = initLoginModalToggle, action) {
    switch (action.type) {
        case '@LOG_IN/TOGGLE_MODAL':
            return {
                loginModal: !state.loginModal
            };
        default:
            return state;
    }
}

const initSignUpOK = {
    signupOK: false,
    signupFail: false
};

export function signUpToggle (state = initSignUpOK, action) {
    switch (action.type) {
        case '@SIGNUP/INPUT_SIGN_UP_OK':
            return {
                ...state,
                signupOK: action.signup,
                signupFail: action.signupFail
            };
        case '@SIGNUP/INPUT_SIGN_UP_FAIL':
            return {
                ...state,
                signupOK: action.signup,
                signupFail: action.signupFail
            };
        default:
            return state;
    }
}


/* Login System */

const initLogin = {
    searchUser: '',
    searchPwd: ''
}

export function searchLogin(state = initLogin, action) {
    switch (action.type) {
        case '@LOG_IN/SET_SEARCHUSER':
            return {
                ...state,
                searchUser: action.searchUser
            };
        case '@LOG_IN/SET_SEARCHUPWD':
            return {
                ...state,
                searchPwd: action.searchPwd
            };
        default:
            return state;
    }
}

const initLogInState = {
    loginLoading: false,
    loginAccounts: [],
    isLogin: false
};

export function loginAccount(state = initLogInState, action) {
    switch (action.type) {
        case '@LOG_IN/START_LOGGING':
            return {
                ...state,
                loginLoading: true
            };
        case '@LOG_IN/END_LOGGING':
            return {
                ...state,
                loginLoading: false
            };
        case '@LOG_IN/END_LIST_ACCOUNTS':
            return {
                ...state,
                loginAccounts: action.accounts
            };
        case '@LOG_IN/CHECK_LOGIN':
            return {
                ...state,
                isLogin: action.isLogin
            };
        case '@LOG_OUT/ACCOUNT':
            return {
                loginLoading: false,
                loginAccounts: [],
                isLogin: false
            };
        default:
            return state;
    }
}
