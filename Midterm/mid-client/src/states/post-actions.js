import {
    listPosts as listPostsFromApi,
    createPost as createPostFromApi,
    Delete as DeleteFromApi
} from 'api/posts.js';


/*  Posts */

function startLoading() {
    return {
        type: '@POST/START_LOADING'
    };
}

function endLoading() {
    return {
        type: '@POST/END_LOADING'
    };
}

function endListPosts(posts) {
    return {
        type: '@POST/END_LIST_POSTS',
        posts
    };
}

export function listPosts(account, loading = false) {
    return (dispatch, getState) => {
        if (!loading)
            dispatch(startLoading());

        return listPostsFromApi(account).then(posts => {
            dispatch(endListPosts(posts));
            dispatch(endLoading());
        }).catch(err => {
            console.error('Error listing posts', err);
            dispatch(endLoading());
        });
    };
};

export function createPost(account, user, text, color) {
    console.log(account);
    console.log(user);
    console.log(text);
    console.log(color);
    console.log('1');
    return (dispatch, getState) => {
        dispatch(startLoading());

        return createPostFromApi(account, user, text, color).then(post => {
            dispatch(listPosts(account,true));
        }).catch(err => {
            console.error('Error creating post', err);
            dispatch(endLoading());
        });
    };
};

export function Delete(account,id) {
    return (dispatch, getState) => {
        dispatch(startLoading());

        return DeleteFromApi(id).then(post => {
            dispatch(listPosts(account,true));
        }).catch(err => {
            console.error('Error deleting', err);
            dispatch(endLoading());
        });
    };
};

/*  Post Form */

export function input(value) {
    return {
        type: '@POST_FORM/INPUT',
        value
    };
};

export function inputDanger(danger) {
    return {
        type: '@POST_FORM/INPUT_DANGER',
        danger
    };
};

export function toggleColor() {
    return {
        type: '@POST_FORM/TOGGLE_COLOR'
    };
};

export function setColorToggle(toggle) {
    console.log(toggle);
    return {
        type: '@POST_FORM/SET_COLOR_TOGGLE',
        toggle
    };
};

export function selectColor(color) {
    return {
        type: '@POST_FORM/SELECT_COLOR',
        color
    };
};

export function setRole(role) {
    return {
        type: '@ROLE/SET_ROLE',
        role
    };
};

export function formToggle() {
    return {
        type: '@POST_FORM/TOGGLE'
    };
}
