/* Role */

export function role(state = 'parent', action) {
    switch (action.type) {
        case '@ROLE/SET_ROLE':
            return action.role;
        default:
            return state;
    }
}

/* Postits */

const initPostitState = {
    postitLoading: false,
    postits: []
};
export function postit(state = initPostitState, action) {
    switch (action.type) {
        case '@POSTIT/START_LOADING':
            return {
                ...state,
                postitLoading: true
            };
        case '@POSTIT/END_LOADING':
            return {
                ...state,
                postitLoading: false
            };
        case '@POSTIT/END_LIST_POSTITS':
            return {
                ...state,
                postits: action.postits
            };
        default:
            return state;
    }
}

/* Postit Form */

const initPostitFormState = {
    inputValue: '',
    inputDanger: false
};
export function postitForm(state = initPostitFormState, action) {
    switch (action.type) {
        case '@POSTIT_FORM/INPUT':
            return {
                ...state,
                inputValue: action.value
            };
        case '@POSTIT_FORM/INPUT_DANGER':
            return {
                ...state,
                inputDanger: action.danger
            };
        default:
            return state;
    }
}
