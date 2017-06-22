/* Search text */

export function role(state = 'parent', action) {
    switch (action.type) {
        case '@ROLE/SET_ROLE':
            return action.role;
        default:
            return state;
    }
}

/* Posts */

const initPostState = {
    postLoading: false,
    posts: []
};
export function post(state = initPostState, action) {
    switch (action.type) {
        case '@POST/START_LOADING':
            return {
                ...state,
                postLoading: true
            };
        case '@POST/END_LOADING':
            return {
                ...state,
                postLoading: false
            };
        case '@POST/END_LIST_POSTS':
            return {
                ...state,
                posts: action.posts
            };
        default:
            return state;
    }
}

/* Post Form */

const initPostFormState = {
    inputValue: '',
    inputDanger: false,
    colorToggle: false,
    color: 'na',
    formToggle: false
};
export function postForm(state = initPostFormState, action) {
    switch (action.type) {
        case '@POST_FORM/INPUT':
            return {
                ...state,
                inputValue: action.value
            };
        case '@POST_FORM/INPUT_DANGER':
            return {
                ...state,
                inputDanger: action.danger
            };
        case '@POST_FORM/TOGGLE_COLOR':
            return {
                ...state,
                colorToggle: !state.colorToggle
            };
        case '@POST_FORM/SET_COLOR_TOGGLE':
            return {
                ...state,
                colorToggle: action.toggle
            };
        case '@POST_FORM/SELECT_COLOR':
            return {
                ...state,
                color: action.color
            };
        case '@POST_FORM/TOGGLE':
            return {
                ...state,
                formToggle: !state.formToggle
            };
        default:
            return state;
    }
}
