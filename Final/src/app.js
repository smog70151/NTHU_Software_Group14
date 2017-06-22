import React from 'react';
import {BackHandler, AsyncStorage, View} from 'react-native';

import {StyleProvider} from 'native-base';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';

import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import {Provider, connect} from 'react-redux';
import {search} from './states/search';
import {toast} from './states/toast';
import {role, postit, postitForm} from './states/postit-reducers';
import {signupForm, searchLogin, loginAccount, check} from './states/account-reducers';

import {StackNavigator, NavigationActions, addNavigationHelpers} from 'react-navigation';
import GalleryScreen from './components/GalleryScreen';
import PostitScreen from './components/PostitScreen';
import PostitFormScreen from './components/PostitFormScreen'
import IntroScreen from './components/IntroScreen';
import LogInScreen from './components/LogInScreen';
import SignUpScreen from './components/SignUpScreen';
import StartScreen from './components/StartScreen';
import WelcomeScreen from './components/WelcomeScreen';
import InfoScreen from './components/InfoScreen';

const AppNavigator = StackNavigator({
    Gallery: {screen: GalleryScreen},
    Postit: {screen: PostitScreen},
    PostitForm: {screen: PostitFormScreen},
    Intro: {screen: IntroScreen},
    LogIn: {screen: LogInScreen},
    SignUp: {screen: SignUpScreen},
    Start: {screen: StartScreen},
    Welcome: {screen: WelcomeScreen},
    Info: {screen: InfoScreen}
}, {
    headerMode: 'none'
});

class AppWithStyleAndNavigator extends React.Component {

    constructor(props) {
      super(props);

    }

    render() {
        return (
            <StyleProvider style={getTheme(platform)}>
                <AppNavigator navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav
                })}/>
            </StyleProvider>
        );
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            const {dispatch, nav} = this.props;
            if (nav.index === 0)
                return false;
            dispatch(NavigationActions.back())
            return true;
        });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress');
    }
}

const AppWithNavState = connect(state => ({
    nav: state.nav
}))(AppWithStyleAndNavigator);



export default class App extends React.Component {



    constructor(props){
       super(props);

       this.store = null;
       this.render = this.render.bind(this);
    }

    componentWillMount() {
      var firstPage = ''
      AsyncStorage.getItem('@Route:initialPage').then((value) => {
        if (value === 'Start') {
            return value
        }else {
            return 'Welcome';
        }
      }).then( firstPage => {
        const initialState = AppNavigator.router.getStateForAction(NavigationActions.navigate({routeName: firstPage}));
        const nav = (state = initialState, action) => {
            const nextState = AppNavigator.router.getStateForAction(action, state);
            return nextState || state;
        };
        // Create Redux store
        this.store = createStore(combineReducers({
            nav, search, toast,
            signupForm, searchLogin, loginAccount, check,
            role, postit, postitForm
        }), compose(applyMiddleware(thunkMiddleware, loggerMiddleware)));
      }).then(()=>this.forceUpdate()).catch((err) => console.log('GetItem ERROR : '+ err.message));

    }

    render() {
      if(this.store!==null){
        return (
            <Provider store={this.store}>
                <AppWithNavState/>
            </Provider>
        );
      }else {
        return (
          <View></View>
        );
      }

    }

}
