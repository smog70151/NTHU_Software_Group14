import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
// import loggerMiddleware from 'redux-logger';
import {Provider} from 'react-redux';

import Main from 'components/Main.jsx';
import {unit, weather, weatherForm, forecast} from 'states/weather-reducers.js';
import {role, post, postForm/*, postItem*/} from 'states/post-reducers.js';
import {main} from 'states/main-reducers.js';
import {
    signup, signupForm, signUpToggle, check,
    loginModalToggle, searchLogin, loginAccount
} from 'states/account-reducers.js';


import 'bootstrap/dist/css/bootstrap.css';

window.onload = function() {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(combineReducers({
        unit, weather, weatherForm, forecast,
        role, post, postForm,/* postItem,*/
        main, signup, signupForm, signUpToggle, check,
        loginModalToggle, searchLogin, loginAccount,
    }), composeEnhancers(applyMiddleware(thunkMiddleware/*, loggerMiddleware*/)));

    ReactDOM.render(
        <Provider store={store}>
            <Main />
        </Provider>,
        document.getElementById('root')
    );
};
