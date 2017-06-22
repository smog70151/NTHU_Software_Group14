import {
    listPostits as listPostitsFromApi,
    createPostit as createPostitFromApi,
    Delete as deleteFromApi
} from '../api/postits.js';

/*  Posts */

function startLoading() {
    return {
        type: '@POSTIT/START_LOADING'
    };
}

function endLoading() {
    return {
        type: '@POSTIT/END_LOADING'
    };
}

function endListPostits(postits) {
    return {
        type: '@POSTIT/END_LIST_POSTITS',
        postits
    };
}

export function listPostits(account, loading = false) {
    return (dispatch, getState) => {
        if (!loading)
            dispatch(startLoading());

        return listPostitsFromApi(account).then(postits => {
            dispatch(endListPostits(postits));
            dispatch(endLoading());
        }).catch(err => {
            console.error('Error listing postits', err);
            dispatch(endLoading());
        });
    };
};

export function createPostit(account, user, text, color) {
    return (dispatch, getState) => {
        dispatch(startLoading());

        return createPostitFromApi(account, user, text, color).then(postit => {
            dispatch(listPostits(account,true));
        }).catch(err => {
            console.error('Error creating postit', err);
            dispatch(endLoading());
        });
    };
};

export function Delete(account,id) {
    return (dispatch, getState) => {
        dispatch(startLoading());

        return deleteFromApi(id).then(postit => {
            dispatch(listPostits(account,true));
        }).catch(err => {
            console.error('Error deleting', err);
            dispatch(endLoading());
        });
    };
};

/*  Postit Form */ // Done

export function input(value) {
    return {
        type: '@POSTIT_FORM/INPUT',
        value
    };
};

export function inputDanger(danger) {
    return {
        type: '@POSTIT_FORM/INPUT_DANGER',
        danger
    };
};

export function setRole(role) {
    return {
        type: '@ROLE/SET_ROLE',
        role
    };
};
